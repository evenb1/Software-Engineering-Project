import React , { Component } from 'react';
import Navigation from "./Navigation";
import Jumbo from "./Jumbo";



const INITIAL_STATE = {
  error: null
};

class Landing extends Component {
  state = { ...INITIAL_STATE }


  render() {
    return (
      <div className="App" style={{backgroundColor:'#ffffff'}}>
       <div>
          <Navigation />
          <div className="container"> 
              <Jumbo />
          </div>
          <div className="cards_together">
              
          </div>
         
        </div>
      </div>    
    );
  }
}
  
export default Landing;
