//let keyWord = 'star wars';
//let page = 1;

//let keyWord = document.getElementById("keyWord").value;
//const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

//const api_url = 'http://www.omdbapi.com/?t=star+wars&apikey=a13c827d';
//const api_url = 'http://www.omdbapi.com/?s='+ encodeURI(keyWord)+'&page='+ page +'&apikey=a13c827d';
//const api_url = 'http://www.omdbapi.com/?y=2018&apikey=a13c827d';

let searchKeyWord = document.getElementById("search");

async function getMovies(api_url) {
    
    try{
        const response = await fetch(api_url);
        if(!response.ok) throw new Error("No hay ningún título relacionado");
        const data = await response.json();
        return data;
    }catch (err){
        return err;
      }
}

const removeCards = () => {
    let h2 = document.getElementById("cards-title");
    h2.style.display = "none";
    let container = document.getElementById("cards-container");
    let eraseLastChild = container.lastChild;
    container.removeChild(eraseLastChild);
}

const cardsMovies = () => {
    
    removeCards();
    let h2 = document.getElementById("cards-title");
    h2.style.display = "block";
    let container = document.getElementById("cards-container");
    container.style.paddingBottom = "70px";
    
    let keyWord = document.getElementById("keyWord").value;
    let page = 1;
    let api_url = 'http://www.omdbapi.com/?s='+ encodeURI(keyWord)+'&page='+ page +'&apikey=a13c827d';
    
    let div = document.createElement("div");
    
    div.setAttribute("class","movie-cards");
    container.appendChild(div);

    console.log(keyWord);

    getMovies(api_url).then(data=>{
        console.log(data);
        console.log("No. de pelis: " + data.totalResults);
        
        let totalMoviesResult = data.totalResults;

        const createModal = (idCard) =>{
            api_url = 'http://www.omdbapi.com/?i='+idCard+'&apikey=a13c827d';
            getMovies(api_url).then(data=>{
                console.log(data);
                document.getElementById("movieTitle").innerHTML = data.Title;
                
                if(data.Poster == "N/A"){
                    document.getElementById("moviePoster").setAttribute("src","images/NA.png");
                }else{
                    document.getElementById("moviePoster").setAttribute("src",data.Poster);
                }
                                
                document.getElementById("movieInfo").innerHTML = 
                "<span>Director:  </span>" + data.Director + "</br>" + 
                "<span>Year:  </span>"+ data.Year + "</br>" +
                "<span>Genre:  </span>"+ data.Genre + "</br>" +
                "<span>Type:  </span>"+ data.Type + "</br>" +
                "<span>imdbRating:  </span>" + data.imdbRating + "</br>" +
                "<span>Actors:  </span>" + data.Actors + "</br>" +
                "<span>Writer:  </span>" + data.Writer + "</br>" +
                "<span>Rated:  </span>" + data.Rated + "</br>" +
                "<span>Awards:  </span>" + data.Awards + "</br>" +
                "<span>Runtime:  </span>" + data.Runtime + "</br>" +
                "<span>Language:  </span>" + data.Language + "</br>" +
                "<span>Country:  </span>" + data.Country + "</br>" +
                "<span>Production:  </span>" + data.Production + "</br>" +
                "<span>BoxOffice:  </span>"  + data.Boxoffice + "</br>" +
                "<span>Plot:  </span>" + data.Plot + "</br>";                                  
            }).catch(err=>console.log( err ));
        }

        const clickCard = () => {
            const cards = document.querySelectorAll(".card")
            for (const card of cards) {
                card.addEventListener('click', function(event) {
                modal.style.display = "block";
                let idCard = card.id;
                createModal(idCard);
                console.log(idCard);
                })
            }
        }
        
        const showMovies = (data) => { 
            var movies = Object.values(data.Search);
            
            movies.forEach(element => {
                //console.log(element.Poster)
                let figure = document.createElement("figure");
                let img = document.createElement("img");
                let figcaption = document.createElement("figcaption");

                img.setAttribute("alt",element.Title);
                img.setAttribute("id",element.imdbID);
                img.setAttribute("class", "card");
                figcaption.innerHTML = element.Title + "  " + "(" + element.Year + ")";

                if(element.Poster == "N/A"){
                    img.setAttribute("src","images/NA.png");
                }else{
                    img.setAttribute("src",element.Poster);
                }

                div.appendChild(figure);
                figure.appendChild(img);
                figure.appendChild(figcaption);
            })

            clickCard();
        }
        
        if(totalMoviesResult > 10) {
            let pages = parseInt(totalMoviesResult)/10;
            let res = parseInt(totalMoviesResult)%10;
            console.log(pages + " - " + res);
            for(let i=1; i <= 6; i++){
                api_url = 'http://www.omdbapi.com/?s='+ encodeURI(keyWord)+'&page='+ i +'&apikey=a13c827d';
                getMovies(api_url).then(data=>{
                    showMovies(data);
                }).catch(err=>console.log( err ));
            }/*
            if(res > 0){
                for(let i=1; i <= 6; i++){
                    api_url = 'http://www.omdbapi.com/?s='+ encodeURI(keyWord)+'&page='+ i +'&apikey=a13c827d';
                    getMovies(api_url).then(data=>{
                        showMovies(data);
                    }).catch(err=>console.log( err ));
                }
            }else{
                getMovies(api_url).then(data=>{
                    showMovies(data);
                }).catch(err=>console.log( err ));
            }*/  
        }else{
            getMovies(api_url).then(data=>{
                showMovies(data);
            }).catch(err=>console.log( err ));
        } 
         
    }).catch(err=>console.log( err ));
}

searchKeyWord.addEventListener("click", cardsMovies);

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


  /*
    let prueba = document.getElementById("cards-title");
    prueba.addEventListener("click", f => {
        modal.style.display = "block";  
    });*/

    /*
    */