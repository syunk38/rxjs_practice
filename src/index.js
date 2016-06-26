let Rx = require ('rx');
let $ = require('jquery');
$(() => {
    let btn = document.querySelector('#btn');
    let btnStream = Rx.Observable.fromEvent(btn, 'click');

    let requestStream = Rx.Observable.returnValue('https://api.github.com/users');

    requestStream.subscribe(requestUrl => {
      let responseStream = Rx.Observable.create(observer => {
        $.getJSON(requestUrl)
          .done(response => { observer.onNext(response); })
          .fail((jqXHR, status, error) => { observer.onError(error); })
          .always(() => { observer.onCompleted(); });
      });
    });

    let responseMetaStream = requestStream
      .map(requestUrl =>{
        return Rx.Observable.fromPromise($.getJSON(requestUrl));
      });

    responseStream.subscribe((response => {
      console.log(response);
    }));

    btnStream.subscribe(
      x => {
        $('ul').append(`<li>Next: ${x.x}</li>`);
      },
      err => {
        console.log('Error: ' + err);
      },
      () => {
        console.log('Completed');
      }
    );
});
