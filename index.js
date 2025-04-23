import express from 'express'
import { config } from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors';
import fs from 'fs';
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));
import connectDB from './Data/bd.js';
import userRoot from './Routes/userRoot.js';


config()
connectDB()


const PORT = 8080
const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/users/register', userRoot)


// Serve static files from the "public" directory
app.use(express.static('public'))

app.use((req, res) => {
    res.status(404).json({ message: `API not found at ${req.url}` })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})

// export default app


