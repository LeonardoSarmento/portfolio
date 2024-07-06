export type AllowedTypes = {
  name: string;
  types: string[];
};

export const ALLOWED_TYPES: AllowedTypes[] = [
  // { name: 'csv', types: ['text/csv'] },
  // {
  //   name: 'excel',
  //   types: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  // },
  { name: 'image/png', types: ['image/png'] },
  // { name: 'pdf', types: ['application/pdf'] },
  // { name: 'md', types: ['text/markdown'] },
  // { name: 'json', types: ['application/json'] },
];
