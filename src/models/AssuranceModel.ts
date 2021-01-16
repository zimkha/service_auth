import { model, Schema} from 'mongoose';


const assuranceModel = new Schema({
    name: {type: String},
    adresse:{type: String},
    numberphone:{type: String},
    email:{type: String},
    timestamp:{type: String},
});


export default model('Assurance', assuranceModel);