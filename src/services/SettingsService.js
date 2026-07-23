import apiClient from "./ApiClient";

export const getMenuCatogories = () => {
    return apiClient.get('/menus')
}

export const getActivities = () => {
    return apiClient.get('/activity')
}