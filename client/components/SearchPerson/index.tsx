import { Component, createRef } from "react";
import { DebounceInput } from 'react-debounce-input';

import Suggestions from "../Suggestions";
import { SearchContainer } from './styled';
import { SearchContext } from "../../context/search";

type SearchPersonState = {
  isOpen: boolean;
  searchTerm: string;
};

class SearchPerson extends Component<{}, SearchPersonState>  {
  state: SearchPersonState = {
    isOpen: false,
    searchTerm: "",
  };
  private node = createRef<HTMLDivElement>();
  private textInput = createRef<HTMLInputElement>();
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.focusTextInput();
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  focusTextInput = () => {
    this.textInput.current!.focus();
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

  render() {
    const { searchTerm, isOpen } = this.state;
    const { handleSelection } = this
    return (
      <SearchContainer ref={this.node}>
        <SearchContext.Provider value={{
          searchTerm,
          handleSelection
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
            <Suggestions
              displayed={isOpen}
            />
          }
        </SearchContext.Provider>
      </SearchContainer>
    )
  }
}

export default SearchPerson;