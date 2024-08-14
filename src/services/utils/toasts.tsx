import { TOASTMESSAGESCONTENT } from '@constants/by-id-content';
import { Angry } from 'lucide-react';
import { toast } from 'sonner';

export function SubmitContent({ isAuthenticated }: { isAuthenticated: boolean }) {
  if (!isAuthenticated) {
    toast.error(TOASTMESSAGESCONTENT.noAuth.title, {
      description: TOASTMESSAGESCONTENT.noAuth.description,
    });
    return;
  }
  toast.success(TOASTMESSAGESCONTENT.sucess.title, {
    description: TOASTMESSAGESCONTENT.sucess.description,
  });
}

export function handleDeleteContent() {
  toast.error(TOASTMESSAGESCONTENT.delete.title, {
    icon: <Angry />,
    description: TOASTMESSAGESCONTENT.delete.description,
    classNames: {
      title: 'ml-2',
      description: 'ml-2',
    },
  });
}
