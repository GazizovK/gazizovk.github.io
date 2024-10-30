const startInfo = document.createElement('section');
const startInfoContainer = document.createElement('div');
const infoContainer = document.createElement('article');
const jobInfoContainer = document.createElement('ul');
const socialLinksContainer = document.createElement('ul');

startInfo.className = 'start-info';
startInfoContainer.className = 'container start-info__container';
infoContainer.className = 'start-info__info';
jobInfoContainer.className = 'start-info__job-info';
socialLinksContainer.className = 'start-info__social-links';

async function getJobInfo (path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const jobInfo = await response.json();

    jobInfoContainer.innerHTML = `
      <li class="start-info__job-description">${jobInfo.title}</li>
      <li class="start-info__job-description">${jobInfo.department}</li>
      <li class="start-info__job-description">${jobInfo.companyName}</li>
      <li class="start-info__job-description">${jobInfo.address}</li>
    `;

  } catch (error) {
    console.error(error.message);
  }
}

async function getSocialLinks (path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const socialLinks = await response.json();

    for (let i = 0; i < socialLinks.length; i++) {
      const li = document.createElement('li');

      li.innerHTML = `
      <a class="link start-info__social-link" href=${socialLinks[i].link} target="_blank">
        ${socialLinks[i].icon
          ? `<div class="start-info__social-link-icon"><img src=${socialLinks[i].icon} alt="${socialLinks[i].name} icon"/></div>`
          : ''
        }
        <span class="start-info__social-link-name">${socialLinks[i].name}</span>
      `;

      socialLinksContainer.append(li);
    }

  } catch (error) {
    console.error(error.message);
  }
}

getJobInfo('./constants/JOB_INFO.json');
getSocialLinks('./constants/SOCIAL_LINKS.json');

startInfoContainer.innerHTML = '<div class="start-info__img"><img src="./assets/images/kuat-gazizov-photo.jpg" alt="Kuat Gazizov photo" /></div>';
infoContainer.innerHTML = '<h1 class="start-info__title">Kuat Gazizov</h1>';

infoContainer.append(jobInfoContainer);
infoContainer.append(socialLinksContainer);
startInfoContainer.append(infoContainer);
startInfo.append(startInfoContainer);
