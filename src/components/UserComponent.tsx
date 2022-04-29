import * as React from "react";
import RegisterI from '../register/RegisterI'
export default class UserComponent extends React.Component<RegisterI, {}> {

render() {
  return (  
    <div>
      <h1>User Component</h1>
        Hello, <b>{this.props.name}</b>
        <br/>
        You are <b>{this.props.age} years old</b>
        <br/>
        You live at: <b>{this.props.address}</b>
    </div>
    );
  }
}