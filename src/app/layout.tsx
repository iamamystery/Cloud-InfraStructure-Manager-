import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cloud Infrastructure Manager - Enterprise SaaS Platform',
  description: 'Multi-cloud resource provisioning, deployment, monitoring, optimization, and cost management across AWS, Azure, and GCP',
  keywords: ['cloud', 'infrastructure', 'aws', 'azure', 'gcp', 'devops', 'monitoring', 'cost management'],
  authors: [{ name: 'Cloud Infrastructure Manager' }],
  openGraph: {
    title: 'Cloud Infrastructure Manager',
    description: 'Enterprise-grade multi-cloud management platform',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
