# SaeToDo
## My islamic task manager app 
This is a simple task management application with CRUD (Create, Read, Update, Delete) functionality and prayer time integration. Built with React Native and Firebase Firestore, the app allows users to manage tasks efficiently while also displaying prayer times fetched from the Aladhan API.

### Features
Task Management: Add, update, delete, and mark tasks as complete

Real-time Firestore Database: Data is stored and synced across devices

Prayer Times Integration: Fetches daily prayer times based on user location

Minimalist UI: Clean and simple user experience

State Management: Implemented using React hooks

### Tech Stack
Frontend: React Native (JavaScript)

Backend: Firebase Firestore (NoSQL database)

State Management: React Hooks

API Integration: Aladhan API (for prayer times)

# Installation & Setup
## Prerequisites
Ensure you have the following installed:

Node.js (Latest LTS version)

npm or yarn

React Native CLI

Firebase account with Firestore enabled

Steps to Run Locally
1) Clone the repository:

git clone https://github.com/alvina-byte2/SaeToDo.git
cd task-manager-prayer-times


2) Install dependencies:
npm install

3)Set up Firebase:

Create a Firebase project.

Enable Firestore Database.

Copy Firebase config and create a firebaseConfig.js file with the following:

example: 
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

4)Start the development server:
npx expo start

# Testing 

To run unit tests using Jest:

npm test

# Usage
Adding Tasks: Tap the "Add Task" button, enter details, and save.

Updating Tasks: Tap a task to edit and update it.

Deleting Tasks: Swipe left or tap delete to remove a task.

Viewing Prayer Times: The prayer times screen fetches data from the Aladhan API based on the user's location.

# Future Improvements
User Authentication (Firebase Auth)

Push Notifications for prayer reminders

Task Categorization & Filtering

Dark Mode & UI Enhancements

