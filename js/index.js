import { catsData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
const getImgBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

const getEmotionsArray = (cats) => {
  const emotions = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotions.includes(emotion)) {
        emotions.push(emotion);
      }
    }
  }
  return emotions;
};

const renderEmotionsRadios = (cats) => {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
            >
        </div>
    `;
  }

  emotionRadios.innerHTML += radioItems;
};

const highlightCheckedOption = (e) => {
  const radios = document.getElementsByClassName('radio');
  for (let radio of radios) {
    radio.classList.remove('highlight');
  }

  if (e.target && e.target.matches("input[type='radio']")) {
    const optionId = e.target.id;
    document.getElementById(optionId).parentElement.classList.add('highlight');
  }
};

const getMatchingCatsArray = () => {
  const checkedRadio = document.querySelector('input[type="radio"]:checked');
  if (checkedRadio) {
    const selectedEmotion = checkedRadio.value;
    const isGif = gifsOnlyOption.checked;
    const matchingCats = isGif
      ? catsData.filter(
          (c) => c.emotionTags.includes(selectedEmotion) && c.isGif
        )
      : catsData.filter((c) => c.emotionTags.includes(selectedEmotion));
    return matchingCats;
  }
};

const renderCat = () => {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `
    <img 
        class="cat-img" 
        src="../assets/images/${catObject.image}"
        alt="${catObject.alt}"
    >
  `;
  memeModal.style.display = 'flex';
};

const getSingleCatObject = () => {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length > 0) {
    const randomCatNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomCatNumber];
  }
};

const closeModal = () => {
  memeModal.style.display = 'none';
};

// FUNCTION CALLS
renderEmotionsRadios(catsData);

// EVENT LISTENERS
emotionRadios.addEventListener('change', highlightCheckedOption);

getImgBtn.addEventListener('click', renderCat);

memeModalCloseBtn.addEventListener('click', closeModal);
