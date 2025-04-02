import { config } from 'dotenv'

config()


export const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME; // String formatda qoldirish kerak
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME; // String formatda qoldirish kerak
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
