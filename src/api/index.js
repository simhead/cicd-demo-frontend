import axios from 'axios'

const api = axios.create({
    baseURL: 'http://cicd.backend.apim.13.211.13.10.nip.io/api/cicd',
})

// user APIs
export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = () => api.get(`/users`)
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

const apis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default apis
