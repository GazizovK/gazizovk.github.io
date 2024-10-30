const aboutSectionsList = [];
async function generateAboutSections (path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const aboutSections = await response.json();

    for (let i = 0; i < aboutSections.length; i++) {
      const section = document.createElement('section');
      const sectionContainer = document.createElement('div');

      section.className = 'section';
      sectionContainer.className = 'container section__container';

      sectionContainer.innerHTML = `<h2 class="section__title">${aboutSections[i].title}</h2>`;
      for (let j = 0; j < aboutSections[i].description.length; j++) {
        const p = document.createElement('p');
        p.className = 'section__paragraph';
        p.innerHTML = aboutSections[i].description[j];
        sectionContainer.append(p);
      }

      section.append(sectionContainer);
      aboutSectionsList.push(section);
    }

  } catch (error) {
    console.error(error.message);
  }
}
