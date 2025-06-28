    import axios from 'axios';

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    });

    export const getDoctors = async () => {
        try {
            const response = await api.get('/doctors');
            return response.data;
        } catch (error) {
            console.error('Error fetching doctors:', error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    export const getClinics = async () => {
        try {
            const response = await api.get('/clinics');
            return response.data;
        } catch (error) {
            console.error('Error fetching clinics:', error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    export const getAppointments = async () => {
        try {
            const response = await api.get('/appointments');
            return response.data;
        } catch (error) {
            console.error('Error fetching appointments:', error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    export const getMedicalRecords = async () => {
        try {
            const response = await api.get('/medical-records');
            return response.data;
        } catch (error) {
            console.error('Error fetching medical records:', error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    export const getPatients = async () => {
        try {
            const response = await api.get('/patients');
            return response.data;
        } catch (error) {
            console.error('Error fetching patients:', error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    export const getDoctorRatings = async (doctorId) => {
        try {
            const response = await api.get(`/doctors/${doctorId}/ratings`);
            return response.data;
        } catch (error) {
            console.error('Error fetching doctor ratings:', error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    export const getUserInfo = async () => {
        try {
            const response = await api.get('/user');
            return response.data;
        } catch (error) {
            console.error('Error fetching user info:', error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    export default api;