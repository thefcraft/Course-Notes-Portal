import dotenv from 'dotenv'; dotenv.config();

import assert from 'node:assert';

export const JWT_SECRET =  process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_SECRET_KEY = process.env.CLOUD_SECRET_KEY;

export const DB_URI = process.env.MONGODB_URI;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = Number(process.env.SMTP_PORT);
export const SMTP_SERVICE = process.env.SMTP_SERVICE;
export const SMTP_MAIL = process.env.SMTP_MAIL;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
assert(undefined !== JWT_SECRET, "JWT_SECRET environment variable is missing");
assert(undefined !== NODE_ENV, "NODE_ENV environment variable is missing");
if(!(NODE_ENV === "production" || NODE_ENV === "development")){
    console.log(NODE_ENV);
    throw new Error(`NODE_ENV environment variable must be 'production' or 'development'`);
}
if (process.env.BACKEND_PORT && isNaN(Number(process.env.BACKEND_PORT))) {
    throw new Error("BACKEND_PORT environment variable must be a valid number");
}
if (isNaN(SMTP_PORT)) {
    throw new Error("SMTP_PORT environment variable must be a valid number");
}
assert(undefined !== CORS_ORIGIN, "CORS_ORIGIN environment variable is missing");
assert(undefined !== CLOUD_NAME, "CLOUD_NAME environment variable is missing");
assert(undefined !== CLOUD_API_KEY, "CLOUD_API_KEY environment variable is missing");
assert(undefined !== CLOUD_SECRET_KEY, "CLOUD_SECRET_KEY environment variable is missing");
assert(undefined !== DB_URI, "DB_URI environment variable is missing");
assert(undefined !== MAILTRAP_TOKEN, "MAILTRAP_TOKEN environment variable is missing");
assert(undefined !== DATABASE_URL, "DATABASE_URL environment variable is missing");
assert(undefined !== SMTP_HOST, "SMTP_HOST environment variable is missing");
assert(undefined !== SMTP_PORT, "SMTP_PORT environment variable is missing");
assert(undefined !== SMTP_SERVICE, "SMTP_SERVICE environment variable is missing");
assert(undefined !== SMTP_MAIL, "SMTP_MAIL environment variable is missing");
assert(undefined !== SMTP_PASSWORD, "SMTP_PASSWORD environment variable is missing");

