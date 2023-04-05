import multer from "multer";

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./public/save-photos");
    },
    filename: function (req, file, callback) {
      console.log("file.fieldname: "+ file.fieldname + " file.originalname: " + file.originalname);
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: Storage,
}).single('image'); //Field name and max count

export default upload;