
export async function renderDataDate() {

const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme-data.csv';

// Fetch the file's metadata to get the date
const response = await fetch(url, { method: 'HEAD' });
const lastModified = response.headers.get('last-modified');

if (!lastModified) 
    return;

const container = document.getElementById('date-date');

const dateElement = document.createElement('div');
dateElement.innerHTML = 'data last updated on ' + (new Date(lastModified).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));

container.appendChild(dateElement);
}