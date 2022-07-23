import { GraphQLClient } from 'graphql-hooks'
import { SERVER } from '../utils/api-constants/server'

export const graphQLCLientHooks = new GraphQLClient(SERVER);
