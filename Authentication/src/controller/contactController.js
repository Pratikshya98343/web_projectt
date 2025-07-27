import ContactMessage from "../models/ContactMessage.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email, and message are required." });
  }

  try {
    // Save to database
    await ContactMessage.create({ name, email, phone, message });

    // Send email notification
    const emailContent = `
      You have received a new contact message:
      Name: ${name}
      Email: ${email}
      Phone: ${phone || "N/A"}
      Message: ${message}
    `;

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "Caffio Coffee Shop"}" <${
        process.env.EMAIL_USER
      }>`,
      to: process.env.CONTACT_NOTIFICATION_EMAIL || "admin@example.com",
      subject: "New Contact Form Submission",
      text: emailContent,
    });

    return res
      .status(200)
      .json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return res.status(500).json({
      message: "An error occurred while submitting the contact form.",
    });
  }
};

export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ raw: true });
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "No contact messages found." });
    }
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching contact messages." });
  }
};

export const getContactMessageById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Message ID is required." });
  }
  try {
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: "Contact message not found." });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.error("Error fetching contact message:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the contact message.",
    });
  }
};

export const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Message ID is required." });
  }

  try {
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: "Contact message not found." });
    }

    await message.destroy();
    return res
      .status(200)
      .json({ message: "Contact message deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the contact message.",
    });
  }
};
