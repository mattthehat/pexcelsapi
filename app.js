const searchInput = document.querySelector('#photos');
const submitBtn = document.querySelector('#submit');
const resultContainer = document.querySelector('.results');


submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const searchTerms = searchInput.value;
  searchInput.value = '';

  fetch(`https://api.pexels.com/v1/search?query=${searchTerms}&per_page=150&page=1`, {
    method: 'GET',
    headers: {
      Authorization: 'YOUR KEY'
    }
  })
  .then(res => res.json())
  .then(data => {
    const photos = data.photos;
    if(photos.length > 0) {
      resultContainer.innerHTML = '';
      photos.forEach(photo => {
        console.log(photo);
        const link = document.createElement('a');
        link.classList.add('results__link');
        link.href = photo.url;
        link.target = '_blank';
        const img = document.createElement('img');
        img.classList.add('results__img');
        img.src = photo.src.large;
        link.appendChild(img);
        resultContainer.appendChild(link);
      })
    } else {
      resultContainer.innerHTML = '<h3>Nothing found</h3>';
    }
  })
  .catch(err => console.log(err));
})