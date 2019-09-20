'use strict';
//implementacja komponentow 
// global = > reactDom renderuje aplikacje w elemencie o id app
//plik wejsciowy do webpacka
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('app'));