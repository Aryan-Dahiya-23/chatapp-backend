import express from 'express';
import dotenv from "dotenv";
import passport from 'passport';
import { verify, logout } from '../controllers/authController.js';

const router = express.Router();
dotenv.config();

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureMessage: "Cannot login to Google, please try again later!",
        failureRedirect: `${process.env.CLIENT_URL}/failed`,
        successRedirect: `${process.env.CLIENT_URL}`,
    }),
    (req, res) => {
        res.send("Thank you for signing in!");
    }
);

router.get('/facebook', passport.authenticate('facebook', ["profile", "email"]));

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        failureFlash: "Cannot login to Facebook, please try again later!",
        failureRedirect: `${process.env.CLIENT_URL}/failed`,
        successRedirect: `${process.env.CLIENT_URL}`,
    }),
    function (req, res) {
        res.send("Thank you for signing in!");
    }
);

router.get("/verify", verify);
router.post("/logout", logout);

export default router;








// router.get("/login/success", (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             error: false,
//             message: "Successfully Loged In",
//             user: req.user,
//         });
//     } else {
//         res.status(403).json({ error: true, message: "Not Authorized" });
//     }
// });

// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         error: true,
//         message: "Log in failure",
//     });
// });