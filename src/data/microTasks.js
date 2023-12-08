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

const deleteMicroTask = async ( url, token ) => {

    const options = {
        method : 'DELETE',
        headers : {
            'Authorization' : token
        }
    };

    const response = await fetch( url, options );

    if(!response.ok) throw new Error(response.status);

}

export {
    createMicroTask, 
    deleteMicroTask
}