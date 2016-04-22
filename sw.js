if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('https://github.com/anshulix/service-worker/blob/master/service_worker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);

}).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
    //Console.log('hello');
});

}
