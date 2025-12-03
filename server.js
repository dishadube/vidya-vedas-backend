c// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import bodyParser from 'body-parser';

// import authRoutes from './routes/authRoutes.js';
// import blogRoutes from './routes/blogRoutes.js';
// import serviceRoutes from './routes/serviceRoutes.js';
// import contactRoutes from './routes/contactRoutes.js';
// import studentRoutes from './routes/studentRoutes.js'
// import { verifyTransporter } from "./controllers/authController.js";



// dotenv.config();
// const app = express();

// verifyTransporter();


// app.use(cors());
// // app.use(bodyParser.json());
// app.use(express.json()); 



// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch(err => console.error('Connection error:', err));


// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/service",serviceRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/student",studentRoutes);



// app.listen(process.env.PORT ,() => {
//     console.log(`Server is running on port ${process.env.PORT || 5000}`);
// });


//Server.js


import dotenv from 'dotenv';
dotenv.config();  // Load env FIRST ✅

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import { verifyTransporter } from "./controllers/authController.js";

const app = express();

verifyTransporter(); // Now EMAIL_USER & PASS exist ✔️

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.get("/", (req, res) => res.send("API server running"));

// Optional quick-test endpoint (visit to confirm server receives requests)
app.get("/api/blogs/test", (req, res) => res.json({ ok: true, msg: "test route working" }));

// 404 fallback that returns JSON (prevents HTML 'Cannot GET /...' pages)
app.use((req, res) => {
  res.status(404).json({ msg: "Not Found - no route matched", path: req.path });
});
app.use("/api/service", serviceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/student", studentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

