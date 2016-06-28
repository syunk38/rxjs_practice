const Rx = require ('rx');
const $ = require('jquery');

$(() => {
  const refresh = document.querySelector('#btn');
  const refreshBtnStream = Rx.Observable.fromEvent(refresh, 'click');

  const requestStream = refreshBtnStream
    .startWith('start click')
    .do(x => {console.log(x)})
    .map(event => { return `https://api.github.com/users?since=${event.x + event.y}`})


  const responseStream = requestStream
    .flatMap(requestUrl =>{
      return Rx.Observable
        .fromPromise($.getJSON(requestUrl))
        .flatMap(responses => {
          return Rx.Observable.from(responses);
        })
    });

  responseStream.subscribe(data => {
    $('ul').append(`<li><img src="${data.avatar_url}" height="150" width="150"/></li>`);
    $('ul').append(`<li>${data.login}</li>`);
  });
});
