import { useEffect, useState } from "react"

const useFetchLogin = (url) => {

  const [state, setState] = useState({ user: null, errors: false });

  const getUserLogin = async () => {

    const response = await fetch(url);
    const data = await response.json();

    setState({ user: data, errors: false });
  }

  useEffect(() => {
    getUserLogin();
  }, [url]);

  return { ...state }

}

export default useFetchLogin