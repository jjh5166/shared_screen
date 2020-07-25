import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../lib/apolloClient'
import Div100vh from 'react-div-100vh';

import '../assets/styles.css';

export default function App({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Div100vh>
        <Component {...pageProps} />
      </Div100vh>
    </ApolloProvider>
  )
}