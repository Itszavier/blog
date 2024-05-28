//** @format */
import style from "./style.module.css";
import { useAuth } from "../../../context/auth";
import { serverAxios } from "../../../api/axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

const defaultUrl = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      setError(error.response?.data?.message || "There was a problem updating your profile. Please try again later.");
      setTimeout(() => setError(null), 3000); // Clear error message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  const isFormChanged = (): boolean => {
    const { username, name, bio } = formData;
    const { username: initialUsername, name: initialName, bio: initialBio } = initialData;
    return username !== initialUsername || name !== initialName || bio !== initialBio || formData.profileImageFile !== null;
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      {error && <p className={style.error_message}><span className="material-icons">error</span> {error}</p>}
      {successMessage && <p className={style.success_message}><span className="material-icons">check_circle</span> {successMessage}</p>}
      <div className={style.form_body}>
        <div className={style.input_group}>
          <span className={style.input_label}>Name:</span>
          <span className={style.input_description}>Update your full name.</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={style.input}
            type="text"
            placeholder="Full name"
          />
        </div>

        <div className={style.input_group}>
          <span className={style.input_label}>Username:</span>
          <span className={style.input_description}>Change your username (unique).</span>
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={style.input}
            type="text"
            placeholder="Username"
          />
        </div>

        <div className={style.input_group}>
          <span className={style.input_label}>Bio:</span>
          <span className={style.input_description}>Edit your bio (max 150 characters).</span>
          <input
            name="bio"
            className={`${style.input} ${style.bio_input}`}
            type="text"
            placeholder="Bio"
            maxLength={150}
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.input_group}>
          <span className={style.input_label}>Profile Image:</span>
          <div className={style.profile_image_container}>
            {formData.imagePreview ? (
              <img src={formData.imagePreview} className={style.profile_image_preview} alt="Profile preview" />
            ) : (
              <img src={auth.user?.profileImage || defaultUrl} className={style.profile_image_preview} alt="Default profile" />
            )}
            <input
              accept="image/*"
              type="file"
              className={style.profile_image_input}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
      <div className={style.form_footer}>
        <button type="submit" disabled={loading || !isFormChanged()}>
          Save changes {loading && <span>....</span>}
        </button>
      </div>
    </form>
  );
}
