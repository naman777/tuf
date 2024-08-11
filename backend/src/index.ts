import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api/admin", adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});