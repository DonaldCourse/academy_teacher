import PossFiltersForm from "../../../../../assets/possFiltersForm/possFiltersForm";
import * as SC from "./style";

const SearchMessage = (props) => {
  return (
    <SC.Container>
      <SC.SearchForm>
        <SC.SubmitButton />
        <SC.InputSearch placeholder="Tìm kiếm trên Tingtong Chat"/>
      </SC.SearchForm>
    </SC.Container>
  );
};

export default SearchMessage;
