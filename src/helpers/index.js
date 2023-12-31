
const generatorId = () => {
  const timestamp = new Date().getTime();
  const randomValue = Math.floor(Math.random() * 1000);

  return `${timestamp}${randomValue}`;
}

const REGEX = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  number: /\d/,
  empty: /\s/
}

const verifyData = (data) => {

  const { email, password } = data;

  if ([email, password].includes('') || Object.values(data).length < 1) {
    return { invalid: true, text: 'Campos vacíos' };
  }

  if (!email.match(REGEX.email)) {
    return { invalid: true, text: '¡ ERROR ! porfavor verifica tu correo' };
  }

  if (!password.match(REGEX.number)) {
    return { invalid: true, text: 'Tu contraseña debe incluir al menos un número' };
  }

  if (password.match(REGEX.empty)) {
    return { invalid: true, text: 'Tu contraseña no debe incluir espacios vacios' };
  }

  return { invalid: false, text: '' };

}

const verifyDataSignup = ( data ) => {

  const { name, password, password2 } = data;
  const verifiedData = verifyData(data);

  if(verifiedData.invalid) return verifiedData;

  if(password !== password2){
    return { invalid: true, text: 'Tu contraseña no coincide' };
  }

  if(name === '') return { invalid : true, text : 'Tu nombre se encuentra vacío' };

  return { invalid: false, text: '' };
}

const fetchData = async () => {
    const response = await fetch( import.meta.env.VITE_API_URL + '/login');
};

const getApiConst = () => {
  fetchData();

  // Llamar a 'fetchData' cada 2 minutos para que el servidor se mantenga activo
  setInterval(fetchData, 20000);
};

function IsLeapYear( year ) {
  // Un año es bisiesto si es divisible por 4 y no es divisible por 100,
  // excepto si también es divisible por 400.
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysOfTheYear( year ) {
  return IsLeapYear(year) ? 366 : 365;
}

export {
  REGEX,
  verifyDataSignup,
  getApiConst,
  generatorId,
  verifyData,
  getDaysOfTheYear
}