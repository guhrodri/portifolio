document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DO MENU RESPONSIVO (MOBILE)
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Alterna ícone entre barras e "X"
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       2. EFEITO NAVBAR SCROLL & ACTIVE LINK TRACKING
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // 2a. Efeito de scroll na navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 2b. Rastreamento do Link Ativo baseado na rolagem
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Compensação da altura da navbar
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez no início

    /* ==========================================================================
       3. EFEITO DE DIGITAÇÃO AUTOMÁTICA (TYPING EFFECT)
       ========================================================================== */
    const typedTextSpan = document.getElementById('typed-text');
    // PERSONALIZAR: Altere ou adicione as palavras para o efeito de digitação aqui
    const textArray = ["Engenharia de Software", "Marketing Digital", "Sistemas", "Resolução de Problemas"];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newTextDelay = 2000; // Tempo de espera antes de apagar a palavra
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Inicializa a animação de digitação
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       4. ANIMAR REVELAÇÕES AO ROLAR A TELA (INTERSECTION OBSERVER)
       ========================================================================== */
    // Configurações do Observador
    const observerOptions = {
        root: null, // usa viewport como referência
        threshold: 0.15, // ativa quando 15% do elemento está visível
        rootMargin: "0px"
    };

    // 4a. Animação geral de fade-in (para cards, textos, etc.)
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Deixa de observar após animar uma vez
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => scrollRevealObserver.observe(el));

    // 4b. Animação de Barras de Habilidades (Skills)
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('animate');
                }
            });
        }, { threshold: 0.25 });
        
        skillsObserver.observe(aboutSection);
    }

    // Adiciona classe fade-in-element para projetos e cartões dinamicamente caso queira estender
    const cardsToAnimate = document.querySelectorAll('.project-card, .about-info, .about-skills, .contact-info, .contact-form');
    cardsToAnimate.forEach(card => {
        card.classList.add('fade-in-element');
        scrollRevealObserver.observe(card);
    });

    /* ==========================================================================
       5. PROCESSAMENTO E FEEDBACK DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio do formulário recarregando a página

            // Captura de valores (para futuro envio a um servidor/email API se desejado)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simula um delay de processamento (ex: chamada de API)
            formFeedback.textContent = "Enviando sua mensagem...";
            formFeedback.className = "form-feedback-message success";
            formFeedback.style.display = "block";

            setTimeout(() => {
                // Sucesso na simulação
                formFeedback.innerHTML = `Obrigado, <strong>${name}</strong>! Mensagem enviada com sucesso. Em breve entrarei em contato.`;
                formFeedback.className = "form-feedback-message success";
                
                // Reseta os campos do formulário
                contactForm.reset();
                
                // Remove a mensagem de feedback após 6 segundos
                setTimeout(() => {
                    formFeedback.style.display = "none";
                }, 6000);
            }, 1500);
        });
    }
});
