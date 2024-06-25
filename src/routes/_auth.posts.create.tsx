import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/posts/create')({
  component: CreatePostsComponent,
});

function CreatePostsComponent() {
  return (
    <div className="grid h-dvh max-w-full grid-cols-12 grid-rows-12 gap-4 px-16">
      <div className="grid h-dvh grid-cols-12 grid-rows-4 gap-12 p-2 px-5">
        <p>Create Post</p>
      </div>
    </div>
  );
}
