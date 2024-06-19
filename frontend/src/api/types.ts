/** @format */

export interface IPost {
  _id: string;
  type: string;
  title: string;
  subtitle: string;
  description?: string;
  tags: string[];
  author: {
    _id: string;
    username: string;
    profileImage: {
      id: string;
      storage: string;
      url: string;
    };
    name: string;
  };
  content: {
    html: string;
  };

  heroImage?: {
    storage: string; // ("cloud" us)| "google" ...
    url: string;
    id: string;
  };
  likes: string[];
  dislikes: string[];
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface IFollowersAndFollowing {
  _id: string;
  name: string;
  username: string;
  bio?: string;
  profileImage: string;
}

export interface IMember {
  _id: string;
  name: string;
  username: string;
  profileImage: {
    id: string;
    storage: string;
    url: string;
  };
  bio?: string;
  bannerUrl?: string;
  followers: IFollowersAndFollowing[];
  following: IFollowersAndFollowing[];
}
