document.addEventListener("DOMContentLoaded", function () {
    // Set the total number of thumbnails and items per page
    const totalThumbnails = 20;
    const thumbnailsPerPage = 6;

    // Thumbnail descriptions array
    const thumbnailDescriptions = [
        "Data Mining",
        "Predictive Analytics",
        "Big Data",
        "Neural Networks",
        "Regression Analysis",
        "Clustering",
        "Natural Language Processing (NLP)",
        "Feature Engineering",
        "Ensemble Learning",
        "Deep Learning",
        "Data Wrangling",
        "Cross-Validation",
        "Dimensionality Reduction",
        "Decision Trees",
        "Random Forest",
        "K-Means",
        "Support Vector Machines (SVM)",
        "Time Series Analysis",
        // Add more descriptions as needed
    ];

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalThumbnails / thumbnailsPerPage);

    // Initialize the current page from localStorage or default to 1
    let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;

    // Function to show thumbnails based on the current page
    function showThumbnails(page) {
        const thumbnailContainer = document.getElementById("thumbnailContainer");

        // Calculate the start and end index for thumbnails on the current page
        const startIndex = (page - 1) * thumbnailsPerPage;
        const endIndex = startIndex + thumbnailsPerPage;

        // Clear the container before adding new thumbnails
        thumbnailContainer.innerHTML = "";

        // Loop through the thumbnails and add the ones for the current page
        for (let i = startIndex; i < endIndex && i < totalThumbnails; i++) {
            const thumbnailWrapper = document.createElement("div");
            thumbnailWrapper.className = "thumbnail-wrapper";

            const thumbnail = document.createElement("a");
            thumbnail.href = `article${i + 1}.html`; // Set the link to the corresponding article
            thumbnail.className = "thumbnail";

            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = `thumbnails/image${i + 1}.png`;
            thumbnailImage.alt = `Thumbnail ${i + 1}`;
            thumbnail.appendChild(thumbnailImage);

            const description = document.createElement("p");
            description.className = "thumbnail-description";
            description.textContent = thumbnailDescriptions[i];
            thumbnail.appendChild(description);

            thumbnailWrapper.appendChild(thumbnail);
            thumbnailContainer.appendChild(thumbnailWrapper);
        }
    }

    // Function to generate pagination buttons
    function generatePaginationButtons() {
        const paginationContainer = document.getElementById("paginationContainer");

        // Clear the container before adding new buttons
        paginationContainer.innerHTML = "";

        // Loop through the total pages and add a button for each
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", function () {
                currentPage = i;
                showThumbnails(currentPage);
                updateActiveButton();
                localStorage.setItem("currentPage", currentPage); // Save the current page to localStorage
            });
            paginationContainer.appendChild(button);
        }

        // Set the first button as active initially
        updateActiveButton();
    }

    // Function to update the active state of pagination buttons
    function updateActiveButton() {
        const buttons = document.querySelectorAll("#paginationContainer button");
        buttons.forEach((button, index) => {
            button.classList.toggle("active", index + 1 === currentPage);
        });
    }

    // Show the initial set of thumbnails and generate pagination buttons
    showThumbnails(currentPage);
    generatePaginationButtons();
});
