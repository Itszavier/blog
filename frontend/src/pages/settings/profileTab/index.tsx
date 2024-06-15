/** @format */

//** @format */
import style from "./style.module.css";
import { useAuth } from "../../../context/auth";
import { serverAxios } from "../../../api/axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

const defaultUrl =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

// Define types for form data and initial data
interface FormData {
  username: string;
  name: string;
  bio: string;
  profileImageFile: File | null;
  imagePreview: string | null;
}

interface InitialData {
  username: string;
  name: string;
  bio: string;
}

export default function ProfileTab() {
  const auth = useAuth();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    bio: "",
    profileImageFile: null,
    imagePreview: null,
  });

  const [initialData, setInitialData] = useState<InitialData>({
    username: "",
    name: "",
    bio: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const { username, name, bio } = auth.user || {};
    setFormData((prevState) => ({
      ...prevState,
      username: username || "",
      name: name || "",
      bio: bio || "",
    }));
    setInitialData({
      username: username || "",
      name: name || "",
      bio: bio || "",
    });
  }, [auth.user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          profileImageFile: file,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const updatedData = new FormData();
    const { name, username, bio, profileImageFile } = formData;
    if (auth.user?.name !== name) updatedData.append("name", name);
    if (auth.user?.username !== username) updatedData.append("username", username);
    if (auth.user?.bio !== bio) updatedData.append("bio", bio);
    if (profileImageFile) updatedData.append("profileImage", profileImageFile);

    try {
      const response = await serverAxios.post("/user/update/profile", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "There was a problem updating your profile. Please try again later."
      );
      setTimeout(() => setError(null), 3000); // Clear error message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  const isFormChanged = (): boolean => {
    const { username, name, bio } = formData;
    const { username: initialUsername, name: initialName, bio: initialBio } = initialData;
    return (
      username !== initialUsername ||
      name !== initialName ||
      bio !== initialBio ||
      formData.profileImageFile !== null
    );
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.header}>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <label>Name</label>
            <input className={style.input} type="text" placeholder="Name" />
            <span>
              {" "}
              This name may appear on your posts. You can turn it off in settings,
            </span>
          </div>

          <div className={style.input_wrapper}>
            <label>Username</label>
            <input className={style.input} type="text" placeholder="username" />
            <span> This username will appear in the URL of your profile.</span>
          </div>

          <div className={style.input_wrapper}>
            <label>Bio</label>
            <textarea className={`${style.input} ${style.bio_input}`} placeholder="bio" />
            <span>
              {" "}
              A short description about yourself. This bio may appear on your profile.
            </span>
          </div>
        </div>

        <div className={style.file_upload_container}>
          <div className={style.preview_wrapper}>
            <img className={style.preview_image} src={defaultUrl} alt="" />
          </div>

          <input className={style.file_upload_input} type="file" />
        </div>
      </div>
    </form>
  );
}
