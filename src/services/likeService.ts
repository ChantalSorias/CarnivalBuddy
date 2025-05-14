import axios from '../config/axiosInstance';

const API_BASE = '/like';
// const token = localStorage.getItem('token');

export const likeEntity = async (entityType, entityId) => {
  const token = localStorage.getItem('token');
  return axios.post(API_BASE, {
    entityType,
    entityId,
  },
  {
    headers: {
        Authorization: `Bearer ${token}`,
    }
  });
};

export const unlikeEntity = async (entityType, entityId) => {
  const token = localStorage.getItem('token');
  return axios.delete(API_BASE, {
    data: { entityType, entityId },
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const isLiked = async (entityType, entityId) => {
  const response = await axios.get(`${API_BASE}/${entityType}/${entityId}/is-liked`);
  return response.data.liked;
};

export const getLikesCount = async (entityType, entityId) => {
  const response = await axios.get(`${API_BASE}/${entityType}/${entityId}/count`);
  return response.data.count;
};