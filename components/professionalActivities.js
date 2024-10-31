const profActivitiesSection = document.createElement('section');
const profSectionContainer = document.createElement('div');
const profActivitiesContainer = document.createElement('ul');

profActivitiesSection.className = 'section';
profSectionContainer.className = 'container section__container';
profActivitiesContainer.className = 'section__list prof-activities';

profSectionContainer.innerHTML = '<h2 class="section__title">Professional Activities</h2>';

async function generateProfActivitiesSection (path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const profActivities = await response.json();

    profActivities.forEach((profActivity) => {
      const li = document.createElement('li');
      const hr = document.createElement('hr');
      const years = profActivity.years.sort((a, b) => +a - +b).join(', ');

      li.className = 'section__list-item prof-activities__item';
      hr.className = 'prof-activities__line';

      li.innerHTML = `
      <span class="prof-activities__name">${profActivity.name}</span>,
      <span class="prof-activities__name">${profActivity.conference}</span>
      <span class="prof-activities__name">(${profActivity.conferenceAcronym} ${years})</span>
      `;

      li.append(hr);
      profActivitiesContainer.append(li);
    });
  } catch (error) {
    console.error(error.message);
  }
}

profSectionContainer.append(profActivitiesContainer);
profActivitiesSection.append(profSectionContainer);
