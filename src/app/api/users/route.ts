import { NextApiRequest, NextApiResponse } from 'next';
import db, {
  User,
  DbUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../lib/db'; // Adjusted path to db.ts

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url!);
  const id = url.searchParams.get('id');

  if (id) {
    // Fetch the user by ID
    const user = getUserById(id);

    if (user) {
      return Response.json(user);
    } else {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }
  } else {
    // Fetch all users
    const users = getAllUsers();
    return Response.json(users);
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  // Add a new user
  const { name, email } = await req.json();
  if (!name || !email) {
    return Response.json({ message: 'Name and email are required' }, { status: 400 });
  }

  const newUserId = createUser(name, email);
  return Response.json({ id: newUserId }, { status: 201 });
}

export async function PUT(req: Request, res: NextApiResponse) {
  // Update an existing user
  const url = new URL(req.url!);
  const id = url.searchParams.get('id');
  if (!id) {
    return Response.json({ message: 'id is required' }, { status: 400 });
  }
  const { name, email } = await req.json();
  if (!name || !email) {
    return Response.json({ message: 'Name and email are required' }, { status: 400 });
  }

  const updatedRowCount = updateUser(id, name, email);
  if (updatedRowCount === 0) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }
  return Response.json({ message: 'User updated successfully' });
}

export async function DELETE(req: Request, res: NextApiResponse) {
  // Delete an existing user
  const url = new URL(req.url!);
  const id = url.searchParams.get('id');
  if (!id) {
    return Response.json({ message: 'id is required' }, { status: 400 });
  }
  const deletedRowCount = deleteUser(id);
  if (deletedRowCount === 0) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }
  return Response.json({ message: 'User deleted successfully' });
}

export function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
  return Response.json({}, { status: 200 });
}
