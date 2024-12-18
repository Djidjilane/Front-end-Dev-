import axios from "axios";
import { baseURL, token } from "./config";  

// Créez une instance Axios
const apiClient = axios.create({
    baseURL: baseURL,  
    headers: {
        Authorization: `Bearer ${token}`, 
    },
});

// Fonction pour récupérer toutes les villes
export const getCities = async () => {
    try {
        const response = await apiClient.get("/cities");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des villes:", error);
        throw error;
    }
};

// Fonction pour créer une nouvelle ville
export const createCity = async (cityData) => {
    try {
        const response = await apiClient.post("/cities", cityData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la ville:", error);
        throw error;
    }
};

// Fonction pour récupérer une ville spécifique
export const getCityById = async (id) => {
    try {
        const response = await apiClient.get(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la ville:", error);
        throw error;
    }
};

// Fonction pour mettre à jour une ville
export const updateCity = async (id, cityData) => {
    try {
        const response = await apiClient.put(`/cities/${id}`, cityData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la ville:", error);
        throw error;
    }
};

// Fonction pour supprimer une ville
export const deleteCity = async (id) => {
    try {
        const response = await apiClient.delete(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la ville:", error);
        throw error;
    }
};
