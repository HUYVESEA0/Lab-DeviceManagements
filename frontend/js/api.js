// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Helper Functions
const api = {
    async get(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async put(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async delete(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!response.ok && response.status !== 204) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        return response.status === 204 ? null : response.json();
    },

    // Authentication endpoints
    auth: {
        login(username, password) {
            return api.post('/auth/login', { username, password });
        },
        logout() {
            return api.post('/auth/logout', {});
        },
        verify() {
            return api.get('/auth/verify');
        },
        me() {
            return api.get('/auth/me');
        }
    },

    // Devices endpoints
    devices: {
        list(filters = {}) {
            const params = new URLSearchParams();
            if (filters.page) params.append('page', filters.page);
            if (filters.per_page) params.append('per_page', filters.per_page);
            if (filters.status) params.append('status', filters.status);
            if (filters.category_id) params.append('category_id', filters.category_id);
            if (filters.room_id) params.append('room_id', filters.room_id);
            if (filters.search) params.append('search', filters.search);
            return api.get(`/devices?${params}`);
        },
        get(id) {
            return api.get(`/devices/${id}`);
        },
        create(data) {
            return api.post('/devices', data);
        },
        update(id, data) {
            return api.put(`/devices/${id}`, data);
        },
        delete(id) {
            return api.delete(`/devices/${id}`);
        }
    },

    // Categories endpoints
    categories: {
        list(filters = {}) {
            const params = new URLSearchParams();
            if (filters.page) params.append('page', filters.page);
            if (filters.per_page) params.append('per_page', filters.per_page);
            return api.get(`/categories?${params}`);
        },
        get(id) {
            return api.get(`/categories/${id}`);
        },
        create(data) {
            return api.post('/categories', data);
        },
        update(id, data) {
            return api.put(`/categories/${id}`, data);
        },
        delete(id) {
            return api.delete(`/categories/${id}`);
        }
    },

    // Rooms endpoints
    rooms: {
        list(filters = {}) {
            const params = new URLSearchParams();
            if (filters.page) params.append('page', filters.page);
            if (filters.per_page) params.append('per_page', filters.per_page);
            if (filters.status) params.append('status', filters.status);
            return api.get(`/rooms?${params}`);
        },
        get(id) {
            return api.get(`/rooms/${id}`);
        },
        getByNumber(roomNumber) {
            return api.get(`/rooms/number/${roomNumber}`);
        },
        create(data) {
            return api.post('/rooms', data);
        },
        update(id, data) {
            return api.put(`/rooms/${id}`, data);
        },
        delete(id) {
            return api.delete(`/rooms/${id}`);
        }
    }
};
