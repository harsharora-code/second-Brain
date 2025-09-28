import express from "express"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
const JWT_SECRET = "a5sasery";
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
    }, JWT_SECRET)
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
    const title = req.body.title;
    const link  = req.body.link;
    const type = req.body.type;
    await contentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []

    })
    res.json({
        msg : "content-added done"
    })
})
app.get("api/v1/content", userMiddleware, async function(req, res) {
    const userId = req.userId;
     const content = await contentModel.find({
        userId: userId,
    }).populate("userId", "username")
    res.json({
        content
    })

})
app.listen(3000)
