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
const contentTypes = ['images | video | audio | articles']
const contentSchema = new Schema({
    title: {type: String, unique: true},
    link : {type: String, unique: true},
    tags:  {type: mongoose.Types.ObjectId, ref: "Tags"},
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