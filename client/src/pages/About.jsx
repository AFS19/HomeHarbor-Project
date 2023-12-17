import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaVoicemail,
} from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";

export default function About() {
  return (
    <div className="w-full sm:max-w-2xl mx-auto p-8 border shadow-lg mt-20 rounded-xl">
      <h1 className="text-3xl text-slate-500 text-center p-4 mb-7 font-semibold ">
        About us
      </h1>

      <p className="text-slate-700 text:xs sm:text-md mb-3">
        <span className="text-slate-800 text-md font-semibold underline">
          Home Harbor
        </span>{" "}
        is a leading real estate agency that specializes in helping clients buy,
        sell, and rent properties in the most desirable neighborhoods. Our team
        of experienced agents is dedicated to providing exceptional service and
        making the buying and selling process as smooth as possible.
      </p>

      <p className="text-slate-700 text:xs sm:text-md mb-3">
        Our mission is to help our clients achieve their real estate goals by
        providing expert advice, personalized service, and a deep understanding
        of the local market. Whether you are looking to buy, sell, or rent a
        property, we are here to help you every step of the way.
      </p>

      <p className="text-slate-700 text:xs sm:text-md mb-3">
        Our team of agents has a wealth of experience and knowledge in the real
        estate industry, and we are committed to providing the highest level of
        service to out clients. We believe that buying or selling a property
        should be an exciting and rewarding experience, and we are dedicated to
        making that a reality for each and every one our clients.
      </p>

      <div className="flex gap-8 justify-center items-center pt-7">
        <Link to="www.instagram.com/@home-harbor">
          <FaInstagram className="text-2xl cursor-pointer" />
        </Link>
        <Link to="www.facebook.com/@home-harbor">
          <FaFacebook className="text-2xl cursor-pointer" />
        </Link>
        <Link to="mailto:support@homeharbor.com">
          <AiTwotoneMail className="text-2xl cursor-pointer" />
        </Link>
        <Link to="www.twitter.com/@home-harbor">
          <FaTwitter className="text-2xl cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
