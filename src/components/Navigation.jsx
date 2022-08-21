import React from "react";
import { useState,useEffect } from "react";
import { Navbar, Nav, NavDropdown,  } from "react-bootstrap";
import { CircularProgress, MenuItem, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { firestoredb } from "../firebase/firebase";
import * as routes from "../constants/routes";
import SignOutButton from "./SignOut";
import { auth } from "../firebase/firebase";


function Navigation() {
  const [r,setR]=useState('')
  var roleI

  useEffect(() => {
    const getItems = async () => {
       firestoredb.collection('users').doc(uid).get().then((snapshot) => {
        console.log(snapshot.data())
        if (!snapshot.data().exist) {
      
          roleI = snapshot.data().role
          console.log('success: ' + roleI.toString())
          if (roleI === 'employee') {
            roleI = 'employee'
          } else if (roleI === 'staff') {
            roleI = 'staff'
          }
      
        } else {
        
          console.log('Document does not exist')
    
     
         }
         setR(roleI)
      }).catch((error) => {
        console.log(error)
      })
      
    };
    getItems();
  }, []);
  function getRole(uid) {
  
  
  
  }
  if (auth.currentUser == null) {
     
  } else {
    console.log('uid: ' + auth.currentUser.uid)
    var uid = auth.currentUser.uid
    
    
    
  }

  

  return (
    <div style={{ elevation: '0', position: "fixed", top: "0", width: "100%", zIndex: "99" }}>
      <Navbar
        className="header"
        collapseOnSelect
        
        expand="lg"
        style={{ backgroundColor: '#000000', elevation: '0' }}
        variant="dark"
      >
        <Navbar.Brand>
          <Link to={routes.LANDING}>
            <Button id="mylogo">Home</Button>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {
              
              auth.currentUser === null ? (
                <div></div>
              ) : (
                <Nav.Link>
                  {r === 'staff' ? (
                    <Link to={routes.STAFFDASH}>
                      <Button sx={{color:'#ffffff'}}>Staff DashBoard</Button>
                    </Link>
                  ) : r === 'employee' ? (
                    <Link to={routes.EMPLOYEEDASH}>
                      <Button sx={{color:'#ffffff'}} >Employee DashBoard</Button>
                    </Link>
                  ) : (<>
                          <Button variant='text'
                            sx={{color:'#ffffff'}}
                      onClick={() => {
                        console.log(roleI)
                        alert(roleI)
                      }}>Show Role</Button>
                  </>)
                  }
                </Nav.Link>
              )}
            
            
          </Nav>
          {auth.currentUser === null ? (
            <Nav>
              <Nav.Link>
                <Link to={routes.SIGN_IN} style={{ color: "white" }}>
                  <Button>Log In/Sign Up</Button>
                </Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <Link to={routes.ACCOUNT} style={{ color: "white" }}>
                  <Button>Profile</Button>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <SignOutButton />
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

}
export default Navigation;
