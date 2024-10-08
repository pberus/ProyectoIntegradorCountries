import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, resetWithActivities } from "../../redux/actions";
import validateField from "./validate";
import style from "./activityForm.module.css"

const URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/activities`
  : "http://localhost:3001/activities";

const ActivityForm = () => {
  const [activityValues, setActivityValues] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: "",
  });

  const [created, setCreated] = useState(false);

  const allCountries = useSelector((state) => state.allCountries);
  const  [countriesCopied, setCountriesCopied] = useState([]);

  useEffect(()=>{
    setCountriesCopied(allCountries)
  }, [allCountries])

  const dispatch = useDispatch();

  const createActivity = async (formValues) => {
    try {
      const { data } = await axios.post(URL, formValues);
      if (data.name) {
        setCreated(true);
        alert("Activity created successfully");
        dispatch(resetWithActivities());
        dispatch(getAllCountries()) //si no vuelvo a traer los paises, al aplicar resetWithActivities allCountries queda vacio hasta que vuelva al home. Se vuelven a guardar con el useEffect ya que tiene allCountries como dependencia
      }
    } catch (error) {
      error.response && error.response.data
        ? alert(error.response.data)
        : alert(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createActivity(activityValues);
  };

  const handleChange = (event) => {
    const {name, value} = event.target

    setActivityValues({
      ...activityValues,
      [name]: value,
    });
    setErrors({
        ...errors,
        [name]: validateField(name, value),
      })
  };

  const handleChangeCountries = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setActivityValues({
      ...activityValues,
      countriesId: selectedOptions,
    });
    setErrors(
      {
        ...errors,
        countriesId: validateField("countriesId", selectedOptions),
      }
    );
  };

  const handleClick = () => {
    setActivityValues({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countriesId: [],
    });
    setErrors({
      name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: "",
    })
    setCreated(false);
  };

  return (
    <div >
      {!created ? (
        <form className={style.Form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              value={activityValues.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor='difficulty'>Select difficulty:</label>
            <select
              name='difficulty'
              value={activityValues.difficulty}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select difficulty
              </option>
              <option value='1'>Difficulty 1</option>
              <option value='2'>Difficulty 2</option>
              <option value='3'>Difficulty 3</option>
              <option value='4'>Difficulty 4</option>
              <option value='5'>Difficulty 5</option>
            </select>
            {errors.difficulty && (
              <span>{errors.difficulty}</span>
            )}
          </div>
          <div>
            <label htmlFor='duration'>Duration (hr):</label>
            <input
              type='number'
              name='duration'
              value={activityValues.duration}
              onChange={handleChange}
            />
            {errors.duration && <span>{errors.duration}</span>}
          </div>
          <div>
            <label htmlFor='season'>Select season:</label>
            <select
              name='season'
              value={activityValues.season}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select season
              </option>
              <option value='Summer'>Summer</option>
              <option value='Autumn'>Autumn</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
            {errors.season && <span>{errors.season}</span>}
          </div>
          <div>
            <label htmlFor='countries'>Select country/es: </label>
            <select
              name='countries'
              value={activityValues.countriesId}
              onChange={handleChangeCountries}
              multiple
            >
              <option value='' disabled>
                Select country/es
              </option>
              {countriesCopied.map((country) => (
                <option value={country.ID} key={country.ID}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countriesId && (
              <span>{errors.countriesId}</span>
            )}
          </div>
          <button type='submit'>Create</button>
        </form>
      ) : (
        <button onClick={handleClick}>
          Do you want to create another activity?
        </button>
      )}
    </div>
  );
};

export default ActivityForm;
