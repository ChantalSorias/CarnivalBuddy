import axios from '../config/axiosInstance';
import { Carnival } from '../Models/Carnival';

const API_BASE = '/carnivals';

export async function getCarnivals(): Promise<Carnival[]> {
    try {
        const token = localStorage.getItem('token');

        const res = await axios.get(API_BASE,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res.data;
        
    } catch (error) {
        console.error('Failed to fetch carnivals:', error);
        throw error;
    }
};