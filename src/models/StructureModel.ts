import { model, Schema} from 'mongoose';


const structureModel = new Schema({
    name: {type: String},
    adresse:{type: String},
    numberphone:{type: String},
    email:{type: String},
    isDeleted: {type: Boolean},
    timestamp:{type: String},

});

export default model('Structure', structureModel);


