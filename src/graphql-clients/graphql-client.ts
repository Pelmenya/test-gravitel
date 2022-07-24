import { GraphQLClient } from "graphql-request";
import { SERVER } from "../utils/api-constants/server";

export const graphQLClient = new GraphQLClient(SERVER.url);
