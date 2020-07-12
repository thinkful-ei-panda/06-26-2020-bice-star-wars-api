import React from 'react';
import {CONFIG} from '../config';
import Context from '../Context/Context';
import ValidationError from '../ValidationError/ValidationError'

export default class SearchForm extends React.Component{
    
    validateEmptyForm(){
        if(this.context.option.touched===false&&this.context.query.touched===false) return 'true';
    }

    selectError=false;
    
    validateSelect(){
        if(this.context.option.touched===true){
            const select=this.context.option.value;
            const optionsList=['Films','People','Planets','Species','Starships','Vehicles',];
            const optionMatch=optionsList.filter(item=>item===select);
            if(optionMatch.length<1){
                this.selectError=true;
                return ' is required';
            }
            this.selectError=false;
        }
    }
    
    queryError=false;
    
    validateQuery(){
        if(this.context.query.touched===true){
            const query=this.context.query.value.trim();
            if(query.length===0)this.queryError=false;
            else if(query.length < 2){
                this.queryError=true;
                return ' must be at least 2 characters long';
            }
            this.queryError=false;
        }
    }

    static contextType=Context;

    formSubmit(e){
        
        e.preventDefault();

        const form=new FormData(e.target);

        //Catch for invalid select option since it seems to return a 200 no matter what.
        if(form.get('form-select')==='Choose...')return false;
        
        const formValuesArray={
            option:form.get('form-select'),
            query:form.get('form-search-input')
        };
        
        let key=`API_ENDPOINT_${formValuesArray.option.toString().toUpperCase()}`;
        const url=Object.keys(CONFIG).find(item=>item===key);
        
        fetch(`${CONFIG[url]}?search=${formValuesArray.query}`,{
            method:'GET',
		})

        .then(res=>{
            if(!res.ok) throw new Error(res.status);
            return res.json();
        })
    
        .then(data=>{
            this.context.updateResponse(data.results);
            this.context.updateInit(false);
        })
    
        .catch(error=>this.setState({error}));

    }

	render(){
        
        const queryError=this.validateQuery();
        const selectError=this.validateSelect();
        
        let selectErrorMsg;
        if(this.selectError!==true)selectErrorMsg='error-hide';
        else selectErrorMsg='msg';

        let queryErrorMsg;
        if(this.queryError!==true)queryErrorMsg='error-hide';
        else queryErrorMsg='msg';

        return(

            <>

                <div id='form-container' aria-label='Search form container'>

                    <form id='form' name='form' action='#'  aria-label='Star Wars search form' onSubmit={e=>this.formSubmit(e)}>
                                    
                        <legend aria-label='Search form'>Search Form</legend>

                        <div className='search-form-element-container' aria-label='Search form select container'>
                            <label className='form-label' htmlFor='form-select' aria-label='Search form select options'>Search form select options</label>
                            <select name='form-select' id='form-select' aria-label='Search form select label' onChange={e=>this.context.updateSelectState(e.target.value)}>
                                <option className='form-select-option' name='form-select-option-default' id='form-select-option-default' aria-label='Search form select option default'>Choose...</option>
                                <option className='form-select-option' name='form-select-option-films' id='form-select-option-films' aria-label='Search form select option Films'>Films</option>
                                <option className='form-select-option' name='form-select-option-default-people' id='form-select-option-default-people' aria-label='Search form select option People'>People</option>
                                <option className='form-select-option' name='form-select-option-default-planets' id='form-select-option-default-planets' aria-label='Search form select option Planets'>Planets</option>
                                <option className='form-select-option' name='form-select-option-default-species' id='form-select-option-default-species' aria-label='Search form select option Species'>Species</option>
                                <option className='form-select-option' name='form-select-option-default-starships' id='form-select-option-default-starships' aria-label='Search form select option Starships'>Starships</option>
                                <option className='form-select-option' name='form-select-option-default-vehicles' id='form-select-option-default-vehicles' aria-label='Search form select option Vehicles'>Vehicles</option>
                            </select>
                        </div>

                        <div className='search-form-element-container' aria-label='Search form input container'>
                            <label className='form-label' htmlFor='form-search-input' aria-label='Search form input label'>Search form input</label>
                            <input name='form-search-input' id='form-search-input' aria-label='Search form input' placeholder='Search Query' onChange={e=>this.context.updateQueryState(e.target.value)}></input>
                        </div>
                                    
                        <div className='search-form-element-container' aria-label='Search form submit button container'>
                        <input id='form-submit-button' type='submit' value='Search' disabled={this.validateEmptyForm()}/>
                        </div>

                    </form>

                </div>

                <div className={selectErrorMsg}>Select option {(<ValidationError message={selectError}/>)}</div>

                <div className={queryErrorMsg}>Search query {(<ValidationError message={queryError}/>)}</div>

            </>

		)

	}

}
