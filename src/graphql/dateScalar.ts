import { GraphQLScalarType, Kind } from 'graphql';


const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value:any) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value:any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast:any) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
    }
    return null; // Invalid hard-coded value (not an integer)
  }
});

export default dateScalar;

