import express from "express";
import { addBook, deleteBook, getBook, findBooks, putBook } from "../controllers/booksController";

const router = express.Router()

router.post("/", findBooks) // ? query tag // search
router.get("/book/:id", getBook)
router.put("/put/:id", putBook)
router.post("/add", addBook)
router.delete("/delete/:id", deleteBook)

export default router