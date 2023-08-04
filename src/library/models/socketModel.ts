export type ServerToClientEvents = {
    'match-info': (data: any) => void;
  };
  
export type ClientToServerEvents = {
    message: (message: string) => void;
    player:(name:string) => void;
};
  