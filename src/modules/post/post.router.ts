import express, { Request, Response } from "express"
import { postController } from "./post.controller";
const router = express.Router()

router.post("/",postController.createPosts)

export const postRouter = router;