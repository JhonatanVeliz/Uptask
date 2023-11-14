const generatorId = () => {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 1000);

    return `${timestamp}${randomValue}`;
}

const REGEX = {
    email : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    number : /\d/,
    empty : /\s/
}

const verifyData = ( data ) => {

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

export {
    generatorId,
    verifyData
}