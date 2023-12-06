import "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    // Otras propiedades según la estructura real de tu objeto user
  }

  interface Session {
    user: {
      email: string;
      token: string;
      user: User;
    };
  }
}
