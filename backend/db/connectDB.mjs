import mongoose from "mongoose"
// import { MongoClient, ServerApiVersion  } from "mongodb"
import { DB_URI } from "../utils/constants.mjs"
// let cached = global.mongoose;
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }
export const connectDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        console.log("Using existing database connection.");
        return; // Use existing connection
    }
    try{
        const conn = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // conn.disconnect()

        console.log(`Database connection established: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error connection to database: ${error.message}`)
        process.exit(1) // exit
    }
}

// import { waitUntil } from '@vercel/functions';
// // Middleware to connect to MongoDB
// const connectToDatabase = async (req, res, next) => {
//     res.on('finish', () => {
//         if (mongoose.connection.readyState !== 0) {
//           mongoose.disconnect()
//             .then(() => {
//               console.log('Mongoose connection closed');
//             })
//             .catch((err) => {
//               console.error('Error closing Mongoose connection:', err);
//             });
//         }
//     });
//     try {
//       if (mongoose.connection.readyState === 0) {
//         // Only connect if not already connected
//         await mongoose.connect(DB_URI, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//         });
//         console.log('Connected to MongoDB');
//       }
//       next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//       console.error('Error connecting to MongoDB:', err);
//       return res.status(500).json({ error: 'Database connection error' });
//     }
// };

// import { MongoClient } from 'mongodb';

// const uri = DB_URI; // your mongodb connection string
// const options = {};


// class Singleton {
//     static _instance;
//     client;
//     clientPromise;
//     constructor() {
//     this.client = new MongoClient(uri, options);
//     this.clientPromise = this.client.connect();
//   }

//   static get instance() {
//     if (!this._instance) {
//       this._instance = new Singleton();
//     }
//     return this._instance.clientPromise;
//   }
// }
// const clientPromise = Singleton.instance;

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;