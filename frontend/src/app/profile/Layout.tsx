// components/Layout.tsx

import Head from 'next/head';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Tu Aplicación</h1>
        </div>
      </header>
      <main className="container mx-auto mt-4">{children}</main>
    </div>
  );
};

export default Layout;
