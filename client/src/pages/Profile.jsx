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
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

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
    try {
      dispatch(updateStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
    } catch (error) {
      dispatch(updateFailure(error.message));
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
      </form>
      {error && <p className="text-red-700 mt-3">{error.message}</p>}
      <div className="flex justify-between mt-5">
        <span className="text-red-700 font-semibold cursor-pointer hover:shadow-xl">
          Delete account
        </span>
        <span className="text-red-700 font-semibold cursor-pointer hover:shadow-xl">
          Sign out
        </span>
      </div>
    </div>
  );
}
