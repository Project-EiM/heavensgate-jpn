document.addEventListener('DOMContentLoaded', function() {
    try {
        const images = [
            "/images/landscape/25-09-15 1.jpg",
            "/images/landscape/25-09-15 2.jpg",
            "/images/landscape/25-09-15 3.jpg",
            "/images/landscape/25-09-15 45.jpg",
            "/images/landscape/25-09-15 47.jpg",
            "/images/landscape/25-09-15 48.jpg",
            "/images/landscape/25-09-15 49.jpg",
            "/images/landscape/25-09-15 51.jpg",
            "/images/landscape/25-09-15 79.jpg",
            "/images/landscape/25-09-15 80.jpg",
            "/images/landscape/25-09-15 81.jpg",
            "/images/landscape/DSC00856.jpg",
            "/images/landscape/DSC02096.jpg",
            "/images/landscape/DSC04058.jpg",
            "/images/landscape/DSC04471.jpg",
            "/images/landscape/DSC04483.jpg",
            "/images/landscape/DSC04493.jpg",
            "/images/landscape/DSC04564.jpg",
            "/images/landscape/DSC04566.jpg",
            "/images/portrait/25-09-15 4.jpg",
            "/images/portrait/25-09-15 46.jpg",
            "/images/portrait/25-09-15 5.jpg",
            "/images/portrait/25-09-15 50.jpg",
            "/images/portrait/25-09-15 83.jpg",
            "/images/portrait/DSC04489.jpg",
            "/images/portrait/DSC04496.jpg",
            "/images/portrait/DSC04499.jpg",
            "/images/portrait/DSC04521.jpg",
            "/images/portrait/DSC04569.jpg",
            "/images/portrait/DSC04599.jpg",
            "/images/portrait/DSC04613.jpg",
            "/images/portrait/DSC04614.jpg",
            "/images/portrait/DSC04615.jpg",
            "/images/portrait/DSC04618.jpg",
            "/images/portrait/DSC04621.jpg"
        ];

        const gridContainer = document.querySelector('.background-grid');
        if (gridContainer) {
            gridContainer.innerHTML = '';
            // Shuffle the array
            for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [images[i], images[j]] = [images[j], images[i]];
            }

            images.forEach(imageSrc => {
                const imgElement = document.createElement('img');
                imgElement.src = imageSrc;
                imgElement.alt = 'background image';
                imgElement.onerror = function() {
                    console.error("Error loading image:", imageSrc);
                };
                gridContainer.appendChild(imgElement);
            });
        }
    } catch (error) {
        console.error("An error occurred in random-background.js:", error);
    }
});