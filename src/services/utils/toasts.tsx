import { toastMessages } from '@services/types/constants/by-id';
import { Angry } from 'lucide-react';
import { toast } from 'sonner';

export function SubmitContent({ isAuthenticated, messages }: { isAuthenticated: boolean; messages: toastMessages }) {
  if (!isAuthenticated) {
    toast.error(messages.noAuth.title, {
      description: messages.noAuth.description,
    });
    return;
  }
  toast.success(messages.success.title, {
    description: messages.success.description,
  });
}

export function handleDeleteContent({ messages }: { messages: toastMessages }) {
  toast.error(messages.delete.title, {
    icon: <Angry />,
    description: messages.delete.description,
    classNames: {
      title: 'ml-2',
      description: 'ml-2',
    },
  });
}
