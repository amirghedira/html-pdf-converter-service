const express = require('express');
const cors = require("cors");
const app = express();
const pdf = require('html-pdf');

// Enable CORS
app.use(cors());
// Body parser

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.post('/convert', (req, res) => {
    pdf.create(req.body.content).toBuffer(async (err, buffer) => {
        if (err || !buffer) {

            res.status(500).json({ err: err.message });
        }

        res.status(200).json({ blob: buffer.toString("base64") })
    });
})
app.get('/', (req, res) => {
    res.status(200).send('Server up and running!')
})

module.exports = app