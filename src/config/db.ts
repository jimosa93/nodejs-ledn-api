import { connect } from 'mongoose';
import { MONGODB_URI } from '../config';


const connectDB = async () => {
  try {
    const conn = await connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}


export default connectDB;
