/** @format */

import { IoSettings } from "react-icons/io5";
import { IUser, useAuth } from "../../context/auth";
import style from "./style.module.css";
import { IFollowersAndFollowing, IMember } from "../../api/types";
import { followUser, unFollowUser } from "../../api/functions";
import { useState } from "react";
import { ImGift } from "react-icons/im";
import { ButtonLoader } from "../loading";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface IUserProfileProps {
  userId: string;
  member: IMember;
  setMember: React.Dispatch<React.SetStateAction<IMember | null>>;
}

export default function UserProfile(props: IUserProfileProps) {
  const auth = useAuth();
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
  const [member, setMember] = useState(() => props.member);
  const navigate = useNavigate();
  // const toast = useToast();

  const handleFollow = async (e: any) => {
    if (!auth.user) {
      return;
    }

    if (!member) {
      return;
    }

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
        profileImage: member.profileImage.url,
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
        <Button
          bg={"black"}
          color={"white"}
          _hover={{ bg: "#121313" }}
          disabled={isFollowLoading}
          onClick={handleFollow}
          className={style.button}
        >
          {isFollowLoading ? <ButtonLoader /> : "Follow"}
        </Button>
      );
    } else {
      return (
        <Button
          disabled={isFollowLoading}
          onClick={handleUnFollow}
          className={`${style.button}  ${
            isUserFollowingMember ? style.following_active : ""
          }`}
        >
          {isFollowLoading ? <ButtonLoader /> : "Following"}
        </Button>
      );
    }
  };

  return (
    <Box
      p={"10px"}
      w={["100%", "100%", "100%"]}
      h={["290px", "255px"]}
      mt={"10"}
      boxShadow={"md"}
    >
      <Box padding={4}>
        <Flex alignItems={"center"} flexDirection={["column", "row", "row"]}>
          <Avatar
            mr={"4"}
            name={member.username}
            src={member.profileImage.url}
            size={"xl"}
          />
          <Flex direction={"column"} gap={2}>
            <Text
              color={"light.accent"}
              display={"flex"}
              alignItems={"center"}
              fontSize={"17px"}
              fontWeight={"bold"}
              textAlign={["center", "unset"]}
              m={0}
            >
              <span style={{ fontSize: "17px" }}>@</span>
              {member.username}
            </Text>
            <Text
              textAlign={["center", "unset"]}
              fontSize={"13px"}
              m={0}
              width={["100%", "245px"]}
            >
              {member.bio || "I Am a Programmer"}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex justifyContent={["center", "normal"]} gap={8} padding={4} direction={"row"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} m={0}>
            {member.following.length}
          </Text>
          <Text m={0}>Posts</Text>
        </Flex>

        <Flex gap={2}>
          <Text fontWeight={"bold"} m={0}>
            {member.followers.length}
          </Text>
          <Text m={0}>Followers</Text>
        </Flex>

        <Flex gap={2}>
          <Text fontWeight={"bold"} m={0}>
            0
          </Text>
          <Text m={0}>Following</Text>
        </Flex>
      </Flex>
      <HStack mt={2} pl={4}>
        {auth.user?._id === member._id ? (
          <IconButton
            bg={"black"}
            color={"white"}
            aria-label={"Settings"}
            w={"85px"}
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            icon={<SettingsIcon />}
          />
        ) : (
          ""
        )}
        <DisplayFollowButton />
        <Button colorScheme="blue">Share</Button>
      </HStack>
    </Box>
  );
}
