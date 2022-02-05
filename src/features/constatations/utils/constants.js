export async function importThumbImage(imageId, imageName, extension) {
  const path = "images/" + imageId + "/conversions/" + imageName + "-thumb" + extension;

  return process.env.REACT_APP_API_URL + path;
}
