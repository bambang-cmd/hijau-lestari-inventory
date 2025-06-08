
import { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mobile-container">
      <main className="content-area">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
