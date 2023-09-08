import app from './app';
import 'dotenv/config';
import { connectDatabase } from './db';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on ${PORT}`);
});
