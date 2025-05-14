import axios from '../config/axiosInstance';
import { User } from '../Models/User';

const API_BASE = '/users';

export async function getUser(username: string): Promise<User> {
    try {
        const res = await axios.get(`${API_BASE}/username/${username}`);
        return res.data;
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

export async function createUser(user: User) {
    try {
        const res = await axios.post(API_BASE, user);
        return res.data;
        
    } catch (error) {
        console.error('Failed to create profile:', error);
        throw error;
    }
}

export async function editUser(user: User) {
    const token = localStorage.getItem('token');
    try {
        await axios.put(`${API_BASE}/${user.id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
    });
        
    } catch (error) {
        console.error('Failed to edit profile:', error);
        throw error;
    }
}

export async function getUserByGoogleId(googleId: string): Promise<{token: string, user: User}> {
    try {
        const res = await axios.get(`${API_BASE}/google-login/${googleId}`);
        return res.data;
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

export async function getUserById(id: string): Promise<User> {
    try {
        const res = await axios.get(`${API_BASE}/${id}`);
        return res.data;
        
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};