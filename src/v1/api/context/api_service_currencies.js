import axios from "axios";
import { baseURL, token } from "./config"; 

// Créez une instance Axios
const apiClient = axios.create({
    baseURL: baseURL,  
    headers: {
        Authorization: `Bearer ${token}`,  
    },
});

// Fonction pour récupérer toutes les devises
export const getCurrencies = async () => {
    try {
        const response = await apiClient.get("/currencies");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des devises:", error);
        throw error;
    }
};

// Fonction pour créer une nouvelle devise
export const createCurrency = async (currencyData) => {
    try {
        const response = await apiClient.post("/currencies", currencyData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la devise:", error);
        throw error;
    }
};

// Fonction pour récupérer une devise spécifique
export const getCurrencyById = async (id) => {
    try {
        const response = await apiClient.get(`/currencies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la devise:", error);
        throw error;
    }
};

// Fonction pour mettre à jour une devise
export const updateCurrency = async (id, currencyData) => {
    try {
        const response = await apiClient.put(`/currencies/${id}`, currencyData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la devise:", error);
        throw error;
    }
};

// Fonction pour supprimer une devise
export const deleteCurrency = async (id) => {
    try {
        const response = await apiClient.delete(`/currencies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la devise:", error);
        throw error;
    }
};
