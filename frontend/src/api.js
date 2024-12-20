import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Ensure it matches your backend

export const get_features = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/features`);
        return response.data;
    } catch (error) {
        console.error('Error fetching features:', error);
        throw error;
    }
};

export const get_models = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/models`);
        return response.data;
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
};

export const predictRain = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/predict_rain`, data 
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
};

