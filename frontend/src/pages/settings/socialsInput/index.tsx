/** @format */

import { ChangeEvent, useEffect, useState } from "react";
import style from "./style.module.css";
import { GoAlertFill } from "react-icons/go";
import { IoAddCircle } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";

const error_message =
  "Invalid URL format. Please enter a URL from Instagram, YouTube, or TikTok.";

interface SocialInputProps {
  socialList: string[];
  onSocialCreate?: (url: string) => void;
  onSocialRemove?: (url: string) => void;
}
export default function SocialInput({
  socialList,
  onSocialCreate,
  onSocialRemove,
}: SocialInputProps) {
  const [socials, setSocials] = useState<string[]>(socialList || []);
  const [url, setUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [count, setCount] = useState<number>(socials.length);
  const [profilePreview, setProfilePreview] = useState<string>('')

  useEffect(() => {
    console.log("removed", socials);
  }, [socials]);

  const handleAdd = () => {
    if (errorMessage) {
      return;
    }
    if (socials.includes(url)) {
      return setErrorMessage("Url already added");
    }
    if (count >= 3) {
      setErrorMessage("Socials cannot exceed the maximum limit of 3");
      return;
    }

    const { isSuccess, error } = validateSocialMediaUrl(url);
    if (!isSuccess) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage(null);
    setCount((prev) => prev + 1);
    setSocials((prev) => [...prev, url]);
    if (onSocialCreate) onSocialCreate(url);
    setUrl("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    const { error } = validateSocialMediaUrl(e.target.value);
    setErrorMessage(error);
  };

  const handleRemove = (removedValue: string) => {
    setCount((prev) => prev - 1);
    if (onSocialRemove) onSocialRemove(removedValue);
    setSocials((prev) => {
      return prev.filter((value) => value !== removedValue);
    });
  };

  return (
    <div className={style.social_container}>
      <div className={style.socials_input_wrapper}>
        <label htmlFor="">Add socials</label>
        <div className={style.add_input_container}>
          <input
            type="text"
            value={url}
            className={`${style.input} ${style.add_social_input}`}
            placeholder="https://www.tiktok.com/@your_profile"
            onChange={handleChange}
          />
          <button
            disabled={url.length <= 0}
            type="button"
            onClick={handleAdd}
            className={style.add_btn}
          >
            <IoAddCircle size={20} />
            <span>{count}/3</span>
          </button>
        </div>
        {errorMessage && (
          <p className={style.error_message}>
            {errorMessage} <GoAlertFill />
          </p>
        )}
      </div>

      <div className={style.socials}>
        {socials.map((social, index) => (
          <Social key={index} social={social} handleRemove={() => handleRemove(social)} />
        ))}
      </div>
    </div>
  );
}

// Social Component
interface SocialProps {
  social: string;
  handleRemove: () => void;
}

function Social({ social, handleRemove }: SocialProps) {
  return (
    <div className={style.social}>
      <p>{social}</p>
      <button onClick={handleRemove} className={style.remove_btn}>
        <CiCircleRemove />
      </button>
    </div>
  );
}

const validateSocialMediaUrl = (url: string) => {
  const patterns: { [key: string]: RegExp } = {
    instagram: /https?:\/\/(www\.)?instagram\.com\/.+/,
    youtube: /https?:\/\/(www\.)?youtube\.com\/.+/,
    tiktok: /https?:\/\/(www\.)?tiktok\.com\/.+/,
  };

  let success = "";
  let error = error_message;

  for (const platform in patterns) {
    if (patterns[platform].test(url)) {
      success = `Valid ${platform} URL`;
      error = "";
      break;
    }
  }

  return { isSuccess: success.length > 0, error, success };
};
