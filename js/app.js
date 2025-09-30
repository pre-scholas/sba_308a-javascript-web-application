const API_KEY = "api"


async function initialLoad() {
    const response = await fetch(
        'http://api.citybik.es/v2/networks'
    );
    const networks = await response.json();

    console.log(networks)
}

initialLoad();