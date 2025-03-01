import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

interface User {
  id: number;
  name: string;
  email: string;
}

interface DbUser {
    id: number;
    name: string;
    email: string;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // Fetch all users
    const users: User[] = db.prepare('SELECT * FROM users').all() as DbUser[];
    return Response.json(users);
}

export async function POST(req: Request, res: NextApiResponse) {
    // Add a new user
    const { name, email } = await req.json();
    if (!name || !email) {
        return Response.json({ message: 'Name and email are required' },{status:400});
    }

    console.log(name, email);

    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const result = stmt.run(name, email);
    return Response.json({ id: result.lastInsertRowid }, { status: 201 });
}

export function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
    return Response.json({}, { status: 200 });
}
