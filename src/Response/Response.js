import React from 'react';
import Context from '../Context/Context';
import ResponseItem from '../ResponseItem/ResponseItem';
import './Response.css';

export default class Response extends React.Component{

    static contextType=Context;

    render(){
        
        let responseMessageClass='hide';
        if(this.context.init!==true)responseMessageClass='show';

        return (

            <div className={`response-message-container-${responseMessageClass}`} id='response-message-container'>
                {this.context.response.map((item,idx)=>{
                    return <ResponseItem key={`item-${idx}`} item={item}/>
                })}
            </div>
        
        )
    }

}