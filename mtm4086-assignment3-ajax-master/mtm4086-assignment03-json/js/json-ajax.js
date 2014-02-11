function loadJSON(){
   var data_file = "data.json";
   var http_request = new XMLHttpRequest();
   try{
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
   }catch (e){
      // Internet Explorer Browsers
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            // Something went wrong
            alert("Your browser may not support AJAX, or refresh cause something went wrong");
            return false;
         }
      }
   }
   http_request.onreadystatechange  = function(){

      // readyState == 4 means the request was successful
      if (http_request.readyState == 4  ){
        // Javascript function JSON.parse to parse JSON data
        var jsonObj = JSON.parse(http_request.responseText);

        // My Entire JSON Object from data.json
        console.log(jsonObj);

        // Acessing a Specific Key of the object
        console.log('testing title key: ' + jsonObj[0].title);

        for (var key in jsonObj) {

            // Only return keys if there's anything there.
           if (jsonObj.hasOwnProperty(key)) {
              console.log('loop all title: ' + jsonObj[key].title);
              console.log('loop all caption: ' + jsonObj[key].caption);

              // the element to append everything to.
              var feedWrapper = document.getElementById('article-feed');

              // Article Heading and Link - Title is text, url is href
              var articleHeading = document.createElement('h1');
              var articleLink = document.createElement('a');
              articleLink.setAttribute('href', jsonObj[key].url);
              articleLink.innerHTML = jsonObj[key].title;
              articleHeading.appendChild(articleLink);

              // Article Image
              var articleImage = document.createElement('img');
              articleImage.setAttribute('src',jsonObj[key].imageUrl)

              // Appending html elements and values to my div article-feed
              feedWrapper.appendChild(articleImage);
              feedWrapper.appendChild(articleHeading);
              
           }

        } // End json loop

      }

   }
   http_request.open("GET", data_file, true);
   http_request.send();
}

//auto load loadJSON();