import connectDB from './config/db';

async function main() {
    try {
        await connectDB();
    } catch (error) {
      console.error(error);
    }
  }

main();
