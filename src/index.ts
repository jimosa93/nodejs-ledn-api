import connectDB from './config/db';
import app from "./app";
import { PORT } from './config';

async function main() {
    try {
        await connectDB();      
        app.listen(PORT);
        console.log("Server on port", PORT);
    } catch (error) {
      console.error(error);
    }
  }

main();
