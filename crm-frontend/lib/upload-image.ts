import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export async function uploadImage(axios: AxiosInstance, image: File) {
  const formdata = new FormData();
  formdata.append("image", image);
  try {
    const res = await axios.post("/upload-document", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data?.data?.publicUrl;
  } catch (error) {
    toast.error("Image not uploaded");
    throw error;
  }
}
