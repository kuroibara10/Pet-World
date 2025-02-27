function Products() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <div className="flex justify-end p-4">
        <button className="px-4 py-2 bg-blue-500 text-white item-right rounded hover:bg-blue-600">
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border border-gray-300">A</th>
              <th className="p-3 border border-gray-300">A</th>
              <th className="p-3 border border-gray-300">A</th>
              <th className="p-3 border border-gray-300">A</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white hover:bg-gray-100">
              <td className="p-3 border border-gray-300">B</td>
              <td className="p-3 border border-gray-300">B</td>
              <td className="p-3 border border-gray-300">B</td>
              <td className="p-3 border border-gray-300">B</td>
              <td className="p-3 border border-gray-300 flex space-x-2">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
