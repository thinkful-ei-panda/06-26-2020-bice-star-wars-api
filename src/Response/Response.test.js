import React from 'react';

import ReactDOM from 'react-dom';

import Response from './Response';

it('renders without crashing',()=>{

 const div=document.createElement('div');

 ReactDOM.render(<Response/>,div);

});