export const getMacroTasks = async ( url, token ) => {

    const options = {
        method: 'GET', 
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
        }
    }
    const response = await fetch( url, options );
    const respJson = await response.json();

    if(!response.ok) throw new Error(response.status);

    return respJson;
}

export const createMacroTaskApi = async ( url, macroTask, token ) => {

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
        body : JSON.stringify(macroTask)
    };

    const response = await fetch(url, options);
    const respJson = await response.json();

    if(!response.ok) throw new Error(response.status);

    localStorage.setItem('macroTaskCreated', true);
    return respJson;
}

export const updateMacroTaskApi = async ( url, macroTask, token ) => {

    const options = {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization': token
        },
        body : JSON.stringify( macroTask )
    }

    const response = await fetch( url, options );

    if(!response.ok) throw new Error(response.statusText, response.status);

    return true;
}

export const deleteMacroTask = async ( url, token ) => {

    const options = {
        method : 'DELETE',
        headers : { 
            'Content-Type' : 'application/json',
            'Authorization' : token
        }
    }

    const response = await fetch( url, options );

    if(!response.ok) throw new Error(response.statusText);
}