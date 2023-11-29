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

const updateUser = async (url, user, token) => {

  const { name, password, email, avatar, avatarVerify } = user;

  const userData = new FormData();
  userData.append('user[name]', name);
  userData.append('user[password]', password);

  if(avatar !== avatarVerify){
    userData.append('user[avatar]', avatar);
  }

  const options = {
    method: 'PUT',
    headers: {
      'Authorization': token
    },
    body: userData
  }

  const response = await fetch(url, options);

  if (!response.ok) throw new Error(response.status);

  localStorage.setItem('userData', JSON.stringify({ email, password }));
  return;
}

export {
  createUser,
  userLogin,
  userLogout,
  updateUser
}
