import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem('profile')).token
        }`;
    }
    return req;
});

export const fetchProjects = () => API.get('/projects');
export const fetchProjectsBySearch = (searchQuery) =>
    API.get(`/projects/search?searchQuery=${searchQuery.search}`);
export const createProject = (newProject) => API.post('/projects', newProject);
export const updateProject = (id, updatedProject) =>
    API.patch(`/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const applyProject = (id) => API.patch(`/projects/${id}/apply`);
export const selectCandidate = (candidateEmail, projectId) =>
    API.patch(
        `/projects/selectCandidate?candidateEmail=${candidateEmail}&projectId=${projectId}`
    );
export const removeCandidate = (candidateEmail, projectId) =>
    API.patch(
        `/projects/removeMember?candidateEmail=${candidateEmail}&projectId=${projectId}`
    );

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
