/** @format */
import UsernameInput from "../../usernameInput";
import SocialInput from "../../socialsInput";
import style from "./style.module.css";
import { useAuth } from "../../../../context/auth";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { isAxiosError } from "axios";
import { serverAxios } from "../../../../api/axios";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .optional(),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(12, "Username must be at most 12 characters long")
    .optional(),
  occupation: z
    .string()
    .min(1, { message: "Occupation must be at least 1 character long" })
    .optional(),
  bio: z
    .string()
    .min(5, { message: "Bio must be at least 5 characters long" })
    .max(150, { message: "Bio must be at most 150 characters long" }),
  socials: z.array(z.string()).max(3, "You can only have must 3 socials").optional(),
  pronouns: z
    .string()
    .min(1, { message: "Pronouns must be at least 1 character long" })
    .optional(),
});

interface InitialState {
  name: string;
  username: string;
  bio: string;
  socials: string[];
  occupation: string;
  pronouns: string;
  file: File | null;
}

export default function AccountSettings() {
  const auth = useAuth();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [userState, setUserState] = useState<InitialState>(() => {
    return {
      name: auth.user?.name || "",
      username: auth.user?.username || "",
      bio: auth.user?.bio || "",
      socials: auth.user?.socials || [],
      occupation: auth.user?.occupation || "",
      pronouns: auth.user?.pronouns || "",
      file: null,
    };
  });

  useEffect(() => {
    if (userState.file) {
      URL.createObjectURL(userState.file);
    }

    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [userState.file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    setErrors({});
    try {
      const data = FormSchema.parse(userState);
      const responseData = await saveUserData({ ...data, file: userState.file });
      // Handle successful submission
      auth.setUser(responseData.user);
      toast.success("Account settings updated successfully!", {
        theme: "dark",
        delay: 2000,
        position: "top-right",
      });
    } catch (error: any) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message || "something went wrong", {
          theme: "dark",
          delay: 2000,
          position: "top-right",
        });
      }

      if (z.instanceof(error)) {
        // Handle Zod validation errors
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join(".");
          validationErrors[path] = err.message;
        });
        setErrors(validationErrors);
        toast.error("Vaildation error review article information for more details");
      } else {
        toast.error(
          "Failed to publish Article. Please check your internet connection and try again.",
          { theme: "dark", delay: 2000, position: "top-right" }
        );
      }
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== undefined) {
      setUserState((prev: any) => {
        return { ...prev, file: file };
      });
    }
  };

  const handleSocialCreate = (value: string[]) => {
    setUserState((prev) => ({ ...prev, socials: value }));
  };

  const handleSocialRemove = (value: string[]) => {
    setUserState((prev) => ({ ...prev, socials: value }));
  };

  const ErrorComponent: React.FunctionComponent<{
    field: keyof typeof userState;
  }> = (props) => {
    if (errors[props.field]) {
      return <p className={style.error_message}>{errors[props.field]}</p>;
    } else {
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <ToastContainer />
      <div className={style.input_group}>
        <div className={`form-group  ${style.input_wrapper} `}>
          <div className={style.profile_image_container}>
            {filePreview ? (
              <img className={style.preview_image} src={filePreview} alt="" />
            ) : (
              auth.user?.profileImage &&
              auth.user?.profileImage.url.length > 0 && (
                <img
                  className={style.preview_image}
                  src={auth.user?.profileImage.url}
                  alt=""
                />
              )
            )}
            <input className={style.file_input} type="file" />
          </div>
        </div>{" "}
        <div className="flex row pad-10 ">
          <div className={`form-group ${style.input_wrapper}`}>
            <label>name</label>
            <input
              value={userState.name}
              name="name"
              onChange={handleChange}
              className={` ${style.input}`}
              type="text"
              placeholder="name"
            />
            {<ErrorComponent field="name" />}
            <p className={style.description}>Enter your full name</p>
          </div>

          <UsernameInput username={userState.username} onChange={handleChange} />
        </div>
        <div className="flex row ">
          <div className="column">
            <div className={`form-group ${style.input_wrapper}`}>
              <label>occupation</label>
              <input
                name="occupation"
                className={`  ${style.input}`}
                placeholder="occupation"
                type="text"
                value={userState.occupation}
                onChange={handleChange}
              />
              {<ErrorComponent field="occupation" />}
              <p className={style.description}>
                Please enter your job title or role to help us understand your
                professional background.
              </p>
            </div>

            <div className={`form-group ${style.input_wrapper}`}>
              <label>Pronouns</label>
              <input
                value={userState.pronouns}
                name={"pronouns"}
                className={`${style.input}`}
                placeholder="Gender"
                onChange={handleChange}
                type="text"
              />
              {<ErrorComponent field="pronouns" />}
              <p className={style.description}></p>
            </div>

            <div className={`form-group ${style.input_wrapper}`}>
              <label>Add Socials</label>
              <SocialInput
                onSocialCreate={handleSocialCreate}
                onSocialRemove={handleSocialRemove}
                socialList={userState.socials}
              />
              {<ErrorComponent field="socials" />}
            </div>
          </div>

          <div>
            <div className={`form-group ${style.input_wrapper}`}>
              <label>bio</label>
              <textarea
                value={userState.bio}
                name={"bio"}
                className={`${style.bio_input}`}
                placeholder="Start writing your bio"
                onChange={handleChange}
              />
              {<ErrorComponent field="bio" />}
              <p className={style.description}>
                Write a short description about yourself
              </p>
            </div>
          </div>
        </div>
        <div>
          <button className={`btn btn-primary ${style.save_btn}`}>Save Changes</button>
        </div>
      </div>
    </form>
  );
}

async function saveUserData(data: {
  bio: string | undefined;
  name?: string | undefined;
  username?: string | undefined;
  occupation?: string | undefined;
  socials?: string[] | undefined;
  pronouns?: string;
  file: any;
}) {
  try {
    const formData = new FormData();

    // Add fields to FormData if they are defined
    if (data.name !== undefined) {
      formData.append("name", data.name);
    }
    if (data.username !== undefined) {
      formData.append("username", data.username);
    }
    if (data.bio !== undefined) {
      formData.append("bio", data.bio);
    }
    if (data.occupation !== undefined) {
      formData.append("occupation", data.occupation);
    }
    if (data.socials !== undefined) {
      formData.append(`socials`, JSON.stringify(data.socials));
    }

    if (data.file) {
      formData.append("profileImage", data.file);
    }
    const response = await serverAxios.put("/user/update/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
/* <SocialInput
            socialList={[
              "https://www.tiktok.com/@your_profile",
              "https://www.tiktok.com/@your_profile",
              "https://www.tiktok.com/@your_profile",
            ]}*/
