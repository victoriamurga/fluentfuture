// --- IMPORTS ---
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

const db = getFirestore();

// --- HEADER UI ---

function updateHeader(userData) {
  const headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  const signInButton = headerContainer.querySelector('.sign-in-button');
  if (!signInButton) return;

  const userBox = document.createElement('div');
  userBox.className = 'user-info';
  userBox.innerHTML = `
    <span style="margin-right: 15px;">
      Signed in as <strong>${userData.email}</strong>
    </span>
    <button id="sign-out-button" class="sign-out-button">Sign Out</button>
  `;

  signInButton.replaceWith(userBox);

  document.getElementById('sign-out-button')?.addEventListener('click', () => auth.signOut());
}

function clearHeader() {
  const headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  const userBox = headerContainer.querySelector('.user-info');
  if (userBox) {
    userBox.outerHTML = `
      <button class="sign-in-button" onclick="window.location.href='sign-in.html'">
        Sign In
      </button>
    `;
  }
}

// --- LOAD PARTIALS ---

function loadHTML(id, file) {
  const container = document.getElementById(id);
  if (!container) return Promise.resolve();

  return fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error(`${file} not found`);
      return res.text();
    })
    .then((html) => {
      container.innerHTML = html;
    })
    .catch((err) => console.error(`Failed to load ${file}:`, err));
}

// --- AUTH LOGIC ---

function setupAuthListener() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      clearHeader();
      return;
    }

    const userRef = doc(db, 'users', user.uid);

    onSnapshot(userRef, (docSnapshot) => {
      console.log('SNAPSHOT FIRED');
      console.log('Exists:', docSnapshot.exists());

      if (docSnapshot.exists()) {
        updateHeader({
          ...docSnapshot.data(),
          email: user.email,
        });
      }
    });
  });
}

// --- APP INIT ---

async function initializeApp() {
  // 1. Load header FIRST
  await loadHTML('header', 'header.html');

  // 2. Then start auth (so header exists when we modify it)
  setupAuthListener();

  // 3. Load footer (doesn't depend on auth)
  loadHTML('footer', 'footer.html');
}

document.addEventListener('DOMContentLoaded', initializeApp);
