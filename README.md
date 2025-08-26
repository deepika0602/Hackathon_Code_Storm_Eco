# ♻️ Smart Waste Classification Project

## 📌 Overview
This project classifies waste into **Biodegradable**, **Recyclable**, and **Hazardous** categories using **Machine Learning** and **Computer Vision**.  
The aim is to assist in **automated waste segregation** using a camera feed.

## 🚀 Features
- Frontend: Built with **React.js** (by Deepika) for user interface.  
- Backend: **Node.js / Express** to handle API requests.  
- Database: **MySQL** to store metadata (image paths, labels, predictions).  
- ML/AI: **Python + TensorFlow/PyTorch** (Jupyter Notebook on Ubuntu) for waste classification.  
- Camera Integration for real-time detection.  

## 🛠️ Tech Stack
- **Frontend:** React.js  
- **Backend:** Node.js, Express  
- **Database:** MySQL  
- **Machine Learning:** Python, TensorFlow / PyTorch, OpenCV  
- **IDE/Tools:** VS Code, Jupyter Notebook (Ubuntu)  
- **Version Control:** Git + GitHub  

## 📂 Project Structure
```
/waste-classification
│── frontend/          # React app
│── backend/           # Node.js + Express server
│── ml-model/          # Jupyter notebooks, ML training scripts
│── dataset/           # Waste images (Biodegradable / Recyclable / Hazardous)
│── database/          # SQL scripts & schema
│── README.md          # Documentation
```

## 🔧 Setup Instructions
1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/waste-classification.git
   cd waste-classification
   ```

2. **Frontend (React)**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend (Node.js)**
   ```bash
   cd backend
   npm install
   node server.js
   ```

4. **Machine Learning (Ubuntu + Jupyter)**
   ```bash
   cd ml-model
   jupyter notebook
   ```
   - Train the model with dataset  
   - Export trained model (`.h5` or `.pt`)  

5. **Database (MySQL)**
   ```sql
   CREATE DATABASE waste_classification;
   USE waste_classification;
   -- import schema.sql
   ```

## 📊 Dataset
- Using **Recyclable and Household Waste Classification Dataset (15k images, 30 classes)**  
- Classes mapped into:
  - **Biodegradable** → food, paper, garden waste, etc.  
  - **Recyclable** → plastic, metal, glass, cardboard, etc.  
  - **Hazardous** → batteries, e-waste, chemicals, etc.  

## 🎯 Future Work
- Improve accuracy with YOLOv5 / MobileNetV2  
- Mobile App integration  
- Deploy model with FastAPI or Flask  

## 👩‍💻 Team
- **Jahnavi (ML)**  
- **Deepika (Frontend)**  
- **Meghana (Backend)**
