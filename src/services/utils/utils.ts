import { copyToClipboard } from '@components/CodeCopyButton';
import { ALLOWED_TYPES, AllowedTypes } from '@services/types/AllowedFiles';
import { toastMessages } from '@services/types/constants/by-id';
import { EditPublicationType } from '@services/types/Publication';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { saveAs } from 'file-saver';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ScrollToTopSmooth() {
  return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

export function getRandomNumberWithDecimals(min = 0, max = 20000): number {
  // Ensure min is less than or equal to max
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value.');
  }

  // Generate random float between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the random decimal to the desired range (min to max)
  const scaled = randomDecimal * (max - min);

  // Multiply by 100 to get two decimal places, then round
  const withDecimals = Math.round(scaled * 100) / 100;

  // Add the minimum value to get the final random number within range
  return withDecimals + min;
}

export function CopyToClipboardRoute({ url, messages }: { url: string; messages: toastMessages['share'] }) {
  try {
    copyToClipboard(url);
    toast.success(messages.success.title, { description: messages.success.description });
  } catch (error) {
    toast.error(messages.error.title, { description: messages.error.description });
  }
}

export function getAllowedMimeTypes(allowedTypes: AllowedTypes[]): string {
  // Combine all MIME types from each allowed type into a single array
  const allMimeTypes = allowedTypes.flatMap((type) => type.types);

  // Join the MIME types into a comma-separated string
  return allMimeTypes.join(', ');
}

export function handleOnDrop(acceptedFiles: FileList | null, form: UseFormReturn<EditPublicationType>) {
  console.log('acceptedFiles: ', acceptedFiles);
  if (acceptedFiles && acceptedFiles.length > 0) {
    const fileType = ALLOWED_TYPES.find((allowedType) =>
      allowedType.types.find((type) => type === acceptedFiles[0].type),
    );
    console.log('fileType', fileType);
    if (!fileType) {
      form.setValue('file', null);
      form.setError('file', {
        message: 'File type is not valid',
        type: 'typeError',
      });
    } else {
      form.setValue('file', acceptedFiles[0]);
      form.clearErrors('file');
    }
  } else {
    form.setValue('file', null);
    form.setError('file', {
      message: 'File is required',
      type: 'typeError',
    });
  }
}

export function createMarkdownFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, `${filename}.md`);
  console.log(`File ${filename} has been created.`);
}
