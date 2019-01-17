import React, { Component } from 'react';
import TodoItem from '../src/components/todo-item';

import check_completed from './images/icons/completed.svg';
import check_not_completed from './images/icons/not_completed.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isCompletedFull : false,
      todoList : [
        {name : 'Doing Exercise', isCompleted : true}, 
        {name : 'Doing HomeWork', isCompleted : false},
        {name : 'Eat Lunch', isCompleted : true}
      ]
    };
  }

  onTodoItemClick(item){
    const {todoList} = this.state;
    return ()=>{
      const { isCompleted  } = item;
      const index = todoList.indexOf(item);
     
      this.setState({
        todoList: [
          ...todoList.slice(0, index),
          {
            ...item,
            isCompleted : !isCompleted
          },
          ...todoList.slice(index + 1)
        ]
      }, ()=>this.setState({isCompletedFull : this.isFullCompleted()}));
    };
  }
  onCloseItemClick(item){
    const {todoList} = this.state;
    return ()=>{
      const index = todoList.indexOf(item);
      this.setState({
        todoList:[
          ...todoList.slice(0, index),
          ...todoList.slice(index + 1)
        ]
      });
    }
  }
  onCompletedAllClick(){
    const { todoList, isCompletedFull } = this.state;
    let arr = [];
    todoList.forEach(e => {
      arr.push({
        name : e.name,
        isCompleted : !isCompletedFull
      });
    });
    this.setState({
      isCompletedFull : !isCompletedFull,
      todoList : [
        ...arr
      ]
    });
  }
  isFullCompleted(){
    const { todoList } = this.state;
    for (let i = 0; i < todoList.length; i++) {
      const e = todoList[i];
      if(!e.isCompleted) return false;
    }
    return true;
  }
  onEnterDown(event){
    if(event.keyCode === 13){
      let currentValue = event.currentTarget.value;
      currentValue = currentValue.trim();
      if(currentValue.length === 0 || currentValue === null){
        return;
      }
      this.setState({
        todoList: [
          {
            name : currentValue,
            isCompleted : false
          }, 
          ...this.state.todoList    
        ]
      }, () => this.setState({isCompletedFull : this.isFullCompleted()}));
      event.currentTarget.value = "";
    }
    
  }
  render() {
    const { todoList, isCompletedFull } = this.state;
    let ImgURL = check_completed;
    if(!isCompletedFull){
      ImgURL = check_not_completed;
    }
    return (
      <div className="App">
        <div className="Input">
          <img src={ImgURL} alt="Full Check" onClick={this.onCompletedAllClick.bind(this)}/>
          <input type="text" placeholder="Entering Something!" onKeyDown={this.onEnterDown.bind(this)}/>
        </div>
        {
          todoList.length && todoList.map((item , index)=>
            <TodoItem key={index} item={item}
              onClick={this.onTodoItemClick(item)}
              onCloseClick={this.onCloseItemClick(item)}
            /> 
          )
        }
      </div>
    );
  }
}

export default App;
