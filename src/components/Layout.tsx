import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
      <ChatAssistant />
    </div>
  );
};

export default Layout;
