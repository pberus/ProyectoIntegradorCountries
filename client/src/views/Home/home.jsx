import { useEffect } from "react";

/* eslint-disable react/prop-types */
import {Nav, Cards} from "../../components"
import { useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions";

const Home = ({logout}) => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCountries())
  }, []);

  return <div>
    <h1>ESTE ES EL HOME</h1>
    <Nav logout={logout}/>
    <Cards />
    </div>;
};

export default Home;