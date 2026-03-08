document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 2. Chatbot Logic
    const chatTrigger = document.getElementById('chatTrigger');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    const botResponses = {
        'who are you': "I'm Khaled, an AI Engineer specializing in deep learning and pathfinding algorithms. I build intelligent systems that solve complex real-world problems.",
        'skills': "My core skills include Python, C++, AI/ML, OOP, Physics, and Probability. I'm also proficient with PyTorch and TensorFlow.",
        'projects': "I've worked on several exciting projects like a Neural Network Visualizer, Autonomous Drone Pathfinding, and a Sentiment Analysis API. You can see them in the Projects section!",
        'hire': "I'm always open to new opportunities! You can reach out to me via the contact form or directly through LinkedIn. Let's build something amazing together.",
        'hello': "Hi there! I'm Khaled's AI assistant. How can I help you today?",
        'default': "That's a great question! I'm specifically trained to answer questions about Khaled's background, skills, and projects. Try asking 'Who are you?' or 'What are your skills?'"
    };

    const toggleChat = () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    };

    chatTrigger.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim().toLowerCase();
        if (!query) return;

        addMessage(chatInput.value, 'user');
        chatInput.value = '';

        // Simulate bot thinking
        setTimeout(() => {
            let response = botResponses['default'];
            
            for (const key in botResponses) {
                if (query.includes(key)) {
                    response = botResponses[key];
                    break;
                }
            }
            
            addMessage(response, 'bot');
        }, 600);
    });

    // 3. Contact Form Submission (Frontend Only)
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#10b981'; // Success green
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
});
