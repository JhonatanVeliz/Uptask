export const getMacroTasks = async ( url ) => {

    const response = await fetch( url );
    const respJson = await response.json();

    if(!response.ok) throw new Error(response.status);

    return respJson;
}

export const createMacroTaskApi = async ( url, macroTask ) => {

    const options = {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(macroTask)
    };

    const response = await fetch(url, options);
    const respJson = await response.json();

    if(!response.ok) throw new Error(response.status);

    console.log(respJson);
    return respJson;

}

export const deleteMacroTask = async ( url ) => {

    const options = {
        method : 'DELETE',
        headers : { 'Content-Type' : 'application/json'}
    }

    const response = await fetch( url, options );
    const respJson = await response.json();

    if(!response.ok) throw new Error(response.status);

    return respJson;
}