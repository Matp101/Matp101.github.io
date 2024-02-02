async function displayGitHubProjects(username, count = 6) {
  const githubProjectsContainer = document.getElementById('github-projects');
  const loadingIndicator = document.getElementById('github-projects-loading');

  if (!githubProjectsContainer) {
    console.error("GitHub Projects container doesn't exist.");
    return;
  }

  // Fetch repositories from GitHub
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  //const response = await fetch(`/js/repos.json`);
  const repos = await response.json();

  if (!Array.isArray(repos)) {
    console.error('Failed to fetch GitHub repositories.');
    return;
  }

  // Sort repositories by the updated_at field and limit the number of repos
  const sortedRepos = repos
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, count);

  // Clear loading indicator
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }

  // Create and append cards for each repo
  for (const repo of sortedRepos) {
    const projectCard = await createProjectCard(repo);
    githubProjectsContainer.appendChild(projectCard);
  }

  if (repos.length > count) {
    const viewAllLink = document.createElement('a');
    viewAllLink.href = `https://github.com/${username}`;
    viewAllLink.target = '_blank';
    viewAllLink.textContent = 'View all on GitHub';
    viewAllLink.className = 'btn';
    githubProjectsContainer.appendChild(viewAllLink);

    const viewAllDiv = document.createElement('div');
    viewAllDiv.className = 'col-12 text-center pt-3';
    viewAllDiv.appendChild(viewAllLink);
    //githubProjectsContainer.after(viewAllDiv);
    githubProjectsContainer.after(viewAllDiv);
  }
}

async function createProjectCard(repo) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-lg-4 col-md-6 my-3';

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card my-3 h-100';

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body bg-transparent p-3 d-flex flex-column';

  const titleH5 = document.createElement('h5');
  titleH5.className = 'card-title bg-transparent';
  titleH5.textContent = repo.name;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-text bg-transparent secondary-font flex-fill';
  contentDiv.textContent = repo.description || 'No description available.';

  const cardFooterDiv = document.createElement('div');
  cardFooterDiv.className = 'card-footer mt-auto';

  const linkA = document.createElement('a');
  //linkA.className = 'btn btn-sm';
  linkA.href = repo.html_url;
  //linkA.textContent = 'View on GitHub';
  linkA.target = '_blank';

  cardBodyDiv.appendChild(titleH5);
  cardBodyDiv.appendChild(contentDiv);
  if (repo.language) {
   // <div class="pb-2 bg-transparent"></div>
    const languageDiv = document.createElement('div');
    languageDiv.className = 'pb-2 bg-transparent';
    
    const languageSpan = document.createElement('span');
    languageSpan.className = 'badge badge-secondary';
    languageSpan.textContent = repo.language;
    languageDiv.appendChild(languageSpan);
    cardBodyDiv.appendChild(languageDiv);
  }
  cardDiv.appendChild(cardBodyDiv);
  linkA.appendChild(cardDiv);
  //cardDiv.appendChild(cardFooterDiv);
  colDiv.appendChild(linkA);

  return colDiv;
}

displayGitHubProjects('matp101');
