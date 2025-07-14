export async function renderTotalArtists() {
    const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme_data_details.csv';
    let big_number = '1 million+'; // Fallback value

    try {
        const response = await fetch(url);
        const data = await response.text();

        if (data) {
            const [numberValue] = data.split(',');
            if (!isNaN(numberValue)) {
                big_number = Number(numberValue).toLocaleString();
            }
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }

    const container = document.getElementById('total-artists-number');
    const number = document.createElement('div');
    number.innerHTML = big_number;

    container.appendChild(number);
}