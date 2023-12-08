import "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    name: string;
    email: string;
    lastname: string;

  }

  interface Session {
    user: {
      email: string;
      token: string;
      user: User;
    };
  }
}
