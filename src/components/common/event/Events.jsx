import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from 'react-leaflet';
import { registerEvents } from '../../../services/EventService';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-geosearch/dist/geosearch.css";
import Swal from 'sweetalert2';
import { getActivities } from '../../../services/SettingsService';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Fix for default Leaflet icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

import culture2 from '../../../assets/img/culture/culture3.jpg'


// --- Helper Components & Icons ---

const BackArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const SaveIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 5.41667L8.74999 12.5L5.41666 9.16667" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.5 10C17.5 14.1425 14.1425 17.5 10 17.5C5.8575 17.5 2.5 14.1425 2.5 10C2.5 5.8575 5.8575 2.5 10 2.5" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const CheckIcon = () => (
    <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const EditIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5834 3.08333L16.9167 6.41667M12.6667 4C12.6667 6.09583 13.9042 7.33333 16 7.33333C16.3334 7.33333 16.6667 7.33333 17 7C17 6.66667 17 6.33333 17 6C17 3.90417 15.7625 2.66667 13.6667 2.66667C13.3334 2.66667 13 2.66667 12.6667 3V4ZM8.49999 6.5C5.49166 6.5 3 8.99167 3 12C3 15.0083 5.49166 17.5 8.49999 17.5C11.5083 17.5 14 15.0083 14 12C14 11.5 13.9417 11.025 13.8417 10.575" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const GeneralIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.75 9H8.25" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.75 15H8.25" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.37 22H11.63C6.81 22 4.93 20.12 4.93 15.3V8.7C4.93 3.88 6.81 2 11.63 2H12.37C17.19 2 19.07 3.88 19.07 8.7V15.3C19.07 20.12 17.19 22 12.37 22Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14.24 12L9.76 12" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 14.24V9.76" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const LocationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.5C21 17.5 12 23 12 23C12 23 3 17.5 3 10.5C3 6.35786 7.02944 3 12 3C16.9706 3 21 6.35786 21 10.5Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 13C13.3807 13 14.5 11.8807 14.5 10.5C14.5 9.11929 13.3807 8 12 8C10.6193 8 9.5 9.11929 9.5 10.5C9.5 11.8807 10.6193 13 12 13Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const TermsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.11008 17.4L3.51008 11.8C2.73008 11.02 2.73008 9.75 3.51008 8.97L8.97008 3.51C9.75008 2.73 11.0201 2.73 11.8001 3.51L17.4001 9.11C18.1801 9.89 18.1801 11.16 17.4001 11.94L11.9401 17.4C11.1601 18.18 9.89008 18.18 9.11008 17.4Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 9.5V6.5H9.5" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14.5 21.5L21.5 14.5" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const RegistrationLinkIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.19 8.23L14.77 9.65C13.99 10.43 13.99 11.7 14.77 12.48L16.19 13.9C16.97 14.68 18.24 14.68 19.02 13.9L20.44 12.48C21.22 11.7 21.22 10.43 20.44 9.65L19.02 8.23C18.24 7.45 16.97 7.45 16.19 8.23Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.81 15.77L9.23 14.35C10.01 13.57 10.01 12.3 9.23 11.52L7.81 10.1C7.03 9.32 5.76 9.32 4.98 10.1L3.56 11.52C2.78 12.3 2.78 13.57 3.56 14.35L4.98 15.77C5.76 16.55 7.03 16.55 7.81 15.77Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.48 8.9L8.9 12.48" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const CalendarIcon = () => (
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
);
const ImageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.35 11.04C10.7 11.04 11.79 9.95 11.79 8.6C11.79 7.25 10.7 6.16 9.35 6.16C8 6.16 6.91 7.25 6.91 8.6C6.91 9.95 8 11.04 9.35 11.04Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.66992 18.95L7.60992 15.64C8.38992 15.16 9.32992 15.17 10.0999 15.65L10.6899 16.07C11.5899 16.62 12.7299 16.62 13.6299 16.07L17.5499 13.73C18.4499 13.18 19.5899 13.18 20.4899 13.73L21.3299 14.27" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const FileIcon = () => (
    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
);
const UploadCloudIcon = () => (
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
);


const RichTextToolbar = () => (
    <div className="flex items-center gap-x-3 border-b border-gray-200 px-3 py-2"><button className="text-gray-600 hover:text-gray-900"><strong>B</strong></button><button className="text-gray-600 hover:text-gray-900"><em>I</em></button><button className="text-gray-600 hover:text-gray-900"><u>U</u></button><button className="text-gray-600 hover:text-gray-900"><s>S</s></button></div>
);

const CustomRadio = ({ fieldName, value, label, checked, onChange }) => (
    <label className="flex items-center gap-x-2 cursor-pointer text-sm text-gray-700"><input type="radio" name={fieldName} value={value} checked={checked} onChange={onChange} className="sr-only" /><span className={`h-5 w-5 rounded-full border flex items-center justify-center ${checked ? 'border-blue-600 bg-white' : 'border-gray-400'}`}>{checked && <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>}</span>{label}</label>
);

const CustomCheckbox = ({ fieldName, value, label, checked, onChange }) => (
    <label className="flex items-center gap-x-2 cursor-pointer text-sm text-gray-700">
        <input
            type="checkbox"
            name={fieldName}
            value={value}
            checked={checked}
            onChange={onChange}
            className="sr-only"
        />
        <span className={`h-5 w-5 rounded-md border-2 flex items-center justify-center ${checked ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-white'}`}>
            {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
        </span>
        {label}
    </label>
);


// --- Reusable Preview Components ---
const PreviewSection = ({ title, icon, onEdit, children }) => (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-x-3">
                {icon}
                <h3 className="text-xl font-bold" style={{ color: '#3558A2' }}>{title}</h3>
            </div>
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                <EditIcon />
            </button>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const PreviewField = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5 whitespace-pre-wrap">{value || '-'}</p>
    </div>
);

const PreviewTerm = ({ question, answer }) => (
    <div>
        <p className="text-xs text-gray-500">{question}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5 capitalize">{answer || '-'}</p>
    </div>
);

// --- Map Component ---
function DraggableMarker({ position, setPosition }) {
    const markerRef = useRef(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        [setPosition],
    );

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
        </Marker>
    );
}

// --- Form Step Data ---
const formSteps = [
    { id: 1, name: 'General', progress: 0 },
    { id: 2, name: 'Activity Details', progress: 20 },
    { id: 3, name: 'Location', progress: 40 },
    { id: 4, name: 'Registration Link', progress: 60 },
    { id: 5, name: 'Logo & Images', progress: 80 },
    { id: 6, name: 'Preview', progress: 100 },
];

const indonesiaProvinces = [
    "Aceh", "Bali", "Banten", "Bengkulu", "Gorontalo", "Jakarta", "Jambi", "Jawa Barat",
    "Jawa Tengah", "Jawa Timur", "Kalimantan Barat", "Kalimantan Selatan", "Kalimantan Tengah",
    "Kalimantan Timur", "Kalimantan Utara", "Kepulauan Bangka Belitung", "Kepulauan Riau",
    "Lampung", "Maluku", "Maluku Utara", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
    "Papua", "Papua Barat", "Riau", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tengah",
    "Sulawesi Tenggara", "Sulawesi Utara", "Sumatera Barat", "Sumatera Selatan", "Sumatera Utara",
    "Yogyakarta"
];

const bankNames = ["BCA", "BNI", "BRI", "Mandiri", "CIMB Niaga", "Danamon", "Permata Bank"];

function SearchControl({ onLocation }) {
    const map = useMap();
  
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const control = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: false,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        searchLabel: "Enter address or location...",
      });
  
      map.addControl(control);
  
      const handler = (result) => {
        const { x: lng, y: lat, label } = result.location;
        onLocation({ lat, lng, label });
        map.setView([lat, lng], 13);
      };
  
      map.on("geosearch/showlocation", handler);
  
      return () => {
        map.removeControl(control);
        map.off("geosearch/showlocation", handler);
      };
    }, [map, onLocation]);
  
    return null;
  }

// --- Main Registration Page Component ---
export default function Events() {
    const [currentStep, setCurrentStep] = useState(1);
    const [draftExists, setDraftExists] = useState(false);
    const [manualCoordinates, setManualCoordinates] = useState(false);
    const [mapPosition, setMapPosition] = useState({ lat: -6.2088, lng: 106.8456 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [errors, setErrors] = useState({});
    const [activitiesData, setActivitiesData] = useState([]);

    const initialFormData = {
        institutionName: '',
        picName: '',
        picPhone: '',
        picEmail: '',
        activities: [],
        activityOther: '',
        activityName: '',
        activityDescription: '',
        eventDateFrom: '',
        eventDateTo: '',
        isRecurring: false,
        eventTimeFrom: '',
        eventTimeTo: '',
        performerName: '',
        performerImage: null,
        locationAddress: '',
        region: '',
        latitude: -6.2088,
        longitude: 106.8456,
        registrationType: 'Free',
        withOrWithoutRegistration: 'With Registration',
        registrationTypeName: '',
        registrationLink: '',
        ticketPrice: '',
        bankName: '',
        accountName: '',
        accountNumber: '',
        logo: null,
        coverImage: null,
        terms_publications: null,
        terms_conference: null,
        terms_showcase: null,
    };

    const [formData, setFormData] = useState(initialFormData);

    // Check for draft on initial load
    useEffect(() => {
        const savedDraft = localStorage.getItem('draftFormData');
        if (savedDraft) {
            setDraftExists(true);
        }


        const fetchActivite = async () => {
            try {
                const response = await getActivities();
                setActivitiesData(response.data);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load activities. Please try again later.',
                });
            }
        }

        fetchActivite();

        if (submissionError) {
            // Check if there are specific validation errors
            if (submissionError.errors) {
                const errorMessages = Object.values(submissionError.errors)
                    .flat() // Flattens the array of arrays into a single array
                    .join('<br>'); // Joins messages with a line break for HTML display

                Swal.fire({
                    icon: 'error',
                    title: submissionError.message || 'Validation Failed',
                    html: errorMessages,
                });
            } else {
                // Handle other types of errors that might not have the 'errors' object
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred',
                    text: submissionError.message || 'Something went wrong!',
                });
            }
            // Reset the error state after displaying the alert
            // to prevent it from showing again on re-renders.
            setSubmissionError(null);
        }
    }, [submissionError]);

    const handlePositionChange = useCallback((pos) => {
        setMapPosition(pos);
        setFormData(prev => ({
            ...prev,
            latitude: pos.lat.toFixed(6),
            longitude: pos.lng.toFixed(6)
        }));
    }, []);

    // Helper to prepare data for saving (removes file objects)
    const getSerializableFormData = (data) => {
        const serializableData = { ...data };

        // Remove file objects as they can't be stringified
        delete serializableData.logo;
        delete serializableData.coverImage;
        delete serializableData.performerImage;

        return serializableData;
    };

    const saveDraft = () => {
        const dataToSave = getSerializableFormData(formData);
        localStorage.setItem('draftFormData', JSON.stringify(dataToSave));
        setDraftExists(true);
        alert('Draft saved!');
    };

    const applyDraft = () => {
        const savedDraft = localStorage.getItem('draftFormData');
        if (savedDraft) {
            const parsedDraft = JSON.parse(savedDraft);
            // Note: File objects (logo, images) are not restored. User must re-upload.
            setFormData(prev => ({ ...prev, ...parsedDraft }));

            // Update map position from draft
            if (parsedDraft.latitude && parsedDraft.longitude) {
                setMapPosition({ lat: parseFloat(parsedDraft.latitude), lng: parseFloat(parsedDraft.longitude) });
            }

            alert('Draft applied! Please re-upload any images.');
        }
    };

    const deleteDraft = () => {
        localStorage.removeItem('draftFormData');
        setDraftExists(false);
        alert('Draft deleted!');
    };

    const performerImageRef = useRef(null);
    const logoImageRef = useRef(null);
    const coverImageRef = useRef(null);

    const handleRemoveImage = (key, ref) => {
        setFormData(prev => ({ ...prev, [key]: null }));
        // Reset the file input's value using the passed ref
        if (ref.current) {
            ref.current.value = "";
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'activities') {
            const newActivities = checked
                ? [...formData.activities, value]
                : formData.activities.filter(activity => activity !== value);
            setFormData(prev => ({ ...prev, activities: newActivities }));
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleUrlBlur = (e) => {
        const { name, value } = e.target;
        let url = value.trim();

        if (!url) {
            // Clear error if the field is empty
            setErrors(prev => ({ ...prev, [name]: undefined }));
            return;
        }

        // Prepend https:// if no protocol is specified
        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }

        // Basic URL validation
        try {
            new URL(url);
            // If valid, update form data with the formatted URL and clear any existing error
            setFormData(prevData => ({ ...prevData, [name]: url }));
            setErrors(prev => ({ ...prev, [name]: undefined }));
        } catch (_) {
            // If invalid, set an error message
            setErrors(prev => ({ ...prev, [name]: 'Please enter a valid URL.' }));
        }
    };

    const handleImageUpload = (fieldName, file) => {
        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: {
                    file: file,
                    name: file.name,
                    url: URL.createObjectURL(file)
                }
            }));
        }
    };

    const goToStep = (stepNumber) => {
        if (stepNumber >= 1 && stepNumber <= formSteps.length) {
            setCurrentStep(stepNumber);
        }
    }

    const handleNext = () => {
        if (currentStep < formSteps.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        setSubmissionError(null);

        const submissionData = new FormData();

        Object.keys(formData).forEach(key => {
            const value = formData[key];
            if (key === 'activities' && Array.isArray(value)) {
                console.log('Appending activities:', value);
                value.forEach(activity => submissionData.append(`${key}[]`, activity));
            } else if (value && value.file instanceof File) {
                submissionData.append(key, value.file);
            } else if (typeof value === 'object' && value !== null) {
                submissionData.append(key, JSON.stringify(value));
            } else {
                submissionData.append(key, value);
            }
        });

        try {
            const response = await registerEvents(submissionData);
            console.log('Event registered successfully:', response.data);
            const dataToSubmit = getSerializableFormData(formData);
            localStorage.setItem('draftEventsFormData', JSON.stringify(dataToSubmit));
            alert("Event registration Submitted Successfully!");
            window.location.href = '/register/confirmation';
            setDraftExists(false);
            setFormData(initialFormData);

        } catch (error) {
            if (error.response && error.response.data) {
                setSubmissionError(error.response.data);
            } else {
                setSubmissionError({ message: 'An unexpected network error occurred.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const currentStepData = formSteps.find(step => step.id === currentStep);
    const nextStepData = formSteps.find(step => step.id === currentStep + 1);

    return (
        <div className="h-screen w-full bg-white font-sans flex flex-col lg:flex-row overflow-hidden">

            {/* Left Column: Image and Info Panel (Sticky) */}
            <div className="relative w-full lg:w-1/3 h-64 lg:h-full flex-shrink-0">
                <img
                    src={culture2}
                    alt="Team of chefs in a kitchen"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C5B91]/90 from-20% via-[#0C5B91]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h1 className="text-4xl font-bold mb-4">Events</h1>
                    <div className="flex flex-wrap gap-2">
                        {['Cooking Demo', 'Workshop', 'Exhibition', 'Discussion', 'Others'].map(tag => (
                            <span key={tag} className="px-4 py-1.5 text-sm border border-white/50 rounded-full bg-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="w-full lg:w-2/3 flex flex-col overflow-hidden">

                {/* Scrollable Content Area */}
                <div className="flex-grow overflow-y-auto">
                    <div className="p-6 sm:p-10 lg:p-16 min-h-full flex flex-col">
                        <div className="w-full max-w-3xl mx-auto flex-grow">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8">
                                <a href='/register' className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                    <BackArrowIcon />
                                    <span className="text-sm font-medium">Back to Registration Page</span>
                                </a>
                                <div className="flex items-center gap-x-2">
                                    {draftExists ? (
                                        <>
                                            <button onClick={applyDraft} className="px-4 py-2 border border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 text-sm font-medium">
                                                Apply Draft
                                            </button>
                                            <button onClick={deleteDraft} className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium">
                                                Delete Draft
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={saveDraft} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium">
                                            <SaveIcon />
                                            Save as Draft
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* Form Content */}
                            <div>
                                <h2 className="text-3xl font-bold text-[#3558A2]">List your details</h2>
                                <p className="text-[#656565] mt-2 mb-8">Please fill in all of the details of your restaurant.</p>

                                {/* Progress Bar */}
                                <div>
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="font-bold text-blue-600">{currentStepData.name}</span>
                                        <span className="text-gray-500">
                                            Next: <span className="font-medium text-gray-700">{nextStepData ? nextStepData.name : 'Done!'}</span>
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                                            style={{ width: `${currentStepData.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-sm font-bold text-gray-800 mt-1">{currentStepData.progress}%</div>
                                </div>

                                {/* Form Fields Container */}
                                <div className="mt-10">
                                    {/* Step 1: General */}
                                    {currentStep === 1 && (
                                        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                                            <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>General</h3>
                                            <div className="space-y-8">
                                                <div>
                                                    <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                                                    <input type="text" name="institutionName" id="institutionName" value={formData.institutionName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label htmlFor="picName" className="block text-sm font-medium text-gray-700 mb-1">PIC Fullname <span className="text-gray-400">(optional)</span></label>
                                                    <input type="text" name="picName" id="picName" value={formData.picName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" placeholder="Your PIC Name" />
                                                </div>
                                                <div>
                                                    <label htmlFor="picPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                    <input type="tel" name="picPhone" id="picPhone" value={formData.picPhone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" placeholder="Your phone number" />
                                                </div>
                                                <div>
                                                    <label htmlFor="picEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                                    <input type="email" name="picEmail" id="picEmail" value={formData.picEmail} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" placeholder="Your email address" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Activity Details */}
                                    {currentStep === 2 && (
                                        <div className="sticky bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                                            <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Activity Details</h3>
                                            <div className="space-y-8">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-3">Choose Activity</label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {activitiesData.map((activity) => (
                                                            <CustomCheckbox fieldName="activities" value={activity.id} label={activity.activity_name} checked={formData.activities.includes(`${activity.id}`)} onChange={handleInputChange} />
                                                        ))}
                                                    </div>
                                                    {/* {formData.activities.includes('Other') && (
                                                        <input type="text" name="activityOther" value={formData.activityOther} onChange={handleInputChange} className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Please specify other activity" />
                                                    )} */}
                                                </div>
                                                <div>
                                                    <label htmlFor="activityName" className="block text-sm font-medium text-gray-700 mb-1">Activity Name <span className="text-gray-400">(optional)</span></label>
                                                    <input type="text" name="activityName" id="activityName" value={formData.activityName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Activity name" />
                                                </div>
                                                <div>
                                                    <label htmlFor="activityDescription" className="block text-sm font-medium text-gray-700 mb-1">Activity Description</label>
                                                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                                                        <RichTextToolbar />
                                                        <textarea name="activityDescription" id="activityDescription" rows="5" value={formData.activityDescription} onChange={handleInputChange} className="w-full px-4 py-2 border-t-0 focus:ring-0 focus:outline-none"></textarea>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Date <span className="text-gray-400">(Optional)</span></label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="relative">
                                                            <label htmlFor="eventDateFrom" className="block text-xs text-gray-500 mb-1">From</label>
                                                            <input type="date" name="eventDateFrom" id="eventDateFrom" value={formData.eventDateFrom} onChange={handleInputChange} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                                            <div className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center pointer-events-none"><CalendarIcon /></div>
                                                        </div>
                                                        <div className="relative">
                                                            <label htmlFor="eventDateTo" className="block text-xs text-gray-500 mb-1">To</label>
                                                            <input type="date" name="eventDateTo" id="eventDateTo" value={formData.eventDateTo} onChange={handleInputChange} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                                            <div className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center pointer-events-none"><CalendarIcon /></div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <CustomCheckbox fieldName="isRecurring" label="Is recurring?" checked={formData.isRecurring} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time <span className="text-gray-400">(Optional)</span></label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor="eventTimeFrom" className="block text-xs text-gray-500 mb-1">From</label>
                                                            <input type="time" name="eventTimeFrom" id="eventTimeFrom" value={formData.eventTimeFrom} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="eventTimeTo" className="block text-xs text-gray-500 mb-1">To</label>
                                                            <input type="time" name="eventTimeTo" id="eventTimeTo" value={formData.eventTimeTo} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Performers Name and Picture</label>
                                                    <div className="flex items-start gap-x-4">
                                                        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                                            {formData.performerImage ? <img src={formData.performerImage.url} alt="Performer" className="w-full h-full object-cover rounded-lg" /> : <ImageIcon />}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <input type="text" name="performerName" value={formData.performerName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Name of Chef / Speaker / other performers..." />
                                                            <div className="mt-2 flex items-center gap-x-4">
                                                                <label htmlFor="performer-image-upload" className="text-sm text-blue-600 cursor-pointer">Upload Picture (Max 1MB)</label>
                                                                {formData.performerImage && (
                                                                    <button type="button" onClick={() => handleRemoveImage('performerImage', performerImageRef)} className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                                        Remove
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <input id="performer-image-upload" type="file" className="sr-only" onChange={(e) => handleImageUpload('performerImage', e.target.files[0])} accept="image/*" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Location */}
                                    {currentStep === 3 && (
                                        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                                            <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Location</h3>
                                            <div className="space-y-8">
                                                <div>
                                                    <label htmlFor="locationAddress" className="block text-sm font-medium text-gray-700 mb-1">Location Address</label>
                                                    <input type="text" name="locationAddress" id="locationAddress" value={formData.locationAddress} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <label className="block text-sm font-medium text-gray-700">Lock Pin Location</label>
                                                        <button onClick={() => setManualCoordinates(!manualCoordinates)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                            {manualCoordinates ? 'Use Map' : 'Enter coordinates manually'}
                                                        </button>
                                                    </div>

                                                    {!manualCoordinates && (
                                                        <div className="w-full h-64 bg-gray-200 rounded-xl z-0">
                                                            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%", borderRadius: '0.75rem' }}>
                                                                <TileLayer
                                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                />
                                                                 <SearchControl onLocation={handlePositionChange} />
                                                                <DraggableMarker position={mapPosition} setPosition={handlePositionChange} />
                                                            </MapContainer>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                                        <div>
                                                            <input type="number" name="latitude" id="latitude" value={formData.latitude} onChange={handleInputChange} disabled={!manualCoordinates} className="w-full px-3 py-3 border border-gray-300 rounded-xl disabled:bg-gray-100" placeholder="Latitude Coordinate" />
                                                        </div>
                                                        <div>
                                                            <input type="number" name="longitude" id="longitude" value={formData.longitude} onChange={handleInputChange} disabled={!manualCoordinates} className="w-full px-3 py-3 border border-gray-300 rounded-xl disabled:bg-gray-100" placeholder="Longitude Coordinate" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                                    <select name="region" id="region" value={formData.region} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500">
                                                        <option value="">Select region...</option>
                                                        {indonesiaProvinces.map(province => <option key={province} value={province}>{province}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4: Registration Link */}
                                    {currentStep === 4 && (
                                        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                                            <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Registration Link</h3>
                                            <div className="space-y-8">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-3">Registration Type</label>
                                                    <div className="flex flex-col sm:flex-row gap-y-3 gap-x-6">
                                                        <CustomRadio fieldName="registrationType" value="Free" label="Free" checked={formData.registrationType === 'Free'} onChange={handleInputChange} />
                                                        <CustomRadio fieldName="registrationType" value="Paid" label="Buy Ticket (HTM)" checked={formData.registrationType === 'Paid'} onChange={handleInputChange} />
                                                        <CustomRadio fieldName="registrationType" value="By Invitation" label="By Invitation" checked={formData.registrationType === 'By Invitation'} onChange={handleInputChange} />
                                                        <CustomRadio fieldName="registrationType" value="Donation" label="Donation" checked={formData.registrationType === 'Donation'} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-3">With or Without Registration</label>
                                                    <div className="flex items-center gap-x-6">
                                                        <CustomRadio fieldName="withOrWithoutRegistration" value="With Registration" label="With Registration" checked={formData.withOrWithoutRegistration === 'With Registration'} onChange={handleInputChange} />
                                                        <CustomRadio fieldName="withOrWithoutRegistration" value="Without Registration" label="Without Registration" checked={formData.withOrWithoutRegistration === 'Without Registration'} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="registrationTypeName" className="block text-sm font-medium text-gray-700 mb-1">Mention your registration type <span className="text-gray-400">(optional)</span></label>
                                                    <input type="text" name="registrationTypeName" id="registrationTypeName" value={formData.registrationTypeName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Registration name" />
                                                </div>
                                                <div>
                                                    <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-700 mb-1">Registration Link <span className="text-gray-400">(optional)</span></label>
                                                    <input type="url" name="registrationLink" id="registrationLink" value={formData.registrationLink} onChange={handleInputChange} onBlur={handleUrlBlur} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 mb-1">Ticket Price <span className="text-gray-400">(optional)</span></label>
                                                    <div className="relative">
                                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">Rp.</span>
                                                        <input type="number" name="ticketPrice" id="ticketPrice" value={formData.ticketPrice} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl" placeholder="0" />
                                                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 text-xs">Type '0' if Free Registration</span>
                                                    </div>
                                                </div>
                                                <div className="border-t border-gray-200 pt-6">
                                                    <p className="text-sm font-medium text-gray-700 mb-3">Transfer Detail <span className="text-gray-400">(optional)</span></p>
                                                    <div className="space-y-4">
                                                        <select name="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                                                            <option value="">Bank Name</option>
                                                            {bankNames.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                                                        </select>
                                                        <input type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Account Name" />
                                                        <input type="number" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Account Number" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 5: Logo & Images */}
                                    {currentStep === 5 && (
                                        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                                            <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Logo & Images</h3>
                                            <div className="space-y-8">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo of your institution</label>
                                                    <label htmlFor="logo-upload" className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400">
                                                        <div className="space-y-1 text-center">
                                                            <UploadCloudIcon />
                                                            <div className="flex text-sm text-gray-600">
                                                                <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                                    <span>Upload Image</span>
                                                                </span>
                                                                <p className="pl-1">(Max. size: 1024x1024 px, file size: 1 MB)</p>
                                                            </div>
                                                            {formData.logo && <p className="text-medium text-black-500">{formData.logo.name}</p>}
                                                            <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={(e) => handleImageUpload('logo', e.target.files[0])} accept="image/*" />
                                                        </div>
                                                    </label>
                                                    {formData.logo && (
                                                        <button type="button" onClick={() => handleRemoveImage('logo', logoImageRef)} className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                                                    <label htmlFor="cover-image-upload" className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400">
                                                        <div className="space-y-1 text-center">
                                                            <UploadCloudIcon />
                                                            <div className="flex text-sm text-gray-600">
                                                                <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                                    <span>Upload Image</span>
                                                                </span>
                                                                <p className="pl-1">(Max. size: 1920x1080 px, file size: 2 MB)</p>
                                                            </div>
                                                            {formData.coverImage && <p className="text-medium text-black-500">{formData.coverImage.name}</p>}
                                                            <input id="cover-image-upload" name="cover-image-upload" type="file" className="sr-only" onChange={(e) => handleImageUpload('coverImage', e.target.files[0])} accept="image/*" />
                                                        </div>
                                                    </label>
                                                    {formData.coverImage && (
                                                        <button type="button" onClick={() => handleRemoveImage('coverImage', coverImageRef)} className="text-sm text-red-600 hover:text-red-700 font-medium">
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-3">Agree to the use of your photo, logo and data to be included in all publications?</label>
                                                    <div className="flex items-center gap-x-6">
                                                        <CustomRadio fieldName="terms_publications" value="yes" label="Yes" checked={formData.terms_publications === 'yes'} onChange={handleInputChange} />
                                                        <CustomRadio fieldName="terms_publications" value="no" label="No" checked={formData.terms_publications === 'no'} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 6: Preview */}
                                    {currentStep === 6 && (
                                        <div>
                                            <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Preview</h3>

                                            <PreviewSection title="General" icon={<GeneralIcon />} onEdit={() => goToStep(1)}>
                                                <PreviewField label="Institution Name" value={formData.institutionName} />
                                                <PreviewField label="PIC Fullname" value={formData.picName} />
                                                <PreviewField label="Phone Number" value={formData.picPhone} />
                                                <PreviewField label="Contact Email" value={formData.picEmail} />
                                            </PreviewSection>

                                            <PreviewSection title="Activity Details" icon={<ActivityIcon />} onEdit={() => goToStep(2)}>
                                                <PreviewField label="Activities" value={formData.activities.join(', ')} />
                                                {formData.activities.includes('Other') && <PreviewField label="Other Activity" value={formData.activityOther} />}
                                                <PreviewField label="Activity Name" value={formData.activityName} />
                                                <PreviewField label="Activity Description" value={formData.activityDescription} />
                                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/60 mt-4">
                                                    <PreviewField label="Event Date From" value={formData.eventDateFrom} />
                                                    <PreviewField label="Event Date To" value={formData.eventDateTo} />
                                                    <PreviewField label="Event Time From" value={formData.eventTimeFrom} />
                                                    <PreviewField label="Event Time To" value={formData.eventTimeTo} />
                                                </div>
                                                <PreviewField label="Recurring Event" value={formData.isRecurring ? 'Yes' : 'No'} />
                                                <div className="pt-4 border-t border-gray-200/60 mt-4">
                                                    <PreviewField label="Performer Name" value={formData.performerName} />
                                                    {formData.performerImage && <PreviewField label="Performer Image" value={formData.performerImage.name} />}
                                                </div>
                                            </PreviewSection>

                                            <PreviewSection title="Location" icon={<LocationIcon />} onEdit={() => goToStep(3)}>
                                                <PreviewField label="Location Address" value={formData.locationAddress} />
                                                <PreviewField label="Region" value={formData.region} />
                                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/60 mt-4">
                                                    <PreviewField label="Latitude" value={formData.latitude} />
                                                    <PreviewField label="Longitude" value={formData.longitude} />
                                                </div>
                                            </PreviewSection>

                                            <PreviewSection title="Registration Link" icon={<RegistrationLinkIcon />} onEdit={() => goToStep(4)}>
                                                <PreviewField label="Registration Type" value={formData.registrationType} />
                                                <PreviewField label="With or Without Registration" value={formData.withOrWithoutRegistration} />
                                                <PreviewField label="Registration Name" value={formData.registrationTypeName} />
                                                <PreviewField label="Registration Link" value={formData.registrationLink} />
                                                <PreviewField label="Ticket Price" value={`Rp. ${formData.ticketPrice || 0}`} />
                                                <div className="pt-4 border-t border-gray-200/60 mt-4">
                                                    <PreviewField label="Bank Name" value={formData.bankName} />
                                                    <PreviewField label="Account Name" value={formData.accountName} />
                                                    <PreviewField label="Account Number" value={formData.accountNumber} />
                                                </div>
                                            </PreviewSection>

                                            <PreviewSection title="Logo & Images" icon={<ImageIcon />} onEdit={() => goToStep(5)}>
                                                {formData.logo && <PreviewField label="Logo" value={formData.logo.name} />}
                                                {formData.coverImage && <PreviewField label="Cover Image" value={formData.coverImage.name} />}
                                                {formData.logo && <img src={formData.logo.url} alt="Logo Preview" className="max-w-xs rounded-lg" />}
                                                <PreviewTerm question="Agree to the use of your photo, logo and data to be included in all publications?" answer={formData.terms_publications} />
                                            </PreviewSection>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer for Navigation */}
                <div className="flex-shrink-0 bg-white border-t border-gray-200">
                    <div className="w-full max-w-3xl mx-auto p-4 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {isSubmitting
                                ? 'Submitting...'
                                : (currentStep === formSteps.length ? 'Submit Registration' : 'Next')
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
