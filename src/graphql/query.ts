import { IResolverMap } from '../interfaces/IResolver';
import errorMessages  from '../config/errorMessages'
import User from '../models/UserModel'
import Assurance from '../models/AssuranceModel'

export default  {
  
    async getUsers(parent: any, args: any, context: any, info: any){
      try {
       
         const user = await User.find();
         if(user){
           return user;
         }
         return null;
      } catch (error) {
        throw new Error(error);  
      }
    },
    async getOneUser(parent: any, args: any, context: any, info: any){
      try {
        let id = args.id
         const user = await User.findOne({_id: id}, (err:any, docs:any) => {
          if(docs){
            return docs;
          }
          else {
            throw new Error('Error 500')
          }
         });
         return user;
      } catch (error) {
        throw new Error(error);  
      }
    },
    async getUserByRole(parent: any, args: any, context: any, info: any) {
      let role = args.role;
      const user = await User.find({role: role}, (err: any, doc: any) => {
        if(doc) {
          return doc
        }
        else {
          throw new Error("Error 500");
          
        }
      });
      return user;
    },
    async getAssurances (parent: any, args: any, context: any, info: any) {
         return await Assurance.find();
    }
  

}