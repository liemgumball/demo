import { getAuthToken } from "@/helpers/auth.js";

export const request = async (path, init = {}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(init.body),
  });
  if (!response.ok) {
    const error = new Error("Request failed");
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }

  if (response.status === 204) {
    return null; // No content
  }

  const data = await response.json();
  return data;
};
export const requestWithCredential = async (path, init = {}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
    ...init,
    body: JSON.stringify(init.body),
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = new Error("Request failed");
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }

  if (response.status === 204) {
    return null; // No content
  }

  const data = await response.json();
  return data;
};
