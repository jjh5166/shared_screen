import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { LayoutContainer } from './styled';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'SharedScreen' }: Props) => (
  <LayoutContainer>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/watchlist">
          <a>Watch List</a>
        </Link>{' '}
        |{' '}
        <Link href="/account">
          <a>Account</a>
        </Link>{' '}
      </nav>
    </header>
    {children}
  </LayoutContainer>
)

export default Layout
