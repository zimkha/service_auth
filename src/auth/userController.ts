import { ObjectId } from 'mongodb'
import Usermodel from '../models/UserModel';

class UserController  {
  static signin() {
     
  }
  static signup(data: any) {
    let user = Usermodel.create(data);
    return user;
  }
}


export default UserController;