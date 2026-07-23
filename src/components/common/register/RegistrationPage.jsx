import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "leaflet-geosearch/dist/geosearch.css";
import culture2 from '../../../assets/img/culture/culture2.jpg';
import { registerRestaurant } from '../../../services/RegisterService';
import { getMenuCatogories } from '../../../services/SettingsService';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import Swal from 'sweetalert2';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


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
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
    <path d="M9.94355 3.2L3.78605 9.7175C3.55355 9.965 3.32855 10.4525 3.28355 10.79L3.00605 13.22C2.90855 14.0975 3.53855 14.6975 4.40855 14.5475L6.82355 14.135C7.16105 14.075 7.63355 13.8275 7.86605 13.5725L14.0235 7.055C15.0885 5.93 15.5685 4.6475 13.911 3.08C12.261 1.5275 11.0085 2.075 9.94355 3.2Z" stroke="#3558A2" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.91797 4.28751C9.24047 6.35751 10.9205 7.94001 13.0055 8.15001" stroke="#3558A2" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2.25 17H15.75" stroke="#3558A2" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);
const GeneralIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.75 9H8.25" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.75 15H8.25" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const LinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.19 8.23L14.77 9.65C13.99 10.43 13.99 11.7 14.77 12.48L16.19 13.9C16.97 14.68 18.24 14.68 19.02 13.9L20.44 12.48C21.22 11.7 21.22 10.43 20.44 9.65L19.02 8.23C18.24 7.45 16.97 7.45 16.19 8.23Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.81 15.77L9.23 14.35C10.01 13.57 10.01 12.3 9.23 11.52L7.81 10.1C7.03 9.32 5.76 9.32 4.98 10.1L3.56 11.52C2.78 12.3 2.78 13.57 3.56 14.35L4.98 15.77C5.76 16.55 7.03 16.55 7.81 15.77Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.48 8.9L8.9 12.48" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.5C21 17.5 12 23 12 23C12 23 3 17.5 3 10.5C3 6.35786 7.02944 3 12 3C16.9706 3 21 6.35786 21 10.5Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 13C13.3807 13 14.5 11.8807 14.5 10.5C14.5 9.11929 13.3807 8 12 8C10.6193 8 9.5 9.11929 9.5 10.5C9.5 11.8807 10.6193 13 12 13Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const TermsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.11008 17.4L3.51008 11.8C2.73008 11.02 2.73008 9.75 3.51008 8.97L8.97008 3.51C9.75008 2.73 11.0201 2.73 11.8001 3.51L17.4001 9.11C18.1801 9.89 18.1801 11.16 17.4001 11.94L11.9401 17.4C11.1601 18.18 9.89008 18.18 9.11008 17.4Z" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 9.5V6.5H9.5" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14.5 21.5L21.5 14.5" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7H21" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 12H21" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 17H21" stroke="#3558A2" strokeWidth="1.5" strokeLinecap="round" /></svg>
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
  { id: 1, name: 'General', progress: 14 },
  { id: 2, name: 'Person in Charge', progress: 29 },
  { id: 3, name: 'Reservation Link & Website', progress: 43 },
  { id: 4, name: 'Restaurant Location', progress: 57 },
  { id: 5, name: 'Restaurant Menu', progress: 71 },
  { id: 6, name: 'Logo & Images', progress: 86 },
  { id: 7, name: 'Terms', progress: 100 },
  { id: 8, name: 'Preview', progress: 100 },
];

const menuCategories = [
  { key: 'appetizers', label: 'Appetizers' },
  { key: 'mainCourses', label: 'Main Course' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'wines', label: 'Wines' },
  { key: 'otherMenus', label: 'Other Menus' },
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

// --- Main Registration Page Component ---
export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [manualCoordinates, setManualCoordinates] = useState(false);
  const [mapPosition, setMapPosition] = useState({ lat: -6.2088, lng: 106.8456 });
  const [draftExists, setDraftExists] = useState(false);

  const initialFormData = {
    restaurantName: '',
    chefName: '',
    description: '',
    picName: '',
    picEmail: '',
    picPhone: '',
    reservationLink: '',
    website: '',
    address: '',
    region: '',
    streetName: '',
    locationDetail: '',
    latitude: -6.2088,
    longitude: 106.8456,
    menus: {},
    availabilityFrom: '',
    availabilityTo: '',
    logo: null,
    coverImage: null,
    galleryImage: null,
    terms_conference: 'yes',
    terms_showcase: 'yes',
    terms_publications: 'yes',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [errors, setErrors] = useState({});
  const [menuCategoriesData, setMenuCategoriesData] = useState([]);

  // Check for draft on initial load
  useEffect(() => {
    const savedDraft = localStorage.getItem('draftEventsFormData');
    if (savedDraft) {
      setDraftExists(true);
    }

    const fetchMenuCategories = async () => {
      try {
        const response = await getMenuCatogories();
        const categories = response.data;
        setMenuCategoriesData(categories);
        const dynamicMenus = categories.reduce((acc, category) => {
          acc[category.id] = [];
          return acc;
        }, {});

        setFormData(prevFormData => ({
          ...prevFormData,
          menus: dynamicMenus
        }));
        console.log('Menu categories fetched:', response.data);
      } catch (error) {
        console.error('Failed to fetch menu categories:', error);
      }
    }

    fetchMenuCategories();

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

  // Helper to prepare data for saving (removes file objects)
  const getSerializableFormData = (data) => {
    const serializableData = { ...data };

    // Remove file objects as they can't be stringified
    delete serializableData.logo;
    delete serializableData.coverImage;
    delete serializableData.galleryImage;

    // Remove file objects from menus
    const serializableMenus = { ...serializableData.menus };
    for (const category in serializableMenus) {
      serializableMenus[category] = serializableMenus[category].map(item => {
        const { image, imageUrl, ...rest } = item;
        return { ...rest, imageName: image ? image.name : null };
      });
    }
    serializableData.menus = serializableMenus;

    return serializableData;
  };

  const saveDraft = () => {
    const dataToSave = getSerializableFormData(formData);
    localStorage.setItem('draftEventsFormData', JSON.stringify(dataToSave));
    setDraftExists(true);
    alert('Draft saved!');
  };

  const applyDraft = () => {
    const savedDraft = localStorage.getItem('draftEventsFormData');
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      // Note: File objects (logo, images) are not restored. User must re-upload.
      setFormData(prev => ({ ...prev, ...parsedDraft }));
      if (parsedDraft.latitude && parsedDraft.longitude) {
        setMapPosition({ lat: parseFloat(parsedDraft.latitude), lng: parseFloat(parsedDraft.longitude) });
      }
      alert('Draft applied! Please re-upload any images.');
    }
  };

  const deleteDraft = () => {
    localStorage.removeItem('draftEventsFormData');
    setDraftExists(false);
    alert('Draft deleted!');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);

    const submissionData = new FormData();

    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (key !== 'menus' && key !== 'logo' && key !== 'coverImage' && key !== 'galleryImage' && (typeof value === 'string' || typeof value === 'number')) {
        submissionData.append(key, value);
      }
    });

    if (formData.logo) {
      submissionData.append('logo', formData.logo.file);
    }
    if (formData.coverImage) {
      submissionData.append('coverImage', formData.coverImage.file);
    }
    // Append multiple gallery images as an array
    if (Array.isArray(formData.galleryImages) && formData.galleryImages.length > 0) {
      formData.galleryImages.forEach((item) => {
      if (item?.file) {
        submissionData.append('galleryImage[]', item.file);
      }
      });
    } else if (formData.galleryImage) {
      // Fallback for legacy single image
      submissionData.append('galleryImage[]', formData.galleryImage.file);
    }

    Object.values(formData.menus).forEach(categoryItems => {
      categoryItems.forEach(item => {
        if (item.image) {
          submissionData.append('menu_images[]', item.image);
        }
      });
    });

    // You should also send the menu details, perhaps as a JSON string
    const simplifiedMenus = {};
    Object.keys(formData.menus).forEach(category => {
      simplifiedMenus[category] = formData.menus[category].map(item => ({
        name: item.name,
        price: item.price,
        // The image file name can be used to link it on the backend
        image_filename: item.image ? item.image.name : null
      }));
    });
    submissionData.append('menus', JSON.stringify(simplifiedMenus));


    // 5. Panggil API
    try {
      const lines = [];
      for (const [key, value] of submissionData.entries()) {
        if (value instanceof File) {
          lines.push(
            `${key}: [File name="${value.name}", size=${value.size}B, type="${value.type}"]`
          );
        } else {
          lines.push(`${key}: ${value}`);
        }
      }

      console.group('FormData payload (debug)');
      lines.forEach((l) => console.log(l));
      console.groupEnd();

      const response = await registerRestaurant(submissionData);
      console.log('Registration successful:', response);
      const dataToSubmit = getSerializableFormData(formData);
      localStorage.setItem('draftEventsFormData', JSON.stringify(dataToSubmit));
      alert("Registration Submitted Successfully!");
      window.location.href = '/register/confirmation';
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

  const handlePositionChange = useCallback((pos) => {
    setMapPosition(pos);
    setFormData(prev => ({
      ...prev,
      latitude: pos.lat.toFixed(6),
      longitude: pos.lng.toFixed(6)
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleMenuChange = (category, index, field, value) => {
    const updatedMenus = { ...formData.menus };
    const updatedItems = [...updatedMenus[category]];

    if (field === 'image') {
      const file = value; // value is the file object
      updatedItems[index] = { ...updatedItems[index], image: file, imageUrl: URL.createObjectURL(file) };
    } else {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    }

    updatedMenus[category] = updatedItems;
    setFormData(prev => ({ ...prev, menus: updatedMenus }));
  };

  const addMenuItem = (category) => {
    const newMenuItem = {
      id: Date.now(),
      name: '',
      price: '',
      image: null,
      imageUrl: null,
    };
    const updatedMenus = { ...formData.menus };
    updatedMenus[category] = [...updatedMenus[category], newMenuItem];
    setFormData(prev => ({ ...prev, menus: updatedMenus }));
  };

  const removeMenuItem = (category, id) => {
    const updatedMenus = { ...formData.menus };
    updatedMenus[category] = updatedMenus[category].filter(item => item.id !== id);
    setFormData(prev => ({ ...prev, menus: updatedMenus }));
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
      // Handle final submission
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const galleryImageRef = useRef(null);
  const logoImageRef = useRef(null);
  const coverImageRef = useRef(null);

  const handleRemoveImage = (key, ref) => {
    setFormData(prev => ({ ...prev, [key]: null }));
    // Reset the file input's value using the passed ref
    if (ref.current) {
      ref.current.value = "";
    }
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
          <h1 className="text-4xl font-bold mb-4">Menu à la française</h1>
          <div className="flex flex-wrap gap-2"> For
            {['Restaurant', 'Hotel', 'Bakery', 'Cafe', 'Bar', 'Patisserie'].map(tag => (
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
          <div className="p-6 sm:p-10 lg:p-16">
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
            <div className="w-full max-w-3xl mx-auto">
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
                    <h3 className="text-xl font-bold text-gray-800 mb-6">General</h3>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                        <input type="text" name="restaurantName" id="restaurantName" value={formData.restaurantName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="chefName" className="block text-sm font-medium text-gray-700 mb-1">Chef Name</label>
                        <input type="text" name="chefName" id="chefName" value={formData.chefName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Restaurant Description</label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextToolbar />
                          <textarea name="description" id="description" rows="5" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border-t-0 focus:ring-0 focus:outline-none"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Person in Charge */}
                {currentStep === 2 && (
                  <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Person in Charge</h3>
                    <div className="space-y-8">
                      <div>
                        <label htmlFor="picName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                          <input type="text" name="picName" id="picName" value={formData.picName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                          {formData.picName && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <CheckIcon />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="picEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                        <input type="email" name="picEmail" id="picEmail" value={formData.picEmail} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="picPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" name="picPhone" id="picPhone" value={formData.picPhone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Link */}
                {currentStep === 3 && (
                  <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Reservation Link & Website</h3>
                    <div className="space-y-8">
                      <div>
                        <label htmlFor="reservationLink" className="block text-sm font-medium text-gray-700 mb-1">Reservation Link <span className="text-gray-400">(Optional)</span></label>
                        <div className="relative">
                          <input type="url" name="reservationLink" id="reservationLink" value={formData.reservationLink} onChange={handleChange} onBlur={handleUrlBlur} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                          {formData.reservationLink && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <CheckIcon />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} onBlur={handleUrlBlur} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Location */}
                {currentStep === 4 && (
                  <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Location</h3>
                    <div className="space-y-8">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address of Restaurant</label>
                        <div className="relative">
                          <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                          {formData.address && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <CheckIcon />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region <span className="text-gray-400"></span></label>
                        <select name="region" id="region" value={formData.region} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select region...</option>
                          {indonesiaProvinces.map(province => <option key={province} value={province}>{province}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">Street Name</label>
                        <input type="text" name="streetName" id="streetName" value={formData.streetName} onChange={handleInputChange} maxLength={240} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="locationDetail" className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-gray-400">(Optional)</span></label>
                        <input type="text" name="locationDetail" id="locationDetail" value={formData.locationDetail} onChange={handleInputChange} maxLength={36} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500" />
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
                            <label htmlFor="latitude" className="block text-xs text-gray-500 mb-1">Latitude</label>
                            <input type="number" name="latitude" id="latitude" value={formData.latitude} onChange={handleInputChange} disabled={!manualCoordinates} className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100" />
                          </div>
                          <div>
                            <label htmlFor="longitude" className="block text-xs text-gray-500 mb-1">Longitude</label>
                            <input type="number" name="longitude" id="longitude" value={formData.longitude} onChange={handleInputChange} disabled={!manualCoordinates} className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Restaurant Menu */}
                {currentStep === 5 && (
                  <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Restaurant Menus</h3>
                    <div className="space-y-6">
                      {menuCategoriesData.map((cat) => (
                        <div key={cat.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <label className="block text-sm font-medium text-gray-700">{cat.menu_category_name} <span className="text-gray-400">(Optional)</span></label>
                          <div className="space-y-4 mt-3">
                            {formData.menus[cat.id].map((item, index) => (
                              <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                                <button onClick={() => removeMenuItem(cat.id, item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                                <div>
                                  <label className="text-xs text-gray-600">Menu Name</label>
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleMenuChange(cat.id, index, 'name', e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. French Onion Soup"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600">Price</label>
                                  <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleMenuChange(cat.id, index, 'price', e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. 90.000"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600">Image</label>
                                  <div className="mt-1 flex items-center gap-4">
                                    {item.imageUrl && <img src={item.imageUrl} alt="preview" className="w-16 h-16 rounded-md object-cover" />}
                                    <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
                                      <svg className="w-6 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4 4-4-4h3V3h2v8z" /></svg>
                                      <span className="text-sm">{item.image ? 'Change Image' : 'Upload Image'}</span>
                                      <input type='file' className="hidden" onChange={(e) => handleMenuChange(cat.id, index, 'image', e.target.files[0])} accept="image/*" />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button onClick={() => addMenuItem(cat.id)} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-x-1 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add Item
                          </button>
                        </div>
                      ))}
                      <div className="border-gray-200 pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dates of Availability of Dishes at the Restaurant <span className="text-gray-400">(Optional)</span></label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <label htmlFor="availabilityFrom" className="block text-xs text-gray-500 mb-1">From</label>
                            <input type="date" name="availabilityFrom" id="availabilityFrom" value={formData.availabilityFrom} onChange={handleInputChange} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            <div className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center pointer-events-none"><CalendarIcon /></div>
                          </div>
                          <div className="relative">
                            <label htmlFor="availabilityTo" className="block text-xs text-gray-500 mb-1">To</label>
                            <input type="date" name="availabilityTo" id="availabilityTo" value={formData.availabilityTo} onChange={handleInputChange} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            <div className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center pointer-events-none"><CalendarIcon /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Logo & Images */}
                {currentStep === 6 && (
                  <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Logo & Images</h3>
                    <div className="space-y-8">
                      {/* Logo Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                        <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {formData.logo ? (
                              <div className="flex items-center text-sm text-gray-600">
                                <FileIcon />
                                <div className="flex items-center gap-x-2">
                                  <span>{formData.logo.name}</span>
                                  <br />
                                  {formData.logo && (
                                    <button type="button" onClick={() => handleRemoveImage('logo', logoImageRef)} className="text-sm text-red-600 hover:text-red-700 font-medium">
                                      Remove
                                    </button>
                                  )}
                                </div>

                              </div>
                            ) : (
                              <>
                                <UploadCloudIcon />
                                <div className="flex text-sm text-gray-600">
                                  <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                    <span>Upload a file</span>
                                    <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={(e) => handleImageUpload('logo', e.target.files[0])} accept="image/*" />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Cover Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                        <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {formData.coverImage ? (
                              <div className="flex items-center text-sm text-gray-600">
                                <FileIcon />
                                <div className="flex items-center gap-x-2">
                                  <span>{formData.coverImage.name}</span>
                                  <br />
                                  {formData.coverImage && (
                                    <button type="button" onClick={() => handleRemoveImage('coverImage', coverImageRef)} className="text-sm text-red-600 hover:text-red-700 font-medium">
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <>
                                <UploadCloudIcon />
                                <div className="flex text-sm text-gray-600">
                                  <label htmlFor="cover-image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                    <span>Upload a file</span>
                                    <input id="cover-image-upload" name="cover-image-upload" type="file" className="sr-only" onChange={(e) => handleImageUpload('coverImage', e.target.files[0])} accept="image/*" />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Gallery Image Upload
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Image <span className="text-gray-400">(Optional)</span></label>
                        <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {formData.galleryImage ? (
                              <div className="flex items-center text-sm text-gray-600">
                                <FileIcon />
                                <div className="flex items-center gap-x-2">
                                  <span>{formData.galleryImage.name}</span>
                                  <br />
                                  {formData.galleryImage && (
                                    <button type="button" onClick={() => handleRemoveImage('galleryImage', galleryImageRef)} className="text-sm text-red-600 hover:text-red-700 font-medium">
                                      Remove
                                    </button>
                                  )}
                                </div>

                              </div>
                            ) : (
                              <>
                                <UploadCloudIcon />
                                <div className="flex text-sm text-gray-600">
                                  <label htmlFor="gallery-image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                    <span>Upload a file</span>
                                    <input id="gallery-image-upload" name="gallery-image-upload" type="file" className="sr-only" onChange={(e) => handleImageUpload('galleryImage', e.target.files[0])} accept="image/*" multiple />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div> */}
                    {/* Enhanced: Multiple Gallery Images */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Gallery Images (Optional)</label>

                      {/* Uploader */}
                      <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-blue-200 rounded-md bg-blue-50">
                        <div className="text-center">
                          <div className="flex items-center justify-center text-blue-600">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm font-medium">Upload multiple images</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-600">PNG, JPG, JPEG up to 1MB each</p>

                          <div className="mt-3 flex items-center justify-center gap-2">
                            <label
                              htmlFor="gallery-images-upload"
                              className="cursor-pointer inline-flex items-center px-4 py-2 text-sm rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                            >
                              Choose files
                            </label>
                            <input
                              id="gallery-images-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                if (!files.length) return;

                                // Optional: basic size filter (5MB)
                                const filtered = files.filter((f) => f.size <= 5 * 1024 * 1024);

                                const items = filtered.map((file) => ({
                                  id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
                                  file,
                                  name: file.name,
                                  size: file.size,
                                  url: URL.createObjectURL(file),
                                }));

                                setFormData((prev) => ({
                                  ...prev,
                                  // store as array to be appended on submit: gallery_images[]
                                  galleryImages: [...(prev.galleryImages || []), ...items],
                                }));

                                // reset input so same file(s) can be selected again
                                e.target.value = '';
                              }}
                            />

                            {(formData.galleryImages?.length || 0) > 0 && (
                              <button
                                type="button"
                                className="text-sm text-red-600 hover:text-red-700"
                                onClick={() => {
                                  // revoke all object URLs then clear
                                  (formData.galleryImages || []).forEach((it) => {
                                    try { if (it.url) URL.revokeObjectURL(it.url); } catch {}
                                  });
                                  setFormData((prev) => ({ ...prev, galleryImages: [] }));
                                }}
                              >
                                Clear all
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Preview grid */}
                      {(formData.galleryImages?.length || 0) > 0 && (
                        <div className="mt-4">
                          <p className="text-xs text-gray-600 mb-2">
                            Selected: {formData.galleryImages.length} image{formData.galleryImages.length > 1 ? 's' : ''}
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {formData.galleryImages.map((item, idx) => (
                              <div key={item.id} className="relative border rounded-md overflow-hidden bg-white">
                                <img
                                  src={item.url}
                                  alt={item.name}
                                  className="w-full h-28 object-cover"
                                />
                                <div className="p-2">
                                  <p className="text-xs font-medium truncate" title={item.name}>{item.name}</p>
                                </div>
                                <button
                                  type="button"
                                  className="absolute top-1 right-1 bg-white/90 hover:bg-white text-red-600 rounded-full p-1 shadow"
                                  onClick={() => {
                                    try { if (item.url) URL.revokeObjectURL(item.url); } catch {}
                                    setFormData((prev) => {
                                      const next = [...(prev.galleryImages || [])];
                                      next.splice(idx, 1);
                                      return { ...prev, galleryImages: next };
                                    });
                                  }}
                                  aria-label="Remove image"
                                  title="Remove image"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Note:
                      - This block saves multiple images in formData.galleryImages as an array of:
                        { id, file, name, size, url }
                      - In handleSubmit, append them as an array:
                          (formData.galleryImages || []).forEach(item => {
                            submissionData.append('galleryImage[]', item.file);
                          });
                      - Keep the old single galleryImage field unused for multi-upload.
                    */}
                    </div>
                  </div>
                )}

                {/* Step 7: Terms */}
                {currentStep === 7 && (
                  <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Terms</h3>
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-800">Attend press conference and opening on Tuesday, October 1, 2025 at IFI Thamrin?</p>
                          {formData.terms_conference && <CheckIcon />}
                        </div>
                        <div className="mt-3 flex items-center gap-x-6">
                          <CustomRadio fieldName="terms_conference" value="yes" label="Yes" checked={formData.terms_conference === 'yes'} onChange={handleInputChange} />
                          <CustomRadio fieldName="terms_conference" value="no" label="No" checked={formData.terms_conference === 'no'} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Interested in showcasing your menu during the opening?</p>
                            <p className="text-xs text-gray-500 mt-1">Due to limited space, our team will follow up with you.</p>
                          </div>
                          {formData.terms_showcase && <CheckIcon />}
                        </div>
                        <div className="mt-3 flex items-center gap-x-6">
                          <CustomRadio fieldName="terms_showcase" value="yes" label="Yes" checked={formData.terms_showcase === 'yes'} onChange={handleInputChange} />
                          <CustomRadio fieldName="terms_showcase" value="no" label="No" checked={formData.terms_showcase === 'no'} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-800">Agree to the use of your photo, logo and dishes to be included in all publications? <span className="font-normal text-gray-400">(Optional)</span></p>
                          {formData.terms_publications && <CheckIcon />}
                        </div>
                        <div className="mt-3 flex items-center gap-x-6">
                          <CustomRadio fieldName="terms_publications" value="yes" label="Yes" checked={formData.terms_publications === 'yes'} onChange={handleInputChange} />
                          <CustomRadio fieldName="terms_publications" value="no" label="No" checked={formData.terms_publications === 'no'} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 8: Preview */}
                {currentStep === 8 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-8" style={{ color: '#3558A2' }}>Preview</h3>

                    <PreviewSection title="General" icon={<GeneralIcon />} onEdit={() => goToStep(1)}>
                      <PreviewField label="Restaurant Name" value={formData.restaurantName} />
                      <PreviewField label="Chef Name" value={formData.chefName} />
                      <PreviewField label="Restaurant Description" value={formData.description} />
                    </PreviewSection>

                    <PreviewSection title="Person in Charge" icon={<PersonIcon />} onEdit={() => goToStep(2)}>
                      <PreviewField label="Full Name" value={formData.picName} />
                      <PreviewField label="Contact Email" value={formData.picEmail} />
                      <PreviewField label="Phone Number" value={formData.picPhone} />
                    </PreviewSection>

                    <PreviewSection title="Link" icon={<LinkIcon />} onEdit={() => goToStep(3)}>
                      <PreviewField label="Reservation Link" value={formData.reservationLink} />
                      <PreviewField label="Website" value={formData.website} />
                    </PreviewSection>

                    <PreviewSection title="Location" icon={<LocationIcon />} onEdit={() => goToStep(4)}>
                      <PreviewField label="Address of Restaurant" value={formData.address} />
                      <PreviewField label="Region" value={formData.region} />
                      <PreviewField label="Street Name" value={formData.streetName} />
                      <PreviewField label="Location (Optional)" value={formData.locationDetail} />
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/60 mt-4">
                        <PreviewField label="Latitude" value={formData.latitude} />
                        <PreviewField label="Longitude" value={formData.longitude} />
                      </div>
                    </PreviewSection>

                    <PreviewSection title="Restaurant Menu" icon={<MenuIcon />} onEdit={() => goToStep(5)}>
                      {menuCategoriesData.map(cat => {
                        const items = formData.menus[cat.id];
                        if (items.length === 0) return null;
                        return (
                          <div key={cat.id}>
                            <h4 className="text-sm font-bold text-gray-600 mb-2">{cat.menu_category_name}</h4>
                            <div className="space-y-3">
                              {items.map(item => (
                                <div key={item.id} className="flex items-start gap-x-4 p-2 border-b last:border-b-0">
                                  {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />}
                                  <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{item.name || '(No name)'}</p>
                                    <p className="text-sm text-gray-500">Rp {item.price || '0.00'}</p>  {/*CREATE AN HELPER FUNCTION TO FORMAT CURRENCY*/}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/60 mt-4">
                        <PreviewField label="Availability From" value={formData.availabilityFrom || '-'} />
                        <PreviewField label="Availability To" value={formData.availabilityTo || '-'} />
                      </div>
                    </PreviewSection>

                    <PreviewSection title="Logo & Images" icon={<ImageIcon />} onEdit={() => goToStep(6)}>
                      {formData.logo && <PreviewField label="Logo" value={formData.logo.name} />}
                      {formData.coverImage && <PreviewField label="Cover Image" value={formData.coverImage.name} />}
                      {formData.galleryImage && <PreviewField label="Gallery Image" value={formData.galleryImage.name} />}
                      {formData.logo && <img src={formData.logo.url} alt="Logo Preview" className="max-w-xs rounded-lg" />}
                    </PreviewSection>

                    <PreviewSection title="Terms" icon={<TermsIcon />} onEdit={() => goToStep(7)}>
                      <PreviewTerm question="Attend press conference and opening on Tuesday, October 1, 2025 at IFI Thamrin?" answer={formData.terms_conference} />
                      <PreviewTerm question="Interested in showcasing your menu during the opening?" answer={formData.terms_showcase} />
                      <PreviewTerm question="Agree to the use of your photo, logo and dishes to be included in all publications? (Optional)" answer={formData.terms_publications} />
                    </PreviewSection>

                  </div>
                )}
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
              disabled={isSubmitting} // Disable saat submitting
              className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting
                ? 'Submitting...'
                : (currentStep === formSteps.length ? 'Submit Registration' : 'Next')
              }
            </button>
          </div>
          {submissionError && (
            // <p className="text-red-600 text-sm mt-3">{submissionError}</p>
            <div className=""></div>
          )}
        </div>
      </div>
    </div>
  );
}
