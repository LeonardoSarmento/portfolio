# Building My Portfolio Site with Modern Web Technologies

## Introduction

Creating a personal portfolio is an excellent way to showcase your skills and projects. When I decided to build my portfolio site, I wanted to use the most modern and efficient technologies available. In this article, I share my experience in creating my portfolio, exploring the tools and frameworks I used to build a fast, responsive, and multilingual site.

## Choosing the Ideal Stack for a Modern Portfolio

### Why Vite.js, React, and TypeScript?

For the development of my portfolio, I opted for a powerful combination of `Vite.js`, `React`, and `TypeScript`. Each of these technologies brings unique benefits that, when combined, provide a solid foundation for building modern and efficient web applications.

- **_Vite.js_** is a modern build tool that offers an extremely fast development experience, mainly due to its ability to provide a fast development server and optimized production builds. With nearly instant startup times and efficient hot reloading, `Vite.js` significantly improves productivity during development.

- **_React_** was chosen as the main library for building the user interface due to its flexibility and vast ecosystem. `React`'s componentization allows for the creation of reusable and easy-to-maintain interfaces, facilitating the construction of a dynamic and interactive interface for the portfolio. Additionally, the active community and continuous support ensure that React is always aligned with the latest trends and best development practices.

- **_TypeScript_** adds a layer of security to the code, providing static types that help avoid errors and facilitate code refactoring in larger projects. The strong typing offered by `TypeScript` improves code readability and maintenance, making it more robust and less prone to bugs. This combination of Vite.js, React, and TypeScript allowed me to work efficiently and securely, ensuring that the code was easy to maintain and evolve.

### Integrating Tanstack Router for Dynamic Routing

`Tanstack Router` was my choice for dynamic routing in my portfolio. This modern router, designed specifically for `React` applications, offers a wide range of features that make it ideal for building rich and interactive interfaces.

Some of the main advantages of Tanstack Router include:

- **100% inferred TypeScript support:** With fully inferred TypeScript support, `Tanstack Router` offers a highly productive development experience, with typed navigation and compile-time error detection. This improves code security and quality, allowing for reliable route construction.

- **Nested routing and layout routes:** Support for nested routes and layout routes facilitates the creation of complex and reusable layouts within the application. This allows for a clear and organized structure, maintaining visual consistency throughout the site.

- **Integration with Tanstack Query and SWR Caching support:** Tanstack Router was designed to integrate seamlessly with client-side data caches, such as `Tanstack Query`. This integration improves the user experience by synchronizing data dynamically, while built-in route loaders with `SWR` cache ensure that data is always up-to-date and fast.

- **Search Params state management with validation:** One of the highlights of `Tanstack Router` is its management of Search Params with fully typed navigation APIs and validation schemas using `Zod`. This not only ensures that search parameters are managed safely and efficiently but also facilitates the manipulation and validation of data directly in the URL, promoting a consistent user experience.

- **Asynchronous element loading and error handling:** Support for asynchronous route elements and error boundaries allows for dynamic component loading, improving application performance and usability, especially on complex pages with lots of data.

- **Automatic route prefetching:** Tanstack Router can automatically pre-load routes, reducing perceived loading times for the user and improving navigation fluidity.

- **Middleware for route matching and loading:** The flexibility of Tanstack Router is further enhanced by support for route matching and loading middleware, allowing for advanced customization of the navigation flow.

This combination of robust features and deep integration with other tools, such as `Tanstack Query`, made `Tanstack Router` the perfect choice for dynamic routing in my portfolio, ensuring both an excellent development experience and a high-quality user experience.

### Client-Side State Management with Tanstack Query

For client-side state management, I used `Tanstack Query`. This library is ideal for managing asynchronous data state and client-side caching. With Tanstack Query, I was able to easily synchronize data efficiently, reducing code complexity and improving overall application performance. Since all the content of my portfolio is loaded from Markdown files stored in the repository, Tanstack Query proved to be a robust choice for managing this data reactively.

## Building a Responsive and Accessible Interface

### Tailwind CSS and Shadcn/ui for Design Consistency

To ensure my site was visually pleasing, responsive, and consistent, I chose to use `Tailwind CSS` along with `Shadcn/ui`. Tailwind CSS is a utility-first framework that makes it easy to create styled user interfaces, allowing design to be implemented directly in HTML or JSX through utility classes.

**One of the great advantages of `Tailwind CSS` is the ease it provides for developing applications that work both on the web and on mobile devices.** With its utility classes, it's simple to apply responsive styles that adapt to different screen sizes, ensuring the user interface works well on desktops, tablets, and smartphones without the need to write additional CSS. This speeds up development and improves visual consistency across all platforms.

In addition, I used `Shadcn/ui`, a collection of reusable and well-designed components that can be copied and pasted directly into the project. Shadcn/ui offers accessible and customizable components, but **it is not a traditional component library** that you install as a dependency via npm. Instead, you choose the components you need, copy the code, and adapt it to your project's needs. This approach allows for complete control over the code, ensuring it integrates perfectly with the rest of the application.

### Internationalization with i18n

My portfolio site is multilingual, which required setting up an **_internationalization (i18n)_** solution. I used the `i18n` library to manage the site's translations, ensuring that visitors can access the content in their preferred language. The i18n setup was simple and allowed me to easily add support for new languages, keeping the site structure organized and efficient.

## Application as a PWA (Progressive Web App)

In addition to developing the site to work well on different devices, I also configured it to be a **_Progressive Web App (PWA)_**. A `PWA` combines the best of the web and mobile apps, offering a rich and immersive experience to users.

**The benefits of turning the portfolio into a PWA include:**

- **Speed and Performance:** The `PWA` loads quickly and provides a smooth experience, with intelligent caching features that reduce loading time.
- **Installable:** The site can be installed as an app on the user's device, with an icon on the home screen and an interface without the browser's navigation bar, offering a user experience similar to a native app.

Implementing the `PWA` was a strategic choice to ensure that the portfolio not only met current user expectations but also offered a future-proof browsing experience, adapted to the best practices of modern web development.

## Form Handling and Validation

### React Hook Form for Simple Form Management

Forms are a crucial part of any site that requires user interaction. To manage the forms on my portfolio, I used `React Hook Form`, a library that makes form handling in `React` easy, keeping the code clean and minimizing the use of hooks. With React Hook Form, I was able to create functional and reactive forms, saving development time and ensuring a great user experience.

### Data Validation with Zod

For form data validation, I used `Zod`. Zod is a schema validation library that integrates perfectly with `React Hook Form`. The combination of these two tools allowed me to create robust and customized validations for the forms, ensuring that only valid data was submitted and processed.

## Content Management

### Using React-Markdown for Dynamic Content

All the content on my portfolio site is generated from Markdown files stored in the `GitHub` repository. To render this content on the site, I used `React-Markdown`. This library converts Markdown files into `React` components, allowing me to easily integrate dynamic content. This gave me the flexibility to update the content directly in the repository without needing to modify the base code.

### Optimizing Markdown Content for SEO

Even using Markdown, it's crucial to ensure that the content is optimized for search engines (SEO). I used SEO best practices when structuring the Markdown files, such as proper use of headings, links, and metadata. `React-Markdown` made this task easier, allowing me to customize the rendering of each element to maintain content optimization.

## Performance Optimization

### Boosting Performance with Vite.js

One of the main benefits of `Vite.js` is its ability to significantly improve build times. With Vite.js, I was able to split the code into smaller bundles and implement lazy loading techniques, resulting in faster performance and a better experience for the end user. Development speed was also optimized, allowing me to see changes in real-time during the coding process.

### Using TypeScript for Type Safety

`TypeScript` played a vital role in ensuring code safety throughout the project's development. The static typing provided by TypeScript helped identify potential errors before running the code, which was essential for the project's maintenance and scalability. Additionally, TypeScript made it easier to refactor the code as the project grew, without compromising existing functionality.

## Deployment and Hosting on Vercel

### Why I Chose Vercel for Hosting

I chose `Vercel` as the hosting platform for my portfolio due to its ease of use and robust features. Vercel is ideal for frontend projects like mine, offering a simplified deployment process, continuous integration, and excellent support for both static and dynamic sites. Additionally, Vercel provides automatic performance optimizations, which align perfectly with my project's goals.

### Setting Up CI/CD Pipeline

Setting up a `CI/CD` pipeline was essential to automate the deployment process and ensure that the site was always up-to-date and functional. With `Vercel`, I was able to easily integrate `GitHub` so that every code change was automatically tested and deployed, ensuring a continuous and reliable development and release process.

## Version Control with Git

### Version Control Strategies with Git

To keep track of project versions, I used `Git`. This facilitated tracking changes and collaboration. Version control with Git is fundamental for any software project, especially in projects that evolve rapidly.

### Integration with GitHub

`GitHub` was the platform chosen to store and version the source code of my portfolio. Besides facilitating version control, GitHub also offers collaboration tools that are extremely useful, even in personal projects. The integration with `Vercel` allowed for a smooth workflow, where any code change resulted in a new version of the site automatically.

## Future Improvements

### Planned Features for the Portfolio

Even with the site up and running, I have plans for future improvements. I intend to add new features to enhance the user experience, such as more interactive animations, an integrated blog section, and visitor analytics tools. These continuous improvements are essential to keep the site updated and relevant.

### Continuous Learning and Adaptation

Building this portfolio was an excellent opportunity to learn and apply new technologies. However, the learning doesn't stop here. I plan to keep updating myself with the latest trends and best practices in web development, ensuring that my portfolio continues to evolve and reflect the skills I acquire over time.

## Conclusion

Developing my portfolio site was an extremely enriching experience. By using a combination of modern tools and libraries like `Vite.js`, `TypeScript`, `Tanstack Router`, `Tanstack Query`, among others, I was able to create a fast, efficient, and future-proof site. The development journey brought many learnings, and I am excited to continue improving and expanding this project as new technologies emerge.

---

### FAQs

1. **Why did you choose Vite.js for your project?**

   - `Vite.js` was chosen due to its build speed and simplicity, offering a fast and optimized development experience.

2. **How do you manage the content of your portfolio?**

   - All content is generated from Markdown files stored in the `GitHub` repository, using `React-Markdown` to render them on the site.

3. **Why did you choose Vercel as the hosting platform?**

   - `Vercel` was chosen for its simplicity in deployment, robust support for frontend sites, and seamless integration with `GitHub`.

4. **What technologies do you plan to add to your portfolio in the future?**
   - I plan to add features like interactive animations, an integrated blog section, and visitor analytics tools to enhance the user experience.

---