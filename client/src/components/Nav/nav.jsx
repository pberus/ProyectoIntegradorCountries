/* eslint-disable react/prop-types */
import { SearchBar } from "../../components";

const Nav = ({logout}) => {
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <SearchBar />
    </div>
  );
};

export default Nav;
