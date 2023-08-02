import { useNavigate } from "react-router-dom";
import ActivityForm from "../../components/ActivityForm/activityForm";

const Form = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/home")}>Volver</button>
      <h1>Este es el form para crear una ACTIVIDAD TURISTICA</h1>
      <ActivityForm />
      <h3>OR</h3>
      <button onClick={() => navigate("/activities")}>
        Do you want to see all the activities created so far?
      </button>
    </div>
  );
};

export default Form;
