import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: ':: Smart GSM Solar Street Light & RMS Management System ::',
  description: 'Jharkhand Renewable Energy Development Agency (JREDA) RMS & CMS Dashboard',
  icons: {
    icon: '/assets/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/pages/waves/css/waves.min.css" media="all" />
        <link rel="stylesheet" type="text/css" href="/assets/icon/themify-icons/themify-icons.css" />
        <link rel="stylesheet" type="text/css" href="/assets/icon/icofont/css/icofont.css" />
        <link rel="stylesheet" type="text/css" href="/assets/icon/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
