import fs from "fs";
import path from "path";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dc4vad8tx",
  api_key: "999966156281344",
  api_secret: "pjI-xHV0kGWlBCIQjvILEah300A",
});

// res/images/abc.png
const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", "..", filePath);
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
};

const uploadController = {
  addImg: async (req, res, next) => {
    try {
      if (!req.file) {
        const err = new Error("file not found");
        err.statusCode = 422;
        return next(err);
      }

      const imageSaved = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "res/images",
      });

      if (imageSaved) {
        clearImage(req.file.path);
      }

      console.log(imageSaved);
      res.json({
        message: "upload image success",
        imgURL: imageSaved.url,
        fileName: imageSaved.original_filename,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteImg: async (imageURL) => {
    try {
      if (!imageURL) {
        const err = new Error("file not found");
        err.statusCode = 422;
        throw err;
      }

      const imageRemoved = await cloudinary.v2.uploader.destroy(imageURL);

      console.log(imageRemoved);
    } catch (error) {
      console.log(error);
    }
  },
};

export default uploadController;
