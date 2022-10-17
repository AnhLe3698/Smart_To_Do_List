const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://imdb8.p.rapidapi.com/auto-complete?q=harry%20potter",
  "method": "GET",
  "headers": {
      "X-RapidAPI-Key": "5c80e7d1e9msh4513bc486b71eb9p148650jsn1871c62ac280",
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
