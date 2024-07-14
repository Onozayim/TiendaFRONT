interface UserObject {
  email: string;
  sub: string;
  exp: Date;
  iat: Date;
}

export type User = UserObject | null;