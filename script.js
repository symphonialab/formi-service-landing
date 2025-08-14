// 포미서비스 랜딩 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 스크롤 효과
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 부드러운 스크롤 네비게이션
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 네비게이션 높이 고려
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 인터섹션 옵저버를 이용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 카운터 애니메이션 (필요시)
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들 관찰
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .process-step');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 서비스 카드 순차 애니메이션
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s both`;
        }, 100);
    });

    // 기능 카드 호버 효과
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 프로세스 스텝 순차 애니메이션
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = entry.target.parentElement.querySelectorAll('.process-step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.animation = `slideInLeft 0.6s ease-out ${index * 0.3}s both`;
                    }, 100);
                });
                processObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (processSteps.length > 0) {
        processObserver.observe(processSteps[0].parentElement);
    }

    // 버튼 클릭 효과
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 리플 효과
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // 상담 신청 버튼 클릭 처리
            if (this.textContent.includes('상담')) {
                handleConsultationClick();
            }
        });
    });

    // 리플 애니메이션 CSS 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 상담 신청 처리 함수
    function handleConsultationClick() {
        // 실제 구현에서는 폼 모달이나 외부 링크로 연결
        alert('상담 신청 페이지로 이동합니다.');
        // window.open('상담신청URL', '_blank');
    }

    // 카운터 애니메이션 함수
    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // 스크롤 진행률 표시 (선택사항)
    function updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        
        // 프로그레스 바가 있다면 업데이트
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // 가격 카드 비교 애니메이션
    const pricingCards = document.querySelectorAll('#pricing .grid > div');
    
    const pricingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                pricingCards.forEach((card, index) => {
                    setTimeout(() => {
                        if (index === 0) {
                            card.style.animation = 'slideInLeft 0.8s ease-out both';
                        } else {
                            card.style.animation = 'slideInRight 0.8s ease-out both';
                        }
                    }, index * 200);
                });
                pricingObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
        pricingObserver.observe(pricingSection);
    }

    // 후기 섹션 타이핑 효과
    const testimonialText = document.querySelector('#testimonials p');
    
    if (testimonialText) {
        const testimonialObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(testimonialText);
                    testimonialObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        testimonialObserver.observe(testimonialText);
    }

    // 타이핑 애니메이션 함수
    function typeWriter(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary)';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, 50);
    }

    // 모바일 메뉴 토글 (필요시)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 페이지 로드 완료 후 초기 애니메이션
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // 윈도우 리사이즈 처리
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // 리사이즈 후 처리할 내용
            console.log('Window resized');
        }, 250);
    });

    // 성능 최적화를 위한 passive 이벤트 리스너
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    console.log('포미서비스 랜딩 페이지 JavaScript 로드 완료');
});