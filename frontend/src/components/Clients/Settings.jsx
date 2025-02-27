// import { useState } from "react";

import { useState } from "react";

const Settings = ({ userInfo, setUserInfo }) => {
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };
  const [photo, setPhoto] = useState(null);

  const uploadProfileImage = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${
          userInfo?.data ? userInfo.data.id : "Loading..."
        }/upload/users`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const updatedUser = await response.json();
      setUserInfo(updatedUser);
      alert("Profile image updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Please try again.");
    }
  };
  return (
    <div className="pt-20">
      {/* Settings Form */}
      <main className="container mx-auto my-10 px-4 flex justify-center">
        <div className="bg-white p-8 shadow-lg rounded w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Update Your Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Profile Photo</label>
              <div className="photoClientm">
                <img
                  src={userInfo?.data ? userInfo.data.photo : "Loading..."}
                  alt={userInfo?.data ? userInfo.data.username : "Loading..."}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <div>
                  <form onSubmit={uploadProfileImage}>
                    <label>Upload Profile Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    <button type="submit" className="btn btn-primary">
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="name"
                value={userInfo?.data ? userInfo.data.name : "Loading..."}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="prenom"
                value={userInfo?.data ? userInfo.data.prenom : "Loading..."}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={userInfo?.data ? userInfo.data.username : "Loading..."}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo?.data ? userInfo.data.email : "Loading..."}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={userInfo?.data ? userInfo.data.password : "Loading..."}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded shadow"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;
