import { Router } from "express";
import { body } from "express-validator";

import {
  createAccount,
  getUser,
  getUserByHandle,
  login,
  searchByHandler,
  updateProfile,
  uploadImage,
} from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticated } from "./middleware/auth";

const router = Router();

router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("email").isEmail().withMessage("E-mail no valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto, minimo 8 caracteres"),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("E-mail no valido"),
  body("password").notEmpty().withMessage("El password es obligatorio"),
  handleInputErrors,
  login
);

router.get("/user", authenticated, getUser);
router.patch(
  "/user",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
  handleInputErrors,
  authenticated,
  updateProfile
);

router.post("/user/image", authenticated, uploadImage);
router.get("/:handle", getUserByHandle);
router.post(
  "/search",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
  handleInputErrors,
  searchByHandler
);

export default router;
