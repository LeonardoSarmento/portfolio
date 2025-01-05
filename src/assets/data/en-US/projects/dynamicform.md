# Creating Dynamic Forms with TypeScript, React Hook Form, and Zod

## Introduction

Creating dynamic and highly configurable forms is an essential skill for modern front-end developers. Using **TypeScript**, **react-hook-form**, **Zod**, and **Tailwind CSS**, I built the **DynamicForm**, a highly flexible form component with automatic validation and strong typing. In this post, I'll walk you through the development process, the technologies used, and the key features of **DynamicForm**.

## My Project: DynamicForm

The **DynamicForm** is a solution for building interactive and adaptable forms that cover a wide range of field types and validation rules. By combining **TypeScript**, **react-hook-form**, and **Zod**, it's possible to create secure, valid forms with a clean design. Additionally, the integration with input masks and support for file uploads make this component ideal for any application.

## Libraries Used in the Project

To build the **DynamicForm**, I used the following tools and libraries:

- **`TypeScript`**: To ensure strong typing and code reliability.
- **`react-hook-form`**: To efficiently manage form state.
- **`Zod`**: For declarative and type-safe data validation.
- **`Tailwind CSS`**: For quick and responsive styling with a utility-first approach.
- **`react-dropzone`**: For adding file upload support.
- **`react-day-picker` and `date-fns`**: For handling date fields.

## Benefits of Using These Tools

1. **Complete Validation**:  
   With **Zod**, validation is done in a clear and type-safe manner, avoiding common runtime validation errors.
2. **Efficient Form State Management**:  
   **react-hook-form** allows for simple and efficient form state management without the overhead of unnecessary re-renders.
3. **Clean and Responsive UI**:  
   **Tailwind CSS** makes it easy to create modern and adaptive interfaces for different devices.
4. **Safe and Intuitive Typing**:  
   **TypeScript** and **Zod** ensure that form data is handled correctly, preventing bugs and errors during development.

## Key Features of DynamicForm

- **Dynamic Forms**: Supports various field types including text, select, date, checkboxes, and file uploads.
- **Input Masks**: Fields like CPF, CNPJ, and phone numbers can be easily configured with predefined masks.
- **Integrated Validation**: Real-time data validation with **Zod** and **react-hook-form**.
- **Responsive Design**: Fully optimized for both mobile and desktop devices.
- **Easy Integration**: The component can be easily imported and used in any TypeScript project.

## How to Use DynamicForm

Integrating the **DynamicForm** into your project is simple. Just clone the repository and import the component into your TypeScript project:

1. Clone the repository:

   ```bash
   git clone https://github.com/LeonardoSarmento/dynamic-form.git
   ```

2. Navigate to the `src/feature/DynamicForm` directory and import the component:

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import DynamicForm from '@/feature/DynamicForm/DynamicForm';
import {
  DynamicSchemaTestingComponent,
  DynamicSchemaTestingComponentType,
} from '@/feature/DynamicForm/types/DynamicFormType';

import { Form } from '@/feature/DynamicForm/components/ui/form';
import { Button } from '@/feature/DynamicForm/components/ui/button';

// Using the component in your form
function DynamicFormComponent() {
  const form = useForm<DynamicSchemaTestingComponentType>({
    resolver: zodResolver(DynamicSchemaTestingComponent),
    mode: 'onChange',
    defaultValues: {
      checkbox: [],
      input: '',
      cnpj: '',
      password: '',
      multiSelect: [],
      textarea: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <DynamicForm control={form.control} name="input" label="Componente Input" placeholder="Text" type="input" />
        <DynamicForm
          control={form.control}
          name="cnpj"
          label="Componente Input com máscara para CNPJ"
          placeholder="CNPJ"
          type="input"
          mask="cnpj"
        />
      </form>
    </Form>
  );
}
```

You can see the full usage example in the repository, where various field types and validations are in action.

## Conclusion

The **DynamicForm** was developed to provide a fast and scalable solution for creating dynamic forms. By combining the flexibility of **react-hook-form**, the strong typing of **TypeScript**, and the declarative validation with **Zod**, the **DynamicForm** offers a robust and hassle-free experience.

## Try It Out

You can check out the component in action via the [online demo](https://dynamicform.leosarmento.com).

The project repository is available on GitHub: [DynamicForm Repository](https://github.com/LeonardoSarmento/dynamic-form).

---

### Best regards, from yours Leo, and see you next time!
