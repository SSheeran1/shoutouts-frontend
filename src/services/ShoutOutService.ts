import axios from "axios";
import ShoutOut from "../Models/ShoutOut";
import TopFiveItem from "../Models/TopFiveItem";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllShoutOuts = (): Promise<ShoutOut[]> => {
  return axios.get(baseURL).then((response) => {
    return response.data;
  });
};
export const getNameShoutOuts = (name: string): Promise<ShoutOut[]> => {
  return axios
    .get(`${baseURL}/user/${encodeURIComponent(name)}`)
    .then((response) => {
      return response.data;
    });
};

export const addShoutOut = (shoutOut: ShoutOut): Promise<ShoutOut> => {
  return axios.post(baseURL, shoutOut).then((response) => response.data);
};

export const deleteShoutOut = (id: string): Promise<void> => {
  return axios
    .delete(`${baseURL}/${encodeURIComponent(id)}`)
    .then((response) => response.data);
};

export const getTopFive = (): Promise<TopFiveItem[]> => {
  return axios.get(`${baseURL}/top-five`).then((response) => response.data);
};
