const API_KEY = "AIzaSyABCMotJsaZVpPDKaB03v72YRoWAkmiuvo";
const BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
const searchURL = `https://www.googleapis.com/books/v1/volumes?q=`;
// const API_URL = BASE_URL + "?q=Comic&key=" + API_KEY;
const form = document.getElementById("form");
const API_URL = `https://www.googleapis.com/books/v1/volumes?&maxResults=15&key=${API_KEY}&startIndex=0`
const Comic_URL = `https://www.googleapis.com/books/v1/volumes?q=Comic&maxResults=15&key=${API_KEY}&startIndex=0`
const books = document.getElementById("books");
const search = document.getElementById("search");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");
// https://www.googleapis.com/books/v1/volumes?q=Comic&key=${API_KEY}

var startIndex = 0 ;
var maxResults = 15 ;
var currentPage =1;
var totalPages ;
var searchTerm;
// getComic(Comic_URL);
 loadPage();
function loadPage() {
  const oldurl = localStorage.getItem('url');
  if(oldurl){
    getComic(oldurl);
  }
 else{
    getComic(Comic_URL);
  }
}
// localStorage.getItem("url")?getComic(lastUrl):getComic(Comic_URL);
// getComic(localStorage.getItem(lastUrl)? lastUrl : Comic_URL)
function getComic(url) {
    lastUrl = url;
    localStorage.setItem("url",lastUrl);
    fetch(url).then(res => res.json()).then(data => {


        totalPages=data.totalItems;
        console.log(data);
        if (data.items.length !== 0) {
            showBooks(data.items);

                if (currentPage <= 1) {
                    prev.classList.add('disabled');
                    next.classList.remove('disabled')
                }
                else if (currentPage >= 1 && currentPage <= totalPages) {
                    prev.classList.remove('disabled')
                    next.classList.remove('disabled')
                }
        }
        else {
            books.innerHTML = `<h1 class="no-results">No Results Found</h1>`
        }

    })
}





function showBooks(data) {

    main.innerHTML = "";
    data.forEach(books => {
        const {volumeInfo,imageLinks,selfLink} = books;
        const booksel = document.createElement('div');
        booksel.classList.add('books');
         booksel.innerHTML = 
        
        `
        <div class="left-card"><img src=${volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "assets/img/cover.jpg"}></div>
        <div class="right-card">${volumeInfo.title.slice(0,30)} <br/><h5>Rating: ${volumeInfo.averageRating ? volumeInfo.averageRating+"/5" : 'Not Rated'}</h5>  <a href ='card.html?id=${books.id}' dataset-id=${books.id} class="btn">View More</a>   </div>
         
       
      `

        main.appendChild(booksel);
    });


}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
  
  
    console.log(searchTerm)
    if (searchTerm) {
        currentPage=1;
         current.innerText = 1;
        startIndex=0;
        getComic(searchURL + searchTerm  + '&key=AIzaSyABCMotJsaZVpPDKaB03v72YRoWAkmiuvo&searchIndex=0');
    }
})


next.addEventListener('click', () => {
    if(startIndex < totalPages){
  startIndex = startIndex + maxResults;
  currentPage +=1;
   current.innerText = currentPage;
}
pageCall(startIndex);


})

prev.addEventListener('click', () => {
    if (startIndex >= 0 && currentPage>1) {
         startIndex = startIndex - maxResults;
         currentPage -=1;
          current.innerText = currentPage;
    }
    pageCall(startIndex);


})
// pageCall();
function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    // console.log(queryParams)
     let key = queryParams[queryParams.length - 1].split('=');
    // console.log(key)
    if (key[0] != 'startIndex') {
        let url = lastUrl + '&startIndex=' + page;
         getComic(url);
    }
    else {
        key[1] = page.toString();
        console.log(key[1])
        let a = key.join('=');
        console.log(a)
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b;
        console.log(url)
         getComic(url);
    }
}

