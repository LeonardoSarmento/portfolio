// ref: https://philstainer.io/blog/copy-code-button-markdown
// ref: https://ithelp.ithome.com.tw/articles/10302397

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = React.ComponentPropsWithoutRef<'pre'>;

export function CustomPre({ children, className, ...props }: Props) {
  const preRef = useRef<HTMLPreElement>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 1200);

    return () => clearTimeout(timer);
  }, [copied]);

  const onClick = async () => {
    if (preRef.current?.innerText) {
      await copyToClipboard(removeDuplicateNewLine(preRef.current.innerText));
      setCopied(true);
    }
  };
  const { t } = useTranslation('dropdownShare');

  return (
    <div className="group relative">
      <pre {...props} ref={preRef} className={clsx(className, 'focus:outline-none')}>
        <div className="absolute right-0 top-0 m-2 flex items-center rounded-md bg-[#e2e2e4] dark:bg-[#262626]">
          <span
            className={clsx('hidden px-2 text-xs text-green-950 ease-in dark:text-green-400', {
              'group-hover:flex': copied,
            })}
          >
            {t('copy')}
          </span>

          <button
            type="button"
            aria-label="Copy to Clipboard"
            onClick={onClick}
            disabled={copied}
            className={clsx(
              'hidden rounded-md border bg-transparent p-2 transition ease-in focus:outline-none group-hover:flex',
              {
                'border-green-950 dark:border-green-400': copied,
                'border-gray-300 hover:border-gray-400 focus:ring-4 focus:ring-gray-200/50 dark:border-gray-700 dark:hover:border-gray-400':
                  !copied,
              },
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={clsx('pointer-events-none h-4 w-4', {
                'text-gray-700 dark:text-gray-400': !copied,
                'text-green-950 dark:text-green-400': copied,
              })}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                className={clsx({ block: !copied, hidden: copied })}
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                className={clsx({ block: copied, hidden: !copied })}
              />
            </svg>
          </button>
        </div>

        {children}
      </pre>
    </div>
  );
}

// ref: https://philstainer.io/blog/copy-code-button-markdown

export const copyToClipboard = (text: string) => {
  return new Promise((resolve, reject) => {
    if (navigator?.clipboard) {
      const cb = navigator.clipboard;

      cb.writeText(text).then(resolve).catch(reject);
    } else {
      try {
        const body = document.querySelector('body');

        const textarea = document.createElement('textarea');
        body?.appendChild(textarea);

        textarea.value = text;
        textarea.select();
        document.execCommand('copy');

        body?.removeChild(textarea);

        resolve(void 0);
      } catch (e) {
        reject(e);
      }
    }
  });
};

// Workaround to work with rehype-prism-plus generated Pre blog for copy to clipboard feature
export const removeDuplicateNewLine = (text: string): string => {
  if (!text) return text;

  return text
    .replace(/(\r\n\r\n)/gm, `\r\n`)
    .replace(/(\n\n)/gm, `\n`)
    .replace(/(\r\r)/gm, `\r`);
};
