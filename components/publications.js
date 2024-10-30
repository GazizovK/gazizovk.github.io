const publicationsSection = document.createElement('section');
const sectionContainer = document.createElement('div');
const publicationsContainer = document.createElement('ul');

publicationsSection.className = 'section';
sectionContainer.className = 'container section__container';
publicationsContainer.className = 'section__list publications';

sectionContainer.innerHTML = '<h2 class="section__title">Publications</h2>';

function getAutorsStr (authors, targetAuthor) {
  const listLength = authors.length;
  const tmpAuthorsList = authors.map((author) => author === targetAuthor ? `<span class="publications__target-author">${author}</span>`: author)
  if (listLength <= 2) return tmpAuthorsList.join(' and ');
  return `${tmpAuthorsList.slice(0, listLength - 1).join(', ')}, and ${tmpAuthorsList[listLength - 1]}`;
}

async function generatePublicationsSection (path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const publications = await response.json();

    publications.forEach((publication) => {
      const li = document.createElement('li');
      const conference = document.createElement('div');
      const description = document.createElement('div');
      const status = document.createElement('span');
      const links = document.createElement('ul');
      const hr = document.createElement('hr');
      const authors = getAutorsStr(publication.authors, publication.targetAuthor);

      li.className = 'section__list-item publications__item';
      status.className = 'publications__status';
      links.className = 'publications__links';
      hr.className = 'publications__line';

      conference.innerHTML = `
        ${publication.conferenceName ? `<span class="publications__conference-name">[${publication.conferenceName}]</span>` : ''}
        <span class="publictions__authors">${authors}</span>
        ${publication.year ? `<span class="publications__year">(${publication.year})</span>`: ''}
        :
        <span class="publications__title">"${publication.title}"</span>.
      `;

      description.innerHTML = `
        ${publication.description ? `<span class="publications__description">${publication.description}, ${publication.year}</span>` : ''}
      `;

      status.innerHTML = `(${publication.status})`;

      publication.links.forEach((link) => {
        const li = document.createElement('li');

        li.innerHTML = `
          <a class="link publication__link" href=${link.link} target="_blank">[${link.name}]</a>
        `;

        links.append(li);
      });

      li.append(conference);
      li.append(description);
      if (publication.status) li.append(status);
      li.append(links);
      li.append(hr);

      publicationsContainer.append(li);
    });


  } catch (error) {
    console.error(error.message);
  }
}

sectionContainer.append(publicationsContainer);
publicationsSection.append(sectionContainer);
