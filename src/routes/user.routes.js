import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('jwt');
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging out' });
  }
});



export default router;