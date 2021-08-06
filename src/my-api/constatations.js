import apiClient from "../services/api";

export async function getConstatations() {
  //Todo : device name
  //const device_name = "Merry's Phone";
  return apiClient.get("constatations");
}

export async function createConstatation(location) {
  console.log("locationcreate", location);

  const newConstat = await apiClient.post("constatations", { location });
  console.log("nc", newConstat);
  return newConstat;
}

export async function editConstatation() {
  return apiClient.patch("constatations");
}

export async function deleteConstatation() {
  return apiClient.get("constatations");
}
