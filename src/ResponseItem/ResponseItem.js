import React from 'react';
import Context from '../Context/Context';
import './ResponseItem.css';

export default class ResponseItem extends React.Component{

    static contextType=Context;

    render(){
        
        return(

            <div className='response-item-container'>
                {Object.keys(this.props.item).map((element,idx)=>{
                    return (
                        <div key={`ri-${idx}`} className='response-item-info-container'>
                            <div className='response-item-info'><h3>{element}:&nbsp;</h3></div>
                            <div className='response-item-info'>{this.props.item[element]}</div>
                        </div>
                    );
                })}

            </div>

        );

    }

}