


# from flask import Flask, render_template, request, jsonify
# from flask_cors import CORS
# from fuzzywuzzy import process
# import openai
# import nltk
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer
# import os
# from dotenv import load_dotenv

# # Load environment variables 
# load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY")

# # Download necessary NLTK data
# nltk.download("punkt")
# nltk.download("wordnet")
# nltk.download("averaged_perceptron_tagger")

# app = Flask(__name__)
# CORS(app)

# lemmatizer = WordNetLemmatizer()

# # --- DATASET ---
# dataset = {
#     # General
#     "hi": "Hello! I am the CKPCET Chatbot. How can I assist you today?",
#     "hello": "Hi there! It's great to have you here. How may I help you?",
#     "bye": "Goodbye! Feel free to return anytime if you need more information.",
#     "thank you": "You're welcome!",

#     # College Info
#     "university": "CKPCET is affiliated with Gujarat Technological University (GTU).",
#     "courses": "We offer Computer, IT, Mechanical, Civil, and Electrical Engineering.",
#     "fees": "₹44,000 per semester.",
#     "timings": "College runs from 8:30 AM to 4:30 PM, Monday to Saturday.",
#     "holidays": "We follow the GTU academic calendar for holidays.",

#     # Facilities
#     "hostel": "Yes, we have separate hostels with security and mess.",
#     "canteen": "Yes, vegetarian canteen is available on campus.",
#     "sports": "Cricket ground, badminton court, and more.",
#     "library": "50,000+ books, digital resources, and study halls.",
#     "wifi": "Free campus Wi-Fi for all students and faculty.",
#     "gym": "No gym on campus.",
#     "transportation": "Buses available from major city locations.",

#     # Admission
#     "admission": "Pass 12th, take GUJCET, and apply through ACPC.",
#     "apply": "Apply via the ACPC portal by choosing your branch.",
#     "eligibility": "12th with Physics & Math, minimum 45% marks.",
#     "reservation": "SC/ST/SEBC/EWS reservation as per rules.",
#     "management quota": "Yes, limited quota as per AICTE/GTU norms.",
#     "scholarships": "Govt scholarships for meritorious and reserved categories.",
#     "documents required": "Marksheets, GUJCET scorecard, and ID proofs.",
#     "cutoff": "Cutoffs are declared after each ACPC round.",
#     "counseling": "Counseling happens online through the ACPC portal.",

#     # Placements
#     "placement": "85% placement rate. Avg ₹4.5 LPA, highest ₹12 LPA.",
#     "companies": "TCS, Infosys, L&T, Wipro, Tech Mahindra, etc.",
#     "internships": "Internships are arranged via our T&P cell.",
#     "placement cell": "It conducts drives, industry tie-ups, and training.",
#     "training": "Includes aptitude, soft skills, and mock interviews.",
#     "alumni": "Our alumni are working at MNCs across the globe.",
#     "success stories": "Students have landed jobs in top firms like TCS and Byju’s.",

#     # Activities
#     "fests": "We host cultural and technical fests annually.",
#     "technical clubs": "Clubs: Coding, Robotics, Electronics.",
#     "cultural activities": "Dance, drama, music encouraged.",
#     "student council": "Student-led body that runs events and grievances.",

#     # Misc
#     "loan assistance": "Loan help available through partner banks.",
#     "exam results": "Published on GTU portal and CKPCET website.",
#     "guest lectures": "Frequent lectures by industry professionals.",
#     "grievance redressal": "A formal cell handles student concerns.",
#     "environment": "Green, peaceful, and student-friendly campus."
# }

# synonym_mapping = {
#     "fees": ["tuition", "cost", "charges", "price"],
#     "gtu": ["university", "degree", "academic"],
#     "placement": ["jobs", "career", "recruitment", "hiring"],
#     "hostel": ["accommodation", "dorm", "stay"],
#     "canteen": ["food", "mess", "dining"],
#     "courses": ["branches", "programs", "departments"]
# }


# # --- UTILITIES ---
# def find_best_synonym(message):
#     tokens = word_tokenize(message)
#     for word in tokens:
#         lemma = lemmatizer.lemmatize(word)
#         for key, synonyms in synonym_mapping.items():
#             if lemma in synonyms:
#                 return key
#     return None


# # --- TRACK FAQs ---
# faq_dataset = [
#     {"question": "What are the admission requirements?", "answer": dataset["admission"]},
#     {"question": "How can I apply?", "answer": dataset["apply"]},
#      {"question": "Does the college have hostels?", "answer": dataset["courses"]},
#     {"question": "What is the tuition fee?", "answer": dataset["bye"]},

# ]

# question_frequency = {}

# def track_question(q):
#     question_frequency[q] = question_frequency.get(q, 0) + 1
#     if question_frequency[q] >= 5:
#         if all(faq["question"].lower() != q for faq in faq_dataset):
#             faq_dataset.append({"question": q.capitalize(), "answer": dataset[q]})
#             if len(faq_dataset) > 5:
#                 faq_dataset.pop(0)


# # --- API ROUTES ---

# @app.route("/api", methods=["POST"])
# def chatbot():
#     user_input = request.get_json().get("message", "").lower().strip()
#     best_match, confidence = process.extractOne(user_input, dataset.keys())
#     if confidence > 70:
#         track_question(best_match)
#         return jsonify({"response": dataset[best_match]})
#     else:
#         synonym = find_best_synonym(user_input)
#         if synonym:
#             track_question(synonym)
#             return jsonify({"response": dataset[synonym]})
#         return jsonify({"response": "Sorry, I couldn't find info. Please check our website."})


# @app.route("/speech-to-text", methods=["POST"])
# def speech_to_text():
#     audio_file = request.files["audio"]
#     transcript = openai.Audio.transcribe("whisper-1", audio_file)
#     return jsonify({"transcript": transcript["text"]})


# @app.route("/get_faqs", methods=["GET"])
# def get_faqs():
#     return jsonify({"faqs": faq_dataset})


# # --- ROUTES ---
# @app.route("/")
# def index():
#     return render_template("index.html")

# @app.route("/faq")
# def faq():
#     return render_template("faq.html")

# @app.route("/aboutus")
# def aboutus():
#     return render_template("aboutus.html")

# @app.route("/contactus")
# def contactus():
#     return render_template("contactus.html")


# # --- RUN SERVER ---
# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))  # Use PORT env var if available
#     app.run(host="0.0.0.0", port=port)



from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer, util
import openai
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import os
from dotenv import load_dotenv

# --- Setup ---
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

nltk.download("punkt")
nltk.download("wordnet")
nltk.download("averaged_perceptron_tagger")

app = Flask(__name__)
CORS(app)
lemmatizer = WordNetLemmatizer()
model = SentenceTransformer('all-MiniLM-L6-v2')  # Fast and lightweight

# --- Dataset ---
dataset = {
    "hi": "Hello! I am the CKPCET Chatbot. How can I assist you today?",
    "hello": "Hi there! It's great to have you here. How may I help you?",
    "bye": "Goodbye! Feel free to return anytime if you need more information.",
    "thank you": "You're welcome!",

    "university": "CKPCET is affiliated with Gujarat Technological University (GTU).",
    "courses": "We offer Computer, IT, Mechanical, Civil, and Electrical Engineering.",
    "fees": "₹44,000 per semester.",
    "timings": "College runs from 8:30 AM to 4:30 PM, Monday to Saturday.",
    "holidays": "We follow the GTU academic calendar for holidays.",

    "hostel": "Yes, we have separate hostels with security and mess.",
    "canteen": "Yes, vegetarian canteen is available on campus.",
    "sports": "Cricket ground, badminton court, and more.",
    "library": "50,000+ books, digital resources, and study halls.",
    "wifi": "Free campus Wi-Fi for all students and faculty.",
    "gym": "No gym on campus.",
    "transportation": "Buses available from major city locations.",

    "admission": "Pass 12th, take GUJCET, and apply through ACPC.",
    "apply": "Apply via the ACPC portal by choosing your branch.",
    "eligibility": "12th with Physics & Math, minimum 45% marks.",
    "reservation": "SC/ST/SEBC/EWS reservation as per rules.",
    "management quota": "Yes, limited quota as per AICTE/GTU norms.",
    "scholarships": "Govt scholarships for meritorious and reserved categories.",
    "documents required": "Marksheets, GUJCET scorecard, and ID proofs.",
    "cutoff": "Cutoffs are declared after each ACPC round.",
    "counseling": "Counseling happens online through the ACPC portal.",

    "placement": "85% placement rate. Avg ₹4.5 LPA, highest ₹12 LPA.",
    "companies": "TCS, Infosys, L&T, Wipro, Tech Mahindra, etc.",
    "internships": "Internships are arranged via our T&P cell.",
    "placement cell": "It conducts drives, industry tie-ups, and training.",
    "training": "Includes aptitude, soft skills, and mock interviews.",
    "alumni": "Our alumni are working at MNCs across the globe.",
    "success stories": "Students have landed jobs in top firms like TCS and Byju’s.",

    "fests": "We host cultural and technical fests annually.",
    "technical clubs": "Clubs: Coding, Robotics, Electronics.",
    "cultural activities": "Dance, drama, music encouraged.",
    "student council": "Student-led body that runs events and grievances.",

    "loan assistance": "Loan help available through partner banks.",
    "exam results": "Published on GTU portal and CKPCET website.",
    "guest lectures": "Frequent lectures by industry professionals.",
    "grievance redressal": "A formal cell handles student concerns.",
    "environment": "Green, peaceful, and student-friendly campus."
}

synonym_mapping = {
    "hi": ["hey", "hello", "greetings", "yo"],
    "bye": ["goodbye", "see you", "later", "take care"],
    "thank you": ["thanks", "thankyou", "thx", "appreciate it"],

    "university": ["gtu", "affiliated", "affiliation", "recognized", "degree", "college approved by"],
    "courses": ["programs", "branches", "streams", "departments", "fields of study"],
    "fees": ["cost", "price", "tuition", "charges", "payment", "fee structure"],
    "timings": ["schedule", "hours", "time", "college hours", "open", "working"],
    "holidays": ["vacation", "leave", "holiday list", "calendar"],

    "hostel": ["accommodation", "stay", "rooms", "dorm", "lodging"],
    "canteen": ["food", "mess", "dining", "lunch", "meal"],
    "sports": ["games", "athletics", "cricket", "football", "facilities"],
    "library": ["books", "study resources", "reading", "digital library"],
    "wifi": ["internet", "wireless", "network", "wifi access"],
    "gym": ["fitness", "exercise", "workout", "training room"],
    "transportation": ["bus", "commute", "travel", "reach", "shuttle", "transport"],

    "admission": ["enroll", "enter", "get in", "join", "registration"],
    "apply": ["application", "submit form", "portal", "register"],
    "eligibility": ["criteria", "requirements", "minimum marks", "qualification"],
    "reservation": ["quota", "category", "caste-based", "sc", "st", "ews"],
    "management quota": ["direct admission", "private seat", "special quota"],
    "scholarships": ["financial aid", "fee waiver", "concession", "support"],
    "documents required": ["papers", "needed", "submission", "proof", "docs"],
    "cutoff": ["rank", "score limit", "closing rank"],
    "counseling": ["guidance", "choice filling", "seat selection"],

    "placement": ["job", "career", "campus drive", "recruitment", "hiring"],
    "companies": ["recruiters", "partners", "firms", "visited companies"],
    "internships": ["training", "summer internship", "industrial visit"],
    "placement cell": ["career services", "placement department", "t&p"],
    "training": ["soft skills", "aptitude", "preparation", "mock interview"],
    "alumni": ["graduates", "former students", "old students"],
    "success stories": ["achievements", "notable alumni", "student wins"],

    "fests": ["events", "celebrations", "annual fest", "college fest"],
    "technical clubs": ["coding", "robotics", "electronics", "club"],
    "cultural activities": ["dance", "music", "drama", "arts"],
    "student council": ["representative", "student body", "grievances"],





"fests": ["events", "celebration", "annual day", "college function"],
"technical clubs": ["events", "workshop", "robotics", "coding event"],
"cultural activities": ["dance", "music", "drama", "event", "celebration"],



"placement": [
    "job", "career", "campus drive", "recruitment", "hiring",
    "placements", "job opportunities", "placement cell",
    "opportunities", "type of placements", "job types"
],






    "loan assistance": ["loan", "finance", "help with fees"],
    "exam results": ["score", "marks", "grades", "result"],
    "guest lectures": ["seminar", "webinar", "industry expert", "talk"],
    "grievance redressal": ["complaints", "issues", "concerns", "student help"],
    "environment": ["campus", "greenery", "clean", "peaceful"]
}

# --- Precompute dataset embeddings ---
dataset_keys = list(dataset.keys())
dataset_embeddings = model.encode(dataset_keys, convert_to_tensor=True)

# --- FAQ tracking ---
faq_dataset = [
    {"question": "What are the admission requirements?", "answer": dataset["admission"]},
    {"question": "How can I apply?", "answer": dataset["apply"]},
    {"question": "Does the college have hostels?", "answer": dataset["hostel"]},
    {"question": "What is the tuition fee?", "answer": dataset["fees"]},
]
question_frequency = {}

def track_question(key):
    question_frequency[key] = question_frequency.get(key, 0) + 1
    if question_frequency[key] >= 5:
        if all(faq["question"].lower() != key for faq in faq_dataset):
            faq_dataset.append({"question": key.capitalize(), "answer": dataset[key]})
            if len(faq_dataset) > 5:
                faq_dataset.pop(0)

# --- Synonym Fallback Function ---
def find_best_synonym(message):
    tokens = word_tokenize(message.lower())
    for word in tokens:
        lemma = lemmatizer.lemmatize(word)
        for key, synonyms in synonym_mapping.items():
            if lemma in synonyms:
                return key
    return None

# --- Routes ---
@app.route("/api", methods=["POST"])
def chatbot():
    user_input = request.get_json().get("message", "").lower().strip()
    if not user_input:
        return jsonify({"response": "Please enter a message."})

    user_embedding = model.encode(user_input, convert_to_tensor=True)
    scores = util.cos_sim(user_embedding, dataset_embeddings)[0]
    best_idx = scores.argmax().item()
    confidence = scores[best_idx].item()

    if confidence > 0.5:
        best_key = dataset_keys[best_idx]
        track_question(best_key)
        return jsonify({"response": dataset[best_key]})
    else:
        synonym = find_best_synonym(user_input)
        if synonym:
            track_question(synonym)
            return jsonify({"response": dataset[synonym]})
        return jsonify({"response": "Sorry, I couldn't find info. Please check our website."})

@app.route("/speech-to-text", methods=["POST"])
def speech_to_text():
    audio_file = request.files["audio"]
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    return jsonify({"transcript": transcript["text"]})

@app.route("/get_faqs", methods=["GET"])
def get_faqs():
    return jsonify({"faqs": faq_dataset})

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/faq")
def faq():
    return render_template("faq.html")

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

@app.route("/contactus")
def contactus():
    return render_template("contactus.html")

# --- Run Server ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)



