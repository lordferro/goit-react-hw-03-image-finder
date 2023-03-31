import { SearchBarStyled, SearchButton, SearchForm, SearchFormInput, SearchFormLabel } from "./SearchBar.styled";
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit}) => {

  return (
    <SearchBarStyled>
      <SearchForm onSubmit={onSubmit}>
        <SearchButton type="submit">
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBarStyled>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};