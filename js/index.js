document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('github-form');
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.trim();
    if (searchTerm !== '') {
      searchUsers(searchTerm);
    }
  });

  function searchUsers(searchTerm) {
    const url = `https://api.github.com/search/users?q=${searchTerm}`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items);
    })
    .catch(error => console.error('Error fetching users:', error));
  }

  function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = user.html_url;
      link.textContent = user.login;
      li.appendChild(link);
      userList.appendChild(li);
      link.addEventListener('click', function(event) {
        event.preventDefault();
        getUserRepos(user.login);
      });
    });
  }

  function getUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayRepos(data);
    })
    .catch(error => console.error('Error fetching repositories:', error));
  }

  function displayRepos(repos) {
    reposList.innerHTML = '';
    repos.forEach(repo => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = repo.html_url;
      link.textContent = repo.name;
      li.appendChild(link);
      reposList.appendChild(li);
    });
  }
});
