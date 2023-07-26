import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions";
import { SearchBar } from "../../components";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <SearchBar />
    </div>
  );
};

export default Nav;
