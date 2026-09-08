import type {Metadata} from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JK Law Professional Corporation | Richmond Hill Lawyers',
  description:
    'JK Law Professional Corporation provides professional legal services in Richmond Hill, Ontario, including family law, criminal law, civil litigation, personal injury, real estate, immigration, business law and estate planning.',
  openGraph: {
    title: 'JK Law Professional Corporation | Richmond Hill Lawyers',
    description:
      'Professional legal guidance for individuals, families, and businesses across Richmond Hill and Ontario.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JK Law Professional Corporation | Richmond Hill Lawyers',
    description:
      'Professional legal guidance for individuals, families, and businesses across Richmond Hill and Ontario.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'JK Law Professional Corporation',
    telephone: '+1-289-217-7920',
    email: 'reception@jklawfirm.ca',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10210 Yonge Street, Unit B',
      addressLocality: 'Richmond Hill',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.8828,
      longitude: -79.4398,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
    ],
    priceRange: '$$$',
    areaServed: ['Richmond Hill', 'York Region', 'Greater Toronto Area', 'Ontario'],
    url: 'https://jklawfirm.ca',
  };

  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#FBFBFA] text-[#1A1918] antialiased selection:bg-[#9B2226] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
