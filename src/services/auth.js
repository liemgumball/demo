import { request, requestWithCredential } from "@/services/api.js";

export const login = (username, password) =>
  request("login", {
    method: "POST",
    body: {
      username,
      password,
    },
  });

export const register = (username, password, role) =>
  request("register", {
    method: "POST",
    body: {
      username,
      password,
      role,
    },
  });

export const requestEditor = () =>
  requestWithCredential(`request-editor`, {
    method: "POST",
  });
