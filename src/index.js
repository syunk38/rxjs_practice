const Rx = require ('rx');
const $ = require('jquery');

$(() => {
  const refresh = document.querySelector('#btn');
  const refreshBtnStream = Rx.Observable.fromEvent(refresh, 'click');

  const requestStream = refreshBtnStream
    .startWith('start click')
    .map(event => { return `https://api.github.com/users?since=${Math.floor(Math.random()*500)}`});

  const responseStream = requestStream
    .flatMap(requestUrl =>{
      const beforeSend = xhr => {
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('username:password'));
      }
      return Rx.Observable
        .fromPromise($.ajax({ url:requestUrl, beforeSend:beforeSend }));
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
    .flatMap( x => {
      return Rx.Observable.fromEventPattern(
        h => {
          $('.close1').bind('click', h);
        },
        h => {
          $('.close1').unbind('click', h);
        });
      });

  close1Stream.subscribe( x => {
    console.log(x);
    console.log($('.close1'));
  });

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
