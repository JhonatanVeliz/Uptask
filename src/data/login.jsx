
const createUser = async (url, data) => {

  const options = {
    method: 'POST',
    body: JSON.stringify({ user : data }),
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, options);
  const json = response.json();

  if (response.status !== 200 || !response.ok) throw new Error(`Error al Crear el usuario ${data.name}`);
  return json;

}

const userLogin = async (url, data) => {

  const options = {
    method: 'POST',
    body: JSON.stringify({ user : data }),
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(url, options);
  const json =  await response.json();
  const token = response.headers.get('Authorization');

  if (response.status !== 200 || !response.ok) throw new Error(`${response.status}`);

  if(token){
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(data));
    return token;
  }

}

const userLogout = async (url, token) => {

  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json' 
    }
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (response.status !== 200) throw new Error(`${response.status}`);

  localStorage.removeItem('token');
  return json;
}

export {
  createUser,
  userLogin,
  userLogout
}
