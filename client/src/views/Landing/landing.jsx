/* eslint-disable react/prop-types */
import { LoginForm } from "../../components/index.js";

const Landing = ({login}) => {
  
  return (
    <div>
      <LoginForm login={login}/>
    </div>
  );
};

export default Landing;
