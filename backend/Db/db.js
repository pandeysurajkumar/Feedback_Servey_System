import mongoose from 'mongoose';
import { DB_NAME } from '../src/constant.js';
const connectDb = async () => {

    try {
        const instance = await mongoose.connect(`${process.env.MongoDB_URI}/${DB_NAME}`);
        console.log('Database connected successfully', instance.connection.host);
        
    } catch (error) {
        console.log('Error: ', error);
        process.exit(1);
    }
};
export default connectDb;