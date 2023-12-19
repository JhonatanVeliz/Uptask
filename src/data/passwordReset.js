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

export const updateResetPassword = async ( url ) => {

    const response = await fetch(url);

    if(!response.ok) throw new Error(response.status, response.text)

    console.log(response);
}