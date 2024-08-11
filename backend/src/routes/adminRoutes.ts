import express from "express";
import { addFlashcard, deleteFlashcard, getFlashcards, login, updateFlashcard } from "../controllers/adminControllers";
import { isAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.get("/",isAuthenticated,getFlashcards);
router.post("/",isAuthenticated,addFlashcard );
router.patch("/",isAuthenticated, updateFlashcard);
router.delete("/",isAuthenticated, deleteFlashcard);
router.post("/login", login);

export default router;