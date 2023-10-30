import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-5 border shadow-xl mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5" encType="multipart/form-data">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          type="file"
          ref={fileRef}
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          className="rounded-full w-30 h-30 object-cover cursor-pointer self-center mb-5"
          alt="profile"
        />

        <input
          type="text"
          name="username"
          id="username"
          className="border rounded-lg p-3"
          placeholder="username"
        />
        <input
          type="text"
          name="email"
          id="email"
          className="border rounded-lg p-3"
          placeholder="email"
        />
        <input
          type="text"
          name="password"
          id="password"
          className="border rounded-lg p-3"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:scale-95 hover:opacity-90">
          Update
        </button>
      </form>
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
