/*
    Takes in an array of objects to map the URI to be used in operations.
*/

export const RequestParamSetter = (arrayObject) => {

    const searchParams = new URLSearchParams();

    arrayObject.map((data) => {
        searchParams.append(data.param, data.data)
    });

    return searchParams;
}