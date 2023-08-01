import { useSelector } from "react-redux";

const activityForm = () => {
  const countries = useSelector(state => state.)
  return (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='difficulty'>Select difficulty:</label>
        <select name="difficulty" value={} onChange={}>
          <option value="" disabled>Select difficulty</option>
          <option value="difficulty1">Difficulty 1</option>
          <option value="difficulty2">Difficulty 2</option>
          <option value="difficulty3">Difficulty 3</option>
          <option value="difficulty4">Difficulty 4</option>
          <option value="difficulty5">Difficulty 5</option>
        </select>
      </div>
      <div>
        <label htmlFor="duration">Duration (hr):</label>
        <input type="number" name="duration" value={}
        onChange={}/>
      </div>
      <div>
        <label htmlFor="season">Select season:</label>
        <select name="season" value={} onChange={}>
          <option value=""disabled>Select season</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
      <div>
        <label htmlFor="countries">Select country/es</label>
        <select name="countries" value={} onChange={}>
          <option value="" disabled>Select country/es</option>
          {for (let i = 0; i < array.length; i++) {
            const element = array[i];
            
          }}

        </select>
      </div>
        
      </div>
      <button type='submit'>Login</button>
    </form>
  </div>
  )
};

export default activityForm;
