import { Component, createRef } from "react";
import { DebounceInput } from 'react-debounce-input';
import { withApollo } from '@apollo/react-hoc';
import { wakeServer } from '../../graphql/wakeServer';
import Suggestions from "../Suggestions";
import { SearchContainer, SearchWrapper } from './styled';
import { SearchContext } from "../../context/search";
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { theme } from '../../constants';

type SearchPersonState = {
  isOpen: boolean;
  ready: boolean;
  searchTerm: string;
};

class SearchPerson extends Component<{ client: any }, SearchPersonState>  {
  state: SearchPersonState = {
    isOpen: false,
    ready: false,
    searchTerm: "",
  };
  private node = createRef<HTMLDivElement>();
  private textInput = createRef<HTMLInputElement>();
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.client
      .query({ query: wakeServer })
      .then((result: any) => {
        if (result.networkStatus === 7) {
          this.setState({ ready: true })
        }
      });
    this.focusTextInput();
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  focusTextInput = () => {
    () => this.textInput.current!.focus();
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
      searchTerm: e.target.value,
      isOpen: true
    });
  }
  handleSelection = () => {
    this.setState({
      searchTerm: "",
      isOpen: false
    });
  }
  hideSuggestions = () => {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { searchTerm, isOpen, ready } = this.state;
    const { handleSelection, hideSuggestions } = this
    return (
      <>
        { !ready ?
          <Loader type="ThreeDots" color={theme.charlie} height={80} width={80} />
          :
          <SearchWrapper>
            <FontAwesomeIcon icon={faInfoCircle} size="2x" />
            <SearchContainer ref={this.node}>
              <SearchContext.Provider value={{
                isOpen,
                searchTerm,
                hideSuggestions,
                handleSelection,
              }}>
                <DebounceInput
                  inputRef={this.textInput}
                  minLength={3}
                  debounceTimeout={300}
                  value={this.state.searchTerm}
                  onChange={async (e) => {
                    this.handleChange(e);
                  }} />
                {
                  !!searchTerm.length &&
                  <Suggestions />
                }
              </SearchContext.Provider>
            </SearchContainer>
          </SearchWrapper>}
      </>
    )
  }
}

export default withApollo(SearchPerson);