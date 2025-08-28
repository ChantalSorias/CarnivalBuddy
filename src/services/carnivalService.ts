import axios from '../config/axiosInstance';
import { Carnival } from '../Models/Carnival';

const API_BASE = '/carnivals';

export async function getCarnivals(): Promise<Carnival[]> {
    try {
        const token = localStorage.getItem('token');

        const res = await axios.get(API_BASE, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
        
    } catch (error) {
        console.error('Failed to fetch carnivals:', error);
        throw error;
    }
};

export async function createCarnival(carnival: Carnival) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(API_BASE, carnival, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
        
    } catch (error) {
        console.error('Failed to create carnival:', error);
        throw error;
    }
}

export async function editCarnival(carnival: Carnival) {
    try {
        const token = localStorage.getItem('token');
        await axios.put(`${API_BASE}/${carnival.id}`, carnival, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
    });
        
    } catch (error) {
        console.error('Failed to edit carnival:', error);
        throw error;
    }
}

export async function deleteCarnival(id: string) {
    try {
        const token = localStorage.getItem('token');

        return axios.delete(`${API_BASE}/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    } catch (error) {
        console.error('Failed to delete carnival:', error);
        throw error;
    }
};