declare module NodeJS {
  interface Global {
    __BASE_PATH__: string
    __PATH_PREFIX__: string
  }
}
