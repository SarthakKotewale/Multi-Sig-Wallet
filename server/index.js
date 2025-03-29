const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

//Middleware
app.use(express.json({ extended: false }));
app.use(cors());

connectDB();

app.use("/api/auth", require("./routes/auth"));

// Serve static assets in production (optional - for deployment later)
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));
//
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));