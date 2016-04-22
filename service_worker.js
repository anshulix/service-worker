var ver = 39;

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'assets/mobirise/css/mbr-additional.min.css',
'assets/mobirise/css/styles.min.css'	,
'assets/socicon/css/socicon.min.css',
'assets/animate.css/animate.min.css',
'index.html',
'offline.html'
                    ];

self.addEventListener('install', function (event) {
    // Perform install steps

    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {

            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});



self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                console.log('from cache');
                return response;
            }

            return fetch(event.request).then(function (response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                                       return response;
                              }
                              var responseToCache = response.clone();
                              caches.open(CACHE_NAME).then(function (cache) {
                                  console.log('putting in cache ');
                                  cache.put(event.request, responseToCache);

                              });
                              console.log(event.request + 'from network');
                              return response;
            }).catch(function () {
                console.log('internet nahi hai yarr ');
                 return caches.match('offline.html');
            })
        })
        );
})



self.addEventListener('activate', function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME).then(function (cache) {
            console.log('clearing cache');
            // var headers = new Headers();
            // headers.append('Accept', 'application/json');
            // var request = new Request('./manifest.json');
            fetch('manifest.json').then(function (response) {
              if (response.status !== 200) {
                  console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                  return;
              }

              // Examine the text in the response
              response.json().then(function (data) {
                var url_cache = data["urlChanged"];
                for (var i in url_cache) {
         cache.delete(url_cache[i]).then(function (response) {
            fetch(url_cache[i]).then(function (response) {
                console.log('Updating cache' );
                cache.put(url_cache[i], response);
            })
         })
             }
              });


            })


        })
    );
});




//first net and then put resourse found in cache


//self.addEventListener('fetch', function (event) {
//    event.respondWith(
//      fetch(event.request).then(function (response) {
//          if (!response || response.status !== 200 || response.type !== 'basic') {
//                    return response;
//          }
//          var responseToCache = response.clone();
//          caches.open(CACHE_NAME).then(function (cache) {
//              console.log('putting in cache ');
//              cache.put(event.request, responseToCache);

//          });
//          console.log(event.request + 'from network');
//          return response;
//      }).catch(function () {
//          console.log(event.request + 'from cache');
//          return caches.match(event.request);
//      })
//    );
//});
