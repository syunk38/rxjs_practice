module.exports = (Rx, $) => {
  const btn = document.querySelector('#btn');
  const btnStream = Rx.Observable.fromEvent(btn, 'click');

  btnStream.subscribe(
    x => {
      $('ul').append(`<li>Next: ${x.x}</li>`);
    },
    err => {
      console.log('Error: ' + err);
    },
    () => {
      console.log('Compconsted');
    }
  );
}
