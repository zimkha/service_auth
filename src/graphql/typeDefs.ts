import { gql } from 'apollo-server-express';
import dateScalar from './dateScalar'

export default gql`
  scalar dateScalar
  scalar number
  type Subscription {
         subscription: String!
         date_start: dateScalar!
         date_end: dateScalar!
         status:String! 
    }

  type User {
    id: ID!
    firstname: String
    lastname: String
    phoneNumber:  String
    email:  String
    username: String!
    password: String!
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
    isDeleted:Boolean
    assurance: Assurance
    assurance_tpc: number,
  }


  type AuthPayload {
    token: String!
    user: User!
  }

  type Token {
      id: ID
      token: String!
      date: dateScalar
  }

  type Structure {
    id: ID
    name: String!
    adresse:String!
    numberphone:String!
    email:String!
    isDeleted: Boolean!
    created_at: dateScalar!
    updated_at: dateScalar!
  }

  type Assurance {
    id: ID
    adresse:String!
    numberphone:String!
    email:String!
    createdAt: dateScalar
    updatedAt: dateScalar
  }
 
  input Subscriber 
  {
    subscription: String!
    date_start: dateScalar!
    date_end: dateScalar!
    status:String! 
  }

   input AssuranceInput
   {
    adresse:String!
    numberphone:String!
    email:String!
  }
       
      input UserInput
       {
        firstname: String
        lastname: String
        phoneNumber:  String
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
        assurance_tpc: number
        subscriptions: Subscriber
      }

      input TokenInput
      {
        token: String!
        date: dateScalar
      }

      type Query
       {
        getUsers: [User]
        getOneUser(id: String): User!
        getUserByRole(role: String): User
        getAssurances(id: String): Assurance!
        getOneAssurance: Assurance
        getAssuranceByAttribut(attribut: String): [Assurance]
        facebookAuth(accessToken: String!): Token
        getUserByToken(token: String): Token
        getStructures: [Structure]
        getOneStructure(id: String): Structure!
        getStructureByAttribut(attribut: String!): [Structure]
        getToken(params: String): String
      }

      type Mutation
       {
          registerPatient(phone: String, password: String): AuthPayload!
          googleAuthMedecin(accessToken: String!): Token!
          facebookAuth(accessToken: String!): Token!
          updateUser(id: String, data: UserInput): User
          addAssurance(data: AssuranceInput): Assurance
          signin(username: String, password: String): AuthPayload
          signup(username: String, password: String): AuthPayload
          signUp(username: String, password: String): AuthPayload
          loginPatient(phone: String!, password: String!): Token

      }


      schema 
      {
        query: Query
        mutation: Mutation
      }
`;