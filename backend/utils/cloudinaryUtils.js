import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = async (file, folder) => {
  try {
    const upload = await cloudinary.uploader.upload(file.path, {
      folder: folder,
      use_filename: true,
    });
    return upload;
  } catch (error) {
    console.log(error);
  }
};


const deleteFromCloudinary = async (file, folder) => {
  try {
    const upload = await cloudinary.uploader.destroy(folder + "/" + file);
    return upload;
  } catch (error) {
    console.log(error);
  }
};
export { uploadToCloudinary };
