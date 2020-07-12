import React from 'react';

import ReactDOM from 'react-dom';

import ResponseItem from './ResponseItem';

it('renders without crashing',()=>{

 const div=document.createElement('div');

 ReactDOM.render(<ResponseItem/>,div);

});