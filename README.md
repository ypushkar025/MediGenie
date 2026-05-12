# 🩺 MediGenie

**An ML-powered health companion that predicts likely diseases from symptoms and gives you actionable guidance — nutrition, remedies, exercises, and expert videos.**

[![GitHub](https://img.shields.io/badge/GitHub-ypushkar025-181717?style=flat-square&logo=github)](https://github.com/ypushkar025)
[![React](https://img.shields.io/badge/react-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Python](https://img.shields.io/badge/python-3.8+-3776AB?style=flat-square&logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/fastapi-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-random%20forest-F7931E?style=flat-square&logo=scikitlearn)](https://scikit-learn.org)
[![MongoDB](https://img.shields.io/badge/mongodb-atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

Most people google their symptoms and end up convinced they have something terminal. MediGenie does something more useful — takes your symptoms, runs them through a trained Random Forest classifier across eight disease datasets, and tells you what condition is most likely along with exactly what to eat, what home remedies apply, and what exercises help.

Not a replacement for a doctor. A starting point that's better than a search engine.

---

## What it actually does

- **Disease prediction** — user fills a symptom questionnaire, FastAPI sends inputs to the ML model, Random Forest returns the most likely condition from eight possible diseases
- **Personalized recommendations** — based on the predicted disease, returns specific nutrition advice, home remedies, and condition-appropriate exercises
- **Expert videos** — curated educational content per condition so users understand what they're dealing with
- **JWT authentication** — secure register/login, password hashing, protected routes
- **Responsive React frontend** — clean health questionnaire UI, results displayed with recommendations inline

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React.js, Axios, TailwindCSS |
| Backend API | Node.js + Express (auth, user data), FastAPI (ML inference) |
| Database | MongoDB |
| ML Model | Scikit-Learn — Random Forest Classifier |
| ML Utilities | Pandas, NumPy, Seaborn, SMOTE, GridSearchCV |
| Auth | JWT, bcrypt password hashing |

---

## How the ML model works

Eight disease datasets trained into one classifier — Liver Disease, Anemia, Chronic Kidney Disease, Diabetes, Heart Disease, Hypertension, Stroke, and Thyroid Disease.

The raw datasets had a class imbalance problem — some conditions appeared far more often than others in the training data, which biases the model toward predicting common conditions. We used **SMOTE (Synthetic Minority Oversampling Technique)** to generate synthetic samples for underrepresented classes and balance the training distribution.

Hyperparameters (number of trees, max depth, min samples split) tuned with **GridSearchCV** using 3-fold cross-validation. Final model improved approximately 15% accuracy over the untuned baseline.

Evaluation: Accuracy, Precision, Recall, F1-Score, and Confusion Matrix per disease class.

---

## System flow
```
User fills symptom questionnaire
        │
        ▼
React Frontend → Express API (auth check)
        │
        ▼
FastAPI ML Service
        │
Random Forest Classifier
        │
Predicted Disease
        │
        ▼
Nutrition + Remedies + Exercises + Videos
        │
        ▼
Results displayed on frontend
```

---

## Getting started locally

**Prerequisites:** Node.js 18+, Python 3.8+, MongoDB
```bash
# Clone
git clone https://github.com/ypushkar025/MediGenie
cd MediGenie

# ML + FastAPI backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm start
```

Frontend → `http://localhost:3000`
FastAPI → `http://localhost:8000`

---

## Environment variables
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API endpoints

| Endpoint | Method | What it does |
|---|---|---|
| `/predict-disease` | POST | Runs symptom inputs through Random Forest, returns predicted disease |
| `/nutrition` | GET | Dietary recommendations for predicted condition |
| `/home-remedies` | GET | Home remedy suggestions |
| `/exercises` | GET | Condition-specific exercise recommendations |
| `/videos` | GET | Curated educational videos |
| `/register` | POST | Create account |
| `/login` | POST | JWT authentication |

---

## Model performance

- ~15% accuracy improvement over baseline untuned model
- SMOTE applied to all eight datasets to fix class imbalance
- GridSearchCV with cv=3 for hyperparameter tuning
- Evaluated per class: Accuracy, Precision, Recall, F1-Score, Confusion Matrix

---

## Honest limitations

- Not a diagnostic tool — predictions are probabilistic, not medical advice
- Dataset quality is inconsistent across the eight diseases — some perform better than others
- Model was trained on publicly available datasets, not clinical patient data
- Integrating FastAPI (Python) with the Express (Node.js) layer added complexity — two separate backend processes required

---

## What's next

- Larger, cleaner datasets to improve per-class accuracy
- Image and text-based symptom input (skin conditions, lab report parsing)
- Multilingual support
- Real-time health tracking via wearable device data
- Verified medical professional review layer before recommendations

