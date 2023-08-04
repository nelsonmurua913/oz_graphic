/* eslint-disable import/no-extraneous-dependencies */
import { GraphQLClient } from 'graphql-request';

export { gql } from 'graphql-request';

export const graf = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPH_URL as string);
