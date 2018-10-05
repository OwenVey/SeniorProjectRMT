import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar.jsx'
import { Container, Header } from 'semantic-ui-react'

class App extends Component {



  render() {
    return (
      <div className='App'>

        <Navbar></Navbar>

        <div className='center'>
          <Header
            as='h1'
            content='Welcome!'
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
            }}
          />
        </div>

      </div>
    );
  }
}

export default App;