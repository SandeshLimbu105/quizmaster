// Shared JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      document.querySelector('nav').classList.toggle('show');
    });
  }

  // Set active navigation item
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Load leaderboard if on leaderboard.html
  if (currentPage === 'leaderboard.html') {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById('leaderboard-body');
        if (!tbody) return;

        if (data.length === 0) {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="4">No scores yet</td>`;
          tbody.appendChild(row);
          return;
        }

        data.forEach((entry, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
            <td>${entry.category || 'General'}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(err => {
        console.error('Error loading leaderboard:', err);
      });
  }
});
