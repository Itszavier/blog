/** @format */

import { IoSettings } from "react-icons/io5";
import { IUser, useAuth } from "../../context/auth";
import style from "./style.module.css";
import { IFollowersAndFollowing, IMember } from "../../api/types";
import { followUser, unFollowUser } from "../../api/functions";
import { useState } from "react";
import { ImGift } from "react-icons/im";
import { ButtonLoader } from "../loading";

export default function UserProfile({
  member,
  userId,
  setMember,
}: {
  userId: string;
  member: IMember;
  setMember: React.Dispatch<React.SetStateAction<IMember | null>>;
}) {
  const auth = useAuth();
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
  //const [followError, setFollowError] = useState<string | undefined>();

  const handleFollow = async (e: any) => {
    if (!auth.user) return console.log("user is not authencated");

    if (!member) return console.log("member is null", member);

    if (member.followers.some((follower) => follower._id === member._id)) {
      return;
    }

    setIsFollowLoading(true);

    try {
      const response = await followUser(member._id);

      const newFollower: IFollowersAndFollowing = {
        _id: member._id,
        name: member.name,
        bio: member.bio,
        profileImage: member.profileImage,
        username: member.username,
      };

      setMember((prev) => {
        // Ensure prev is not null, then spread its properties and update the followers array

        return { ...prev, followers: [...prev!.followers, newFollower] } as IMember;
      });

      auth.setUser((prev) => {
        return { ...prev, following: [...prev!.following, member._id] } as IUser;
      });

      setIsFollowLoading(false);

      console.log(response);
    } catch (error) {
      console.log(error);
      setIsFollowLoading(false);
    }
  };

  const handleUnFollow = async (e: any) => {
    if (!auth.user) return console.log("user is not authencated");
    if (!member) return console.log("member is null", member);
    //check if the current user is following the user
    if (!auth.user.following.includes(member._id)) {
      return console.log("your not following this user");
    }

    setIsFollowLoading(true);

    try {
      const response = await unFollowUser(member._id);
      setMember((prev) => {
        // Ensure prev is not null, then spread its properties and update the followers array
        return {
          ...prev,
          followers: prev?.followers.filter((follower) => {
            follower._id !== member._id;
          }),
        } as IMember;
      });

      auth.setUser((prev) => {
        return {
          ...prev,
          following: prev!.following.filter((followingUserId) => {
            return followingUserId !== member._id;
          }),
        } as IUser;
      });
      setIsFollowLoading(false);
      console.log(response);
    } catch (error) {
      setIsFollowLoading(false);
      console.log(error);
    }
  };

  const DisplayFollowButton = () => {
    if (!auth.user) {
      return <button className={style.button}>Follow</button>;
    }

    if (auth.user._id === member._id) {
      return null;
    }
    const isUserFollowingMember = auth.user.following.includes(member._id);

    if (!isUserFollowingMember) {
      return (
        <button
          disabled={isFollowLoading}
          onClick={handleFollow}
          className={style.button}
        >
          {isFollowLoading ? <ButtonLoader /> : "Follow"}
        </button>
      );
    } else {
      return (
        <button
          disabled={isFollowLoading}
          onClick={handleUnFollow}
          className={`${style.button}  ${
            isUserFollowingMember ? style.following_active : ""
          }`}
        >
          {isFollowLoading ? <ButtonLoader /> : "Following"}
        </button>
      );
    }
  };

  return (
    <div className={style.profile_card}>
      <div className={style.profile_info_container}>
        <div className={`${style.data_wrapper} ${style.profile_info}`}>
          <img
            className={style.profileImage}
            src={member.profileImage}
            width={50}
            height={50}
          />
          <span>{member.name}</span>
        </div>
        <div className={style.data_wrapper}>
          <p>
            <strong>0</strong>
          </p>
          <span>Posts</span>
        </div>
        <div className={style.data_wrapper}>
          <p>
            <strong>{member.followers.length}</strong>
          </p>
          <span>followers</span>
        </div>
        <div className={style.data_wrapper}>
          <p>
            <strong>{member.following.length}</strong>
          </p>
          <span>following</span>
        </div>
      </div>
      <div className={style.body}>
        <div>
          <p className={style.bio}>
            {member.bio} I am a programmer writer and ddddadasdasd
          </p>
        </div>
        <div className={style.button_container}>
          <DisplayFollowButton />
          {member._id === auth.user?._id && (
            <>
              <button className={style.button}>Share</button>
              <button className={style.button}>
                <IoSettings size={15} />
              </button>
            </>
          )}
        </div>

        <div className={style.following_container}>
          {member.following.map((following) => {
            return (
              <div>
                <img src={following.profileImage} alt="" width={20} height={20} />
                <span>{following.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
