export async function renderTotalArtists() {

    const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme_data_details.csv'
    const response = await fetch(url);
    const data = await response.text();
    const big_number = data

const container = document.getElementById('total-artists-number');

const number = document.createElement('div')
number.innerHTML = Number(big_number).toLocaleString();

container.appendChild(number)

}