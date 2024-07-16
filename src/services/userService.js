import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-in`, data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return res.data
}

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}

export const refreshToken = async () => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
            // Khi có Cookie tự động truyền xuống
            withCredentials: true
        })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}

export const updateUser = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data)
    return res.data
}