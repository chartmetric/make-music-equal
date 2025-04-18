"use strict";

async function fetchData() {
    const response = await fetch('https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/hmc-articles.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');

    const data = rows.slice(1).map(row => {
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(value => value.replace(/^"|"$/g, '').trim());
        return {
            name: values[1],
            published_at: new Date(values[2]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            url: values[3],
        };
    });

    return data;
}

export async function renderCarousel() {
    const data = await fetchData();

    const carousel = document.getElementById('hmc-articles-carousel');
    carousel.style.display = 'flex';
    carousel.style.overflowX = 'auto';
    carousel.style.scrollSnapType = 'x mandatory';
    carousel.style.scrollBehavior = 'smooth';
    carousel.style.gap = '10px';
    carousel.style.whiteSpace = 'nowrap';
    carousel.style.scrollbarWidth = 'none'; // Hide scrollbar for Firefox
    carousel.style.msOverflowStyle = 'none'; // Hide scrollbar for IE/Edge
    carousel.style.alignItems = 'flex-start'; // Aligns items properly
    carousel.style.justifyContent = 'flex-start'; // Ensures no extra space at start
    carousel.style.padding = '10px 0 10px 10px'; // Left padding to prevent cut-off

    // Hide scrollbar for WebKit browsers (Chrome, Safari)
    const style = document.createElement('style');
    style.innerHTML = `
        #hmc-articles-carousel::-webkit-scrollbar {
            display: none;
        }
        .carousel-item {
            flex: 0 0 auto;
            width: 300px;
            height: 200px;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            background-color: #fff;
            scroll-snap-align: start;
            text-align: center;
            overflow:hidden;
            padding: 1rem;
        }
        .carousel-text {
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Helvetica Neue, sans-serif;
            text-align: left;
        }
        .carousel-title {
            font-weight: bold;
            font-size: 1.2rem;
            line-height: 1.5rem;
            background: linear-gradient(225deg, #4D8BB6 0%, #53A751 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .carousel-date {
            margin: 1rem 0;
            font-size: 1rem;
            color: #555;
        }
    `;
    document.head.appendChild(style);

    // Populate the carousel with items
    data.forEach(article => {
        const articleLink = document.createElement('a');
        articleLink.href = article.url;
        articleLink.target = "_blank"; // Opens in new tab
        articleLink.rel = "noopener noreferrer"; // Security best practice
        articleLink.style.textDecoration = 'none';
        articleLink.style.color = 'inherit';

        const articleDiv = document.createElement('div');
        articleDiv.classList.add('carousel-item');

        // const articleImage = document.createElement('img');
        // articleImage.src = article.image_url;
        // articleImage.alt = article.name;
        
        const textContainer = document.createElement('div');
        textContainer.classList.add('carousel-text');

        const articleName = document.createElement('p');
        articleName.classList.add('carousel-title');
        articleName.textContent = article.name;

        const articlePublishedAt = document.createElement('p');
        articlePublishedAt.classList.add('carousel-date');
        articlePublishedAt.textContent = article.published_at;

        textContainer.appendChild(articleName);
        textContainer.appendChild(articlePublishedAt);

        // articleDiv.appendChild(articleImage);
        articleDiv.appendChild(textContainer);
        articleLink.appendChild(articleDiv);
        carousel.appendChild(articleLink);
    });

}
