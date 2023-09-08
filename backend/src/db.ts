import 'dotenv/config';
import mysql from 'mysql2/promise';

const client = mysql.createPool(process.env.DATABASE_URL!);

const connectDatabase = async (): Promise<void> => {
  await client.getConnection();
  console.log('Database connected');
};

export { client, connectDatabase };
