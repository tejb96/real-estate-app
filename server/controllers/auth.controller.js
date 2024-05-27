import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const register = async (req,res)=>{
   const {username, email,password}=req.body;


    try{
            // HASH Password
        const hashedPassword= await bcrypt.hash(password, 10);


        // Create a new user and save to Db
        const newUser= await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        
         }) 
        console.log(newUser);
        res.status(201).json({message: "user created successfully"})

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to create user"})
    }

}

export const login = async (req,res)=>{
    const {username, password}=req.body;

    try{

        
        // check if user exists
        const user=await prisma.user.findUnique({

            where:{username:username}
        })
        if(!user) return res.status(401).json({message:"invalid username"})

        // check if user password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({message:"incorrect password"})
        
        // Generate cookie token and send to the user

        const age=1000*60*60*24*7;
        
        const token = jwt.sign({
            id:user.id
        },process.env.JWT_SECRET_KEY,
    {expiresIn:age});

        res.cookie("token",token,{
            httpOnly:true,
            // secure:true,
            maxAge: age,
        }).status(200).json({message:"login successful"})

    }catch(err){
        console.log(err);
        res.status(500).json({message:"failed to login"})
        
    }
        
}

export const logout = (req,res)=>{
    res.clearCookie("token").status(200).json({message:"logout successful"})
}