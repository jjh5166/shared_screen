import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks';
import { searchPersonQuery } from '../graphql/searchPerson';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, updateSearch] = useState("")
  const { data } = useQuery(
    searchPersonQuery,
    { variables: { searchTerm: searchTerm } },
  );
  return (
    <div className="container">
      <Head>
        <title>Shared Screen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <input type="text" onChange={async (e) => {
          updateSearch(e.target.value)
          console.log(data)
        }} />
      </main>
    </div>
  )
}
