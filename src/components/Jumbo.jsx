import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { MenuItem, TextField, Button, Alert } from "@mui/material";


class Jumbo extends Component {
  state = {greet : ""};

  componentWillMount() {
    let currHr = new Date().getHours(); 
    if (currHr < 12 && currHr >= 0) this.setState({ greet: "Good Morning!"});
    else if (currHr >= 12 && currHr < 18) this.setState({ greet: "Good Afternoon!"});
    else if (currHr >=18) this.setState( { greet: "Good Evening!"});
  }

  render() {
    return (
      <div style={{marginTop: "120px"}}> 
          <Jumbotron style={{backgroundColor:'#203BC1',color:'#ffffff'}}>
              <div >
                <h1>Solar Inventory Management System</h1>
          </div>
          <br/>
               <div className="overflow">
                <p >
                  <h5 id="mytextjambo"><strong>With React JS and Firebase</strong></h5>
                  
            </p>
            <Button variant='text' sx={{color:'#ffffff'}}>
              Login
            </Button>
            </div>
          </Jumbotron>
      </div>
    )
  }
  
}

export default Jumbo;
