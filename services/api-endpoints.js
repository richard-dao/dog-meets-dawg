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

export const updateAccount = async (updatedAccount) => {
    const endpoint = `${api_baseURL}/update-account`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAccount),
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        console.error("Update failed:", data);
        return null;
    }
}

export const getAccounts = async (userID) => {
	const endpoint = `${api_baseURL}/getAccounts`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({userID}),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		console.error("Get accounts failed:", data);
		return [];
	}
}

export const getMatches = async (userID) => {
	const endpoint = `${api_baseURL}/getMatches`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({userID}),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		console.error("Get matches failed:", data);
		return [];
	}
}

export const getChatHistory = async (chatID) => {
	const endpoint = `${api_baseURL}/getChatHistory`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({chatID}),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		console.error("Get chat history failed:", data);
		return [];
	}
}

export const handleMatch = async (userID, swipedUserID) => {
	const endpoint = `${api_baseURL}/handleMatch`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({userID, swipedUserID}),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		console.error("Handle match failed:", data);
		return null;
	}
}
