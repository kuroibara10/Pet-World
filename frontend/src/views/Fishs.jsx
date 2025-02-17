function Fishs() {
  const products = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    image: "https://via.placeholder.com/150",
  }));

  return (
    <div className="pt-10">
      <main className="container mx-auto my-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow rounded text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold">{product.price}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded shadow">
                Order
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Fishs;
