import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-5 border shadow-xl mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5">
        <img
          src={currentUser.avatar}
          className="rounded-full w-30 h-30 object-cover cursor-pointer self-center mb-5"
          alt="profile"
        />

        <input
          type="text"
          name="username"
          id="username"
          value={currentUser.username}
          className="border rounded-lg p-3"
          placeholder="username"
        />
        <input
          type="text"
          name="email"
          id="email"
          value={currentUser.email}
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
