import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Form = ()=>{
    const access = useSelector(state => state.access)
  const navigate = useNavigate()

  useEffect(() => {
    !access && navigate("/");
  }, [access]);
    return <><h1>Este es el form</h1></>
}

export default Form