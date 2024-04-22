declare module 'cors' {
  import { RequestHandler } from 'express';

  function cors(options?: cors.CorsOptions): RequestHandler;

  namespace cors {
    interface CorsOptions {
      origin?:
        | string
        | string[]
        | ((
            requestOrigin: string,
            callback: (err: Error | null, allow?: boolean) => void,
          ) => void);
      methods?: string | string[];
      allowedHeaders?: string | string[];
    }
  }

  export = cors;
}
