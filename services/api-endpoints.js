const api_baseURL = 'https://ikyrwco2w3.execute-api.us-west-1.amazonaws.com/dev';

export const createAccount = async (account) => {
    const endpoint = `${api_baseURL}/accounts/`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        return null;
    }
}

export const login = async (credentials) => {
    const endpoint = `${api_baseURL}/login/`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        // Handle specific error codes here
        return null;
    }
}

