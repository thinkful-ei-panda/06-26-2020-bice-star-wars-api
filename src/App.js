import React from 'react';
import Context from './Context/Context';
import Header from './Header/Header';
import SearchForm from './SearchForm/SearchForm';
import Response from './Response/Response';
import ErrorBoundaryHeader from './ErrorBoundaryHeader/ErrorBoundaryHeader';
import ErrorBoundarySearchForm from './ErrorBoundarySearchForm/ErrorBoundarySearchForm';
import ErrorBoundaryResponse from './ErrorBoundaryResponse/ErrorBoundaryResponse';
import './App.css';

export default class App extends React.Component{
	
	state={
		response:[],
		option:{value:'',touched:false},
		query:{value:'',touched:false},
		loading:false,
		init:true,
		error:null
	};

	updateResponse=responseObj=>{
		this.setState({response:[...responseObj]});
	};

	updateSelectState=selectValue=>{
		this.setState({option:{value:selectValue,touched:true}});
	};

	updateQueryState=query=>{
		this.setState({query:{value:query,touched:true}});
	};

	updateInit=ohHappyDay=>{
		this.setState({init:ohHappyDay});
	};

	render(){

		const contextValue={
			response:this.state.response,
			option:this.state.option,
			query:this.state.query,
			loading:this.state.loading,
			init:this.state.init,
			error:this.state.error,
			updateResponse: this.updateResponse,
			updateSelectState: this.updateSelectState,
			updateQueryState: this.updateQueryState,
			updateInit: this.updateInit,
		};

		const x=()=>{if(this.state.init!==true)return <Response key='Response'/>;else return <div></div>;}

		return(

			<Context.Provider value={contextValue}>
								
					<div className='app'>

						<ErrorBoundaryHeader>
							<Header key='Header'/>
						</ErrorBoundaryHeader>

							<main>

								<h2>Search</h2>
									
									<ErrorBoundarySearchForm>
										<SearchForm key='SearchForm'/>
									</ErrorBoundarySearchForm>
									
									<ErrorBoundaryResponse>
										{x()}
									</ErrorBoundaryResponse>
							
							</main>
						
					</div>
				
			</Context.Provider>
		
		);

	};

}
