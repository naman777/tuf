import express from "express";
import { getFlashcards } from "../controllers/userHandler";

const router = express.Router();

router.get("/", getFlashcards);

export default router;