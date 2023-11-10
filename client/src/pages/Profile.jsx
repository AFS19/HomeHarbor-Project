import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOUtFailure,
  signOutSuccess,
  signOutStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    avatar: currentUser.avatar,
  });
  const dispatch = useDispatch();
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFilePerc(progress);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser._id;
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }

      dispatch(updateSuccess(data));
      setUpdateUserSuccess(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    const userId = currentUser._id;
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("api/auth/signout");
      const data = res.json();
      if (data.success === false) {
        dispatch(signOUtFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOUtFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 border shadow-xl mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        encType="multipart/form-data"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          id="avatar"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full h-32 w-32 object-cover cursor-pointer self-center mt-2"
          alt="profile"
        />
        <p className="self-center mb-3">
          {fileUploadError ? (
            <span className="font-sm text-red-700">
              Error image upload (image must be less then 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="font-sm text-gray-500">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 && !fileUploadError ? (
            <span className="font-sm text-green-700">
              Image uploaded successfully
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          name="username"
          id="username"
          className="border rounded-lg p-3"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          id="email"
          className="border rounded-lg p-3"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border rounded-lg p-3"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:scale-95 hover:opacity-90"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:scale-95 hover:opacity-90"
        >
          Create Listing
        </Link>
      </form>
      {error && <p className="text-red-700 mt-3">{error.message}</p>}
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 font-semibold cursor-pointer hover:shadow-xl"
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 font-semibold cursor-pointer hover:shadow-xl"
        >
          Sign out
        </span>
      </div>
      <p className="text-green-700 font-mono mt-4">
        {updateUserSuccess ? "Updated Success!" : ""}
      </p>
      <p className="text-red-700 font-mono mt-4">{error ? error : ""}</p>
    </div>
  );
}
