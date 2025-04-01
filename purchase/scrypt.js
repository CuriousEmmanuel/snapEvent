// Infinite Scroll
document.addEventListener('DOMContentLoaded', function() {
    const photoGrid = document.getElementById('photoGrid');
    const loadingIndicator = document.getElementById('loadingIndicator');
    let isLoading = false;
    let page = 1;

    // Simulate loading more photos on scroll
    window.addEventListener('scroll', function() {
        if (isLoading) return;
        
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.body.offsetHeight - 500; // Load before reaching bottom
        
        if (scrollPosition >= pageHeight) {
            loadMorePhotos();
        }
    });

    function loadMorePhotos() {
        isLoading = true;
        loadingIndicator.classList.add('active');
        
        // Simulate API call delay
        setTimeout(() => {
            // In a real app, you would fetch more photos from your API
            const newPhotos = generatePhotoCards(6); // Generate 6 more photos
            photoGrid.innerHTML += newPhotos;
            
            page++;
            isLoading = false;
            loadingIndicator.classList.remove('active');
        }, 1500);
    }

    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    closeModal.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });

    // Filter functionality
    const filterOptions = document.querySelectorAll('.filter-option input');
    filterOptions.forEach(option => {
        option.addEventListener('change', function() {
            // In a real app, you would filter the results based on selected options
            console.log('Filter changed:', this.value);
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortBy');
    sortSelect.addEventListener('change', function() {
        // In a real app, you would sort the results based on selected option
        console.log('Sort by:', this.value);
    });

    // Generate sample photo cards (for demo purposes)
    function generatePhotoCards(count) {
        const photos = [
            {
                id: 1,
                title: "Bridal Portrait",
                event: "Johnson Wedding",
                location: "New York",
                photographer: "Alex Johnson",
                price: 29.99,
                image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 2,
                title: "First Dance",
                event: "Johnson Wedding",
                location: "New York",
                photographer: "Alex Johnson",
                price: 24.99,
                image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 3,
                title: "Ceremony",
                event: "Smith Wedding",
                location: "New York",
                photographer: "Maria Garcia",
                price: 34.99,
                image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 4,
                title: "Reception",
                event: "Williams Wedding",
                location: "New York",
                photographer: "James Wilson",
                price: 19.99,
                image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 5,
                title: "Bride & Groom",
                event: "Johnson Wedding",
                location: "New York",
                photographer: "Alex Johnson",
                price: 39.99,
                image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfH
