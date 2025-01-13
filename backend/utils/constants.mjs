import assert from 'node:assert';

export const JWT_SECRET =  process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;

export const DB_URI = process.env.MONGODB_URI;

assert(undefined !== JWT_SECRET, "JWT_SECRET environment variable is missing");
assert(undefined !== NODE_ENV, "NODE_ENV environment variable is missing");
if(!(NODE_ENV === "production" || NODE_ENV === "development")){
    console.log(NODE_ENV);
    throw new Error(`NODE_ENV environment variable must be 'production' or 'development'`);
}
assert(undefined !== CLOUDINARY_NAME, "CLOUDINARY_NAME environment variable is missing");
assert(undefined !== CLOUDINARY_API_KEY, "CLOUDINARY_API_KEY environment variable is missing");
assert(undefined !== CLOUDINARY_SECRET_KEY, "CLOUDINARY_SECRET_KEY environment variable is missing");
assert(undefined !== DB_URI, "DB_URI environment variable is missing");
