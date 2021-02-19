import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import errorMessages  from '../config/errorMessages'
import nodemailer from 'nodemailer';
import User from '../models/UserModel'
import Assurance from '../models/AssuranceModel';
import { ObjectId } from 'mongodb'


const saltRounds = 10 ;  
const SECRET = process.env.SECRET;


export default{
  registerPatient: async(parent: any, args: any, context: any, info: any) => {
    try {
      let data = JSON.parse(JSON.stringify(args));
      console.log(data);
      let user_data ={
           phoneNumber: data.phone,
           password: bcrypt.hashSync(data.password, saltRounds),
           role: 'PATIENT',
           isDeleted: false,
           status: 'ACTIVED'
      };
      let isExist = await User.findOne({phoneNumber: data.phone });
      if(isExist) {
          throw new Error("A user has already registered with this phone number");  
      }
      let response =  await User.create(user_data);
      console.log(response);
      if(response) {
        return {
          token: jwt.sign({ uid: response._id }, "ADDHVN477V4Z4D54F7HFGB448522F442"),
          user: response
        };
      }
      else {
        throw new Error(errorMessages.default);
      }

     
  } catch (error) {
    throw new Error(error);
  }
  },
  updateUser: async(parent: any, args: any, context: any, info: any) => {
   
    try {  
          let all_data = JSON.parse(JSON.stringify(args));
          let toUpdate = all_data['data'];
          let id = all_data.id;
          toUpdate.password = bcrypt.hashSync(toUpdate.password, saltRounds);
          let response = false;
          let  user = await User.updateOne({
            _id: id
          }, {toUpdate}, { upsert: true }, (err: any, doc: any) => {
            if(!err) {
             response = true;
            }
          });
       return response;
         
    } 
    catch (error) {
      throw new Error(error);
    }
  },
  
  addAssurance: async (parent: any, args: any, context: any, info: any) => {
    let data = JSON.parse(JSON.stringify(args));
    console.log(data);
    let item = await Assurance.create(data['data']);
    return item;   
  },

  loginPatient: async (parent: any, args: any, context: any, info: any) => {
      try {
        let data = JSON.parse(JSON.stringify(args));

          const user = await User.findOne({phoneNumber:  data.phone});
          if(!user) {
            console.log("YEP I'm Here")
            throw new Error("User not found!");
          }
          const isMatch = bcrypt.compareSync(data.password, user.password);
          if (!isMatch) {
            throw new Error("Wrong password");  
          }
          const SECRET =  "ADDHVN477V4Z4D54F7HFGB448522F442";
          return {
            token: jwt.sign({ uid: user._id }, SECRET),
          };
      } catch (error) {
        throw new Error(error); 
      }
  },
  sendForgotPasswordEmail: async (parent: any, args: any, context: any, info: any)  => {
    try {
      let data = JSON.parse(JSON.stringify(args));
      let email = data.email;
      const user = User.findOne({email: email}, (err:any, doc:any) => {
         if(!err) {
           // User with this email Exist
           // Send email with link 
          let  transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'zimkhandiaye@gmail.com',
              pass: 'passsss'
            }
           
          });
          let mailOptions = {
            from: 'zimkhandiaye@gmail.com',
            to: email,
            subject: 'link to reset your password',
            text: 'link to reset password'
          }
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return false;
            } else {
              console.log('Email sent: ' + info.response);
              return true;
            }
          });
         }
      })
    } catch (error) {
      throw new Error(error); 
    }
  },
  sendForgotPasswordPhone: async (parent: any, args: any, context: any, info: any)  => {
    // Use Orange API for sending message a patient 
  },
  
 }

 //forgotPasswordChange(newPassword: String!, key: String!): [Error!]
 

