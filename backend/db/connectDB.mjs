import mongoose from "mongoose"
// import { MongoClient, ServerApiVersion  } from "mongodb"
import { DB_URI } from "../utils/constants.mjs"
let isConnected = false;
export const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection.");
        return; // Use existing connection
    }
    try{
        const conn = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true; // Mark as connected

        console.log(`Database connection established: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error connection to database: ${error.message}`)
        process.exit(1) // exit
    }
}

// const clientMongodb = new MongoClient(DB_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
// });

// export const connectDB = async () => {
//     try{
//         await clientMongodb.connect();
//         console.log(`Database connection established`)
//         return clientMongodb
//     }
//     catch(error){
//         console.log(`Error connection to database: ${error.message}`)
//         process.exit(1) // exit
//     }
//     finally{
    
//     }
// }