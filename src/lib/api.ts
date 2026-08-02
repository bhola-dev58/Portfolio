import { useQuery } from '@tanstack/react-query';
import {
    INITIAL_PROJECTS,
    INITIAL_EXPERIENCES,
    INITIAL_SKILLS,
    INITIAL_CERTIFICATIONS,
    INITIAL_EDUCATION,
    INITIAL_PROFILE,
    Project,
    Experience,
    SkillCategory,
    Certification,
    Education,
    ProfileData,
} from './initialData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Token management
const getToken = (): string | null => localStorage.getItem('admin_token');
const setToken = (token: string) => localStorage.setItem('admin_token', token);
const removeToken = () => localStorage.removeItem('admin_token');

// Auth headers
const authHeaders = (): HeadersInit => {
    const token = getToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// Generic fetch wrapper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<{ data: T | null; error: string | null }> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            headers: authHeaders(),
            ...options,
        });
        const json = await res.json();
        if (!res.ok) {
            return { data: null, error: json.error || 'Something went wrong' };
        }
        return { data: json.data ?? json, error: null };
    } catch (err: any) {
        return { data: null, error: err.message || 'Network error' };
    }
}

// ============ AUTH ============
export const auth = {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const json = await res.json();
        if (!res.ok) {
            return { data: null, error: { message: json.error } };
        }
        // Store token
        setToken(json.session.token);
        return { data: { session: json.session }, error: null };
    },

    signOut: async () => {
        removeToken();
        return { error: null };
    },

    getSession: async () => {
        const token = getToken();
        if (!token) return { data: { session: null } };
        try {
            const res = await fetch(`${API_BASE}/auth/session`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const json = await res.json();
            return { data: { session: json.session } };
        } catch {
            return { data: { session: null } };
        }
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
        // Check current auth state
        const token = getToken();
        callback(token ? 'SIGNED_IN' : 'SIGNED_OUT', token ? { token } : null);
        
        // Listen for storage changes (cross-tab sync)
        const handler = (e: StorageEvent) => {
            if (e.key === 'admin_token') {
                callback(e.newValue ? 'SIGNED_IN' : 'SIGNED_OUT', e.newValue ? { token: e.newValue } : null);
            }
        };
        window.addEventListener('storage', handler);
        return {
            data: {
                subscription: {
                    unsubscribe: () => window.removeEventListener('storage', handler),
                },
            },
        };
    },
};

// ============ PROFILE ============
export const profile = {
    get: () => apiFetch('/profile'),
    update: (id: string, data: any) => apiFetch(`/profile/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};

// ============ PROJECTS ============
export const projects = {
    getAll: () => apiFetch('/projects'),
    create: (data: any) => apiFetch('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/projects/${id}`, { method: 'DELETE' }),
};

// ============ EXPERIENCES ============
export const experiences = {
    getAll: () => apiFetch('/experiences'),
    create: (data: any) => apiFetch('/experiences', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/experiences/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/experiences/${id}`, { method: 'DELETE' }),
};

// ============ SKILLS ============
export const skills = {
    getAll: () => apiFetch('/skills'),
    create: (data: any) => apiFetch('/skills', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/skills/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/skills/${id}`, { method: 'DELETE' }),
};

// ============ CERTIFICATIONS ============
export const certifications = {
    getAll: () => apiFetch('/certifications'),
    create: (data: any) => apiFetch('/certifications', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/certifications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/certifications/${id}`, { method: 'DELETE' }),
};

// ============ EDUCATION ============
export const education = {
    getAll: () => apiFetch('/education'),
    create: (data: any) => apiFetch('/education', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/education/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/education/${id}`, { method: 'DELETE' }),
};

// ============ MESSAGES ============
export const messages = {
    getAll: () => apiFetch('/messages'),
    create: (data: any) => apiFetch('/messages', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/messages/${id}`, { method: 'DELETE' }),
};

// ============ REACT QUERY HOOKS WITH INSTANT STATIC FALLBACKS ============
export function useProjects() {
    return useQuery<Project[]>({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data, error } = await projects.getAll();
            if (error || !data || !Array.isArray(data) || data.length === 0) {
                return INITIAL_PROJECTS;
            }
            return data as Project[];
        },
        initialData: INITIAL_PROJECTS,
        staleTime: 1000 * 60 * 10,
    });
}

export function useExperiences() {
    return useQuery<Experience[]>({
        queryKey: ['experiences'],
        queryFn: async () => {
            const { data, error } = await experiences.getAll();
            if (error || !data || !Array.isArray(data) || data.length === 0) {
                return INITIAL_EXPERIENCES;
            }
            return data as Experience[];
        },
        initialData: INITIAL_EXPERIENCES,
        staleTime: 1000 * 60 * 10,
    });
}

export function useSkills() {
    return useQuery<SkillCategory[]>({
        queryKey: ['skills'],
        queryFn: async () => {
            const { data, error } = await skills.getAll();
            if (error || !data || !Array.isArray(data) || data.length === 0) {
                return INITIAL_SKILLS;
            }
            return data as SkillCategory[];
        },
        initialData: INITIAL_SKILLS,
        staleTime: 1000 * 60 * 10,
    });
}

export function useCertifications() {
    return useQuery<Certification[]>({
        queryKey: ['certifications'],
        queryFn: async () => {
            const { data, error } = await certifications.getAll();
            if (error || !data || !Array.isArray(data) || data.length === 0) {
                return INITIAL_CERTIFICATIONS;
            }
            return data as Certification[];
        },
        initialData: INITIAL_CERTIFICATIONS,
        staleTime: 1000 * 60 * 10,
    });
}

export function useProfile() {
    return useQuery<ProfileData>({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data, error } = await profile.get();
            if (error || !data) {
                return INITIAL_PROFILE;
            }
            return data as ProfileData;
        },
        initialData: INITIAL_PROFILE,
        staleTime: 1000 * 60 * 10,
    });
}

export function useEducation() {
    return useQuery<Education[]>({
        queryKey: ['education'],
        queryFn: async () => {
            const { data, error } = await education.getAll();
            if (error || !data || !Array.isArray(data) || data.length === 0) {
                return INITIAL_EDUCATION;
            }
            return data as Education[];
        },
        initialData: INITIAL_EDUCATION,
        staleTime: 1000 * 60 * 10,
    });
}


