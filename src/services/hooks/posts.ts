import { posts as AllPosts } from '@assets/data/posts';
import { TAGS_OPTIONS } from '@assets/data/posts';
import { FilterType } from '@src/routes/posts.index';

// export type PostType = {
//   id: string;
//   title: string;
//   description: string;
// };

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

export const fetchPostsWithFilter = async ({ tags, count, title, views }: FilterType) => {
  console.log('Fetching posts with filters...');
  await new Promise((r) => setTimeout(r, 500));
  console.log('tags: ', { tags, count, title, views });

  const posts = AllPosts;

  let filteredPosts = posts;

  if (title) {
    const queryTitle = title.toLowerCase();
    filteredPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(queryTitle));
  }

  if (tags && tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) => post.tags?.some((tag) => tags.includes(tag.id)));
  }

  if (count && count !== 'All') {
    const maxCount = +count;
    filteredPosts = filteredPosts.slice(0, maxCount);
  }

  return filteredPosts;
};

export const fetchPostsUrl = async () => {
  console.log('Fetching posts url...');
  await new Promise((r) => setTimeout(r, 500));
  const posts = AllPosts.map((post) => ({ to: post.id, title: post.title }));
  return posts;
};

export const fetchTags = async () => {
  console.log('Fetching tags...');
  await new Promise((r) => setTimeout(r, 500));
  const tags = TAGS_OPTIONS;
  return tags;
};
