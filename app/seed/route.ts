import { customers, invoices } from '../../lib/placeholder-data';
import prisma from '../../lib/prisma';

async function seedCustomers() {
  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => prisma.customer.create({
        data: customer,
      }),
    ),
  );
  return insertedCustomers;
}

async function seedInvoices() {
  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => prisma.invoice.create({
        data: {
          customerId: invoice.customerId,
          amount: invoice.amount,
          status: invoice.status,
          date: invoice.date,
        },
      }),
    ),
  );
  return insertedInvoices;
}

export async function GET() {
  try {
    // First seed customers
    await seedCustomers();
    
    // Then seed invoices
    await seedInvoices();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
