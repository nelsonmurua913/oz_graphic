import { gql } from 'graphql-request';

import { graf } from './client';

export interface PlayerInterface {
    pno: number;
    firstName: string;
    familyName: string;
    shirtNumber: number;
    playingPosition: string;
    active: number;
    // personId: number;
    team: {
        teamNumber: number;
    }
}

export async function getPlayers(): Promise<PlayerInterface[]> {
    const query = gql`query {
        players{
            pno
            firstName
            familyName
            shirtNumber
            playingPosition
            active
             team{
                 teamNumber
             }      
          }
    }`;

    const data = (await graf.request(query)) as any;
    return data.players;
}