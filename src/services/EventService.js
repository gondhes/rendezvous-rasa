import apiClient from "./ApiClient";

export const registerEvents = (formData) => {
    return apiClient.post('/events', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};