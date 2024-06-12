import Layout from "../layout";

export default function Explore() {
  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold">Explore</h1>
        <div className="w-4/5 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Explore Content 1</h2>
          <p className="text-gray-600">Description for explore content 1.</p>
        </div>
        <div className="w-4/5 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Explore Content 2</h2>
          <p className="text-gray-600">Description for explore content 2.</p>
        </div>
        <div className="w-4/5 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Explore Content 3</h2>
          <p className="text-gray-600">Description for explore content 3.</p>
        </div>
      </div>
    </div>
  );
}
