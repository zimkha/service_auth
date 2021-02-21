import { Model } from 'mongoose';
import User from '../models/UserModel';
import Assurance from '../models/AssuranceModel'
export default ({
 
  isExsit : async (id: string, phone: string) => {
    let response = false;
     User.findOne({phoneNumber: phone}, (err:any, doc:any) => {
      if(doc) {
        if(id != doc._id) {
          response =  true;
        }
        else {
          response = false
        }
      }
      else if(err) {
        return err;
      }
    });
    return response;
  },

  OnExist : async(id: string, attribut_json: any, model : any) => {
      let response = false;

      model.findOne({attribut_json}, (err:any, doc:any) => {
          if(doc) {
            if(id != doc._id) {
              response = true;
            } else {
              response = false
            }
          }
          else if(err) {
            return err;
          }
      })
      return response;
  },

  assuranceExiste : async (numberphone: string, name: string, id = false) => {
    let response: any = [] 
    if(id) {
      await Assurance.findOne({numberphone: numberphone}, (err: any, doc:any) => {
         if(doc) {
           console.log(doc);
           if(doc._id != id)
           {
            console.log("je suis la pour le phone doc =>", doc)
             let error_number = {
               message : "A assurance has already registered with this number phone",
               success: true
             }
             response.push(error_number);
           }
         }
      });
    
      await Assurance.findOne({name: name},(err: any, doc:any) => {
         if(doc) {
          if(doc._id != id)
           {
             let error_name = {
               message : "A assurance has already registered with this name",
               success: true
             }
             response.push(error_name);
           }
        }
      });
    }
    else {
      await Assurance.findOne({numberphone: numberphone}, (err: any, doc:any) => {
        console.log(doc)
         if(doc) {
           if(doc._id)
           {
             let error_number = {
               message : "A assurance has already registered with this number phone",
               success: true
             }
             response.push(error_number);
           }
         }
      });
    
      await Assurance.findOne({name: name},(err: any, doc:any) => {
         if(doc) {
          if(doc._id)
           {
             let error_name = {
               message : "A assurance has already registered with this name",
               success: true
             }
             response.push(error_name);
           }
        }
      });
      
    }
    return response;
  }

})