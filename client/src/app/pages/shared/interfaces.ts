export interface User {
  email: string
  password: string
}
export interface MongoToken {
  date: string
  token: string
}
export  interface Links {
  clicks: number
  _id: string
  code: string
  to: string
  from: string
  owner: string
  date: Date
}
