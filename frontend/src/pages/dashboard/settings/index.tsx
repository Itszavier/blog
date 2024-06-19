/** @format */

//** @format */
import style from "./style.module.css";
import { useAuth } from "../../../context/auth";
import { serverAxios } from "../../../api/axios";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import SocialInput from "../socialsInput";
import { ButtonLoader } from "../../../components/loading";
import UsernameInput from "../usernameInput";
import { z } from "zod";

import { GoAlertFill } from "react-icons/go";
import { isAxiosError } from "axios";

const defaultUrl =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

export const ProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must only contain letters, numbers, and underscores"
    ),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must not exceed 50 characters"),
  bio: z.string().max(160, "Bio must not exceed 160 characters").optional(),
});
interface UserState {
  name: string;
  username: string;
  bio: string;
  socials: string[];
}
export default function ProfileTab() {
  const auth = useAuth();

  const [user, setUser] = useState<UserState>({
    name: auth.user?.name || "",
    username: auth.user?.username || "",
    bio: auth.user?.bio || "",
    socials: auth.user?.socials || [],
  });
  const [file, setFile] = useState<File | null>(null);
  const [validationsErrors, setValidationErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Access the selected file from the event

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSocialCreate = (createdValue: string) => {
    setUser((prev) => {
      return { ...prev, socials: [createdValue, ...prev.socials] };
    });
  };

  const handleSocialRemove = (removedValue: string) => {
    setUser((prev) => {
      return { ...prev, socials: prev.socials.filter((value) => value != removedValue) };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = (): boolean => {
    const data = { username: user.username, bio: user.bio, name: user.name };
    const { success, error } = ProfileSchema.safeParse(data);

    if (!success) {
      const errors: { [key: string]: string } = {};

      error.errors.forEach((err) => {
        if (err.path) {
          errors[err.path[0]] = err.message;
        }
      });

      setValidationErrors(errors);

      return false;
    }

    setValidationErrors({});
    return true;
  };

  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);

      // Cleanup URL object
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setFilePreview(null);
    }
  }, [file]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!isFormValid()) {
      return setLoading(false);
    }

    try {
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("username", user.username);
      formData.append("bio", user.bio);
      formData.append("socials", JSON.stringify(user.socials));

      if (file) {
        formData.append("profileImage", file);
      }

      const response = await serverAxios.post(
        "/user/update/profile",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setError(null);
      setValidationErrors({});

      setSuccessMessage(response.data.message);
      const id = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUrl = () => {
    if (filePreview) {
      return filePreview;
    }

    if (auth.user!.profileImage.url.length > 0) {
      return auth.user!.profileImage.url;
    }

    return defaultUrl;
  };

  return <div className={style.container}>
    
  </div>;
}
