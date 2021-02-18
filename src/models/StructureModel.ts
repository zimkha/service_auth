import { model, Schema} from 'mongoose';


const structureModel = new Schema({
    name: {type: String},
    adresse:{type: String},
    numberphone:{type: String},
    email:{type: String},
    isDeleted: {type: Boolean},
},{timestamps: true});

export default model('Structure', structureModel);


