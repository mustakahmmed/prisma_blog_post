import { Request, Response } from "express"
import { postService } from "./post.service"

const createPosts = async (req:Request,res:Response)=>{
    try {
        console.log(req.body);
        
        const result = await postService.createPost(req.body);
        res.status(201).json({
            message:"post created",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            error:"post creation failed",
            details:error
        })
    }

    
    
    }

export const postController ={
    createPosts
}