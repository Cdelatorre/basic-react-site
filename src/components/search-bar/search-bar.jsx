import Button from "../button/button";
import Input from "../input/input";

import './search-bar.css'

const SearchBar = ({ onChange, buttonAction, value }) => {
  const buttonValues = ["5", "10", "All"];

  return (
    <div className="w-100 p-2 d-flex align-items-center justify-content-center">
      <Input
        value={value}
        name="search"
        onChange={(ev) => onChange(ev.target.value)}
        type="text"
        placeholder='Search...'
      />

      {buttonValues.map((limit) => {
        return (
          <Button key={limit} action={() => buttonAction(limit)} size="sm" type="secondary">
            {limit}
          </Button>
        )
      })}
    </div>
  );
};

export default SearchBar;
