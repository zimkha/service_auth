import { IResolverMap } from '../interfaces/IResolver';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import errorMessages  from '../config/errorMessages'
import { authenticateFacebook } from '../auth/passport';
import UserController from '../auth/userController';
import User from '../models/UserModel'
import Assurance from '../models/AssuranceModel';

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
    console.log("im here")
    try {  
          let all_data = JSON.parse(JSON.stringify(args));
          let toUpdate = all_data['data'];
          let id = all_data.id;
          const user = await User.findOneAndUpdate({_id: id}, { toUpdate }, { upsert: true }, (err: any, docs:any) => {
            if(!err) {
              return docs;
            }
            throw new Error("Erreur 500");
          });
          return user;
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
            console.log('je suis la')
            throw new Error("User not found!");  

          }
          const isMatch = bcrypt.compareSync(data.password, user.password);
          if (!isMatch) {
            throw new UserInputError(errorMessages.wrongPassword);
          }
    
          const SECRET =  "ADDHVN477V4Z4D54F7HFGB448522F442";
          return {
            token: jwt.sign({ uid: user._id }, SECRET),
          };
      } catch (error) {
        
      }
  }
  
 }
 

