import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt, { genSaltSync } from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// config de multer se guarda en storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  }, //indica el destino en donde se va a guardar el archivo
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },//indica con que nombre se va a guardar
});



export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password,user.password)

export const uploader = multer({ storage });

export default __dirname;