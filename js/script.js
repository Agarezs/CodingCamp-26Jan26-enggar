// ==========================================
// DOM Content Loaded Event
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initGreeting();
    initMessageForm();
    initCurrentTime();
    initSmoothScroll();
    initAnimations();
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ==========================================
// Dynamic Greeting with User's Name
// ==========================================
function initGreeting() {
    const greetingElement = document.getElementById('greeting');
    
    if (greetingElement) {
        // Prompt user for their name
        let userName = prompt('Please enter your name:');
        
        // Validate and set default if empty
        if (!userName || userName.trim() === '') {
            userName = 'Harfi';
        } else {
            userName = userName.trim();
        }
        
        // Update greeting with animation
        greetingElement.style.opacity = '0';
        setTimeout(() => {
            greetingElement.textContent = `Hi ${userName}`;
            greetingElement.style.transition = 'opacity 0.5s ease';
            greetingElement.style.opacity = '1';
        }, 200);
        
        // Store name in sessionStorage for potential future use
        sessionStorage.setItem('userName', userName);
    }
}

// ==========================================
// Current Time Display
// ==========================================
function initCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    
    if (timeElement) {
        updateTime();
        // Update time every second
        setInterval(updateTime, 1000);
    }
    
    function updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        const formattedTime = now.toLocaleString('en-US', options);
        timeElement.textContent = formattedTime;
    }
}

// ==========================================
// Message Form Validation and Submission
// ==========================================
function initMessageForm() {
    const form = document.getElementById('messageForm');
    const outputContent = document.getElementById('outputContent');
    
    if (form && outputContent) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const nama = document.getElementById('nama').value.trim();
            const tanggalLahir = document.getElementById('tanggalLahir').value;
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
            const pesan = document.getElementById('pesan').value.trim();
            
            // Validate form
            if (!validateForm(nama, tanggalLahir, pesan)) {
                return;
            }
            
            // Format date
            const formattedDate = formatDate(tanggalLahir);
            
            // Display output with animation
            displayOutput(nama, formattedDate, jenisKelamin, pesan);
            
            // Show success message
            showSuccessMessage();
        });
    }
}

// ==========================================
// Form Validation
// ==========================================
function validateForm(nama, tanggalLahir, pesan) {
    // Validate name
    if (nama === '') {
        showError('Nama tidak boleh kosong!');
        return false;
    }
    
    if (nama.length < 2) {
        showError('Nama harus minimal 2 karakter!');
        return false;
    }
    
    // Validate date
    if (tanggalLahir === '') {
        showError('Tanggal lahir harus diisi!');
        return false;
    }
    
    const birthDate = new Date(tanggalLahir);
    const today = new Date();
    
    if (birthDate > today) {
        showError('Tanggal lahir tidak valid!');
        return false;
    }
    
    // Calculate age
    const age = calculateAge(birthDate);
    if (age < 5 || age > 120) {
        showError('Tanggal lahir tidak valid!');
        return false;
    }
    
    // Validate message
    if (pesan === '') {
        showError('Pesan tidak boleh kosong!');
        return false;
    }
    
    if (pesan.length < 10) {
        showError('Pesan harus minimal 10 karakter!');
        return false;
    }
    
    return true;
}

// ==========================================
// Calculate Age
// ==========================================
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// ==========================================
// Format Date
// ==========================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// ==========================================
// Display Output
// ==========================================
function displayOutput(nama, tanggalLahir, jenisKelamin, pesan) {
    const outputContent = document.getElementById('outputContent');
    
    const outputHTML = `
        <div style="animation: fadeInUp 0.5s ease-out;">
            <p><strong>Nama</strong>: ${escapeHTML(nama)}</p>
            <p><strong>Tanggal Lahir</strong>: ${tanggalLahir}</p>
            <p><strong>Jenis Kelamin</strong>: ${jenisKelamin}</p>
            <p><strong>Pesan</strong>: ${escapeHTML(pesan)}</p>
        </div>
    `;
    
    outputContent.style.opacity = '0';
    setTimeout(() => {
        outputContent.innerHTML = outputHTML;
        outputContent.style.transition = 'opacity 0.5s ease';
        outputContent.style.opacity = '1';
    }, 100);
}

// ==========================================
// Escape HTML to prevent XSS
// ==========================================
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// Show Error Message
// ==========================================
function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B6B, #EE5A6F);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(255, 107, 107, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 3000);
}

// ==========================================
// Show Success Message
// ==========================================
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.textContent = 'Pesan berhasil dikirim! ✓';
    successDiv.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, #4ECDC4, #44A08D);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(78, 205, 196, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Initialize Animations on Scroll
// ==========================================
function initAnimations() {
    // Add animation keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    const animatedElements = document.querySelectorAll('.headquarter-card, .value-card, .vm-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// Active Navigation Link Highlighter
// ==========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href.includes('#' + current)) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Console Welcome Message
// ==========================================
console.log('%c Welcome to RevoU Training Website! ', 'background: #FFD700; color: #333; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Made with ❤️ for learning purposes ', 'background: #333; color: #FFD700; font-size: 14px; padding: 5px;');

// ==========================================
// Performance Monitoring (Optional)
// ==========================================
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%c Page loaded in ${loadTime}ms `, 'background: #4ECDC4; color: white; padding: 5px; border-radius: 3px;');
});