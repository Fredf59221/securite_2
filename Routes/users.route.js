import express from "express"


import usersController from "../Controllers/users.controller.js"
const router = express.Router();
router.get("/", usersController.getAll);

export default router;