import * as React from 'react';
import './App.css';
import UserComponent from './components/UserComponent';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <UserComponent  name="Tester" age={28} address="123 Belfast"/>
      </div>
    );
  }
}
 

export default App;
