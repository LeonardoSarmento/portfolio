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
    <div id="render-all-publications-component" className="flex flex-wrap p-10 pt-0 gap-x-4">
      {contents.length > 0
        ? contents.map((content, index) => (
            <ContentCardComponent
              key={`${content.id}-${index}`}
              content={content}
              index={index}
              path={path}
              dropdownMenu
              URL={URL}
              editPath={editPath}
              className="mb-4 xl:w-64 md:w-56 w-full"
            />
          ))
        : null}
    </div>
  );
}
