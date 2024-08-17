import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { UserAuthForm } from '@components/UserAuthForm';
import { TABSLOGINCONTENT, TERMSOFSERVICECONTENT } from '@constants/login-content';
import { TLoginTabsContent } from '@services/types/constants/login';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: Login,
});

export function Login() {
  return <TabsComponent contents={TABSLOGINCONTENT} />;
}

function TabsComponent({ contents }: { contents: TLoginTabsContent[] }) {
  return (
    <div className="mx-auto mt-40">
      <Tabs defaultValue={contents[0].value} className="w-[400px]">
        <TabsList className="grid grid-cols-2">
          {contents.map((content) => (
            <TabsTrigger key={content.value} value={content.value}>
              {content.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {contents.map((content) => (
          <TabsContent value={content.value}>
            <TabsLoginContent header={content.header}>
              <UserAuthForm />
            </TabsLoginContent>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function TabsLoginContent({ children, header }: { children?: React.ReactNode; header: TLoginTabsContent['header'] }) {
  return (
    <div className="lg:p-8">
      <div className="space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{header.title}</h1>
          <p className="text-sm text-muted-foreground">{header.description}</p>
        </div>
        {children}
        <TermsOfServiceComponent />
      </div>
    </div>
  );
}

function TermsOfServiceComponent() {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      {TERMSOFSERVICECONTENT.start}{' '}
      <Link to="/" className="underline underline-offset-4 hover:text-primary">
      {TERMSOFSERVICECONTENT.terms}
      </Link>{' '}
      {TERMSOFSERVICECONTENT.middle}{' '}
      <Link to="/" className="underline underline-offset-4 hover:text-primary">
      {TERMSOFSERVICECONTENT.policy}
      </Link>
      {TERMSOFSERVICECONTENT.end}
    </p>
  );
}
