// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const { default: Axios } = require("axios");

const url = 'https://lambda-times-api.herokuapp.com/articles';

const data = axios.get(url)
.then(res => {
  let articles = res.data.articles;
  for(const a in articles){
    let i = articles[a]
    // console.log(i);
    for(const b in i){
     const article = makeArticle(i[b]);
     cards.appendChild(article);
    }
  }

})
.catch(err => console.log(err));

function makeArticle(data) {
  //created elements
  const card = document.createElement('div');
  const headline = document.createElement('div')
  const author = document.createElement('div');
  const imgContainer = document.createElement('div');
  const img = document.createElement('img');
  const aName = document.createElement('span');
  
  //add class
  card.classList.add('card');
  headline.classList.add('headline');
  author.classList.add('author');
  imgContainer.classList.add('img-container');

  // console.log(data);

  //add content to elements
  headline.textContent = data['headline'];
  img.src = data['authorPhoto'];
  aName.textContent = data['authorName'];

  //appending
  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgContainer);
  author.appendChild(aName);
  imgContainer.appendChild(img);

  card.addEventListener('click', (e) => {
    console.log(headline.textContent);
  })

  return card
  
}

const cards = document.querySelector('.cards-container');