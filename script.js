document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved user preference for Theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');

        // Update Icon
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Language Toggle Logic
    const langToggleBtn = document.getElementById('lang-toggle');
    const html = document.documentElement;

    // Check for saved user preference for Language
    // Force Arabic on initial load or check saved preference (Modified to force Arabic as per request)
    // const savedLang = localStorage.getItem('lang') || 'ar'; 
    const savedLang = 'ar'; // Always start with Arabic
    setLanguage(savedLang);

    langToggleBtn.addEventListener('click', () => {
        const currentLang = html.getAttribute('lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });

    function setLanguage(lang) {
        html.setAttribute('lang', lang);
        if (lang === 'ar') {
            html.setAttribute('dir', 'rtl');
            langToggleBtn.textContent = 'EN';
            document.title = "فيلوباتير موسى حجر | معرض الأعمال";
        } else {
            html.setAttribute('dir', 'ltr');
            langToggleBtn.textContent = 'AR';
            document.title = "Filopater Mosa Hager | Portfolio";
        }
        // localStorage.setItem('lang', lang); // Optional: remember for session if needed, but we force AR on reload
    }

    // Mobile Menu Logic (Basic)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle visibility for mobile
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                // Reset styles that might be messed up by RTL
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '4rem';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--bg-primary)';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '99';
            }
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
});
