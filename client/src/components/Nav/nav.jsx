/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components";

const Nav = ({logout, handleResetFilterOrder}) => {
  const navigate = useNavigate()



  return (
    <div>
      <button onClick={()=>navigate("/form")}>Create Activity</button>
      <button onClick={logout}>Logout</button>
      <SearchBar handleResetFilterOrder={handleResetFilterOrder}/>
    </div>
  );
};

export default Nav;
