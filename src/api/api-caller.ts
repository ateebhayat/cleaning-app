import { apiRequest } from './axios';

// Public APIs (No Auth Required)

// Login
export const login = async (data: { email: string; password: string }) => {
  return await apiRequest<any>('/user/login', 'POST', data, false);
};

// Signup
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await apiRequest<any>('/user/register', 'POST', data, false);
};

// Private APIs (Auth Required)

// Get Items
export const getServices = async () => {
  return await apiRequest<any[]>('/service', 'GET');
};
export const getServiceDetails = async (id: string) => {
  return await apiRequest<any[]>(`/service/${id}`, 'GET');
};
// Add Item
export const createService = async (data: any) => {
  return await apiRequest<any>('/service', 'POST', data);
};

// Delete Item
export const deleteService = async (id: string) => {
  return await apiRequest<{ message: string }>(
    `/service/delete/${id}`,
    'DELETE'
  );
};
export const updateService = async (data: any, id: string) => {
  return await apiRequest<any>(`/service/update/${id}`, 'PUT', data);
};
