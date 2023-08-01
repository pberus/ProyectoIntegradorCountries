import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const URL = "http://localhost:3001/activities";

const ActivityForm = () => {
  const [activityValues, setActivityValues] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: [],
  });

  const [created, setCreated] = useState(false);

  const allCountries = useSelector((state) => state.allCountries);
  const countriesCopied = [...allCountries];

  const createActivity = async (formValues) => {
    try {
      const { data } = await axios.post(URL, formValues);
      if (data.name) {
        setCreated(true);
        alert("Activity created successfully");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    createActivity(activityValues);
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setActivityValues({
      ...activityValues,
      [property]: value,
    });
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
  };

  const handleClick = () => {
    setCreated(false);
  };

  return (
    <div>
      {!created ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              value={activityValues.name}
              onChange={handleChange}
            />
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
          </div>
          <div>
            <label htmlFor='duration'>Duration (hr):</label>
            <input
              type='number'
              name='duration'
              value={activityValues.duration}
              onChange={handleChange}
            />
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
          </div>
          <div>
            <label htmlFor='countries'>Select country/es</label>
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
          </div>
          <button type='submit'>Create</button>
        </form>
      ) : (
        <button onClick={handleClick}>Create another activity</button>
      )}
    </div>
  );
};

export default ActivityForm;
