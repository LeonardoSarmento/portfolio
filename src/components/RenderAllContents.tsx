import { LinkOptions } from '@tanstack/react-router';
import { ContentCardComponent } from './ContentCardComponent';
import { PublicationType } from '@services/types/Publication';

export function RenderAllContents({
  contents,
  path,
  editPath,
  URL,
}: {
  contents: PublicationType[];
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
