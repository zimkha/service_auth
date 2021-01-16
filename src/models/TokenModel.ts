import { model , Schema} from 'mongoose';


 const tokenModel  = new Schema({
     token: { type: String},
     date: { type: Date}
 });

 export default model('Token', tokenModel); 