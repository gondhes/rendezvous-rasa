import apiClient from "./ApiClient";

/**
 * Mendaftarkan restoran baru.
 * Karena kita akan mengirim file (gambar logo, menu, dll.),
 * kita harus menggunakan FormData.
 *
 * @param {FormData} formData - Data formulir yang berisi semua detail restoran.
 * @returns {Promise}
 */

export const registerRestaurant = (formData) => {
    return apiClient.post('/restaurants', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };