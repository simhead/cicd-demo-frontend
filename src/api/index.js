import axios from 'axios'

const api = axios.create({
    baseURL: 'http://ec2-15-165-48-131.ap-northeast-2.compute.amazonaws.com:9000/soynet/api',
})

// user APIs
export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = () => api.get(`/users`)
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

// device APIs
export const insertDevice = payload => api.post(`/device`, payload)
export const getAllDevices = () => api.get(`/devices`)
export const updateDeviceById = (id, payload) => api.put(`/device/${id}`, payload)
export const deleteDeviceById = id => api.delete(`/device/${id}`)
export const getDeviceById = id => api.get(`/device/${id}`)

const apis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
    insertDevice,
    getAllDevices,
    updateDeviceById,
    deleteDeviceById,
    getDeviceById,
}

export default apis
