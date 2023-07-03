import express, { Request, Response } from 'express';
import { createUser, getUser, updateUser, deleteUser, healthz } from './src/api-handlers';

const app = express();
const port = 80;

app.use(express.json());

// Custom middleware to verify the name is a string
const verifyNameIsString = (req: Request, res: Response, next: any) => {
  const { name } = req.body;
  if (typeof name === 'string') {
    next(); // Name is a string, proceed to the next middleware or route handler
  } else {
    res.status(400).json({ error: 'Name should be a string' });
  }
};

app.post('/users', verifyNameIsString, createUser);
app.get('/users/:id', getUser);
app.put('/users/:id', verifyNameIsString, updateUser);
app.delete('/users/:id', deleteUser);
app.get('/healthz', healthz);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

