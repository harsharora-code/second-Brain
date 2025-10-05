import express from "express"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "./config.js"; 
import { contentModel, linkModel, userModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import {randomBytes} from 'crypto'
import cors from "cors"
const app = express();
app.use(cors({
    origin: "http://localhost:5173",

}));
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
        userDetails: req.userId,
    

    })
    res.json({
        msg : "content-added done"
    })
})
app.get("/api/v1/content", userMiddleware, async function(req, res) {
    const userDetails = req.userId;
     const content = await contentModel.find({
        userDetails: userDetails,
    }).populate("userDetails", "username")
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
        const hash = randomBytes(10).toString('hex');
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
app.get('/api/v1/brain/:sharelink', async function(req, res) {
    const hash = req.params.sharelink;
    const link = await linkModel.findOne({
        hash,
    })
    if(!link) {
        res.status(404).json({
            msg: "link is invalid"
        })
        return;
    }
    // match with our content id
    const content = await contentModel.find({
        userDetails: link.userId
    })
    // match with user id
    const user  = await userModel.findOne({
        _id: link.userId
    })

    if(!user) {
        res.status(403).json({
            msg : "you cannot access the link"
        })
        return
    }

    res.json({
        username : user.username,
        content: content
    })


})
app.listen(3000)
