
const createUser = async (url, data) => {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: data })
  };

  const response = await fetch(url, options);
  const json = response.json();

  if (response.status !== 200 || !response.ok) throw new Error(`Error al Crear el usuario ${data.name}`);

  localStorage.setItem('isUserCreated', true);
  return json;

}

const userLogin = async (url, user) => {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  };

  const response = await fetch(url, options);
  const json = await response.json();
  const token = response.headers.get('Authorization');
  const { name, id, avatar_url } = await json.status.data.user;
  console.log(json.status.data.user);

  if (response.status !== 200 || !response.ok) throw new Error(`${response.status}`);

  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));
    return { token, name, id, avatar_url };
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

// const userData = new FormData();
// userData.append('avatar_url', avatar_url);

const updateUser = async (url, user, token) => {

  const data = { name : user.name, password : user.password, avatar : user.avatar }

  const options = {
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json',
      'Authorization': token
    },
    body: JSON.stringify( { user : data } )
  }

  const response = await fetch(url, options);
  console.log(user);
  const respJson = await response.json();

  if (!response.ok) throw new Error(response.status);

  localStorage.setItem('userData', JSON.stringify(user));
  return respJson;
}

export {
  createUser,
  userLogin,
  userLogout,
  updateUser
}
