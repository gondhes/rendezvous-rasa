import apiClient from "./ApiClient";

export const getRestaurants = (id) => {
    const url = id ? `/restaurants/${id}` : '/restaurants';
    return apiClient.get(url);
}

export const getEvents = (id) => {
    const url = id ? `/events/${id}` : '/events';
    return apiClient.get(url);
}