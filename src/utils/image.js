import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const fetchUploadUrls = async (images) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/images/presigned?images=${images}`
    );

    const data = await response.json();
    console.log(data);
    return data.urls;
  } catch (error) {
    console.error("Error fetching upload URLs:", error);
    throw error;
  }
};

export const uploadImages = async (imageObject) => {
  const imageUrls = [];
  try {
    const urls = await fetchUploadUrls(Object.keys(imageObject).length);
    console.log(urls);
    const uploadPromises = Object.values(imageObject).map(
      (imageData, index) => {
        const uploadUrl = urls[index];

        return axios
          .put(uploadUrl, imageData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            imageUrls.push(uploadUrl.split("?")[0]);
          })
          .catch((error) => {
            throw `Error while uploading images: ${error}`;
          });
      }
    );

    await Promise.all(uploadPromises);
  } catch (error) {
    throw error;
  }

  return imageUrls;
};
