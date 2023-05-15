import axios from "axios";

export const getScreams = () => {
  return axios
    .get("/screams")
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const likeScream = (screamId) => {
  return axios
    .get(`/scream/${screamId}/like`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const unlikeScream = (screamId) => {
  return axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const deleteScream = (screamId) => {
  return axios
    .delete(`/scream/${screamId}`)
    .then((res) => ({ data: res.data, screamId: screamId }))
    .catch((err) => err.response.data);
};

export const newScream = (body) => {
  return axios
    .post("/scream", body)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getOneScream = (screamId) => {
  return axios
    .get(`/scream/${screamId}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const newComment = (commentInfo) => {
  const { screamId, body } = commentInfo;
  return axios
    .post(`/scream/${screamId}/comment`, body)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
