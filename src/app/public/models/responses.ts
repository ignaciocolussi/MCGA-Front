export interface NotesCount {
  count: number;
}

export interface UsersCount {
  count: number;
}

export interface UserSignedUp {
  user: {
    name: string;
    surname: string;
    email: string;
  };
}
