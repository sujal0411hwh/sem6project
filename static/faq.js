

// Global variables
let isWaitingForResponse = false;
const messageHistory = [];

document.addEventListener("DOMContentLoaded", function () {
    // Initialize chatbot and FAQ components
    initializeChatbot();
    loadFAQs();
});

// ✅ Initialize Chatbot
function initializeChatbot() {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");
    const loader = document.getElementById("loader");

    if (chatForm) {
        chatForm.addEventListener("submit", handleSubmit);
    }

    // Show welcome message
    if (chatMessages) {
        appendMessage("Hello! I'm CKPCET Chatbot. How can I help you today?", "bot");
    }
}

// ✅ Handle Form Submit
async function handleSubmit(e) {
    e.preventDefault();
    
    if (isWaitingForResponse) {
        console.log("Please wait for the previous response");
        return;
    }

    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (!message) return;

    // Show user message
    appendMessage(message, "user");
    messageHistory.push({ role: "user", content: message });

    // Clear input
    userInput.value = "";

    // Show loading state
    isWaitingForResponse = true;
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "block";

    try {
        const response = await sendMessage(message);
        appendMessage(response.response, "bot");
        messageHistory.push({ role: "bot", content: response.response });
        
        // Refresh FAQs after new message
        loadFAQs();
    } catch (error) {
        console.error("Error:", error);
        appendMessage("Sorry, I encountered an error. Please try again.", "bot");
    } finally {
        isWaitingForResponse = false;
        if (loader) loader.style.display = "none";
    }
}

// ✅ Send Message to Backend
async function sendMessage(message) {
    const response = await fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// ✅ Append Message to Chat
function appendMessage(message, sender) {
    const chatMessages = document.getElementById("chat-messages");
    if (!chatMessages) return;

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    // Create message content
    const content = document.createElement("div");
    content.classList.add("content");
    
    // Handle multiline messages
    const formattedMessage = message.split('\n').map(line => 
        line.trim() ? `<p>${line}</p>` : '<br>'
    ).join('');
    
    content.innerHTML = formattedMessage;

    // Add timestamp
    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.textContent = new Date().toLocaleTimeString();

    messageDiv.appendChild(content);
    messageDiv.appendChild(timestamp);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ✅ Fetch FAQs from Flask API
function loadFAQs() {
    fetch("/get_faqs")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched FAQ Data:", data); // Debugging log

            const faqList = document.getElementById("faq-list");
            if (!faqList) {
                console.error("FAQ list container not found!");
                return;
            }

            faqList.innerHTML = ""; // Clear old data

            if (!data.faqs || data.faqs.length === 0) {
                faqList.innerHTML = "<p>No FAQs available yet.</p>";
                return;
            }

            data.faqs.forEach((faq, index) => {
                const faqItem = document.createElement("div");
                faqItem.classList.add("faq-item");

                const faqQuestion = document.createElement("h3");
                faqQuestion.textContent = `${index + 1}. ${faq.question}`;
                faqQuestion.classList.add("faq-question");

                const faqAnswer = document.createElement("p");
                faqAnswer.textContent = faq.answer;
                faqAnswer.classList.add("faq-answer");
                faqAnswer.style.display = "none"; // Initially hidden

                // ✅ Toggle answer visibility
                faqQuestion.addEventListener("click", function () {
                    faqAnswer.style.display = faqAnswer.style.display === "block" ? "none" : "block";
                });

                faqItem.appendChild(faqQuestion);
                faqItem.appendChild(faqAnswer);
                faqList.appendChild(faqItem);
            });
        })
        .catch(error => console.error("Error fetching FAQs:", error));
}

// ✅ Auto-Refresh FAQs Every 3 Seconds (Ensures Dynamic Updates)
setInterval(loadFAQs, 3000);

// ✅ Handle Input Field
document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    if (userInput) {
        // Auto-focus input field
        userInput.focus();

        // Handle enter key
        userInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const form = document.getElementById("chat-form");
                if (form) {
                    form.dispatchEvent(new Event("submit"));
                }
            }
        });

        // Auto-resize input field
        userInput.addEventListener("input", function() {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        });
    }
});

// ✅ Clear Chat Function
function clearChat() {
    const chatMessages = document.getElementById("chat-messages");
    if (chatMessages) {
        chatMessages.innerHTML = "";
        appendMessage("Hello! I'm CKPCET Chatbot. How can I help you today?", "bot");
    }
    messageHistory.length = 0;
}




// Navigation Toggle Function
function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    
    navbar.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close navbar when clicking outside
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
    }
});
