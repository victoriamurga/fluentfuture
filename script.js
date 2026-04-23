document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Load header
  const headerContainer = document.getElementById('header');
  if (headerContainer) {
    fetch('header.html')
      .then(res => res.text())
      .then(html => {
        headerContainer.innerHTML = html;

        const signInButton = headerContainer.querySelector('.sign-in-button');
        if (user && user.email) {
          const userBox = document.createElement('div');
          userBox.className = 'user-info';
          userBox.innerHTML = `
            <span>Signed in as <strong>${user.email}</strong></span>
            <button id="sign-out-button" class="sign-out-button">Sign Out</button>
          `;
          signInButton?.replaceWith(userBox);

          document.getElementById('sign-out-button')?.addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload();
          });
        }
      });
  }

  // Load footer
  const footerContainer = document.getElementById('footer');
  if (footerContainer) {
    fetch('footer.html')
      .then(res => res.text())
      .then(html => {
        footerContainer.innerHTML = html;
      });
  }
});

