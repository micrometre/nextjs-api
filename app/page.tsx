import prisma from '@/lib/prisma';
import type { User, Customer, Invoice, Revenue } from '@prisma/client';

export default async function Home() {
  const users = await prisma.user.findMany();
  const customers = await prisma.customer.findMany();
  const invoices = await prisma.invoice.findMany();
  const revenues = await prisma.revenue.findMany();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto p-8">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">
            Superblog Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            A comprehensive overview of your business data.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <DataCard title="Users" data={users} renderItem={(item: User) => <p className="font-medium">{item.name}</p>} />
          <DataCard title="Customers" data={customers} renderItem={(item: Customer) => <p className="font-medium">{item.name}</p>} />
          <DataCard title="Invoices" data={invoices} renderItem={(item: Invoice) => (
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-green-600">${(item.amount / 100).toFixed(2)}</span>
            </div>
          )} />
          <DataCard title="Revenues" data={revenues} renderItem={(item: Revenue) => (
            <div className="flex justify-between">
              <span className="font-medium">{item.month}</span>
              <span className="font-semibold text-blue-600">${item.revenue.toLocaleString()}</span>
            </div>
          )} />
        </div>
      </div>
    </div>
  );
}

interface DataCardProps<T> {
  title: string;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
}

function DataCard<T extends { id?: string | number; month?: string }>({ title, data, renderItem }: DataCardProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-3 mb-4">
          {title}
        </h2>
        {data.length > 0 ? (
          <ul className="space-y-3">
            {data.map((item, index) => (
              <li key={item.id || item.month || index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No data available.</p>
        )}
      </div>
    </div>
  );
}