import axios from "axios"
import { useState } from "react"

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const RegisterForm = () =>  {
    const [register, setRegister] = useState({
        email: "",
        password: "",
    })

    const registerFunction = async (registerData) => {
        try {
            const {data} = await axios.post(`${URL}/login`, registerData)
            alert(data)
        } catch (error) {
            alert(error.response && error.response.data ? error.response.data : error.message)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setRegister({
            ...register,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        return registerFunction(register)
    }


    return <div>
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={register.email} onChange={handleChange}/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={register.password} onChange={handleChange}/>
            <button type="submit">Aceptar</button>
        </form>
    </div>
}

export default RegisterForm