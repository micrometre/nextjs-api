import { Card } from '@/app/ui/dashboard/cards'; // Import Card component
import RevenueChart from '@/app/ui/dashboard/revenue-chart'; // Import RevenueChart component
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'; // Import LatestInvoices component
import { lusitana } from '@/app/ui/fonts'; // Import font styles
import { fetchCardData } from '@/app/lib/data'; // Import fetchCardData function
import { Suspense } from 'react'; // Import Suspense for lazy loading
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from '@/app/ui/skeletons'; // Import skeleton components for loading states

export default async function Page() {
  // Fetch data for the cards
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      {/* Page title */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* Cards displaying various metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      {/* Charts and latest invoices section */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Revenue chart with loading skeleton */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* Latest invoices with loading skeleton */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}