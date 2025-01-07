export type InteracitvesPageContentType = {
  content: {
    title: string;
    description: string;
    items: {
      title: string;
      cardTitle: string;
      description: string;
      link: string;
    }[];
    button: string;
    notReady: {
      title: string;
      description: string;
      content: {
        title: string;
        description: string;
      };
    };
  };
};
