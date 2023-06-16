import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

// Custom middleware to verify the name is a string
const verifyNameIsString = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (typeof name === 'string') {
    next(); // Name is a string, proceed to the next middleware or route handler
  } else {
    res.status(400).json({ error: 'Name should be a string' });
  }
};

// Define your API routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post('/api/users', verifyNameIsString, (req: Request, res: Response) => {
  const { name, email } = req.body;
  // Save the user to the database or perform any other actions
  res.status(201).json({ message: 'User created successfully', name, email });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
