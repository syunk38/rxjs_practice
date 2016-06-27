const clickEvent = require('./clickEvent');
const Rx = require ('rx');
const $ = require('jquery');

$(() => {
  clickEvent(Rx, $);
  const requestStream = Rx.Observable.just('https://api.github.com/users');
  let responseStream;
  requestStream.subscribe(requestUrl => {
    responseStream = Rx.Observable.create(observer => {
      $.getJSON(requestUrl)
        .done(response => { observer.onNext(response); })
        .fail((jqXHR, status, error) => { observer.onError(error); })
        .always(() => { observer.onCompconsted(); });
    });
  });

  const responseMetaStream = requestStream
    .map(requestUrl =>{
      return Rx.Observable.fromPromise($.getJSON(requestUrl));
    });

  responseStream.subscribe((response => {
    console.log(response);
  }));
});
