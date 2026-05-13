import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const  UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }
},{timeStamps:true});

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 12);
    }
    next();
})

UserSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken= async function(){
    const token = jwt.sign({
        id: this._id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
};
UserSchema.methods.generateRefreshToken= async function(){
    const token = jwt.sign({
        id: this._id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET, {expiresIn: '20d'});
    return token;
};

export  const User = mongoose.model('User', UserSchema);