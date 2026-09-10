import './globals.css';
import { Providers } from './providers';
import Navigation from '@/components/Navigation';

export const metadata = {
  metadataBase: new URL('https://mithilla-makkhana.vercel.app'),
  title: 'Mithila Makhana — Premium Foxnuts Direct from Bihar',
  description:
    'Handpicked, slow dry-roasted foxnuts (makhana) direct from the wetland floodplains of Mithila, Bihar. 100% natural, high protein, zero-oil authentic Indian snacking.',
  keywords: [
    'Makhana',
    'Mithila Makhana',
    'Foxnuts',
    'Lotus Seeds',
    'Roasted Makhana',
    'Organic Makhana',
    'Bihar Makhana',
    'Healthy Indian Snacks',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mithila Makhana — Premium Foxnuts Direct from Bihar',
    description:
      'Handpicked, slow dry-roasted foxnuts (makhana) direct from Mithila, Bihar. 100% natural, high protein, zero-oil snacking.',
    url: 'https://mithilla-makkhana.vercel.app',
    siteName: 'Mithila Makhana',
    images: [
      {
        url: '/images/hero/mithila-makhana-hero.webp',
        width: 1024,
        height: 410,
        alt: 'Mithila Makhana Storefront',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mithila Makhana',
  url: 'https://mithilla-makkhana.vercel.app',
  logo: 'https://mithilla-makkhana.vercel.app/images/hero/mithila-makhana-hero.webp',
  description:
    'Premium direct-to-consumer provider of handpicked, slow dry-roasted Mithila foxnuts (makhana).',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Bihar',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'shivamgarg1515@gmail.com',
    contactType: 'customer support',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-gray-900">
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
