 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS2bs8fcvKO3YPXlMICgzFUYFgwUNB600",
  authDomain: "carsrental-b7662.firebaseapp.com",
  projectId: "carsrental-b7662",
  storageBucket: "carsrental-b7662.firebasestorage.app",
  messagingSenderId: "53388993547",
  appId: "1:53388993547:web:7dd036d9e83b5d7c1e130e",
  measurementId: "G-P14PDHTWNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 // Car data with South African Rand prices
        const carsData = [
            {
                id: 1,
                name: "Toyota Camry",
                type: "economy",
                price: 650,
                seats: 5,
                transmission: "automatic",
                fuel: "Petrol",
                engine: "2.5L 4-Cylinder",
                mileage: "6.8L/100km",
                image: "🚗",
                features: ["Air Conditioning", "Bluetooth", "USB Ports", "Reverse Camera"],
                available: true
            },
            {
                id: 2,
                name: "Honda Civic",
                type: "compact",
                price: 580,
                seats: 5,
                transmission: "automatic",
                fuel: "Petrol",
                engine: "2.0L 4-Cylinder",
                mileage: "6.2L/100km",
                image: "🚙",
                features: ["Air Conditioning", "Bluetooth", "Lane Assist", "Apple CarPlay"],
                available: true
            },
            {
               
            id: 3,
            name: "BMW X5",
            type: "luxury",
            price: 2100,
            seats: 7,
            transmission: "automatic",
            fuel: "Petrol",
            engine: "3.0L Turbo V6",
            mileage: "8.9L/100km",
            image: "https://example.com/images/bmw-x5.jpg",  // <-- URL of the car image here
            features: ["Leather Seats", "Panoramic Roof", "Navigation", "Premium Sound"],
            available: true


            },
            {
                id: 4,
                name: "Ford Mustang",
                type: "sports",
                price: 1750,
                seats: 4,
                transmission: "manual",
                fuel: "Petrol",
                engine: "5.0L V8",
                mileage: "12.4L/100km",
                image: "🏎️",
                features: ["Performance Package", "Sport Exhaust", "Racing Stripes", "Premium Interior"],
                available: true
            },
            {
                id: 5,
                name: "Chevrolet Suburban",
                type: "suv",
                price: 1580,
                seats: 8,
                transmission: "automatic",
                fuel: "Petrol",
                engine: "5.3L V8",
                mileage: "11.8L/100km",
                image: "🚛",
                features: ["3rd Row Seating", "Towing Package", "Rear Entertainment", "4WD"],
                available: true
            },
            {
                id: 6,
                name: "Tesla Model S",
                type: "luxury",
                price: 2800,
                seats: 5,
                transmission: "automatic",
                fuel: "Electric",
                engine: "Dual Motor",
                mileage: "650km Range",
                image: "⚡",
                features: ["Autopilot", "Supercharging", "Premium Interior", "Glass Roof"],
                available: true
            },
            {
                id: 7,
                name: "Nissan Altima",
                type: "economy",
                price: 680,
                seats: 5,
                transmission: "automatic",
                fuel: "Petrol",
                engine: "2.5L 4-Cylinder",
                mileage: "6.8L/100km",
                image: "🚗",
                features: ["Safety Shield", "Remote Start", "Heated Seats", "Blind Spot Monitor"],
                available: true
            },
            {
                id: 8,
                name: "Porsche 911",
                type: "sports",
                price: 4500,
                seats: 2,
                transmission: "manual",
                fuel: "Petrol",
                engine: "3.0L Twin-Turbo",
                mileage: "9.1L/100km",
                image: "🏁",
                features: ["Sport Chrono", "PASM", "Carbon Fiber", "Track Package"],
                available: true
            },
            {
                id: 9,
                name: "Mercedes-Benz GLE",
                type: "luxury",
                price: 2300,
                seats: 7,
                transmission: "automatic",
                fuel: "Petrol",
                engine: "3.0L Turbo V6",
                mileage: "8.5L/100km",
                image: "🚙",
                features: ["MBUX Infotainment", "Air Suspension", "360° Camera", "Premium Audio"],
                available: true
            },
            {
                id: 10,
                name: "Volkswagen Polo",
                type: "compact",
                price: 420,
                seats: 5,
                transmission: "manual",
                fuel: "Petrol",
                engine: "1.4L 4-Cylinder",
                mileage: "5.8L/100km",
                image: "🚗",
                features: ["Air Conditioning", "Bluetooth", "Central Locking", "Electric Windows"],
                available: true
            }
        ];

        let filteredCars = [...carsData];
        let selectedCarId = null;

        // Initialize app and load data
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
            setDefaultDates();
        });

        function initializeApp() {
            // Show loading
            showLoading('home-loading');
            showLoading('cars-loading');

            // Simulate loading delay
            setTimeout(() => {
                hideLoading('home-loading');
                hideLoading('cars-loading');
                
                displayCars('featured-cars', carsData.slice(0, 6));
                displayCars('all-cars', carsData);
                populateCarSelection();
            }, 1000);
        }

        function showLoading(elementId) {
            const loading = document.getElementById(elementId);
            if (loading) loading.style.display = 'block';
        }

        function hideLoading(elementId) {
            const loading = document.getElementById(elementId);
            if (loading) loading.style.display = 'none';
        }

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.dataset.page;
                showPage(page);
                
                // Update active nav
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        function showPage(pageId) {
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
        }

        // Display cars with enhanced styling
        function displayCars(containerId, carsToShow) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';

            carsToShow.forEach(car => {
                const carCard = document.createElement('div');
                carCard.className = 'car-card fade-in';
                carCard.onclick = () => showCarDetails(car);

                const transmissionIcon = car.transmission === 'automatic' ? 'fas fa-cog' : 'fas fa-cogs';
                const fuelIcon = car.fuel === 'Electric' ? 'fas fa-bolt' : 'fas fa-gas-pump';

                carCard.innerHTML = `
                    <div class="car-image">${car.image}</div>
                    <div class="car-details">
                        <div class="car-name">
                            <i class="fas fa-star"></i>
                            ${car.name}
                        </div>
                        <div class="car-specs">
                            <div class="spec-item">
                                <i class="fas fa-users"></i>
                                <span class="spec-label">Seats</span>
                                <span class="spec-value">${car.seats}</span>
                            </div>
                            <div class="spec-item">
                                <i class="${transmissionIcon}"></i>
                                <span class="spec-label">Transmission</span>
                                <span class="spec-value">${car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</span>
                            </div>
                            <div class="spec-item">
                                <i class="${fuelIcon}"></i>
                                <span class="spec-label">Fuel</span>
                                <span class="spec-value">${car.fuel}</span>
                            </div>
                        </div>
                        <div class="car-price">
                            <span class="currency">R</span>${car.price.toLocaleString()}<span style="font-size: 1rem; color: #6b7280;">/day</span>
                        </div>
                        <button class="rent-btn" onclick="event.stopPropagation(); selectCarForBooking(${car.id});">
                            <i class="fas fa-calendar-check"></i>
                            Rent Now
                        </button>
                    </div>
                `;
                container.appendChild(carCard);
            });
        }

        // Show car details in enhanced modal
        function showCarDetails(car) {
            selectedCarId = car.id;
            document.getElementById('modal-car-name').innerHTML = `
                <i class="fas fa-car"></i>
                ${car.name}
            `;
            document.getElementById('modal-car-image').textContent = car.image;
            document.getElementById('modal-price').innerHTML = `
                <span class="currency">R</span>${car.price.toLocaleString()}<span style="font-size: 1.2rem; color: #6b7280;">/day</span>
            `;

            // Enhanced specs
            const specs = [
                { label: 'Category', value: car.type.charAt(0).toUpperCase() + car.type.slice(1), icon: 'fas fa-tag' },
                { label: 'Seats', value: car.seats, icon: 'fas fa-users' },
                { label: 'Transmission', value: car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1), icon: car.transmission === 'automatic' ? 'fas fa-cog' : 'fas fa-cogs' },
                { label: 'Fuel Type', value: car.fuel, icon: car.fuel === 'Electric' ? 'fas fa-bolt' : 'fas fa-gas-pump' },
                { label: 'Engine', value: car.engine, icon: 'fas fa-engine' },
                { label: 'Efficiency', value: car.mileage, icon: 'fas fa-leaf' }
            ];

            const specsGrid = document.getElementById('modal-specs');
            specsGrid.innerHTML = '';
            specs.forEach(spec => {
                specsGrid.innerHTML += `
                    <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; text-align: center; border: 1px solid #e5e7eb; transition: all 0.3s ease;" class="spec-card">
                        <i class="${spec.icon}" style="font-size: 1.5rem; color: #667eea; margin-bottom: 0.75rem;"></i>
                        <div style="font-size: 0.9rem; color: #6b7280; font-weight: 600; margin-bottom: 0.5rem;">${spec.label}</div>
                        <div style="font-weight: 800; color: #1f2937; font-size: 1.1rem;">${spec.value}</div>
                    </div>
                `;
            });

            // Features section
            if (car.features && car.features.length) {
                specsGrid.innerHTML += `
                    <div style="grid-column: 1/-1; background: linear-gradient(135deg, #667eea10, #764ba210); padding: 1.5rem; border-radius: 12px; border: 1px solid #e5e7eb;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                            <i class="fas fa-star" style="color: #667eea; font-size: 1.2rem;"></i>
                            <span style="font-weight: 800; color: #1f2937; font-size: 1.1rem;">Premium Features</span>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                            ${car.features.map(feature => `
                                <span style="background: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600; color: #374151; border: 1px solid #e5e7eb;">
                                    <i class="fas fa-check" style="color: #10b981; margin-right: 0.25rem;"></i>
                                    ${feature}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            document.getElementById('car-modal').classList.add('show');
        }

        function closeModal() {
            document.getElementById('car-modal').classList.remove('show');
        }

        // Book car from modal
        function bookCar() {
            closeModal();
            showPage('booking');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-link[data-page="booking"]').classList.add('active');
            document.getElementById('car-selection').value = selectedCarId;
        }

        // Select car for booking from card
        function selectCarForBooking(carId) {
            selectedCarId = carId;
            showPage('booking');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-link[data-page="booking"]').classList.add('active');
            document.getElementById('car-selection').value = carId;
        }

        // Populate car selection dropdown
        function populateCarSelection() {
            const select = document.getElementById('car-selection');
            select.innerHTML = '<option value="">Choose a car</option>';
            carsData.forEach(car => {
                const option = document.createElement('option');
                option.value = car.id;
                option.textContent = `${car.name} (R${car.price.toLocaleString()}/day)`;
                select.appendChild(option);
            });
        }

        // Set default dates
        function setDefaultDates() {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            
            document.getElementById('pickup-date').value = today;
            document.getElementById('return-date').value = tomorrowStr;
            document.getElementById('pickup-date-booking').value = today;
            document.getElementById('return-date-booking').value = tomorrowStr;
        }

        // Search cars
        function searchCars() {
            showPage('cars');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-link[data-page="cars"]').classList.add('active');
        }

        // Enhanced filter cars
        function filterCars() {
            const type = document.getElementById('car-type').value;
            const priceRange = document.getElementById('price-range').value;
            const transmission = document.getElementById('transmission').value;
            const seats = document.getElementById('seats').value;

            filteredCars = carsData.filter(car => {
                let match = true;
                
                if (type !== 'all' && car.type !== type) match = false;
                if (transmission !== 'all' && car.transmission !== transmission) match = false;
                
                if (seats !== 'all') {
                    if (seats === '7') {
                        if (car.seats < 7) match = false;
                    } else if (car.seats != parseInt(seats)) {
                        match = false;
                    }
                }
                
                if (priceRange !== 'all') {
                    const price = car.price;
                    if (priceRange === '0-800' && !(price >= 0 && price <= 800)) match = false;
                    if (priceRange === '800-1500' && !(price > 800 && price <= 1500)) match = false;
                    if (priceRange === '1500-3000' && !(price > 1500 && price <= 3000)) match = false;
                    if (priceRange === '3000+' && !(price > 3000)) match = false;
                }
                
                return match;
            });

            displayCars('all-cars', filteredCars);
        }

        // Enhanced booking form submission
        function submitBooking(event) {
            event.preventDefault();
            
            const submitBtn = event.target.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            // Simulate processing delay
            setTimeout(() => {
                showMessage('Booking submitted successfully! We will contact you shortly to confirm your reservation.', 'success');
                event.target.reset();
                selectedCarId = null;
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        // Enhanced contact form submission
        function submitContact(event) {
            event.preventDefault();
            
            const submitBtn = event.target.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate processing delay
            setTimeout(() => {
                showMessage('Message sent successfully! We will get back to you within 24 hours.', 'success');
                event.target.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        // Show success/error messages
        function showMessage(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            messageDiv.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                ${message}
            `;
            
            // Insert at the top of the current page
            const currentPage = document.querySelector('.page-section.active .container');
            if (currentPage) {
                currentPage.insertBefore(messageDiv, currentPage.firstChild);
                
                // Remove after 5 seconds
                setTimeout(() => {
                    messageDiv.remove();
                }, 5000);
            }
        }

        // Close modal when clicking outside
        document.getElementById('car-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Enhanced mobile responsiveness
        window.addEventListener('resize', function() {
            // Adjust grid layouts for mobile
            const isMobile = window.innerWidth <= 768;
            const searchBar = document.querySelector('.search-bar');
            if (searchBar) {
                if (isMobile) {
                    searchBar.style.gridTemplateColumns = '1fr';
                } else {
                    searchBar.style.gridTemplateColumns = '1fr 1fr 1fr auto';
                }
            }
        });

        // Add hover effects to spec cards in modal
        document.addEventListener('DOMContentLoaded', function() {
            document.addEventListener('mouseover', function(e) {
                if (e.target.classList.contains('spec-card')) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }
            });
            
            document.addEventListener('mouseout', function(e) {
                if (e.target.classList.contains('spec-card')) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                }
            });
        });

        // Enhanced keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('car-modal').classList.contains('show')) {
                closeModal();
            }
        });

        // Smooth scrolling for internal navigation
        function smoothScrollTo(element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Price formatting helper
        function formatPrice(price) {
            return new Intl.NumberFormat('en-ZA', {
                style: 'currency',
                currency: 'ZAR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price).replace('ZAR', 'R');
        }

        // Date validation
        function validateDates() {
            const pickupDate = new Date(document.getElementById('pickup-date-booking').value);
            const returnDate = new Date(document.getElementById('return-date-booking').value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (pickupDate < today) {
                showMessage('Pickup date cannot be in the past.', 'error');
                return false;
            }

            if (returnDate <= pickupDate) {
                showMessage('Return date must be after pickup date.', 'error');
                return false;
            }

            return true;
        }

        // Add date validation to form
        document.getElementById('pickup-date-booking').addEventListener('change', validateDates);
        document.getElementById('return-date-booking').addEventListener('change', validateDates);