import assert from 'node:assert';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET =  process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const BACKEND_PORT = process.env.BACKEND_PORT || 5000;

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_SECRET_KEY = process.env.CLOUD_SECRET_KEY;

export const DB_URI = process.env.DB_URI;
export const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;

assert(undefined !== JWT_SECRET, "JWT_SECRET environment variable is missing");
assert(undefined !== NODE_ENV, "NODE_ENV environment variable is missing");
if(!(NODE_ENV === "production" || NODE_ENV === "development")){
    throw new Error("NODE_ENV environment variable must be 'production' or 'development'");
}
if (process.env.BACKEND_PORT && isNaN(Number(process.env.BACKEND_PORT))) {
    throw new Error("BACKEND_PORT environment variable must be a valid number");
}
assert(undefined !== CLOUD_NAME, "CLOUD_NAME environment variable is missing");
assert(undefined !== CLOUD_API_KEY, "CLOUD_API_KEY environment variable is missing");
assert(undefined !== CLOUD_SECRET_KEY, "CLOUD_SECRET_KEY environment variable is missing");
assert(undefined !== DB_URI, "DB_URI environment variable is missing");
assert(undefined !== MAILTRAP_TOKEN, "MAILTRAP_TOKEN environment variable is missing");

