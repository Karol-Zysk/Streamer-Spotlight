import { Platform } from "./enums";

export interface Streamer {
  createdAt: string;
  description: string;
  downvotes: number;
  image: string;
  name: string;
  platform: Platform;
  upvotes: number;
  _id: string;
}
