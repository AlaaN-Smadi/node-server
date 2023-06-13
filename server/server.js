const express = require('express');
const path = require('path');

const app = express();

// Serve the static index.html file
app.use(express.static(path.join(__dirname, '../public')));
// Middleware for parsing JSON payloads
app.use(express.json());

// Middleware for parsing URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
let submissions = {};

// Set up API routes
console.log("setupApiRoutes");
app.get('/api/getSubmissions', async (req, res) => {
    try {
        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while sending data' });
    }
});
app.post('/api/addSubmissions', async (req, res) => {
    try {
        submissions = req.body;
        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while saving data' });
    }
});

// Start the server
const runServer = () =>{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = runServer;
