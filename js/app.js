/** a web application that interacts with the CityBikes API to display information about bike-sharing networks. */

// Wait for the DOM to be fully loaded before running the script
document.addEventListener( 'DOMContentLoaded', () => {
		// const API_KEY = "api"
		const mainWrapper = document.getElementById( 'main__wrapper' );
		const networkSelect = document.getElementById( 'networkSelect' );

		// get api network
		async function initialLoad() {
			try {
				const response = await fetch( 'http://api.citybik.es/v2/networks' );
				if (!response.ok) {
					throw new Error( `HTTP error! Status: ${response.status}` );
				}
				const networkData = await response.json();
				const networks = networkData.networks;
				// Add a default, disabled option
				networkSelect.innerHTML = '<option>--Please choose a network--</option>';

				// Populate the dropdown with networks
				networks.forEach( (network) => {
						const option = document.createElement('option');
						option.value = network.id;
						option.textContent = `${network.name} - ${network.location.city}`;
						networkSelect.appendChild( option );
					},
				);
			} catch (error) {
				console.error( 'Failed to load initial network data:', error );
				mainWrapper.innerHTML = '<p>Could not load bike networks. Please try again later.</p>';
			}
		}

		initialLoad();
		networkSelect.addEventListener( 'change', retrieveInfo );
	},
);

async function retrieveInfo(event) {
	const selectedNetworkId = event.target.value;
    console.log('User selected network:', selectedNetworkId,);
    
	// fetch details for this specific network ID
}
