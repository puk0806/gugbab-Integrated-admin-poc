import Script from 'next/script';
import './_styles/globals.css';
import '@gugbab-integrated-admin-poc/icons/dist/icons.css';
import '@gugbab-integrated-admin-poc/ui-sass/public/styles/components.css';
import TanstackProvider from './_providers/TanstackProvider';

export const metadata = {
  title: 'gugbab next admin',
  description: 'gugbab next admin poc',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script src="/__ENV.js" strategy="beforeInteractive" />
      </head>
      <body>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
