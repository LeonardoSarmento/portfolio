import { posts_pt_br as PostsPtBR } from '@assets/data/pt-BR/posts';
import { posts_en_us as PostsEnUS } from '@assets/data/en-US/posts';
import { TAGS_OPTIONS_POSTS } from '@constants/tags';
import { FilterType } from '@services/types/Filters';

export class PostNotFoundError extends Error {}

export const fetchPost = async ({ postId, language }: { postId: string; language: string }) => {
  console.log(`Fetching post with id ${postId}...`);
  // await new Promise((r) => setTimeout(r, 500));
  const posts = language === 'pt-BR' ? PostsPtBR : PostsEnUS;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    throw new PostNotFoundError(`Post with id "${postId}" not found!`);
  } else {
    return post;
  }
};

export const fetchPosts = async (language: string) => {
  console.log('Fetching posts...');
  // await new Promise((r) => setTimeout(r, 500));
  const posts = language === 'pt-BR' ? PostsPtBR : PostsEnUS;
  return posts;
};

export const fetchPostsWithFilter = async (
  { tags, pageSize = '100', title, views, page = '1' }: FilterType,
  language: string,
) => {
  console.log('Fetching posts with filters...');
  // await new Promise((r) => setTimeout(r, 500));
  console.log('tags: ', { tags, pageSize, title, views, page });

  const posts = language === 'pt-BR' ? PostsPtBR : PostsEnUS;

  const offset = (+page - 1) * (pageSize ? +pageSize : posts.length);

  console.log(offset);

  let filteredPosts = posts;

  if (title) {
    const queryTitle = title.toLowerCase();
    filteredPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(queryTitle));
  }

  if (tags && tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) => post.tags?.some((tag) => tags.includes(tag.id)));
  }

  if (pageSize && pageSize !== 'All') {
    const maxPageSize = +pageSize;
    filteredPosts = filteredPosts.slice(offset, offset + maxPageSize);
  } else {
    filteredPosts = filteredPosts.slice(offset);
  }
  console.log(filteredPosts);
  return filteredPosts;
};

export const fetchPostsUrl = async (language: string) => {
  console.log('Fetching posts url...');
  // await new Promise((r) => setTimeout(r, 500));
  const posts = language === 'pt-BR' ? PostsPtBR : PostsEnUS;
  const postsUrl = posts.map((post) => ({ to: post.id, title: post.title }));
  return postsUrl;
};

export const fetchPostsTags = async () => {
  console.log('Fetching tags...');
  // await new Promise((r) => setTimeout(r, 500));
  const tags = TAGS_OPTIONS_POSTS;
  return tags;
};
