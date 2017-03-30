

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#validation").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    if ($('#valid').val() == 5) {
      setGifLoadedStatus(false);
      $("#error").text("");
      $("#feedback").text("Loading...");


      // get the user's input text from the DOM
      var searchQuery = $('#tag').val(); // TODO should be e.g. "dance"
      console.log(searchQuery);
      console.log("test searchQuery value above")

      // configure a few parameters to attach to our request
      var params = {
          root: "http://api.giphy.com/v1/gifs/search",
          api_key: "dc6zaTOxFJmzC",
          tag : "jackson+5+" + searchQuery // TODO should be e.g. "jackson 5 dance"
      };


      // make an ajax request for a random GIF
      $.ajax({
          url: params.root + "?q=" + params.tag + "&api_key=" + params.api_key + "&limit=25", // TODO where should this request be sent?
          data: params, // attach those extra parameters onto the request
          success: function(response) {
              // if the response comes back successfully, the code in here will execute.


              // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
              console.log("we received a response!");
              console.log(response);
              var random_url_id = response.data[Math.floor(Math.random()*response.data.length)].id;

              // TODO
              // 1. set the source attribute of our image to the image_url of the GIF
              //$("#gif").attr("src", response.data[0].url + "/giphy.gif");
              //$("#gif").attr("src", "https://www.w3schools.com/css/trolltunga.jpg");
              //$("#gif").attr("src", "https://media.giphy.com/media/gw3IWyGkC0rsazTi/giphy.gif");
              $("#gif").attr("src", "https://media.giphy.com/media/" + random_url_id + "/giphy.gif")
              // 2. hide the feedback message and display the image

              setGifLoadedStatus(true)
          },
          error: function() {
              // if something went wrong, the code in here will execute instead of the success function

              // give the user an error message
              $("#feedback").text("Sorry, could not load GIF. Try again!");
              setGifLoadedStatus(false);
          }
      });
    } else {
      console.log("didn't complete captcha")
      setGifLoadedStatus(false)
      $("#error").text("Didn't complete captcha.")
      $("#feedback").text("");

    }


    // TODO
    // give the user a "Loading..." message while they wait

}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
    $("#error").attr("hidden", isCurrentlyLoaded)
}
