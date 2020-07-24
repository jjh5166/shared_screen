import { Component, createRef } from "react";
import { DebounceInput } from 'react-debounce-input';

import Suggestions from "../Suggestions";
import { SearchContainer } from './styled';

type SearchPersonState = {
  isOpen: boolean;
  searchTerm: string;
  activeSuggestion: number,
};

class SearchPerson extends Component<{}, SearchPersonState>  {
  state: SearchPersonState = {
    isOpen: true,
    searchTerm: "",
    activeSuggestion: 0,
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
      searchTerm: ""
    });
  }

  render() {
    const { searchTerm, isOpen } = this.state;
    return (
      <SearchContainer ref={this.node}>
        <DebounceInput
          inputRef={this.textInput}
          minLength={3}
          debounceTimeout={300}
          onChange={async (e) => {
            this.handleChange(e);
          }} />
        {
          !!searchTerm.length &&
          <Suggestions
            searchTerm={searchTerm}
            displayed={isOpen}
          />
        }
      </SearchContainer>
    )
  }
}

export default SearchPerson;