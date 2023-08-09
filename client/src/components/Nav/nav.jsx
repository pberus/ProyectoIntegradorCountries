/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components";
import style from "./nav.module.css"

const Nav = ({logout, handleResetFilterOrder}) => {
  const navigate = useNavigate()



  return (
    <div className={style.Nav}>
      <SearchBar handleResetFilterOrder={handleResetFilterOrder}/>
      <button onClick={()=>navigate("/form")}>Create Activity</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Nav;
