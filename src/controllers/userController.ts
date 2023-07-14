import User  from "../models/userModel";
import Book from "../models/books";
import {Request, Response, NextFunction} from  "express";
import { SaltGenerator, passWordGenerator, hashPassword, tokenGenerator, } from "../Utilities/utility";
import { emailHtml, sendmail } from "../Utilities/notifications";
import bcrypt from 'bcryptjs'

export const createUser = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const {firstName, lastName, email} = req.body;
        const findUser = await User.findOne({email})
        if(findUser){
            return res.status(400).json({
                message: `User already exists`
            })
        }

        const salt = await SaltGenerator()

        const password = await passWordGenerator(lastName)

        const hashedPassword = await hashPassword(password, salt)

        if(!findUser){
            let newUser = await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                role: 'Author',
                books: []
            })

            // To  be sure user has been created 
           // const mainUser = await User.findOne//({email})

           const html = emailHtml(email, password)
           await sendmail( email, html)
           return res.status(200).json({
               message:`User successfully created `,
               role: newUser.role
           })
       

            //     const html = emailHtml(email, password)
            //     await sendmail(`${process.env.GMAIL_USER}`, email, "welcome", html)
            //     return res.status(200).json({
            //         message:`User successfully created `,
            //         role: mainUser.role
            //     })
            // }
            // return res.status(401).json({
            //     message:`Unable to create user`
            // })   // if(mainUser){
                
         
        }
        return res.status(401).json({
            message:`Unable to create user`
        })

    }catch(err){
        return res.status(500).json({
            message:`Internal Server Error `,
            Error: err
        })
    }
}

export const login = async(req:Request, res:Response) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message:`User does not exist, please register`
            })
        }
        if(user){
            const validate = await bcrypt.compare(password, user.password)
            if(!validate){
                return res.status(400).json({
                    message:`Invalid password`
                })
            }
            if(validate){
                const token = await tokenGenerator(`${user._id}`)
                res.cookie('token', token)
                return res.status(200).json({
                    message:`Login successful`,
                    email: user.email
                })
            }
        }

    }catch(err){
        return res.status(500).json({
            message:`Internal Server Error `,
            Error: '/users/login'
        })
    }
}

export const getAll = async(req:Request, res:Response) =>{
    try{
        const allUsers = await User.find({})
        if(!allUsers){
            return res.status(404).json({
                message:`Users not fetched`,
            
            })
        }
        return res.status(200).json({
            message:`Users fetched successfully`,
            allUsers
        })

        

    }catch(err){
        return res.status(500).json({
            message:`Internal Server Error`,
            Error:`/users/login`
        })
    }
}

export const updateUser = async(req:Request, res:Response) =>{
    try{
        const { email, firstName, lastName} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message:`User does not exist`
            })
        }
        const updateUser = await User.findOneAndUpdate({email}, {firstName, lastName})

        if(updateUser){
            return res.status(200).json({
                message:`User updated successfully`,
                updateUser
            })
        }
        return res.status(401).json({
            message:`Not successfully updated`,
            updateUser
        })

    }catch(err){
        return res.status(500).json({
            message:`Internal Server Error`,
            Error:`/users/login`
        })
    }
}