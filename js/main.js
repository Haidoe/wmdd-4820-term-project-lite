// alert("connected");
// ****************************************************************************
// ****************************************************************************
//
//          Final Exam
//
//  Instructions:
//      Make sure to always provide meaningful feedback to the user
//          (not just the name or number, talk to the user as if they are
//           standing in front of you)
//
//      Preload the Movie Object with Data from TMDB (1 page of trending movies)
//
//      Section 1 should allow the user to add as many movies and showtimes as they want
//
//      Section 2 should allow the user to scroll through movies and showtimes
//              let the user click the Pick Movie button to populate Section 3
//
//      Section 3 should allow the user to buy a ticket for a movie/showtime
//          Section 3 requires:
//              you to get the movie from the user
//              you to get the showtime from the user
//              you to get the number of tickets from the user
//              use the movie and showtime to get the ticket price
//                  (remember that diff showtimes may have diff costs)
//                  (also, for this exercise, there are no discount seats)
//
//              calculate the total price as:
// ****************************************************************************
//  ===============> (ticket price * number of tickets * 1.15 (to add tax))
// ****************************************************************************
//              Display this amount back to the user in a meaningful way
//
// ****************************************************************************

// ****************************************************************************
// ****************************************************************************
// ****************************************************************************

// ****************************************************************************
//      Start of Program
// ****************************************************************************
// ****************************************************************************
//          Variable Declarations
// ****************************************************************************
// ****************************************************************************
//  Full-Scope Variables
let movieObjectsArray = [];
let currentIndex = 0;
let moviePrice = 0;
const apiKey = "8d97d616c053720f58594b66af247d0c";
const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

// ****************************************************************************
//  Pull Movies from API and Load the Movie Array
//
//  Show times are base on rating:
//      movies with ratings of at least 4 will be shown at 11am
//      movies with ratings of at least 6 will be shown at 11am and 2pm
//      movies with ratings of at least 7 will be shown at 11am, 2pm, and 5pm
//      movies with ratings above 8 will be shown at 11am, 2pm, 5pm, and 8pm
//
//  Prices:
//      11am - $4.99
//      2pm - $6.99
//      5pm - $8.99
//      8pm - $11.99
//
//  Grades:
//      option 1: Load movie and times via a switch statement with fall-through - max 100% for section
//      option 2: Load movie and times via a switch statement - max 90% for section
//      option 3: Load movie and times via an if-statement - max 80% for section
//
//      For example:
//          if you get 8/10 on the section and you implemented option 1 you get 8 marks
//          if you get 8/10 on the section and you implemented option 2 you get 7 marks
//          if you get 8/10 on the section and you implemented option 3 you get 6.5 marks
//
//      Sample Object:
//          const movieObj = {
//              movieName: title,
//              showtime: showtime,
//              price: price
//          }
//
// ****************************************************************************
// Populate the Movie Table - 10 marks
getMovies(url);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  const tmdbMovies = data.results;

  const filteredTmdbMovies = tmdbMovies.filter((movie) => {
    return movie.vote_average >= 4;
  });

  //Adding schedules
  for (const movie of filteredTmdbMovies) {
    const rating = Math.floor(movie.vote_average);

    // Switch Fall-through
    switch (true) {
      case rating >= 8: {
        movieObjectsArray.push({
          title: movie.title,
          showtime: "8pm",
          price: 11.99,
        });
      }

      case rating >= 7: {
        movieObjectsArray.push({
          title: movie.title,
          showtime: "5pm",
          price: 8.99,
        });
      }

      case rating >= 6: {
        movieObjectsArray.push({
          title: movie.title,
          showtime: "2pm",
          price: 6.99,
        });
      }

      case rating >= 4: {
        movieObjectsArray.push({
          title: movie.title,
          showtime: "11am",
          price: 4.99,
        });
      }
    }
  }

  console.log("Movies with Schedules", movieObjectsArray);
}

// ****************************************************************************
// ****************************************************************************
//  Function Variables

// ****************************************************************************
// ****************************************************************************
//      Event Listeners
// ****************************************************************************
// ****************************************************************************
//  Load Movie Array - 10 marks
addMovie.addEventListener("click", () => {
  let title = c1Movie.value;
  let showtime = c1Time.value;
  let price = c1Price.value;

  if (title.length === 0) {
    c1Output.innerHTML = "TITLE IS REQUIRED!";
    return;
  }

  if (showtime.length === 0) {
    c1Output.innerHTML = "SHOWTIME IS REQUIRED!";
    return;
  }

  if (price.length === 0) {
    c1Output.innerHTML = "PRICE IS REQUIRED!";
    return;
  }

  const customMovie = {
    title: title,
    showtime: showtime,
    price: Number(price),
  };

  movieObjectsArray.push(customMovie);

  c1Output.innerHTML = `Movie added. Total of ${movieObjectsArray.length} movies.`;

  console.log("Updated Movie List", movieObjectsArray);

  //Reset
  c1Movie.value = "";
  c1Time.value = "";
  c1Price.value = "";
});

// ****************************************************************************
// ****************************************************************************
//  View the Available Movies - 5 marks
load.addEventListener("click", () => {
  //Enable the disabled input buttons

  // prev
  prev.disabled = false;
  //next
  next.disabled = false;
  //pick movie
  pickMovie.disabled = false;

  const movie = movieObjectsArray[0];

  console.log(movie);
  //   c2Movie
  c2Movie.value = movie.title;
  //   c2Time
  c2Time.value = movie.showtime;
  //   c2Price
  c2Price.value = movie.price;
});

// ****************************************************************************
// ****************************************************************************
//  Navigate through the Showtimes - 5 marks each (so 15 marks for this section)
next.addEventListener("click", () => {
  currentIndex++;
  //   currentIndex = currentIndex + 1;

  if (currentIndex >= movieObjectsArray.length) {
    currentIndex = 0;
  }

  const movie = movieObjectsArray[currentIndex];

  // currentIndex
  console.log("NEXT", currentIndex);

  //   c2Movie
  c2Movie.value = movie.title;
  //   c2Time
  c2Time.value = movie.showtime;
  //   c2Price
  c2Price.value = movie.price;
});

prev.addEventListener("click", () => {
  console.log("PREV");

  currentIndex--;
  //   currentIndex = currentIndex - 1;

  if (currentIndex < 0) {
    currentIndex = movieObjectsArray.length - 1;
  }

  const movie = movieObjectsArray[currentIndex];

  // currentIndex
  console.log("NEXT", currentIndex);

  //   c2Movie
  c2Movie.value = movie.title;
  //   c2Time
  c2Time.value = movie.showtime;
  //   c2Price
  c2Price.value = movie.price;
});

pickMovie.addEventListener("click", () => {
  console.log("PICK");
  const movie = movieObjectsArray[currentIndex];

  c3Movie.value = movie.title;

  c3Time.value = movie.showtime;

  moviePrice = movie.price;
});

// ****************************************************************************
// ****************************************************************************
//  Calculate Ticket Price - 10 marks
calcTotal.addEventListener("click", () => {});
