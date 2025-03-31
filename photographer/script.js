// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.createElement('div');
    hamburger.className = 'mobile-menu-toggle';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').prepend(hamburger);
    
    hamburger.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
});

// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId + '-tab').classList.add('active');
    });
});

// File Upload Functionality
const dropZone = document.getElementById('dropZone');
const fileUpload = document.getElementById('fileUpload');
const browseBtn = document.querySelector('.browse-btn');
const uploadProgress = document.querySelector('.upload-progress');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');
const metadataForm = document.querySelector('.metadata-form');

// Click on drop zone to trigger file input
dropZone.addEventListener('click', function() {
    fileUpload.click();
});

browseBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    fileUpload.click();
});

// Handle file selection
fileUpload.addEventListener('change', function(e) {
    if (this.files.length > 0) {
        handleFiles(this.files);
    }
});

// Drag and drop events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropZone.classList.add('highlight');
}

function unhighlight() {
    dropZone.classList.remove('highlight');
}

dropZone.addEventListener('drop', function(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

function handleFiles(files) {
    // Show upload progress
    dropZone.style.display = 'none';
    uploadProgress.style.display = 'block';
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Show metadata form after upload completes
            setTimeout(() => {
                uploadProgress.style.display = 'none';
                metadataForm.style.display = 'block';
            }, 500);
        }
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '% Uploaded';
    }, 300);
}

// Modal Functionality
const photoCards = document.querySelectorAll('.photo-card');
const photoModal = document.getElementById('photoModal');
const closeModal = document.querySelectorAll('.close-modal');

photoCards.forEach(card => {
    card.addEventListener('click', function() {
        photoModal.classList.add('active');
    });
});

closeModal.forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Event Modal
const createEventBtn = document.querySelector('.create-event-btn');
const eventModal = document.getElementById('eventModal');

createEventBtn.addEventListener('click', function() {
    eventModal.classList.add('active');
});

// Initialize Charts
function initCharts() {
    // Earnings Chart
    const earningsCtx = document.getElementById('earningsChart').getContext('2d');
    const earningsChart = new Chart(earningsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Earnings',
                data: [1200, 1900, 1500, 2200, 1800, 2500, 3000],
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Event Sales Chart
    const eventSalesCtx = document.getElementById('eventSalesChart').getContext('2d');
    const eventSalesChart = new Chart(eventSalesCtx, {
        type: 'bar',
        data: {
            labels: ['Johnson Wedding', 'Corporate Retreat', 'Family Portrait', 'Other Events'],
            datasets: [{
                label: 'Sales',
                data: [2847, 1245, 847, 500],
                backgroundColor: [
                    'rgba(79, 70, 229, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(156, 163, 175, 0.7)'
                ],
                borderColor: [
                    'rgba(79, 70, 229, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(156, 163, 175, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    
    // Preload images for better user experience
    const images = [
        'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});