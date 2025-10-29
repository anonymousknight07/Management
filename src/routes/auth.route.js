import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validators.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userForgotPassword,
  userResetPassword,
  userChangeCurrentPassword,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

//unsecure
router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/forgot-password")
  .post(userForgotPassword(), validate, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(userResetPassword(), validate, resetForgotPassword);

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPassword(),
    validate,
    changeCurrentPassword,
  );
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

export default router;
