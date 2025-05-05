// document.addEventListener("DOMContentLoaded", function () {
//     const chatMessages = document.getElementById("chat-messages");
//     const userInput = document.getElementById("user-input");
//     const micButton = document.querySelector(".chat-input button:first-of-type"); // 🎤 Mic Button
//     const sendButton = document.querySelector(".chat-input button:last-of-type"); // Send Button

//     let voiceMode = false;
//     let recognition = null;

//     // ✅ Function to Add Messages to Chat UI
//     function addMessage(text, className) {
//         const messageDiv = document.createElement("div");
//         messageDiv.classList.add("message", className);
//         messageDiv.innerText = text;
//         chatMessages.appendChild(messageDiv);
//         chatMessages.scrollTop = chatMessages.scrollHeight;
//     }

//     // ✅ Function to Send User Message
//     function sendMessage() {
//         const message = userInput.value.trim();
//         if (message === "") return;

//         addMessage("👤 " + message, "user-message");
//         userInput.value = "";

//         fetch("/api", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ message: message })
//         })
//         .then(response => response.json())
//         .then(data => {
//             addMessage("🤖 " + data.response, "bot-message");
//             // ✅ Force Bot to Speak Every Response
//             speakResponse(data.speech_response || data.response);
//             voiceMode = false;
//         })
//         .catch(error => {
//             console.error("❌ Error:", error);
//             addMessage("❌ Bot: Error processing request.", "bot-message");
//         });
//     }

//     // ✅ Initialize Web Speech API
//     function initializeSpeechRecognition() {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (!SpeechRecognition) {
//             addMessage("❌ Voice recognition is not supported in your browser.", "bot-message");
//             return null;
//         }

//         recognition = new SpeechRecognition();
//         recognition.lang = "en-US";
//         recognition.interimResults = false;
//         recognition.maxAlternatives = 1;
//         recognition.continuous = false;

//         setupRecognitionHandlers();
//         return recognition;
//     }

//     // ✅ Setup Speech Recognition Event Handlers
//     function setupRecognitionHandlers() {
//         recognition.onstart = function () {
//             console.log("🎤 Listening...");
//             addMessage("🎤 Listening... Speak now!", "bot-message");
//             micButton.classList.add("listening");
//         };

//         recognition.onresult = function (event) {
//             const transcript = event.results[0][0].transcript.trim();
//             console.log("📝 Recognized Speech:", transcript);

//             userInput.value = transcript;
//             voiceMode = true;
//             sendMessage();
//         };

//         recognition.onerror = function (event) {
//             console.error("❌ Speech Recognition Error:", event.error);
//             micButton.classList.remove("listening");

//             let errorMessage;
//             switch (event.error) {
//                 case 'network':
//                     errorMessage = "❌ Voice recognition failed due to a network error.";
//                     addMessage(errorMessage, "bot-message");
//                     break;
//                 case 'not-allowed':
//                     errorMessage = "❌ Microphone access denied. Please allow access and try again.";
//                     alert("⚠️ Please allow microphone access in your browser settings!");
//                     break;
//                 case 'no-speech':
//                     errorMessage = "❌ No speech detected. Try again.";
//                     break;
//                 case 'audio-capture':
//                     errorMessage = "❌ No microphone detected. Please check your audio settings.";
//                     alert("⚠️ No microphone detected. Check your device settings!");
//                     break;
//                 default:
//                     errorMessage = "❌ Voice input error. Please retry.";
//             }
//             addMessage(errorMessage, "bot-message");
//         };

//         recognition.onend = function () {
//             console.log("🎤 Voice recognition ended");
//             micButton.classList.remove("listening");
//         };
//     }

//     // ✅ Start Speech Recognition (Triggered by 🎤 Button)
//     function startVoiceRecognition() {
//         if (!recognition) {
//             recognition = initializeSpeechRecognition();
//             if (!recognition) return;
//         }

//         try {
//             recognition.start();
//         } catch (error) {
//             console.error("❌ Error starting recognition:", error);
//             if (error.name === 'InvalidStateError') {
//                 recognition.stop();
//                 setTimeout(() => recognition.start(), 100);
//             } else {
//                 addMessage("❌ Error starting voice recognition. Try again.", "bot-message");
//             }
//         }
//     }

//     // ✅ Function to Make Bot Speak Response (Fixed!)
//     function speakResponse(responseText) {
//         if (!responseText || responseText.trim() === "") {
//             console.warn("⚠️ No response text to speak!");
//             return;
//         }

//         if ('speechSynthesis' in window) {
//             window.speechSynthesis.cancel(); // 🛑 Stop any ongoing speech
            
//             // ✅ Create Speech Object
//             const utterance = new SpeechSynthesisUtterance(responseText);
//             utterance.lang = "en-US";
//             utterance.rate = 0.9; // 🔥 Slow down for better clarity
//             utterance.pitch = 1;

//             // ✅ Force Speech to Play
//             utterance.onstart = function () {
//                 console.log("🔊 Speaking:", responseText);
//             };

//             utterance.onerror = function (event) {
//                 console.error("❌ Speech Synthesis Error:", event);
//             };

//             utterance.onend = function () {
//                 console.log("✅ Speech Finished.");
//             };

//             // ✅ Prevent Chrome from blocking speech
//             setTimeout(() => {
//                 speechSynthesis.speak(utterance);
//             }, 100);
//         } else {
//             console.error("❌ Speech Synthesis API Not Supported in Browser.");
//             addMessage("❌ Voice output is not supported in your browser.", "bot-message");
//         }
//     }

//     // ✅ Add Event Listeners
//     micButton.addEventListener("click", startVoiceRecognition);
//     sendButton.addEventListener("click", sendMessage);

//     userInput.addEventListener("keydown", function (event) {
//         if (event.key === "Enter") {
//             event.preventDefault();
//             sendMessage();
//         }
//     });

//     // ✅ Add CSS for Mic Button Animation
//     const style = document.createElement('style');
//     style.textContent = `
//         .listening {
//             background-color: red !important;
//             animation: pulse 1.5s infinite;
//         }
//         @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.1); }
//             100% { transform: scale(1); }
//         }
//     `;
//     document.head.appendChild(style);
// });

document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const micButton = document.querySelector(".chat-input button:first-of-type"); // 🎤 Mic Button
    const sendButton = document.querySelector(".chat-input button:last-of-type"); // Send Button

    let voiceMode = false; // ✅ Bot will speak only if voice button was used
    let recognition = null;

    // ✅ Function to Add Messages to Chat UI
    function addMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);
        messageDiv.innerText = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ✅ Function to Send User Message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        addMessage("👤 " + message, "user-message");
        userInput.value = "";

        fetch("/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            addMessage("🤖 " + data.response, "bot-message");

            // ✅ Speak Response Only If Voice Mode Was Used
            if (voiceMode) {
                speakResponse(data.speech_response || data.response);
                voiceMode = false; // Reset voice mode after speaking
            }
        })
        .catch(error => {
            console.error("❌ Error:", error);
            addMessage("❌ Bot: Error processing request.", "bot-message");
        });
    }

    // ✅ Initialize Web Speech API
    function initializeSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            addMessage("❌ Voice recognition is not supported in your browser.", "bot-message");
            return null;
        }

        recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = false;

        setupRecognitionHandlers();
        return recognition;
    }

    // ✅ Setup Speech Recognition Event Handlers
    function setupRecognitionHandlers() {
        recognition.onstart = function () {
            console.log("🎤 Listening...");
            addMessage("🎤 Listening... Speak now!", "bot-message");
            micButton.classList.add("listening");
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript.trim();
            console.log("📝 Recognized Speech:", transcript);

            userInput.value = transcript;
            voiceMode = true; // ✅ Enable voice mode so bot will speak back
            sendMessage();
        };

        recognition.onerror = function (event) {
            console.error("❌ Speech Recognition Error:", event.error);
            micButton.classList.remove("listening");

            let errorMessage;
            switch (event.error) {
                case 'network':
                    errorMessage = "❌ Voice recognition failed due to a network error.";
                    break;
                case 'not-allowed':
                    errorMessage = "❌ Microphone access denied. Please allow access and try again.";
                    alert("⚠️ Please allow microphone access in your browser settings!");
                    break;
                case 'no-speech':
                    errorMessage = "❌ No speech detected. Try again.";
                    break;
                case 'audio-capture':
                    errorMessage = "❌ No microphone detected. Please check your audio settings.";
                    alert("⚠️ No microphone detected. Check your device settings!");
                    break;
                default:
                    errorMessage = "❌ Voice input error. Please retry.";
            }
            addMessage(errorMessage, "bot-message");
        };

        recognition.onend = function () {
            console.log("🎤 Voice recognition ended");
            micButton.classList.remove("listening");
        };
    }

    // ✅ Start Speech Recognition (Triggered by 🎤 Button)
    function startVoiceRecognition() {
        if (!recognition) {
            recognition = initializeSpeechRecognition();
            if (!recognition) return;
        }

        try {
            recognition.start();
        } catch (error) {
            console.error("❌ Error starting recognition:", error);
            if (error.name === 'InvalidStateError') {
                recognition.stop();
                setTimeout(() => recognition.start(), 100);
            } else {
                addMessage("❌ Error starting voice recognition. Try again.", "bot-message");
            }
        }
    }

    // ✅ Function to Make Bot Speak Response (Only When Using Voice!)
    function speakResponse(responseText) {
        if (!voiceMode) return; // ✅ Bot will only speak if voice mode was used

        if (!responseText || responseText.trim() === "") {
            console.warn("⚠️ No response text to speak!");
            return;
        }

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // 🛑 Stop any ongoing speech
            
            // ✅ Create Speech Object
            const utterance = new SpeechSynthesisUtterance(responseText);
            utterance.lang = "en-US";
            utterance.rate = 0.9; // 🔥 Slow down for better clarity
            utterance.pitch = 1;

            utterance.onstart = function () {
                console.log("🔊 Speaking:", responseText);
            };

            utterance.onerror = function (event) {
                console.error("❌ Speech Synthesis Error:", event);
            };

            utterance.onend = function () {
                console.log("✅ Speech Finished.");
                voiceMode = false; // Reset voice mode after speaking
            };

            // ✅ Prevent Chrome from blocking speech
            setTimeout(() => {
                speechSynthesis.speak(utterance);
            }, 100);
        } else {
            console.error("❌ Speech Synthesis API Not Supported in Browser.");
            addMessage("❌ Voice output is not supported in your browser.", "bot-message");
        }
    }

    // ✅ Add Event Listeners
    micButton.addEventListener("click", startVoiceRecognition);
    sendButton.addEventListener("click", sendMessage);

    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    // ✅ Add CSS for Mic Button Animation
    const style = document.createElement('style');
    style.textContent = `
        .listening {
            background-color: red !important;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});











// Function to toggle the 'active' class for the navbar
function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}




document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".close-btn");

    // Toggle Navbar on Hamburger Click
    hamburger.addEventListener("click", function () {
        navbar.classList.add("active");
    });

    // Hide Navbar on Close Button Click
    closeBtn.addEventListener("click", function () {
        navbar.classList.remove("active");
    });
});
