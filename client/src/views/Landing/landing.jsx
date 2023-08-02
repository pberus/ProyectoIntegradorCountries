/* eslint-disable react/prop-types */
import { LoginForm } from "../../components/index.js";
import style from "./landing.module.css";

const Landing = ({login}) => {
  
  return (
    <div className={style.Landing}>
      <h1>INICIAR SESION</h1>
      <LoginForm login={login}/>
    </div>
  );
};

export default Landing;
