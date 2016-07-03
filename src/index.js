const Rx = require ('rx');
const $ = require('jquery');

$(() => {
  const refresh = document.querySelector('#btn');
  const refreshBtnStream = Rx.Observable.fromEvent(refresh, 'click');

  const requestStream = refreshBtnStream
    .startWith('start click')
    .map(event => { return `https://api.github.com/users?since=${Math.floor(Math.random()*500)}`})

  const responseStream = requestStream
    .flatMap(requestUrl =>{
      return Rx.Observable
        .fromPromise($.getJSON(requestUrl))
    });

  const suggestion1Stream = responseStream
    .map(listUsers => {
      return listUsers[Math.floor(Math.random() * listUsers.length)]
    })
    .merge(refreshBtnStream.map(() => { return null }))
    .startWith(null);

  const suggestion2Stream = responseStream
    .map(listUsers => {
      return listUsers[Math.floor(Math.random() * listUsers.length)]
    })
    .merge(refreshBtnStream.map(() => { return null }))
    .startWith(null);

  const suggestion3Stream = responseStream
    .map(listUsers => {
      return listUsers[Math.floor(Math.random() * listUsers.length)]
    })
    .merge(refreshBtnStream.map(() => { return null }))
    .startWith(null);

  const close1Stream = suggestion1Stream
    .map(suggestion => { return suggestion })
    .do(x => { console.log(x) });

  // const close1Button = document.querySelector('.close1');
  // const close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');
  suggestion1Stream.subscribe(suggestion => {
    if (suggestion === null){
      $('ul li:first').remove();
    }
    else{
      const $li = $('<li></li>')
      $li.append(`<img src="${suggestion.avatar_url}" height="150" width="150"/>`);
      $li.append(`<div>${suggestion.login}</div>`);
      $li.append(`<a href="javascript:void(0)" class="close1">x</a>`);
      $('ul').append($li);

      const close1Button = document.querySelector('.close1');
      const close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');
      close1ClickStream.subscribe( event => {
        console.log(event);
      });
    }
  });

  suggestion2Stream.subscribe(suggestion => {
    if (suggestion === null){
      $('ul li:nth-child(2)').remove();
    }
    else{
      const $li = $('<li></li>')
      $li.append(`<img src="${suggestion.avatar_url}" height="150" width="150"/>`);
      $li.append(`<div>${suggestion.login}</div>`);
      $li.append(`<a href="javascript:void(0)" class="close2">x</a>`);
      $('ul').append($li);
    }
  });

  suggestion3Stream.subscribe(suggestion => {
    if (suggestion === null){
      $('ul li:last').remove();
    }
    else{
      const $li = $('<li></li>')
      $li.append(`<img src="${suggestion.avatar_url}" height="150" width="150"/>`);
      $li.append(`<div>${suggestion.login}</div>`);
      $li.append(`<a href="javascript:void(0)" class="close3">x</a>`);
      $('ul').append($li);
    }
  });
});
