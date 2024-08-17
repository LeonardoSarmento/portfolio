export type TShareComponent = {
  button: { title: string };
  card: { title: string; description: string; label: string; buttonAlt: string };
};
export type TByIdComponent = {
  shareComponent: TShareComponent;
  breadcrumb: { title: string };
  buttons: { edit: string; goBack: string };
};
export type TInputType = { label: string; placeholder: string };
export type THeaderFormContent = {
  title: TInputType;
  description: TInputType;
  tags: TInputType & { notfound: string };
  buttons: { save: string; goBack: string; destructive: string };
};
export type toastMessages = {
  error: toastMessageContent;
  sucess: toastMessageContent;
  delete: toastMessageContent;
  noAuth: toastMessageContent;
};
export type toastMessageContent = { title: string; description: string };
export type THeaderCardContent = {
  title: string;
  thumbnail: { title: string; dropMessage: string };
  form: THeaderFormContent;
  toast: toastMessages;
};
export type TManageMarkdownContent = {
  content: { label: string; placeholder: string; description: string };
  preview: { title: string };
  button: { text: string };
};
