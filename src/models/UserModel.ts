import { model, Schema, ObjectId } from  'mongoose';

const userSchema = new Schema({
    firstname : {type: String},
    lastname: {type: String},
    phoneNumber: {type: String},
    username: {type: String},
    email: {type: String},
    password: {type: String},
    address: {type: String},
    status: {type : String , enum: ['DISABLED','ACTIVED'], default: "ACTIVED" },
    state : { type: String, enum:['PAYED', 'NOT_PAYED']},
    tokenForSetting: {type: String},
    role: {type : String , enum: ['SUPER_ADMIN','ADMIN','SECRETAIRE','MEDECIN','PATIENT']},
    description: {type: String},
    specialite: {type: String},
    Structure: {type: Schema.Types.ObjectId, ref : 'Structure'},
    nationality: {type: String},
    indicatif: {type: String},
    country: {type: String},
    homeworking: {type: String},
    email_home_working: {type: String},
    phone_home_working: {type: String},
    subscriptions: [
        {
         subscription:  {  type: String},
         date_start: { type: Date},
         date_end:{ type: Date},
         status: { type : String , enum: ['ACTIVATE','DESACTIVATE','EXPIRED']} 
        }
    ],
    photo: {type: String},
    isDeleted: {type: Boolean},
    assurance: { type: Schema.Types.ObjectId, ref : 'Assurance'},
    assurance_tpc: {type: Number},
    permissions: {type : String , enum: ['ALL','HALF_ALL','NOTHINGS']}
   
}, {timestamps: true});

export default model('User', userSchema);


