const createMicroTask = async ( url, tracker, token ) => {

    console.log(token);

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
        body : JSON.stringify(tracker)
    }

    const response = await fetch(url, options);
    console.log(response);

    if( !response.ok ) throw new Error(response.statusText);


}

export {
    createMicroTask
}