import express from 'express';
const app = express();
const PORT = 8000;
app.use(express.json());
app.use('/', (req, res, next) => {
    res.end('welcome to my server');
});
app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map