/** a web application that interacts with the CityBikes API to display information about bike-sharing networks. */

// Wait for the DOM to be fully loaded before running the script
document.addEventListener(
	'DOMContentLoaded',
	() => {
		// const API_KEY = "api"
		const stationDetailsContainer =
			document.getElementById(
				'station-details',
			);
		const networkSelect =
			document.getElementById(
				'networkSelect',
			);

		// get api network
		async function initialLoad() {
			try {
				const response =
					await fetch(
						'http://api.citybik.es/v2/networks',
					);

				console.log(response);
				if (!response.ok) {
					throw new Error(
						`HTTP error! Status: ${response.status}`,
					);
				}
				const networkData =
					await response.json();
				const networks =
					networkData.networks;
				// Add a default, disabled option
				networkSelect.innerHTML =
					'<option>--Please choose a network--</option>';

				// Populate the dropdown with networks
				networks.forEach(
					(network) => {
						const option =
							document.createElement(
								'option',
							);
						option.value =
							network.id;
						option.textContent = `${network.name} - ${network.location.city}`;
						networkSelect.appendChild(
							option,
						);
					},
				);
			} catch (error) {
				console.error(
					'Failed to load initial network data:',
					error,
				);
				stationDetailsContainer.innerHTML =
					'<p>Could not load bike networks. Please try again later.</p>';
			}
		}

		initialLoad();
		networkSelect.addEventListener(
			'change',
			retrieveInfo,
		);

		async function retrieveInfo(
			event,
		) {
			const selectedNetworkId =
				event.target.value;
			console.log(
				'User selected network:',
				selectedNetworkId,
			);

			// Clear previous results
			stationDetailsContainer.innerHTML =
				'';

			// If the user selects the placeholder, do nothing further
			if (!selectedNetworkId) {
				return;
			}
			// fetch network-specific details from the CityBikes API and display the station information dynamically
			try {
				stationDetailsContainer.innerHTML =
					'<p>Loading stations...</p>';
				const response =
					await fetch(
						`http://api.citybik.es/v2/networks/${selectedNetworkId}`,
					);
				if (!response.ok) {
					throw new Error(
						`HTTP error! Status: ${response.status}`,
					);
				}
				const data =
					await response.json();
				const { stations } =
					data.network;

				stationDetailsContainer.innerHTML =
					''; // Clear "Loading..." message

				if (
					stations.length ===
					0
				) {
					stationDetailsContainer.innerHTML =
						'<p>No stations found for this network.</p>';
					return;
				}

				stations.forEach(
					(station) => {
						const stationElement =
							document.createElement(
								'div',
							);
						stationElement.classList.add(
							'station',
						);
						stationElement.innerHTML = `
						<h3>${station.name}</h3>
						<p>Free Bikes: ${station.free_bikes}</p>
						<p>Empty Slots: ${station.empty_slots}</p>
					`;
						stationDetailsContainer.appendChild(
							stationElement,
						);
					},
				);
			} catch (error) {
				console.error(
					'Failed to retrieve network info:',
					error,
				);
				stationDetailsContainer.innerHTML =
					'<p>Could not load station information. Please try again.</p>';
			}
		}
	},
);
