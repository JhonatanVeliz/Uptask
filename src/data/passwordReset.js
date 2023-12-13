export const resetPasswordApi = async (url, user) => {

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
    }

    const response = await fetch(url, options);

    if(!response.ok) throw new Error(response.status, response.statusText);

}