import express from "express";

const router = express.Router();

import bookRoute from "./book.route";

router.use("/books", bookRoute);   

export default router;
