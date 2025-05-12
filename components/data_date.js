
export async function renderDataDate() {

const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme-data.csv';

// Fetch the file's metadata to get the date
const response = await fetch(url, { method: 'HEAD' });
const lastModified = response.headers.get('last-modified');

if (!lastModified) 
    return;

const container = document.getElementById('date-date-1');

const dateElement = document.createElement('div');
dateElement.innerHTML = 'as of ' + (new Date(lastModified).toLocaleString('en-US', { year: 'numeric', month: 'long'}));

container.appendChild(dateElement);

const container_2 = document.getElementById('date-date-2');

const dateElement_2 = document.createElement('div');
dateElement_2.innerHTML = 'chart data updates monthly, last updated on ' + (new Date(lastModified).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));

container_2.appendChild(dateElement_2);
}