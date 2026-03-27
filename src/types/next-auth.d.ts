import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      purchased: boolean;
      licenseKey: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    purchased: boolean;
    licenseKey: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    purchased: boolean;
    licenseKey: string | null;
  }
}
