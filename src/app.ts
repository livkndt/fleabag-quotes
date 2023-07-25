import express from 'express';

const app = express();
const port = process.env.port || 3000;

app.get("/quotes/random", (req, res) => {
    res.json("I'm not a bad guy. I just have a bad personality.");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
