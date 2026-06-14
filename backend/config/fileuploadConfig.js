// const multer = require('multer')
// const path = require('path')
// const fs = require('fs')

// const uploadFile = (folderName) => {

//     const uploadPath = `uploads/${folderName}`

//     // Auto Create Folder
//     if (!fs.existsSync(uploadPath)) {
//         fs.mkdirSync(uploadPath, { recursive: true })
//     }

//     const storage = multer.diskStorage({

//         destination: (req, file, cb) => {
//             cb(null, uploadPath)
//         },

//         filename: (req, file, cb) => {
//             cb(
//                 null,
//                 Date.now() + path.extname(file.originalname)
//             )
//         }
//     })

//     return multer({ storage })
// }
// module.exports = uploadFile

// const multer = require('multer');
// const cloudinary = require("./cloudinary");
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const uploadFile = (folder) => {
//     const storage = new CloudinaryStorage({
//         cloudinary: cloudinary,
//         params: async (req, file) => {
//             // Clean filename: Remove extension and special characters
//             const cleanName = file.originalname
//                 .split('.')[0]
//                 .replace(/[^a-zA-Z0-9]/g, "_");

//             const publicId = `${Date.now()}-${cleanName}`;

//             return {
//                 folder: folder,
//                 // "auto" detects PDF, JPG, PNG, DOC automatically
//                 resource_type: "auto",
//                 public_id: publicId,
//                 // Keep original format for documents
//                 format: file.mimetype === "application/pdf" ? "pdf" : undefined,
//             };
//         },
//     });

//     const fileFilter = (req, file, cb) => {
//         const allowed = [
//             "image/jpeg",
//             "image/png",
//             "image/webp",
//             "image/jpg",
//             "application/pdf",
//             "application/msword",
//             "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//         ];

//         if (allowed.includes(file.mimetype)) {
//             cb(null, true);
//         } else {
//             cb(new Error("File type not supported!"), false);
//         }
//     };

//     return multer({ storage, fileFilter });
// };

// module.exports = uploadFile;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const uploadFile = (folderName) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: folderName,
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: (req, file) =>
                `${Date.now()}-${file.originalname.split(".")[0]}`,
        },
    });

    return multer({ storage });
};

module.exports = uploadFile;