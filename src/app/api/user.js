import axios from "axios";

export const logIn = (userData) => {
  return axios.post("/login", userData);
};

export const signUp = (newUserData) => {
  return axios.post("/signup", newUserData);
};

export const getCurrentUserData = () => {
  return axios
    .get("/user")
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getAnyUserData = (handle) => {
  return axios
    .get(`/user/${handle}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const uploadImage = (formData) => {
  return axios.post("/user/image", formData);
};

export const editUserDetails = (userDetails) => {
  return axios.post("/user", userDetails);
};

export const readNotifications = (notificationIds) => {
  return axios
    .post("/notifications", notificationIds)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
