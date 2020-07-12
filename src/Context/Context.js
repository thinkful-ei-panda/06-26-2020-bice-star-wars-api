import React from 'react'

const Context=React.createContext({

    // Why is none of this needed?

    //response was needed or it throws this error during test

    // renders without crashing

    // TypeError: Cannot read property 'map' of undefined

    //   16 | 
    //   17 |             <div className={`response-message-container-${responseMessageClass}`} id='response-message-container'>
    // > 18 |                 {this.context.response.map((item,idx)=>{
    //      |                                        ^
    //   19 |                     return <ResponseItem key={`item-${idx}`} item={item}/>
    //   20 |                 })}
    //   21 |             </div>

    response:[],
    option:{},
    query:{},
    loading:false,
    init:true,
    error:null,
    updateResponse:()=>{},
    updateSelectState:()=>{},
    updateQueryState:()=>{},
    updateInit:()=>{},
    
    // warning:Cannot update during an existing state transition (such as within `render`)
    //updateSelectErrorState:()=>{},

    // warning:Cannot update during an existing state transition (such as within `render`)
    //updateQueryErrorState:()=>{},
})

export default Context;