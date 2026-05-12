import './globals.css';
import Navbar from './components/Navbar'; // استدعاء الـ Navbar

export const metadata = {
  title: 'Softworks Brief Assistant',
  description: 'AI-Powered Creative Briefs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar /> {/* هيظهر فوق كل الصفحات */}
        {children}
      </body>
    </html>
  );
}