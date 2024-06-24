/** @format */

import { string } from "zod";
import { serverAxios } from "./axios";

export async function followUser(userToFollow: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await serverAxios.put("/user/follow", {
        userId: userToFollow,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function unFollowUser(userToFollow: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await serverAxios.put("/user/unfollow", {
        userId: userToFollow,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function likeArticle(Id: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await serverAxios.put(`/article/like/${Id}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function unLikeArticle(Id: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await serverAxios.put(`/article/unlike/${Id}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
