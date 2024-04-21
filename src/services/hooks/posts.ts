import { posts as AllPosts } from '@assets/data/posts';

export type PostType = {
  id: string;
  title: string;
  description: string;
};

export class PostNotFoundError extends Error {}

export const fetchPost = async (postId: string) => {
  console.log(`Fetching post with id ${postId}...`);
  await new Promise((r) => setTimeout(r, 500));
  const posts = AllPosts;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    throw new PostNotFoundError(`Post with id "${postId}" not found!`);
  } else {
    return post;
  }
};

export const fetchPosts = async () => {
  console.log('Fetching posts...');
  await new Promise((r) => setTimeout(r, 500));
  const posts = AllPosts;
  return posts;
};

export const fetchPostsUrl = async () => {
  console.log('Fetching posts url...');
  await new Promise((r) => setTimeout(r, 500));
  const posts = AllPosts.map((post) => ({ to: post.id, title: post.title }));
  return posts;
};
