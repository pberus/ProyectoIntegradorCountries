/* eslint-disable react/prop-types */
import { LoginForm } from "../../components/index.js";

const Landing = ({login}) => {
  
  return (
    <div>
      <h1>INICIAR SESION</h1>
      <LoginForm login={login}/>
    </div>
  );
};

export default Landing;
