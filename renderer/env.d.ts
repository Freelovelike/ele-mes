// eslint-disable-next-line @typescript-eslint/no-namespace

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string
    REDIS_URL: string
    REDIS_PASSWORD: string
  }
}
