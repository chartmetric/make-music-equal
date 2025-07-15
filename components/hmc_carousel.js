"use strict";

import { fetchArticles } from "./utils.js";

export async function renderCarousel() {
    const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/hmc_articles.csv'
    
    const data = await fetchArticles(url)

     if (!data.length) return;

    const carousel = document.getElementById('hmc-articles-carousel');
    
    // Create a wrapper div with padding
    const carouselWrapper = document.createElement('div');
    carouselWrapper.style.padding = '0.5rem';
    carouselWrapper.style.width = '100%';
    carouselWrapper.style.maxWidth = '100%';
    carouselWrapper.style.overflow = 'hidden';
    
    // Insert wrapper before carousel and move carousel into it
    carousel.parentNode.insertBefore(carouselWrapper, carousel);
    carouselWrapper.appendChild(carousel);
    
    carousel.style.display = 'flex';
    carousel.style.overflowX = 'scroll';
    carousel.style.overflowY = 'hidden';
    carousel.style.scrollSnapType = 'x mandatory';
    carousel.style.scrollBehavior = 'smooth';
    carousel.style.gap = '10px';
    carousel.style.whiteSpace = 'nowrap';
    carousel.style.alignItems = 'flex-start';
    carousel.style.justifyContent = 'flex-start';
    carousel.style.padding = '10px 0 10px 10px';
    carousel.style.width = '100%';
    carousel.style.maxWidth = '100%';
    carousel.style.boxSizing = 'border-box';

    // Create scroll indicators
    const scrollIndicators = document.createElement('div');
    scrollIndicators.style.display = 'flex';
    scrollIndicators.style.justifyContent = 'center';
    scrollIndicators.style.alignItems = 'center';
    scrollIndicators.style.gap = '10px';
    scrollIndicators.style.marginTop = '10px';
    scrollIndicators.style.height = '30px';

    const leftArrow = document.createElement('div');
    leftArrow.innerHTML = '&lt;';
    leftArrow.style.fontSize = '18px';
    leftArrow.style.fontWeight = 'bold';
    leftArrow.style.color = 'rgba(77, 139, 182, 0.3)';
    leftArrow.style.cursor = 'pointer';
    leftArrow.style.padding = '5px 10px';
    leftArrow.style.borderRadius = '15px';
    leftArrow.style.transition = 'all 0.3s ease';
    leftArrow.style.userSelect = 'none';

    const rightArrow = document.createElement('div');
    rightArrow.innerHTML = '&gt;';
    rightArrow.style.fontSize = '18px';
    rightArrow.style.fontWeight = 'bold';
    rightArrow.style.color = 'rgba(77, 139, 182, 0.3)';
    rightArrow.style.cursor = 'pointer';
    rightArrow.style.padding = '5px 10px';
    rightArrow.style.borderRadius = '15px';
    rightArrow.style.transition = 'all 0.3s ease';
    rightArrow.style.userSelect = 'none';

    // Add dots indicator in the middle
    const dotsIndicator = document.createElement('div');
    dotsIndicator.innerHTML = '•••';
    dotsIndicator.style.fontSize = '14px';
    dotsIndicator.style.color = 'rgba(77, 139, 182, 0.5)';
    dotsIndicator.style.letterSpacing = '2px';

    scrollIndicators.appendChild(leftArrow);
    scrollIndicators.appendChild(dotsIndicator);
    scrollIndicators.appendChild(rightArrow);
    
    carouselWrapper.appendChild(scrollIndicators);

    // Custom scrollbar styling
    const style = document.createElement('style');
    style.innerHTML = `
        #hmc-articles-carousel {
            scrollbar-width: thin;
            scrollbar-color: rgba(77, 139, 182, 0.8) rgba(255, 255, 255, 0.1);
            min-height: 220px;
            max-height: 220px;
        }
        
        #hmc-articles-carousel::-webkit-scrollbar {
            height: 12px;
        }
        
        #hmc-articles-carousel::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        #hmc-articles-carousel::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, rgba(77, 139, 182, 0.8) 0%, rgba(83, 167, 81, 0.8) 100%);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            transition: background 0.3s ease;
        }
        
        #hmc-articles-carousel::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(90deg, rgba(77, 139, 182, 1) 0%, rgba(83, 167, 81, 1) 100%);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .carousel-item {
            flex: 0 0 auto;
            width: 300px;
            min-width: 300px;
            height: 200px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            background-color: #fff;
            scroll-snap-align: start;
            text-align: center;
            overflow: hidden;
            padding: 1rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .carousel-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        .carousel-text {
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Helvetica Neue, sans-serif;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
        }
        
        .carousel-title {
            font-weight: bold;
            font-size: 1.2rem;
            line-height: 1.2rem;
            background: linear-gradient(225deg, #4D8BB6 0%, #53A751 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            padding-top: 1rem;
            hyphens: auto;
            word-wrap: break-word;
        }
        
        .carousel-date {
            margin: 1rem 0;
            font-size: 1rem;
            color: #555;
        }
        
        /* Responsive design for smaller screens */
        @media (max-width: 768px) {
            .carousel-item {
                width: 280px;
                min-width: 280px;
                height: 200px;
                padding: 1rem;
            }
            
            .carousel-title {
                font-size: 1rem;
            }
            
            .carousel-date {
                font-size: 0.9rem;
            }
            
            #hmc-articles-carousel::-webkit-scrollbar {
                height: 8px;
            }
        }
    `;
    document.head.appendChild(style);

    // Function to update scroll indicators
    function updateScrollIndicators() {
        const scrollLeft = carousel.scrollLeft;
        const scrollWidth = carousel.scrollWidth;
        const clientWidth = carousel.clientWidth;
        const maxScrollLeft = scrollWidth - clientWidth;

        // Update left arrow
        if (scrollLeft > 0) {
            leftArrow.style.color = 'rgba(77, 139, 182, 0.8)';
            leftArrow.style.background = 'rgba(77, 139, 182, 0.1)';
            leftArrow.style.cursor = 'pointer';
        } else {
            leftArrow.style.color = 'rgba(77, 139, 182, 0.3)';
            leftArrow.style.background = 'transparent';
            leftArrow.style.cursor = 'default';
        }

        // Update right arrow
        if (scrollLeft < maxScrollLeft) {
            rightArrow.style.color = 'rgba(77, 139, 182, 0.8)';
            rightArrow.style.background = 'rgba(77, 139, 182, 0.1)';
            rightArrow.style.cursor = 'pointer';
        } else {
            rightArrow.style.color = 'rgba(77, 139, 182, 0.3)';
            rightArrow.style.background = 'transparent';
            rightArrow.style.cursor = 'default';
        }
    }

    // Add scroll event listener to update indicators
    carousel.addEventListener('scroll', updateScrollIndicators);

    // Populate the carousel with items
    data.forEach(article => {
        const articleLink = document.createElement('a');
        articleLink.href = article.url;
        articleLink.target = "_blank";
        articleLink.rel = "noopener noreferrer";
        articleLink.style.textDecoration = 'none';
        articleLink.style.color = 'inherit';

        const articleDiv = document.createElement('div');
        articleDiv.classList.add('carousel-item');
        
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

        articleDiv.appendChild(textContainer);
        articleLink.appendChild(articleDiv);
        carousel.appendChild(articleLink);
    });

    // Add click functionality to arrows after content is loaded
    leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const currentScroll = carousel.scrollLeft;
        if (currentScroll > 0) {
            carousel.scrollBy({ left: -320, behavior: 'smooth' });
        }
    });

    rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        
        if (currentScroll < maxScrollLeft) {
            carousel.scrollBy({ left: 320, behavior: 'smooth' });
        }
    });

    // Initialize scroll indicators after content is loaded
    setTimeout(() => {
        updateScrollIndicators();
    }, 100);
}