export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Hello Next.js with Tailwind CSS!
      </h1>
      <p className="text-gray-700 leading-relaxed">
        This is a simple example of a Next.js page styled with Tailwind CSS.
        You can start adding more components and layouts.
      </p>
      <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  );
}
