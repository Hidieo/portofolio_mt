document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Format body email dengan template profesional
    const body = `Kepada Yth. Hidieo Riz'n,%0D%0A%0D%0A` +
                 `Saya tertarik dengan profil Anda sebagai Management Trainee. Berikut adalah pesan saya:%0D%0A%0D%0A` +
                 `------------------------%0D%0A` +
                 `Nama: ${name}%0D%0A` +
                 `Email: ${email}%0D%0A` +
                 `Perusahaan: [Nama Perusahaan]%0D%0A` +
                 `Posisi: [Posisi yang Ditawarkan]%0D%0A` +
                 `------------------------%0D%0A%0D%0A` +
                 `${message}%0D%0A%0D%0A` +
                 `Saya menantikan tanggapan Anda untuk membahas lebih lanjut tentang kesempatan ini.%0D%0A%0D%0A` +
                 `Salam hormat,%0D%0A` +
                 `${name}%0D%0A` +
                 `${email}`;
    
    // Buat URL untuk Gmail
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=deorizn@gmail.com&su=${encodeURIComponent(subject)}&body=${body}`;
    
    // Buka jendela baru ke Gmail
    window.open(gmailUrl, '_blank');
    
    // Reset form setelah pengiriman
    this.reset();
    
    // Tampilkan pesan sukses
    alert('Halaman Gmail akan terbuka. Silakan klik "Kirim" untuk mengirim pesan Anda.');
});

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi saat scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Terapkan animasi ke elemen yang diinginkan
document.querySelectorAll('.timeline-item, .project-card, .cert-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pesan Anda telah terkirim! Saya akan menghubungi Anda secepatnya.');
    this.reset();
});

// Efek header saat scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
});

// Back to top button
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Generate random bubbles
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.floor(Math.random() * 100) + 50;
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const delay = Math.floor(Math.random() * 5);
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.top = `${top}%`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDelay = `${delay}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

// Initialize bubbles
createBubbles();