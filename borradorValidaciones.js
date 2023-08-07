const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function validate({ email, password }) {
  const errors = {};
  if (!email) {
    errors.email = "El email no puede estar vacio";
  } else {
    if (!regexEmail.test(email)) {
      errors.email = "Debe ser un correo electronico";
    } else {
      if (email.length > 35)
        errors.email = "El email no puede tener mas de 35 caracteres";
    }
  }

  if (password.length < 6 || password.length > 10) {
    errors.password =
      "La contraseña tiene que tener una longitud entre 6 y 10 caracteres";
  } else {
    if (!/\d/.test(password))
    errors.password = "La contraseña debe tener al menos un número";
  }
  
  return errors;
}

export default validate;