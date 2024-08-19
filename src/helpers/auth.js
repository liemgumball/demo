export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const setAuthentication = (authToken) => {
  localStorage.setItem("authToken", authToken);
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const removeAuth = () => {
  return localStorage.removeItem("authToken");
};
