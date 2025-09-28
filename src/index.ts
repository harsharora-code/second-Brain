import express from "express"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { random } from "./utils.js";
import {JWT_SECRET} from "./config.js"; 
import { contentModel, linkModel, userModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());

app.post('/api/v1/signup', async function(req, res) {
    const username  = req.body.username;
    const password = req.body.password; 

    try {
           await userModel.create({
            username: username,
            password: password,
           })

    } catch (e) {
           res.status(411).json({
            message: "user already exists"
           })
    }
    res.json({
        mesasage: "User signup done"
    })

})

app.post('/api/v1/signin', async function(req, res) {
    const username  = req.body.username;
    const password  = req.body.password;
    const existingUser = await userModel.findOne({
        username,
        password
    })
    if(existingUser) {
     const token = jwt.sign({
        id: existingUser._id,
    }, JWT_SECRET as string)
     res.json({
        message: "user signin done",
        token: token
    })
    } else {
        res.status(411).json({
            message: "user not found"
        })
    }
})
app.post('/api/v1/content', userMiddleware, async function(req, res) {
    let tags : string[] = [];
    if(req.body.tags) {
        if(typeof req.body.tags === "string") {
            tags = req.body.tags.split(',').map((tag: string) => tag.trim());
        }  else {
            tags = req.body.tags;
        }
    }

    const title = req.body.title;
    const link  = req.body.link;
    const type = req.body.type;
    await contentModel.create({
        link,
        type,
        title,
        tags,
        userId: req.userId,
    

    })
    res.json({
        msg : "content-added done"
    })
})
app.get("/api/v1/content", userMiddleware, async function(req, res) {
    const userId = req.userId;
     const content = await contentModel.find({
        userId: userId,
    }).populate("userId", "username")
    res.json({
        content
    })

})
app.delete('/api/v1/content', userMiddleware, async function(req, res) {
  
    const contentId = req.body.contentId;
      
        await contentModel.deleteMany({
          _id: contentId,
            userId: req.userId,
        })
        res.json({
            msg : "content deleted"
        })
})
app.post("/api/v1/brain/share", userMiddleware, async function(req, res) {
    const share = req.body.share;
    if(share) {
       const existingLink =  await linkModel.findOne({
        userId : req.userId,

        });
        if(existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await linkModel.create({
            userId: req.userId,
            hash: hash,
        })
        res.json({
            hash: hash,
        })
    } else {
        await linkModel.deleteOne({
            userId: req.userId,
        });
        res.json({
            msg : "removed link"
        })
    }

})
app.listen(3000)
