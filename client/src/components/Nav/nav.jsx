/* eslint-disable react/prop-types */
import { SearchBar } from "../../components";

const Nav = ({logout, handleResetFilterOrder}) => {
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <SearchBar handleResetFilterOrder={handleResetFilterOrder}/>
    </div>
  );
};

export default Nav;
