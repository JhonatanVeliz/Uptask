const createMicroTask = async ( url, tracker, token ) => {

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
        body : JSON.stringify(tracker)
    }

    const response = await fetch(url, options);

    if( !response.ok ) throw new Error(response.statusText);
}

export {
    createMicroTask
}