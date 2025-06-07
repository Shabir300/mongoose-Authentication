import mongoose from "mongoose";
import dotenv from 'dotenv'

const connectDB = async () => {
    try {
       const conn = await mongoose.connect('mongodb+srv://Shabir035:shabir123035@cluster0.6eje2xe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`mongodb connected ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;