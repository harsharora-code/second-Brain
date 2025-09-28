import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import {model, Schema} from 'mongoose'
import {MongoUrl} from "./config.js";

mongoose.connect(MongoUrl!);
 
const userSchema = new Schema({
    username : {type: String, unique: true},
    password: String,

})
const contentTypes = ['images', 'tweet', 'video', 'audio', 'link', 'article', 'document'];
 export const Tags =  ["productivity", "politics","jobs", "computer-science", "software-developer"]
const contentSchema = new Schema({
    title: {type: String, unique: true},
    link : {type: String, unique: true},
    tags: [
        {
         type :String,
         enum : Tags,
        required: true
        }
    ],
    type : {type: String, enum: contentTypes, required: true},
    userId : {type: mongoose.Types.ObjectId,ref: "User", required: true}


})
const linkSchema = new Schema({
    hash: {type: String, unique: true},
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}

})
export const userModel = model("User", userSchema);
export const contentModel = model("Content", contentSchema);
export const linkModel = model("Link", linkSchema);