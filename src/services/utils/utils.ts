import { copyToClipboard } from '@components/CodeCopyButton';
import { ALLOWED_TYPES, AllowedTypes } from '@services/types/AllowedFiles';
import { EditPostType } from '@services/types/Post';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export function CopyToClipboardRoute(url: string) {
  try {
    copyToClipboard(url);
    toast.success('Link salvo no ctrl+v patrão', { description: `Pediu tá feito, ${url} tá na mão` });
  } catch (error) {
    toast.error('Não foi possível copiar o link', { description: 'Sinto mt falhei fui mlk :(' });
  }
}

export function getAllowedMimeTypes(allowedTypes: AllowedTypes[]): string {
  // Combine all MIME types from each allowed type into a single array
  const allMimeTypes = allowedTypes.flatMap((type) => type.types);

  // Join the MIME types into a comma-separated string
  return allMimeTypes.join(', ');
}

export function handleOnDrop(acceptedFiles: FileList | null, form: UseFormReturn<EditPostType>) {
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
