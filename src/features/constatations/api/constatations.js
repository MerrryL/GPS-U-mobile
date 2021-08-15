import { axios } from "@/lib/axios";

export async function getConstatations() {
  //Todo : device name
  //const device_name = "Merry's Phone";
  return axios.get("constatations");
}

export async function createConstatation(location) {
  const newConstat = await axios.post("constatations", { location });
  return newConstat;
}

export async function editConstatation() {
  return axios.patch("constatations");
}

export async function deleteConstatation() {
  return axios.get("constatations");
}

export async function importOptions() {
  return axios.get("options");
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

  return axios.post("images", { image: data });
}
