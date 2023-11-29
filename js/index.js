import { catsData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
const getImgBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');

function getEmotionsArray(cats) {
  const emotions = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotions.includes(emotion)) {
        emotions.push(emotion);
      }
    }
  }
  return emotions;
}

function renderEmotionsRadios(cats) {
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
}

renderEmotionsRadios(catsData);

emotionRadios.addEventListener('change', highlightCheckedOption);

getImgBtn.addEventListener('click', getMatchingCatsArray);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName('radio');
  for (let radio of radios) {
    radio.classList.remove('highlight');
  }

  if (e.target && e.target.matches("input[type='radio']")) {
    const optionId = e.target.id;
    document.getElementById(optionId).parentElement.classList.add('highlight');
  }
}

function getMatchingCatsArray() {
  const checkedRadio = document.querySelector('input[type="radio"]:checked');
  if (checkedRadio) {
    const selectedEmotion = checkedRadio.value;
    const isGif = gifsOnlyOption.checked;
    const matchingCats = isGif
      ? catsData.filter(
          (c) => c.emotionTags.includes(selectedEmotion) && c.isGif
        )
      : catsData.filter((c) => c.emotionTags.includes(selectedEmotion));
    console.log(matchingCats);
  }
}
