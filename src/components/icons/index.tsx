import { FileInput, LucideProps, Pencil, Trash2 } from 'lucide-react';

type LucideIconType = LucideProps;
function AccessIcon({ ...props }: LucideIconType) {
  return <FileInput className="text-green-800" {...props} />;
}
function DeleteIcon({ ...props }: LucideIconType) {
  return <Trash2 className="text-destructive" {...props} />;
}
function EditIcon({ ...props }: LucideIconType) {
  return <Pencil className="text-blue-800" {...props} />;
}

export { AccessIcon, DeleteIcon, EditIcon };
