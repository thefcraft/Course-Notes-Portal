import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log(`Database connection established: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error connection to database: ${error.message}`)
        process.exit(1) // exit
    }
}