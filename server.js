import app from './app.js';
import 'dotenv/config';
import connectDB from './configs/db.js';

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test commit 1