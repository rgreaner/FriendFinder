// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friend-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the friend)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a friend table or not.
    // It will do this by sending out the value "true" have a friend
    // req.body is available since we're using the body-parser middleware
    var comparison = [];
    var addFriend = (req.body);
    console.log(addFriend);
    for (i = 0; i < friendData.length; i++) {
      var diff = 0
      //console.log("friend array scores " + friendData[i].scores.length);
      for (j = 0; j < friendData[i].scores.length; j++) {
        diff += Math.abs(friendData[i].scores[j] - addFriend.scores[j]);
        console.log(diff);
        comparison.push(diff);
     
      }
      
      var minValue=Math.min.apply(null,comparison);
      console.log(minValue);

    }
    
    friendData.push(req.body);
    res.json(true);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the friend while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function () {
  //   // Empty out the arrays of data
  //   friendData = [];
  //   console.log(friendData);
  // });
};