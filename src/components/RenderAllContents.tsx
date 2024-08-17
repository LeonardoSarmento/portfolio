import { LinkOptions } from '@tanstack/react-router';
import { PostType } from '@services/types/Post';
import { ContentCardComponent } from './ContentCardComponent';

export function RenderAllContents({
  contents,
  path,
  editPath,
  URL,
}: {
  contents: PostType[];
  path: LinkOptions;
  editPath: LinkOptions;
  URL: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-4">
      {contents.length > 0
        ? contents.map((content, index) => (
            <ContentCardComponent
              key={content.id}
              content={content}
              index={index}
              path={path}
              dropdownMenu
              URL={URL}
              editPath={editPath}
              className="mb-4 w-64"
            />
          ))
        : null}
    </div>
  );
}
