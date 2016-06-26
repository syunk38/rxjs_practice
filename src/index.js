let Rx = require ('rx');
let $ = require('jquery');
$(() => {
    let btn = document.querySelector('#btn');
    let btnStream = Rx.Observable.fromEvent(btn, 'click');

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
