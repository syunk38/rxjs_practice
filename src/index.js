const Rx = require ('rx');
const $ = require('jquery');

$(() => {
  const refresh = document.querySelector('#btn');
  const refreshBtnStream = Rx.Observable.fromEvent(refresh, 'click');

  const requestStream = refreshBtnStream
    .startWith('start click')
    .map(event => { return `https://api.github.com/users?since=${event.x + event.y}`})



  const responseStream = requestStream
    .flatMap(requestUrl =>{
      return Rx.Observable
        .fromPromise($.getJSON(requestUrl))
    });

  const suggestion1Stream = responseStream
    .map(listUsers => {
      return listUsers[Math.floor(Math.random() * listUsers.length)]
    })
    .merge(refreshBtnStream.map(() => { return null }));

  const suggestion2Stream = responseStream
    .map(listUsers => {
      return listUsers[Math.floor(Math.random() * listUsers.length)]
    })
    .merge(refreshBtnStream.map(() => { return null }));

  const suggestion3Stream = responseStream
    .map(listUsers => {
      return listUsers[Math.floor(Math.random() * listUsers.length)]
    })
    .merge(refreshBtnStream.map(() => { return null }));

  suggestion1Stream.subscribe(suggestion => {
    if (suggestion === null){
      $('ul li:first').remove();
    }
    else{
      const $li = $('<li></li>')
      $li.append(`<img src="${suggestion.avatar_url}" height="150" width="150"/>`);
      $li.append(`<div>${suggestion.login}</div>`);
      $li.append(`<a href="javascript:void(0)" class="click1">x</a>`);
      $('ul').append($li);
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
      $li.append(`<a href="javascript:void(0)" class="click2">x</a>`);
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
      $li.append(`<a href="javascript:void(0)" class="click3">x</a>`);
      $('ul').append($li);
    }
  });
});
