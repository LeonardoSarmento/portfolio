import { fetchPosts, fetchPostsUrl, fetchPostsWithFilter } from './posts';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { FilterType } from '@services/types/Filters';
import { useTranslation } from 'react-i18next';

export const postsQueryOptions = (language: string) => {
  return queryOptions({
    queryKey: ['posts', { language }],
    queryFn: () => fetchPosts(language),
  });
};

export const postsQueryOptionsWithFilter = ({ tags, title, pageSize, views, page }: FilterType, language: string) => {
  const tagF = tags?.length === 0 && !tags ? 'No-tags' : tags;
  const tiltleF = !title ? 'No-title' : title;
  const viewsF = !views ? 'No-views' : views;
  const pageSizeF = !pageSize ? 'No-pageSize' : pageSize;
  const pageF = !page ? '1' : page;
  return queryOptions({
    queryKey: ['posts', { tagF, tiltleF, pageSizeF, viewsF, pageF }, { language }],
    queryFn: () => fetchPostsWithFilter({ tags, title, pageSize, views, page }, language),
  });
};

export const useQueryPostsUrl = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  return useQuery({
    queryKey: ['posts-url', { language }],
    queryFn: () => fetchPostsUrl(language),
  });
};
