import apiClient from "../services/api";

export async function getConstatations() {
  //Todo : device name
  //const device_name = "Merry's Phone";
  return apiClient.get("constatations");
}

export async function createConstatation(location) {
  const newConstat = await apiClient.post("constatations", { location });
  return newConstat;
}

export async function editConstatation() {
  return apiClient.patch("constatations");
}

export async function deleteConstatation() {
  return apiClient.get("constatations");
}

export async function importOptions() {
  return apiClient.get("options");
}

export async function uploadImage(result) {
  console.log("before upload", result);

  let data = {
    name: "image",
    height: result.height,
    width: result.width,
    type: "image/jpeg",
    uri: result.uri,
    base64: result.base64
  };

  return apiClient.post("images", { image: data });
}
