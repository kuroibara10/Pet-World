import { useEffect } from "react";
function Client({ userInfo, setActiveSection }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <main className="container mx-auto my-10 px-4">
        <div className="bg-white p-8 shadow-lg rounded text-center max-w-md mx-auto">
          <img
            src={userInfo?.data ? userInfo.data.photo : "Loading..."}
            alt="Client"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold">
            {userInfo?.data ? userInfo.data.name : "Loading..."}
          </h3>
          <p className="text-gray-600">
            @{userInfo?.data ? userInfo.data.username : "Loading..."}
          </p>
          <p className="text-gray-600">
            {userInfo?.data ? userInfo.data.email : "Loading..."}
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
            onClick={() => setActiveSection("setting")}
          >
            Go to Settings
          </button>
        </div>
      </main>
    </div>
  );
}

export default Client;
