import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-5 max-w-lg mx-auto border m-5 shadow-xl">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-5">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          className="border rounded-lg p-3"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="border rounded-lg p-3"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="border rounded-lg p-3"
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="confirm password"
          className="border rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:scale-95 hover:opacity-90">
          Sign up
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
