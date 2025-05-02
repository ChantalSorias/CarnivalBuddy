import axios from '../config/axiosInstance';
import { User } from '../Models/User';

export async function getUser(username: string): Promise<User> {
    try {
        const res = await axios.get(`/users/username/${username}`);
        return res.data;
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

export async function createUser(user: User) {
    try {
        const res = await axios.post('/users', user);
        return res.data;
        
    } catch (error) {
        console.error('Failed to create profile:', error);
        throw error;
    }
}

export async function editUser(user: User) {
    const token = localStorage.getItem('token');
    try {
        await axios.put(`/users/${user.id}`, user, {
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
        const res = await axios.get(`/users/google-login/${googleId}`);
        return res.data;
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

export async function getUserById(id: string): Promise<User> {
    try {
        const res = await axios.get(`/users/${id}`);
        return res.data;
        
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};