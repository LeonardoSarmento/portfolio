# Building a Dynamic Data Table with TypeScript, React Table, and Zod

## Introduction

Building a dynamic and flexible data table is a core feature for many modern front-end applications. In this post, I will share how I created the **DataTable** component using **TypeScript**, **@tanstack/react-table**, **Zod**, and **Tailwind CSS**. The **DataTable** provides robust features for filtering, pagination, and state management, making it a powerful tool for building scalable applications. Let me walk you through the development process, the technologies used, and the key features of **DataTable**.

## My Project: DataTable

The **DataTable** component is a highly customizable table solution for managing large datasets in front-end applications. By integrating **@tanstack/react-table** for table management, **react-query** for async state management, **Zod** for type-safe validation, and **Tailwind CSS** for styling, the component offers an advanced and dynamic solution for displaying and interacting with data. The component includes features such as filtering, pagination, and exporting data to CSV.

## Libraries Used in the Project

To build the **DataTable**, I used the following tools and libraries:

- **`TypeScript`**: To ensure strong typing and reliability in the code.
- **`@tanstack/react-table`**: For building powerful and flexible tables with support for filtering, sorting, and pagination.
- **`@tanstack/react-query`**: For handling async state management and API requests.
- **`Zod`**: For declarative and type-safe validation of data.
- **`Tailwind CSS`**: For creating clean, responsive, and customizable designs.
- **`@radix-ui`** & **`@shadcn/ui`**: For reusable UI components.

## Benefits of Using These Tools

1. **Complete Data Management**:  
   **@tanstack/react-table** makes it easy to manage and manipulate large datasets with advanced features like sorting, filtering, and pagination.
2. **Efficient State Management**:  
   **react-query** simplifies async state management, keeping data in sync between the client and server while minimizing the need for boilerplate code.
3. **Type-Safe Validation**:  
   **Zod** ensures that all data validations are type-safe, reducing runtime errors and improving code reliability.
4. **Responsive UI**:  
   **Tailwind CSS** allows for rapid UI development with its utility-first approach, ensuring that the table looks great on all screen sizes.

## Key Features of DataTable

- **Row Actions**: Perform actions such as editing, deleting, or viewing individual rows.
- **Filtering**: Use URL search params for dynamic filtering of table data.
- **Pagination**: Built-in pagination to manage large datasets.
- **Faceted Filters**: Advanced filtering options with multiple criteria.
- **Export to CSV**: Easily export data displayed in the table to CSV format.
- **Customizable Columns**: Dynamically control which columns are visible.
- **Debounced Input**: Optimized handling of input fields to avoid unnecessary API calls.
- **Select All Rows**: Bulk actions available for selected rows.
- **Type-Safe**: Fully type-safe data handling using **Zod** and **TypeScript**.
- **Fake API Integration**: Example API integration to quickly get started with real-world testing.

## How to Use DataTable

Integrating the **DataTable** into your project is straightforward. Follow these steps to get started:

1. Clone the repository:

   ```bash
   git clone https://github.com/LeonardoSarmento/data-table.git
   ```

2. Navigate to the `src/feature/DataTable` directory and import the component:

```tsx
import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import Header from '@components/header';

import DataTable from '@/feature/DataTable/common/data-table';
import { userColumns } from '@/feature/DataTable/users/user-columns';
import { DataTableToolbar } from '@/feature/DataTable/users/user-table-toolbar';
import { queryOptionsUserTable } from '@/feature/DataTable/users/queries/useTableUser';
import { UserFilters } from '@/feature/DataTable/users/types/User';

// Using DataTable component in your application
export const Route = createFileRoute('/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: async ({ context: { queryClient }, deps: filters }) => {
    const userData = await queryClient.ensureQueryData(queryOptionsUserTable(filters));
    return {
      userData,
      crumb: 'User DataTable',
    };
  },
  validateSearch: () => ({}) as UserFilters,
  component: UsersComponent,
});

function UsersComponent() {
  const { userData } = Route.useLoaderData();
  const columns = useMemo(() => userColumns, []);

  return (
    <>
      <Header title="Usuários" description="Listagem de todos os usuários da plataforma" />
      <DataTable data={userData} columns={columns} toolbar={DataTableToolbar} routeId={Route.id} />
    </>
  );
}
```

You can explore more detailed examples in the repository, including how to configure filters, pagination, and async data fetching.

## Conclusion

The **DataTable** component was designed to simplify the development of interactive and flexible tables. By leveraging the power of **react-query**, **Zod**, and **@tanstack/react-table**, I created a solution that handles complex data management tasks with ease. The integration of **Tailwind CSS** ensures the table is both aesthetically pleasing and responsive.

## Try It Out

You can see the **DataTable** component in action through the [online demo](https://datatable.leosarmento.com).

The project repository is available on GitHub: [DataTable Repository](https://github.com/LeonardoSarmento/data-table).

---

### Best regards, from yours Leo, and see you next time!
