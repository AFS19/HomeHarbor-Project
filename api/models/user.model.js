import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_1280.png&tbnid=H6pHpB03ZEAgeM&vet=10CA4QxiAoAWoXChMI2MCQq6-XggMVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&docid=wg0CyFWNfK7o5M&w=1280&h=1280&itg=1&q=profile&ved=0CA4QxiAoAWoXChMI2MCQq6-XggMVAAAAAB0AAAAAEAc",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
