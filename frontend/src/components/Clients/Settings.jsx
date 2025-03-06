// import { useState } from "react";

import axios from "axios";
import { useEffect, useState } from "react";

const Settings = ({ userInfo, setUserInfo }) => {
  // const handleChange = (e) => {
  //   setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Settings updated successfully!");
  // };

  // const uploadProfileImage = async (e) => {
  //   e.preventDefault();
  //   if (!photo) {
  //     alert("Please select an image!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("photo", photo);

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/users/${
  //         userInfo?.data ? userInfo.data.id : "Loading..."
  //       }/upload/users`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to upload image");
  //     }

  //     const updatedUser = await response.json();
  //     setUserInfo(updatedUser);
  //     alert("Profile image updated successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to upload image. Please try again.");
  //   }
  // };

  // const [first_name, setFirst_name] = useState(
  //   userInfo?.data ? userInfo.data.prenom : "Loading..."
  // );
  // const [iduser, setiduser] = useState(
  //   userInfo?.data ? userInfo.data.id : "Loading..."
  // );

  // const [last_name, setLastname] = useState(
  //   userInfo?.data ? userInfo.data.name : "Loading..."
  // );
  // const [Username, setUsername] = useState(
  //   userInfo?.data ? userInfo.data.username : "Loading..."
  // );
  // const [email, setEmail] = useState(
  //   userInfo?.data ? userInfo.data.email : "Loading..."
  // );
  // const [photo, setPhoto] = useState(
  //   userInfo?.data ? userInfo.data.photo : "Loading..."
  // );
  const [errors, setErrors] = useState({});

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("prenom", first_name);
  //   formData.append("name", last_name);
  //   formData.append("username", Username);
  //   formData.append("email", email);
  //   if (photo) {
  //     formData.append("image", photo);
  //   }
  //   // استخدام method spoofing لتحديث (PUT)
  //   formData.append("_method", "PUT");
  //   let text = "Are you sure to update your inforamtion.";
  //   if (confirm(text) == true) {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8000/api/userss/${
  //           userInfo?.data ? userInfo.data.id : "Loading..."
  //         }`,
  //         formData,
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         }
  //       );
  //       console.log("user update successe:", response.data);
  //       alert("user update successe");
  //     } catch (error) {
  //       console.error("user update error:", error);
  //       alert("user update error");
  //       if (error.response && error.response.data.errors) {
  //         setErrors(error.response.data.errors);
  //       }
  //     }
  //   } else {
  //     alert("update information cancel");
  //   }
  // };
  // const UpdatePhoto = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   if (photo) {
  //     formData.append("image", photo);
  //   }
  //   // استخدام method spoofing لتحديث (PUT)
  //   formData.append("_method", "PUT");
  //   let text = "Are you sure to update your inforamtion.";
  //   if (confirm(text) == true) {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8000/api/userss/${iduser}`,
  //         formData,
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         }
  //       );
  //       console.log("user update successe:", response.data);
  //       alert("user update successe");
  //     } catch (error) {
  //       console.error("user update error:", error);
  //       alert("user update error");
  //       if (error.response && error.response.data.errors) {
  //         setErrors(error.response.data.errors);
  //       }
  //     }
  //   } else {
  //     alert("update information cancel");
  //   }
  // };
  //upload images
  // const [image, setImage] = useState(null);
  // const [message, setMessage] = useState("");

  // وظيفة لاختيار الصورة
  // const handleImageChange = (event) => {
  //   setImage(event.target.files[0]);
  // };

  // // وظيفة إرسال الصورة إلى الخادم
  // const handleUpdateImage = async (event) => {
  //   event.preventDefault();

  //   if (!image) {
  //     setMessage("يرجى اختيار صورة أولاً");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", image);

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/userss/update-profile-im/${userInfo.data.id}`,
  //       formData,
  //       {
  //         headers: {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         },
  //       }
  //     );

  //     setMessage(response.data.message); // عرض رسالة النجاح
  //   } catch (error) {
  //     setMessage(error.response?.data?.error || "حدث خطأ أثناء التحديث");
  //   }
  // };

  // حالات تحديث منتج
  const [updatename, setupdatename] = useState("");
  const [updateprenom, setupdateprenom] = useState("");
  const [updateemail, setupdateemail] = useState("");
  const [updateusername, setupdateusername] = useState("");
  const [updateimage, setupdateImage] = useState(null);
  const [updateiduser, setupdateiduser] = useState(null);

  useEffect(() => {
    if (userInfo.data) {
      setupdatename(userInfo.data.name || "");
      setupdateprenom(userInfo.data.prenom || "");
      setupdateemail(userInfo.data.email || "");
      setupdateusername(userInfo.data.username || "");
      setupdateImage(userInfo.data.photo);
      setupdateiduser(userInfo.data.id);
    }
  }, [userInfo.data]);

  // const handleUpdateProduct = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("name", updatename);
  //   formData.append("prenom", updateprenom);
  //   formData.append("email", updateemail);
  //   formData.append("username", updateusername);
  //   if (updateimage) {
  //     formData.append("photo", updateimage);
  //   }
  //   // استخدام method spoofing لتحديث (PUT)
  //   formData.append("_method", "PUT");

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/api/userss/${updateiduser}`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     console.log("تم تحديث المنتج:", response.data);
  //     alert("تم تحديث المنتج");

  //     // يمكنك هنا إعادة تحميل القائمة أو تحديث الحالة حسب الحاجة
  //   } catch (error) {
  //     console.error("حدث خطأ أثناء تحديث المنتج:", error);
  //     alert("حدث خطأ أثناء تحديث المنتج");
  //     if (error.response && error.response.data.errors) {
  //       setErrors(error.response.data.errors);
  //     }
  //   }
  // };

  // const handleUpdateProduct = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();

  //   // إضافة القيم الجديدة فقط إذا كانت موجودة
  //   if (updatename) formData.append("name", updatename);
  //   if (updateprenom) formData.append("prenom", updateprenom);
  //   if (updateemail) formData.append("email", updateemail);
  //   if (updateusername) formData.append("username", updateusername);

  //   // إضافة الصورة الجديدة إذا كانت موجودة
  //   if (updateimage) {
  //     formData.append("photo", updateimage);
  //   }

  //   // استخدام method spoofing لتحديث (PUT)
  //   formData.append("_method", "PUT");

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/api/userss/${updateiduser}`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     console.log("تم تحديث المنتج:", response.data);
  //     alert("تم تحديث المنتج");

  //     // يمكنك هنا إعادة تحميل القائمة أو تحديث الحالة حسب الحاجة
  //   } catch (error) {
  //     console.error("حدث خطأ أثناء تحديث المنتج:", error);
  //     alert("حدث خطأ أثناء تحديث المنتج");
  //     if (error.response && error.response.data.errors) {
  //       setErrors(error.response.data.errors);
  //     }
  //   }
  // };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // إضافة القيم الجديدة فقط إذا كانت موجودة
    if (updatename) formData.append("name", updatename);
    if (updateprenom) formData.append("prenom", updateprenom);
    if (updateemail) formData.append("email", updateemail);
    if (updateusername) formData.append("username", updateusername);

    // إضافة الصورة الجديدة إذا كانت موجودة
    if (updateimage) {
      formData.append("photo", updateimage);
    }

    // استخدام method spoofing لتحديث (PUT)
    formData.append("_method", "PUT");

    try {
      const response = await axios.post(
        `http://localhost:8000/api/userss/${updateiduser}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("تم تحديث المنتج:", response.data);
      alert("تم تحديث المنتج");

      // يمكنك هنا إعادة تحميل القائمة أو تحديث الحالة حسب الحاجة
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث المنتج:", error);

      if (error.response && error.response.data.errors) {
        // طباعة الأخطاء القادمة من الخادم
        console.log("الأخطاء من الخادم:", error.response.data.errors);
        setErrors(error.response.data.errors);
        alert("الرجاء التأكد من صحة البيانات المدخلة.");
      } else {
        alert("حدث خطأ غير متوقع.");
      }
    }
  };

  return (
    <div>
      {/* Settings Form */}
      <main className="container mx-auto  flex justify-center">
        <div className="bg-white p-10 shadow-2xl rounded-lg text-center max-w-md mx-auto mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Update Profile
          </h2>
          <form className="space-y-6" onSubmit={handleUpdateProduct}>
            {/* Group 1: Name and Prenom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Name:
                </label>
                <input
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  type="text"
                  value={updatename}
                  onChange={(e) => setupdatename(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Prenom:
                </label>
                <input
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  type="text"
                  value={updateprenom}
                  onChange={(e) => setupdateprenom(e.target.value)}
                  placeholder="Enter your prenom"
                />
              </div>
            </div>

            {/* Group 2: Username and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Username:
                </label>
                <input
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  type="text"
                  value={updateusername}
                  onChange={(e) => setupdateusername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Email:
                </label>
                <input
                  className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  type="email"
                  value={updateemail}
                  onChange={(e) => setupdateemail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <img
                  src={updateimage}
                  // src={userInfo?.photo || "default-profile.png"}
                  alt="Client"
                  className="h-10 mr-4 rounded-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Image:
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                  onChange={(e) => setupdateImage(e.target.files[0])}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;
