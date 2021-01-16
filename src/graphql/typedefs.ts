import { gql } from 'apollo-server-express';


export default gql`
  scalar Date;
  type Subscription {
         subscription: String!
         date_start: Date!
         date_end: Date!
         status:String! 
  }
  type User {
    id: ID!
    firstname: String
    lastname: String
    phoneNumber:  String
    email:  String
    password: String
    address:  String
    status: String
    state: String
    tokenForSetting: Token
    role: String
    description: String
    specialite: String
    Structure: String
    nationality: String
    indicatif: String
    country: String
    homeworking: String
    email_home_working:String
    phone_home_working: String
    subscriptions: Subscription
    photo: String
    isDeleted:Boolean {type: Boolean},
    assurance: Assurance,
    assurance_tpc: Number,
  },
  type Token {
      id: ID
      token: String!
      date: Date
  },
  type Structure {
    id: ID
    name: String!
    adresse:String!
    numberphone:String!
    email:String!
    isDeleted: Boolean!
    created_at: Date!
    updated_at: Date!
  },
  type Assurance {
    id: ID
    adresse:String!
    numberphone:String!
    email:String!
    created_at: Date!
    updated_at: Date!
  },
  type Subscription {
         subscription: String
         date_start: Date
         date_end: Date
         status: String
     },
      type Query {
            """
           //  All Query for user
            """
            getUsers: [User]!
            getOneUser(id: String): [User]!
            getUserByAttribut(attribut: String!): [User]!
            getUserByRole(role: String): [User]!

             """
           //  All Query for Assurance
            """
                getAssurance(id: String): [Assurance]!
                getOneAssurances: [Assurance]:
                getAssuranceByAttribut(attribut: String): [Assurance]!

             """
           //  All Query for Structure
            """
            getStructures: [Structure]!
            getOneStructure(id: String): [Structure]!
            getStructureByAttribut(attribut: String!): [Structure]!
     },
    
       input Subscriber {
         subscription: String!
         date_start: Date!
         date_end: Date!
         status:String! 
       }
      input UserInput {
        firstname: String!
        lastname: String!
        phoneNumber:  String!
        email:  String
        password: String!
        address:  String
        status: String!
        state: String!
        tokenForSetting: String
        role: String!
        description: String
        specialite: String
        Structure: String
        nationality: String
        indicatif: String
        country: String
        homeworking: String
        email_home_working:String
        phone_home_working: String
        assurance: String
        assurance_tpc: Int
        subscriptions: Subscriber
      }
      type Mutation {
          SignIn(phone: String, password: String, confirm_password: String):User # Authentication for a patient
          SignInUserStructure(phone: String, password: String, role: String): User
          createUser(date: UserInput): [User]!
          updateUser(id: Strind, data: UserInput): [User]
          
     }
`;