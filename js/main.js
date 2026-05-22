    // TR.SYS v3.0 — Interactive Premium Edition
    document.addEventListener('DOMContentLoaded', function() {

        // 1. ТЕХНИЧЕСКИЙ АУДИТ
        const auditQuiz = document.getElementById('audit-quiz');
        if (auditQuiz) {
            var answers = {};
            var resultContainer = document.getElementById('audit-result');
            var resultCritical = document.getElementById('result-critical');
            var resultNormal = document.getElementById('result-normal');

            // Зафиксировать высоту чтобы не было прыжков
            auditQuiz.style.minHeight = '300px';

            auditQuiz.querySelectorAll('.audit-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var questionDiv = this.closest('.quiz-item');
                    var questionId = parseInt(questionDiv.dataset.question);
                    var answer = this.dataset.answer;

                    questionDiv.querySelectorAll('.audit-btn').forEach(function(b) {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                    // Светофор: красный Да, зелёный Нет
                    if (answer === 'yes') {
                        this.style.background = 'rgba(255, 77, 77, 0.2)';
                        this.style.borderColor = '#ff4d4d';
                        this.style.color = '#ff4d4d';
                    } else {
                        this.style.background = 'rgba(76, 175, 80, 0.2)';
                        this.style.borderColor = '#4caf50';
                        this.style.color = '#4caf50';
                    }
                    answers[questionId] = answer;

                    questionDiv.style.transition = 'opacity 0.4s ease';
                    questionDiv.style.opacity = '0';

                    setTimeout(function() {
                        questionDiv.style.display = 'none';

                        if (questionId < 5) {
                            var nextQ = auditQuiz.querySelector('.quiz-item[data-question="' + (questionId + 1) + '"]');
                            if (nextQ) {
                                nextQ.style.display = 'block';
                                nextQ.style.opacity = '0';
                                nextQ.style.transition = 'opacity 0.6s ease';
                                // force reflow
                                void nextQ.offsetWidth;
                                nextQ.style.opacity = '1';
                            }
                        } else {
                            auditQuiz.style.display = 'none';
                            resultContainer.style.display = 'block';
                            resultContainer.style.opacity = '0';
                            void resultContainer.offsetWidth;
                            resultContainer.style.transition = 'opacity 0.8s ease';
                            resultContainer.style.opacity = '1';

                            var yesCount = Object.values(answers).filter(function(a) { return a === 'yes'; }).length;
                            if (yesCount >= 3) {
                                resultCritical.style.display = 'block';
                                resultCritical.style.color = '#ff4d4d';
                                resultCritical.querySelectorAll('p, strong').forEach(function(el) { el.style.color = '#ff4d4d'; });
                                resultContainer.style.borderLeft = '4px solid #ff4d4d';
                                resultContainer.style.background = 'rgba(255, 77, 77, 0.05)';
                            } else {
                                resultNormal.style.display = 'block';
                                resultNormal.style.color = '#4caf50';
                                resultContainer.style.borderLeft = '4px solid #4caf50';
                                resultContainer.style.background = 'rgba(76, 175, 80, 0.05)';
                            }
                        }
                    }, 400);
                });
            });

            // Retake Quiz Handler
            var retakeBtn = document.getElementById('retake-quiz-btn');
            if (retakeBtn) {
                retakeBtn.addEventListener('click', function() {
                    answers = {};
                    resultContainer.style.display = 'none';
                    resultCritical.style.display = 'none';
                    resultNormal.style.display = 'none';
                    auditQuiz.style.display = 'block';
                    
                    auditQuiz.querySelectorAll('.quiz-item').forEach(function(item, idx) {
                        item.querySelectorAll('.audit-btn').forEach(function(b) {
                            b.classList.remove('active');
                            b.style.background = '';
                            b.style.borderColor = '';
                            b.style.color = '';
                        });
                        
                        if (idx === 0) {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                        } else {
                            item.style.display = 'none';
                            item.style.opacity = '0';
                        }
                    });
                });
            }
        }

        // 2. СКРОЛЛ-АНИМАЦИИ (динамические в обе стороны)
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    } else {
                        entry.target.classList.remove('active');
                    }
                });
            }, { threshold: 0.05 });

            document.querySelectorAll('.reveal, .stagger-card').forEach(function(el) {
                observer.observe(el);
            });
        } else {
            // Запасной вариант если нет IntersectionObserver
            document.querySelectorAll('.reveal, .stagger-card').forEach(function(el) {
                el.classList.add('active');
            });
        }

        // 3. ФОТО АВТОРА
        var authorImg = document.querySelector('.author-image');
        if (authorImg && 'IntersectionObserver' in window) {
            var imgObs = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        authorImg.classList.add('visible');
                    } else {
                        authorImg.classList.remove('visible');
                    }
                });
            }, { threshold: 0.2 });
            imgObs.observe(authorImg);
        }

        // 4. TELEGRAM LEAD CAPTURE WITH CUSTOM VALIDATION & FEEDBACK
        var leadForm = document.getElementById('leadForm');
        if (leadForm) {
            // Clear error highlights when the user types or updates inputs
            leadForm.querySelectorAll('input, textarea').forEach(function(input) {
                input.addEventListener('input', function() {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                    if (this.type === 'radio') {
                        this.closest('.form-group').querySelectorAll('.radio-pill span').forEach(function(span) {
                            span.style.borderColor = '';
                            span.style.boxShadow = '';
                        });
                    }
                });
                input.addEventListener('change', function() {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                    if (this.type === 'radio') {
                        this.closest('.form-group').querySelectorAll('.radio-pill span').forEach(function(span) {
                            span.style.borderColor = '';
                            span.style.boxShadow = '';
                        });
                    }
                });
            });

            leadForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                var feedback = document.getElementById('formFeedback');
                feedback.style.display = 'none';
                feedback.className = 'form-feedback';

                // Custom Validation Check
                var isValid = true;
                var firstInvalid = null;

                // Validate radio groups and text inputs
                leadForm.querySelectorAll('.form-group').forEach(function(group) {
                    var textInput = group.querySelector('input[type="text"][required], textarea[required]');
                    var radios = group.querySelectorAll('input[type="radio"]');
                    var checkbox = group.querySelector('input[type="checkbox"][required]');

                    if (textInput && !textInput.value.trim()) {
                        isValid = false;
                        textInput.style.borderColor = '#ff4d4d';
                        textInput.style.boxShadow = '0 0 10px rgba(255, 77, 77, 0.2)';
                        if (!firstInvalid) firstInvalid = textInput;
                    }

                    if (radios.length > 0) {
                        var name = radios[0].name;
                        var checkedRadio = leadForm.querySelector('input[name="' + name + '"]:checked');
                        if (!checkedRadio) {
                            isValid = false;
                            if (!firstInvalid) firstInvalid = radios[0];
                            group.querySelectorAll('.radio-pill span').forEach(function(span) {
                                span.style.borderColor = '#ff4d4d';
                                span.style.boxShadow = '0 0 10px rgba(255, 77, 77, 0.15)';
                            });
                        }
                    }

                    if (checkbox && !checkbox.checked) {
                        isValid = false;
                        if (!firstInvalid) firstInvalid = checkbox;
                        checkbox.style.outline = '2px solid #ff4d4d';
                    }
                });

                if (!isValid) {
                    feedback.style.display = 'block';
                    feedback.classList.add('error');
                    feedback.textContent = 'Пожалуйста, заполните все обязательные поля формы.';
                    if (firstInvalid) {
                        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstInvalid.focus();
                    }
                    return;
                }

                var btn = leadForm.querySelector('button[type="submit"]');
                var originalBtnText = btn.textContent;
                btn.textContent = 'ОТПРАВКА...';
                btn.disabled = true;

                var data = Object.fromEntries(new FormData(leadForm).entries());

                var text = [
                    '⚡️ НОВАЯ ЗАЯВКА',
                    'Работал с психологом: ' + (data.psychologist || '-'),
                    'Работал с гипнотерапевтом: ' + (data.hypnotherapist || '-'),
                    'Диагнозы: ' + (data.mental_illness || '-'),
                    'Готовность: ' + (data.ready_today || '-'),
                    'Проблема: ' + (data.problem || '-'),
                    'Контакт: ' + (data.contact || '-')
                ].join('\n');

                try {
                    var resp = await fetch('https://yellow-truth-8e00.polienkoandrej.workers.dev/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: text })
                    });
                    if (resp.ok) {
                        feedback.style.display = 'block';
                        feedback.classList.add('success');
                        feedback.innerHTML = '✨ <strong>Заявка успешно отправлена!</strong><br>Андрей свяжется с вами в ближайшее время.';
                        leadForm.reset();
                    } else { throw new Error(); }
                } catch(err) {
                    feedback.style.display = 'block';
                    feedback.classList.add('error');
                    feedback.innerHTML = '❌ <strong>Ошибка отправки.</strong><br>Пожалуйста, напишите напрямую в Telegram.';
                } finally {
                    btn.textContent = originalBtnText;
                    btn.disabled = false;
                }
            });
        }

        // 5. ANIMATED HERO WATERMARK ON SCROLL
        var watermark = document.querySelector('.hero-watermark');
        if (watermark) {
            window.addEventListener('scroll', function() {
                var scrollPos = window.scrollY;
                var maxScroll = 600;
                var progress = Math.min(scrollPos / maxScroll, 1);
                
                var scale = 1 + (progress * 0.25);
                var opacity = 0.15 + (progress * 0.20);
                
                watermark.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
                watermark.style.opacity = opacity;
            });
        }

        // 6. FAQ ACCORDION TOGGLE
        document.querySelectorAll('.faq-item h3').forEach(function(header) {
            header.addEventListener('click', function() {
                var item = this.closest('.faq-item');
                item.classList.toggle('active-faq');
            });
        });

        // 7. BACK TO TOP BUTTON
        var backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 600) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });
