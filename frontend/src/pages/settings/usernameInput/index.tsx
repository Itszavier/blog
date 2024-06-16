/** @format */
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { ButtonLoader } from "../../../components/loading";
import { FaCheck } from "react-icons/fa";
import { serverAxios } from "../../../api/axios";
import { GoAlertFill } from "react-icons/go";
import { z } from "zod";

interface usernameInputProps {
  username?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function UsernameInput(props: usernameInputProps) {
  const [initialUsername] = useState(props.username || "");
  const [username, setUsername] = useState(props.username || "");
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (username.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const { available } = await isUsernameAvailable(username);
        console.log(available);
        setIsAvailable(available);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  const renderIcon = () => {
    if (initialUsername == username) {
      return null;
    }
    if (loading) {
      return <ButtonLoader size={18} />;
    }
    if (isAvailable) {
      return <FaCheck className={style.available_input/>;
    }
    return <GoAlertFill className={style.unavailable_alert} />;
  };

  return (
    <div className={style.input_wrapper}>
      <label>Username</label>
      <div className={style.username_input_wrapper}>
        <input
          value={username}
          className={`${style.input} ${style.username_input}`}
          type="text"
          onChange={handleChange}
          placeholder="username"
          name="username"
        />
        {renderIcon()}
      </div>
      {props.error && (
        <p className={style.error_message}>
          {props.error}
          <GoAlertFill />
        </p>
      )}
      <span>This username will appear in the URL of your profile.</span>
    </div>
  );
}

async function isUsernameAvailable(username: string) {
  return new Promise<{ available: boolean; message: string }>(async (resolve, reject) => {
    try {
      const response = await serverAxios.get(`/user/username/isAvailable/${username}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
