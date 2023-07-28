/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Nav, Cards } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import { useLocation } from "react-router-dom";

const Home = ({ logout }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { myCountries, newCountries } = useSelector((state) => ({
    myCountries: state.myCountries,
    newCountries: state.newCountries,
  }));

  useEffect(() => {
    location.pathname === "/home" &&
      !myCountries.length &&
      !newCountries.length &&
      dispatch(getAllCountries());
  }, []);

  return (
    <div>
      <h1>ESTE ES EL HOME</h1>
      <Nav logout={logout} />
      {myCountries.length ? (
        <h2>
          <u>These are myCountries</u>
        </h2>
      ) : (
        <h2>
          <u>These are newCountries</u>
        </h2>
      )}
      <Cards />
    </div>
  );
};

export default Home;
