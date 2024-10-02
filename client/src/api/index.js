import axios from 'axios';

// Düzeltilmiş API endpoint'i
const apiEndpoint = 'http://localhost:5000/linktree/';
export const fetchLinktree = async () => await axios.get(apiEndpoint);

export const fetchSingleLinktree = async (id) => await axios.get(`${apiEndpoint}${id}`);

export const createLinktree = async (linktree) => await axios.post(apiEndpoint, linktree);

export const updateLinktree = async (id, updatedLinktree) => await axios.patch(`${apiEndpoint}${id}`, updatedLinktree);

export const deleteLinktree = async (id) => await axios.delete(`${apiEndpoint}${id}`);

// Giriş ve çıkış işlemleri için ayrı endpoint'ler
export const login = async (credentials) => await axios.post(`${apiEndpoint}login`, credentials);

export const logout = async () => await axios.post(`${apiEndpoint}logout`); // doğru endpoint ile logout işlemi yapılmalı
