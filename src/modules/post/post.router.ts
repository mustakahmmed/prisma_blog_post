import express, { NextFunction, Request, Response } from "express"
import { postController } from "./post.controller";
import {auth as betterAuth} from "../../lib/auth"
import { email, success } from "better-auth/*";
const router = express.Router()

export enum userRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

declare global {
    namespace Express{
        interface Request{
            user?:{
                id: string;
                email:string;
                name:string;
                role:string;
                emailVerification:boolean;
            }
        }
    }
}

const auth = (...roles:userRole[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        const session = await betterAuth.api.getSession({
            headers: req.header as any
        })
        console.log(session);
        if (!session) {
            return res.status(401).json({
                success:false,
                message:"you are not authorize!"
            })
        }

        if (!session.user.email) {
            return res.status(403).json({
                success:false,
                message:"Email verification required."
            })
        }

        req.user ={
            id:session.user.id,
            email:session.user.email,
            name:session.user.name,
            role:session.user.role as string,
            emailVerification:session.user.emailVerified
        }

        if(roles.length && !roles.includes(req.user.role as userRole)){
            return res.status(403).json({
                success:false,
                message:"Forbidden. you don't have access on this resorces"
            })
        }
        next()

    }
}

router.post("/",
    auth(userRole.USER)
    ,postController.createPosts)
 
export const postRouter = router;