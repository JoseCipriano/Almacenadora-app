import { body } from 'express-validator';
import { validarCampos } from "./validar-campos.js";
import { existenteEmail, existenteUsername, noExistenteEmail, noExistenteUsername} from "../helpers/db-validator.js";

export const registerValidator = [
    body("name", "The name is required").not().isEmpty(),
    body("email", "You must enter a valid email").isEmail(),
    body("username", "The username is required").not().isEmpty(),
    body("username").custom(existenteUsername),
    body("email").custom(existenteEmail),
    body("password", "Password must be at least 8 characters").isLength({ min: 8}),
    body("phone", "Phone must be at least 8 characters").isLength({ min: 8}),
    validarCampos
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Enter a valid email address"),
    body("username", "The username is required").optional().not().isEmpty(),
    body("email").optional().custom(noExistenteEmail),
    body("email", "The email is required").optional().not().isEmpty(),
    body("username").optional().isString().withMessage("Enter a valid username"),
    body("username").optional().custom(noExistenteUsername),
    body("password", "Password must be at least 8 characters").isLength({min: 8}),
    validarCampos
]

