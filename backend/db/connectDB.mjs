import mongoose from "mongoose"
import { DB_URI } from "../utils/constants.mjs"

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(DB_URI)
        console.log(`Database connection established: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error connection to database: ${error.message}`)
        process.exit(1) // exit
    }
}