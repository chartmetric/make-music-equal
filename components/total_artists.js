import { fetchTableData } from "./utils"

export async function renderTotalArtists() {

const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme-data.csv'
const data = await fetchTableData(url)

if (!data.length) 
    return
else
    var big_number = data.length

const container = document.getElementById('total-artists-number');

const number = document.createElement('div')
number.innerHTML = big_number.toLocaleString()

container.appendChild(number)

}