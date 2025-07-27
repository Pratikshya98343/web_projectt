import express from "express";
import {
  deleteContactMessage,
  getAllContactMessages,
  getContactMessageById,
  submitContactForm,
} from "../controller/contactController.js";

const router = express.Router();

router.post("/", submitContactForm);
router.get("/", getAllContactMessages);
router.get("/:id", getContactMessageById);
router.delete("/:id", deleteContactMessage);

export default router;
