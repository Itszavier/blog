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
    profileImage: string;
    name: string;
  };
  content: {
    html: string;
    text: string;
  };

  heroImage?: {
    storage: string; // ("cloud" us)| "google" ...
    url: string;
    id: string;
  };
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
  profileImage: string;
  bio?: string;
  bannerUrl?: string;
  followers: IFollowersAndFollowing[];
  following: IFollowersAndFollowing[];
}
