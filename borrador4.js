//!controller
const getAllCharacters = async function (req, res) {
    try {
      const characters = await axios.get(`${URL}?page=1`);
      res.status(STATUS_OK).json(characters.data.results);
    } catch (error) {
      //TODO: TESTING <-> fix error to -> .end(error.message)
      res.status(STATUS_ERROR).end(error.message);
    }
  };

  //! rutas
  router.get("/allcharacters", getAllCharacters);

  //!Recibe la data y manda el dispatch
  useEffect(() => {
    //* en el useEffect dentro de la function que pasamos por cb podemos crear una function async
    async function inEffect() {
      try {
        const { data } = await axios.get(
          `http://localhost:5040/rickandmorty/allcharacters`
        );
        dispatch(addChar(data));
      } catch (error) {
        console.log(error);
      }
    }
    inEffect();
  }, []);

  //!Despacha esta accion
  export function addChar(char) {
 
    return {
      type: ADD_CHAR,
      payload: char,
    };
  }
  //! Asi es el reducer
  case ADD_CHAR:
      if (Array.isArray(payload)) {
        return {
          ...state,
          characters: [...payload], // characters: [payload, ...state.characters],
          charactersOrigin: [...payload],
        };
      }
      return {
        ...state,
        characters: [payload,...state.charactersOrigin],
        charactersOrigin: [payload,...state.charactersOrigin],
      };