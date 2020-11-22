function getTopPlayers(count, cb) {
    return fetch(`/stats?count=${count}`, {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb)
        .catch((error) => console.log(error.message));
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
}

function getPlayer(name, cb) {
    let player = { name: name };
    return fetch(`/players`, {
        method: 'post',
        body: JSON.stringify(player),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb)
        .catch((error) => console.log(error.message));
}

function updatePlayer(player) {
    return fetch(`/players/${player.name}`, {
        method: 'put',
        body: JSON.stringify(player),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(checkStatus)
        .catch((error) => console.log(error.message));
}

function parseJSON(response) {
    return response.json();
}

const Client = { getTopPlayers, getPlayer, updatePlayer };
export default Client;