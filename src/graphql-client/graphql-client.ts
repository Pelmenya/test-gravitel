import { GraphQLClient } from 'graphql-hooks'
import { SERVER } from '../utils/api-constants/server'

export const grathQLCLient = new GraphQLClient(SERVER);
