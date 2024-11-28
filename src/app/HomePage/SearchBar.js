export default function SearchBar() {
    return (
            <input
                type="text"
                placeholder="Search posts..."
                className="bg-gray-800 text-white placeholder-gray-500 rounded-lg p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
    );
  }