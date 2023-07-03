import { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
}

const users: Record<number, User> = {};
let seq = 1;

const name = 'gss';

export function createUser(req: Request, res: Response): void {
  const u: User = {
    id: seq,
    name: '',
  };
  if (!req.body.name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  u.name = req.body.name;
  users[u.id] = u;
  seq++;
  res.status(201).json(u);
}

export function getUser(req: Request, res: Response): void {
  const id: number = parseInt(req.params.id);
  if (!users[id]) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.status(200).json(users[id]);
}

export function updateUser(req: Request, res: Response): void {
  const u: User = {
    id: 0,
    name: '',
  };
  if (!req.body.name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  u.name = req.body.name;
  const id: number = parseInt(req.params.id);
  if (!users[id]) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  users[id].name = u.name;
  res.status(200).json(users[id]);
}

export function deleteUser(req: Request, res: Response): void {

  const id: number = parseInt(req.params.id);
  if (!users[id]) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  delete users[id];
  res.sendStatus(204);
}

export function healthz(req: Request, res: Response): void {
  res.sendStatus(200);
}

