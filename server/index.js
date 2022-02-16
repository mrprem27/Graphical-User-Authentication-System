const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const userRoutes = require('./routes/user')

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);


app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extented: true }));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use('/ck', express.static('uploads/pool'))

app.use('/user', userRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log(`Server Running on Port:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
