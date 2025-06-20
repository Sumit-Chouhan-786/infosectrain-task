
//=========================================================   tab links code 
  
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-target');

      // Remove active classes
      tabLinks.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('show', 'active'));

      // Add active classes to clicked and target
      link.classList.add('active');
      document.getElementById(target).classList.add('show', 'active');
    });
  });


//=========================================================   sidebar toggle code 

  function toggleSidebar() {
    const sidebar = document.querySelector('.course_sidebar');
    const toggleBtn = document.getElementById('sidebarToggle').querySelector('i');

    sidebar.classList.toggle('active');

    // Toggle icon class
    if (sidebar.classList.contains('active')) {
      toggleBtn.classList.remove('fa-bars');
      toggleBtn.classList.add('fa-times'); // cross icon
    } else {
      toggleBtn.classList.remove('fa-times');
      toggleBtn.classList.add('fa-bars'); // hamburger
    }
  }

  //================================================= Close sidebar 
  document.querySelectorAll('.tab-link').forEach(button => {
    button.addEventListener('click', () => {
      if (window.innerWidth <= 576) {
        const sidebar = document.querySelector('.course_sidebar');
        const toggleBtn = document.getElementById('sidebarToggle').querySelector('i');
        sidebar.classList.remove('active');
        toggleBtn.classList.remove('fa-times');
        toggleBtn.classList.add('fa-bars');
      }
    });
  });


//   chatboat

        document.addEventListener('DOMContentLoaded', function() {
            const chatbotHeader = document.getElementById('chatbot-header');
            const chatbotBody = document.getElementById('chatbot-body');
            const chatbotToggle = document.getElementById('chatbot-toggle');
            const userInput = document.getElementById('user-input');
            const sendBtn = document.getElementById('send-btn');
            const chatMessages = document.getElementById('chat-messages');

            // Toggle chatbot visibility
            chatbotHeader.addEventListener('click', function() {
                if (chatbotBody.style.display === 'block') {
                    chatbotBody.style.display = 'none';
                    chatbotToggle.className = 'fas fa-chevron-down';
                } else {
                    chatbotBody.style.display = 'block';
                    chatbotToggle.className = 'fas fa-chevron-up';
                }
            });

            // Send message on button click
            sendBtn.addEventListener('click', sendMessage);

            // Send message on Enter key
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            function sendMessage() {
                const message = userInput.value.trim();
                if (message === '') return;

                // Add user message to chat
                addMessage(message, 'user-message');
                userInput.value = '';

                // Simulate bot response (replace with API call in real use)
                setTimeout(() => {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse, 'bot-message');
                }, 500);
            }

            function addMessage(text, className) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `${className} chat-message`;
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Simple bot responses (replace with AI/API in production)
            function getBotResponse(userMessage) {
                const responses = {
                    'hello': 'Hi there! How can I assist you?',
                    'hi': 'Hello! What can I do for you?',
                    'help': 'I can answer questions. Try asking something!',
                    'bye': 'Goodbye! Have a great day!',
                    'default': "I'm not sure how to respond to that. Can you ask differently?"
                };

                const lowerMsg = userMessage.toLowerCase();
                return responses[lowerMsg] || responses['default'];
            }
        });


        // form submit

  document.getElementById('helpForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const inputs = this.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('is-invalid'); 
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (isValid) {
      // Show success alert
      alert('Thank you! Your submission has been received.');
      // Reset form
      this.reset();
    }
  });


//   filter
// Store all course data
let allCourses = [];

// Initialize course data from the page
function initializeCourseData() {
  const courseCards = document.querySelectorAll('.course-card');
  allCourses = Array.from(courseCards).map(card => {
    return {
      element: card.outerHTML,
      title: card.querySelector('.fw-bold').textContent.trim().toLowerCase(),
      hours: card.querySelector('.fs_xs.text_darkGray').textContent.trim().toLowerCase(),
      date: card.querySelector('.mt-3.fs_xs.text_darkGray').textContent.trim().toLowerCase()
    };
  });
}

// Filter courses based on search input
function filterCourses() {
  const searchInput = document.getElementById('search-course').value.toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  
  if (!searchInput) {
    // If search is empty, show all courses in their original containers
    resultsContainer.innerHTML = '';
    return;
  }
  
  // Filter courses that match the search term
  const filteredCourses = allCourses.filter(course => 
    course.title.includes(searchInput) || 
    course.hours.includes(searchInput) || 
    course.date.includes(searchInput)
  );
  
  // Display results
  displayResults(filteredCourses);
}

// Display filtered results
function displayResults(courses) {
  const resultsContainer = document.getElementById('search-results');
  
  if (courses.length === 0) {
    resultsContainer.innerHTML = '<p>No courses found matching your search.</p>';
    return;
  }
  
  let html = '<div class="row g-3">';
  courses.forEach(course => {
    html += `<div class="col-lg-4 col-md-6">${course.element}</div>`;
  });
  html += '</div>';
  
  resultsContainer.innerHTML = html;
}

// Initialize when page loads
window.onload = function() {
  initializeCourseData();
};