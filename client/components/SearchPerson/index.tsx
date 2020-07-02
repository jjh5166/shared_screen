import { useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks";
import { DebounceInput } from 'react-debounce-input';


import { searchPersonQuery } from "../../graphql/searchPerson";
import Suggestions from "./Suggestions";
import { PageContainer, SearchContainer } from './styled'

export default () => {
  const [searchTerm, updateSearch] = useState("")
  const { data } = useQuery(
    searchPersonQuery,
    { variables: { searchTerm: searchTerm } },
  );
  // console response
  // useEffect(() => {
  //   console.log(data)
  //   return () => {
  //     // cleanup
  //   }
  // }, [data])
  return (
    <PageContainer>
      <SearchContainer>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          onChange={async (e) => {
            updateSearch(e.target.value)
          }} />
        {data && <Suggestions data={data.searchPerson} />}
      </SearchContainer>
    </PageContainer>
  )
}