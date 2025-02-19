function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3>Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div>
          <h3>Sales</h3>
          <p className="text-3xl font-bold">$12,345</p>
        </div>
        <div>
          <h3>Orders</h3>
          <p className="text-3xl font-bold">567</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
