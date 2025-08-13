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
                image: "https://i.postimg.cc/3RcqZqN4/1-Tesla-Model-S.jpg",
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
                image: "https://i.postimg.cc/Y0LsDxLX/Honda-Civic.jpg",
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
                image: "https://i.postimg.cc/cJdP1YPH/BMW-X5.jpg",
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
                image: "https://i.postimg.cc/cJT2vCNc/ford-mustang.jpg",
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
                image: "https://i.postimg.cc/G22NGRLn/inkas-armored-chevrolet-suburban-hero-social.webp",
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
                image: "https://i.postimg.cc/c6q5p8Qd/tesla-s.avif",
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
                image: "https://i.postimg.cc/9Qdvj18K/day-exterior-04-040.png",
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
                image: "https://i.postimg.cc/cJT2vCNc/ford-mustang.jpg",
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
                image: "https://i.postimg.cc/cJdP1YPH/BMW-X5.jpg",
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
                image: "https://i.postimg.cc/Y0LsDxLX/Honda-Civic.jpg",
                features: ["Air Conditioning", "Bluetooth", "Central Locking", "Electric Windows"],
                available: true
            }
        ];

        let filteredCars = [...carsData];
        let selectedCarId = null;

        // Initialize app and load data
        document.addEventListener('DOMContentLoaded', function() {
            initializeWebApp();
            setDefaultDates();
        });

        function initializeWebApp() {
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

        // Display cars with real images
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
                    <div class="car-image">
                        <img src="${car.image}" alt="${car.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 4rem; color: #6b7280;">🚗</div>
                    </div>
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

        // Show car details in modal with real image
        function showCarDetails(car) {
            selectedCarId = car.id;
            document.getElementById('modal-car-name').innerHTML = `
                <i class="fas fa-car"></i>
                ${car.name}
            `;
            
            const modalImage = document.getElementById('modal-car-image').querySelector('img');
            modalImage.src = car.image;
            modalImage.alt = car.name;
            modalImage.onerror = function() {
                this.style.display = 'none';
                this.parentElement.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 5rem; color: #6b7280;">🚗</div>';
            };
            
            document.getElementById('modal-price').innerHTML = `
                <span class="currency">R</span>${car.price.toLocaleString()}<span style="font-size: 1.2rem; color: #6b7280;">/day</span>
            `;

            // Enhanced specs
            const specs = [
                { label: 'Category', value: car.type.charAt(0).toUpperCase() + car.type.slice(1), icon: 'fas fa-tag' },
                { label: 'Seats', value: car.seats, icon: 'fas fa-users' },
                { label: 'Transmission', value: car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1), icon: car.transmission === 'automatic' ? 'fas fa-cog' : 'fas fa-cogs' },
                { label: 'Fuel Type', value: car.fuel, icon: car.fuel === 'Electric' ? 'fas fa-bolt' : 'fas fa-gas-pump' },
                { label: 'Engine', value: car.engine, icon: 'fas fa-tachometer-alt' },
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
        async function submitBooking(event) {
            event.preventDefault();
            
            const submitBtn = event.target.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            try {
                // Get form data
                const formData = {
                    firstName: document.getElementById('first-name').value,
                    lastName: document.getElementById('last-name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    pickupDate: document.getElementById('pickup-date-booking').value,
                    returnDate: document.getElementById('return-date-booking').value,
                    carId: document.getElementById('car-selection').value,
                    specialRequests: document.getElementById('special-requests').value,
                    timestamp: new Date(),
                    status: 'pending'
                };

                // Save to Firebase
                const docRef = await window.firebase.addDoc(window.firebase.collection(window.firebase.db, 'bookings'), formData);
                console.log('Booking saved with ID:', docRef.id);

                showMessage('Booking submitted successfully! We will contact you shortly to confirm your reservation.', 'success');
                event.target.reset();
                selectedCarId = null;
                setDefaultDates();
                
            } catch (error) {
                console.error('Error submitting booking:', error);
                showMessage('There was an error submitting your booking. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }

        // Enhanced contact form submission
        async function submitContact(event) {
        event.preventDefault();
        console.log('Contact form submitted!'); // Debug line
        
        const submitBtn = event.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Get form data
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                message: document.getElementById('contact-message').value,
                timestamp: new Date(),
                status: 'new'
            };

            console.log('Contact form data:', formData); // Debug line

            // Save to Firebase
            const docRef = await window.firebase.addDoc(window.firebase.collection(window.firebase.db, 'contacts'), formData);
            console.log('Contact message saved with ID:', docRef.id);

            showMessage('Message sent successfully! We will get back to you within 24 hours.', 'success');
            event.target.reset();
            
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showMessage('There was an error sending your message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
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

        // Enhanced keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('car-modal').classList.contains('show')) {
                closeModal();
            }
        });

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

        // Add hover effects to spec cards in modal
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

        console.log('Car rental website loaded successfully!');
        console.log('Firebase integration ready. Use testFirebaseConnection() to test the connection.');