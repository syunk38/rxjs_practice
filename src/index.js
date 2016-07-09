import Rx from 'rx'
import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import UserList from './views/userList.jsx'

$(() => {
  const refresh = document.querySelector('#btn');
  const refreshBtnStream = Rx.Observable.fromEvent(refresh, 'click');

  const requestStream = refreshBtnStream
    .startWith('start click')
    .map(event => { return `https://api.github.com/users?since=${Math.floor(Math.random()*500)}`});

  const responseStream = requestStream
    .flatMap(requestUrl =>{
      const beforeSend = xhr => {
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(''));
      }
      return Rx.Observable
        .fromPromise($.ajax({ url:requestUrl, beforeSend:beforeSend }));
    });

  const suggestionStream = responseStream
    .map(listUsers => {
      return listUsers
    })
    .merge(refreshBtnStream.map(() => { return null }))
    .startWith(null)

  const close1Stream = suggestionStream
    .flatMap(x => {
      return Rx.Observable.fromEventPattern(h => {
        $('.close1').bind('click, h');
      })
    })

  close1Stream.subscribe( x => {
    console.log(x);
  })

  suggestionStream.subscribe(suggestions => {
    console.log(suggestions);
    if (suggestions === null){
      $('ul').remove();
    }
    else{
      ReactDOM.render(<UserList suggestions={suggestions} />, document.querySelector('#userBox'))

    }
  });
});
