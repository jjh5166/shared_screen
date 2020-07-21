import { Component, createRef, Fragment } from "react";
import { Query } from 'react-apollo';
import { DebounceInput } from 'react-debounce-input';

import { searchPersonQuery } from "../../graphql/searchPerson";
import Suggestions from "../Suggestions";
import PeopleContainer from "../PeopleContainer";
import Results from "../Results";
import { SearchContainer, PplResultsSection } from './styled'
import { SelectedProvider } from "../../context/selectedPeople";
import { CreditsProvider } from "../../context/credits";
import Compose from "../../utils/compose";
import { SharedProvider } from "../../context/sharedCredits";

type SearchPersonState = {
  isOpen: boolean;
  searchTerm: string
};

class SearchPerson extends Component<SearchPersonState>  {
  state: SearchPersonState = {
    isOpen: true,
    searchTerm: ""
  };
  private node = createRef<HTMLDivElement>();
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside = (e: any) => {
    if (this.node.current && this.node.current.contains(e.target)) {
      this.setState({
        isOpen: true
      });
      return;
    }
    this.setState({
      isOpen: false
    });
  };
  handleChange = (e: any) => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    const { searchTerm, isOpen } = this.state;
    return (
      <Compose components={[SharedProvider, CreditsProvider, SelectedProvider]}>
        <SearchContainer ref={this.node}>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            onChange={async (e) => {
              this.handleChange(e);
            }} />
          {
            !!searchTerm.length &&
            <Query
              query={searchPersonQuery}
              variables={{ searchTerm: searchTerm }}
            >
              {({ data }: { data: any }) => {
                return (
                  <Fragment>
                    {!!data &&
                      !!data.searchPerson.length &&
                      <Suggestions
                        data={data.searchPerson}
                        displayed={isOpen}
                      />}
                  </Fragment>
                )
              }}
            </Query>
          }
        </SearchContainer>
        <PplResultsSection>
          <PeopleContainer />
          <Results />
        </PplResultsSection>
      </Compose>
    )
  }
}

export default SearchPerson;