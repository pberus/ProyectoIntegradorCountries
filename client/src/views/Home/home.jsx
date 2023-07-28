/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {Nav, Cards} from "../../components"
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import { useLocation } from "react-router-dom";

const Home = ({logout}) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const myCountries = useSelector(state => state.myCountries)

  useEffect(() => {
      location.pathname === "/home" && !myCountries.length && dispatch(getAllCountries())
  }, []);

  return <div>
    <h1>ESTE ES EL HOME</h1>
    <Nav logout={logout}/>
    <Cards />
    </div>;
};

export default Home;