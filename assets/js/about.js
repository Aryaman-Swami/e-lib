var aarr = window.location.href.split("=");
//get last value
var book_id = aarr[aarr.length - 1];
const bookdetailid = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyABCMotJsaZVpPDKaB03v72YRoWAkmiuvo";

// fetching book details
fetch(`${bookdetailid}/${book_id}`)
    .then((res) => res.json())
    .then((data) => {
        setupbookInfo(data);
    });

const setupbookInfo = (data) => {
    const bookName = document.querySelector("#book-name");
    const authors = document.querySelector("#authors");
    const genres = document.querySelector(".genres");
    const desc = document.querySelector(".desc");
    const title = document.querySelector("title");
    const subtitle = document.querySelector(".subtitle");
    const img = document.querySelector(".image");
    const lang = document.querySelector(".lang");
    const publisher = document.querySelector(".publisher");
    const pdate = document.querySelector(".pdate");
    const rating = document.querySelector(".rating");
    const mature = document.querySelector(".mature");

    rating.innerHTML = data.volumeInfo.averageRating
        ? data.volumeInfo.averageRating + "/5"
        : "Not Rated";

    title.innerHTML = bookName.innerHTML = data.volumeInfo.title;
    data.volumeInfo.categories ?( genres.innerHTML = `${data.volumeInfo.categories.map((item) => {
        return item + ",";
    })} `):"";
    lang.innerHTML = data.volumeInfo.language;
    publisher.innerHTML = data.volumeInfo.publisher;
    pdate.innerHTML = data.volumeInfo.publishedDate;
    mature.innerHTML = data.volumeInfo.maturityRating;

    img.src = data.volumeInfo.imageLinks
        ? data.volumeInfo.imageLinks.thumbnail
        : "assets/img/cover.jpg";

    desc.innerHTML = data.volumeInfo.description;

    subtitle.innerHTML = data.volumeInfo.subtitle
        ? data.volumeInfo.subtitle
        : "";
    authors.innerHTML = `${data.volumeInfo.authors.map((item) => {
        return item;
    })} `;

    console.log(data.volumeInfo.categories[0]);
    fetch(`${bookdetailid}?q=${data.volumeInfo.categories ? data.volumeInfo.categories[0] : data.volumeInfo.title}&maxResults=3&key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            recommendbooks(data);
        });

    function recommendbooks(data) {
        const recbooks = document.querySelector("#recbooks");
        recbooks.innerHTML = "";
       console.log(data)
        data.items.forEach((books) => {
            console.log(books);
            const { volumeInfo, imageLinks } = books;

            const recimage = document.createElement("div");
            recimage.classList.add("rec_image");
            recimage.innerHTML = `
          <img id="left-image" src=${volumeInfo.imageLinks.thumbnail
                    ? volumeInfo.imageLinks.thumbnail
                    : "assets/img/cover.jpg"
                }>
            <br>
            <span class="bookname">${volumeInfo.title.slice(0, 30)} </span>
            <br>
            <span class="authorname">${volumeInfo.averageRating
                    ? volumeInfo.averageRating + "/5"
                    : "Not Rated"
                }</span>
       
      `

            recbooks.appendChild(recimage);
        });
    }

   
};



