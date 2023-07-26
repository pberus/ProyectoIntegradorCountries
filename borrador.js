import "./App.css";
import { Home, About, Detail, Landing, Error, Favorites } from "./views";
import { Nav } from "./components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFav } from "./redux/actions";

const URL = "http://localhost:3001/rickandmorty/";

const App = () => {
  const [characters, setCharacters] = useState([]);
  //const [access, setAccess] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();
  //const navigate = useNavigate();

  // useEffect(() => {
  //   !access && navigate("/");
  // }, [access]);

  // const login = async (userData) => {
  //   try {
  //     const { email, password } = userData;
  //     const loginURL = URL + `login/?email=${email}&password=${password}`;

  //     const { data } = await axios(loginURL);
  //     const { access } = data;
  //     setAccess(access);
  //     access && navigate("/home");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const logout = () => {
  //   setAccess(false);
  //   navigate("/");
  // };

  // const onSearch = async (id) => {
  //   try {
  //     const searchURL = URL + `character/${id}`;
  //     const { data } = await axios(searchURL);

  //     const charRepeted = characters?.find(
  //       (character) => character.id === data.id
  //     );
  //     if (charRepeted) {
  //       return alert("Ya agregaste un personaje con ese ID");
  //     }

  //     if (data.name) {
  //       setCharacters((oldChars) => [...oldChars, data]);
  //     }
  //   } catch (error) {
  //     alert("¡No hay personajes con este ID!");
  //   }
  // };

  const onClose = (id) => {
    setCharacters(characters.filter((character) => character.id !== id));
    dispatch(removeFav(id));
  };

  const randomHandler = () => {
    let haveIt = [];
    //Generate random number
    let random = (Math.random() * 826).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if (!haveIt.includes(random)) {
      haveIt.push(random);
      const randomHandlerURL = URL + `character/${random}`;
      fetch(randomHandlerURL)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert("¡No hay personajes con este ID!");
          }
        });
    } else {
      console.log("Ya agregaste todos los personajes");
      return false;
    }
  };

  return (
    <div className='App'>
      {location.pathname !== "/" && (
        <Nav logout={logout} onSearch={onSearch} random={randomHandler} />
      )}
      <Routes>
        <Route path='/' element={<Landing login={login} />} />
        <Route
          path='/home'
          element={<Home characters={characters} onClose={onClose} />}
        />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;