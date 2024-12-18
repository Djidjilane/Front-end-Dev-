import axios from "axios";
import { baseURL, token } from "./config";  

// Créez une instance Axios
const apiClient = axios.create({
    baseURL: baseURL, 
    headers: {
        Authorization: `Bearer ${token}`,  
    },
});

// Fonction pour récupérer tous les pays
export const getCountries = async () => {
    try {
        const response = await apiClient.get("/countries");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des pays:", error);
        throw error;
    }
};

// Fonction pour créer un nouveau pays
export const createCountry = async (countryData) => {
    try {
        const response = await apiClient.post("/countries", countryData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du pays:", error);
        throw error;
    }
};

// Fonction pour récupérer un pays spécifique
export const getCountryById = async (id) => {
    try {
        const response = await apiClient.get(`/countries/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du pays:", error);
        throw error;
    }
};

// Fonction pour mettre à jour un pays
export const updateCountry = async (id, countryData) => {
    try {
        const response = await apiClient.put(`/countries/${id}`, countryData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du pays:", error);
        throw error;
    }
};

// Fonction pour supprimer un pays
export const deleteCountry = async (id) => {
    try {
        const response = await apiClient.delete(`/countries/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression du pays:", error);
        throw error;
    }
};
