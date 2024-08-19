import { requestWithCredential } from "@/services/api.js";

export const getAllResource = () => requestWithCredential("resources");

export const getResourceById = (id) => requestWithCredential(`resources/${id}`);

export const editResource = (id, resource) => {
  console.log(resource);
  return requestWithCredential(`resources/${id}`, {
    method: "PUT",
    body: resource,
  });
};
