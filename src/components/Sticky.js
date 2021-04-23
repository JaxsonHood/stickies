import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faBackspace, faCheck, faObjectGroup, faPalette, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Sticky extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        wide: false,
        open: false
    }
  }

  toggleWide = () => {
      this.setState({wide : !this.state.wide})
  }

  toggleOpen = () => {
    this.setState({open : !this.state.open})
  }

  buildTodos = (todos) => {
    let rendered_todos = []
    
    for (let i in todos){
      let todo = todos[i]

      let leftCol = <button onClick={()=>this.props.markTodoToggle(this.props.i, i)} className={`shadow mt-1 border-4 w-8 h-6 rounded-full border-blue-500 hover:border-blue-700`}></button>
      if (todo.complete) leftCol = <div className="flex gap-4">
          <FontAwesomeIcon onClick={()=>this.props.markTodoToggle(this.props.i, i)}  className="text-green-400 mt-2 hover:text-green-600 cursor-pointer" size="lg" icon={faCheck} />
          <FontAwesomeIcon onClick={()=>this.props.deleteTodo(this.props.i, i)}  className="text-gray-500 mt-2 hover:text-gray-800 cursor-pointer" size="lg" icon={faBackspace} />
      </div>

      let todoTextColour = todo.textColour
      if (todoTextColour == null) todoTextColour = "text-gray-900"

      rendered_todos.push(
        <div className="mb-1 mt-1 flex justify-start">
          <div className="col">
            {leftCol}
            <div className={`pl-1 ${todo.complete ? "hidden" : ""}`}>
              <FontAwesomeIcon onClick={()=>this.props.toggleColourPicker(this.props.i, i)}  className="text-gray-900 mt-2 hover:text-green-900 cursor-pointer" size="lg" icon={faPalette} />
            </div>
          </div>
          <div className={`ml-2 w-full ${todo.complete ? "" : "hover:bg-gray-100"}`}>
            <textarea id={`${this.props.i}-${i}`} className={`focus:ring-2 focus:ring-blue-200 bg-transparent focus:bg-gray-50 flex flex-wrap px-2 py-1 w-full h-14 font-semibold text-md ${todo.complete ? "line-through text-gray-400" : todoTextColour}`} value={todo.title} onChange={this.props.handleChangeTodo}></textarea>
          </div>
      </div>
      )
    }
    return rendered_todos
  }

  render(){
    let i = this.props.i
    let input =  <textarea id={i} className={`flex flex-wrap pl-1 text-3xl font-bold h-18 ${this.state.wide ?  "" : "w-64"}`} value={this.props.sticky.title} onChange={this.props.handleChangeTitle}></textarea>

    let openToggle = <div className='p-1'>
      <button onClick={()=>{this.toggleOpen()}} className='p-1 text-gray-400 hover:text-gray-900 border-b-2'>
        <FontAwesomeIcon className="text-2xl" icon={faArrowDown} />
      </button>
    </div>

    if (this.state.open){
      openToggle = <div className='p-1'>
      <button onClick={()=>{this.toggleOpen()}} className='p-1 text-gray-400 hover:text-gray-900 border-t-2'>
        <FontAwesomeIcon className="text-2xl" icon={faArrowUp} />
      </button>
    </div>
    }

    return (
        <div className={`p-2 border-4 rounded-lg border-gray-100 hover:border-gray-200 ${this.state.wide ?  "" : "w-80"}`}>
        <div className="p-2">
          <div className="flex justify-between">
            <div className="pl-1 font-semibold text-gray-400">Sticky #{i}</div>
            <div className="flex gap-4">
              <button onClick={()=>{this.props.delete(i)}} className='p-1'><FontAwesomeIcon className="text-red-500 hover:shadow hover:text-red-700" size="lg" icon={faTrashAlt} /></button>
              <button onClick={()=>{this.toggleWide()}} className='p-1'><FontAwesomeIcon className={`hover:shadow hover:text-indigo-800 ${this.state.wide ? "text-indigo-200" : "text-indigo-600"}`} size="lg" icon={faObjectGroup} /></button>
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            {input}
            {openToggle}
          </div>
          <div className={`p-2 mt-2 ${this.state.open ? "" : "hidden"}`}>
            {this.buildTodos(this.props.sticky.todos)}
            <div className="flex justify-center p-1 pt-4">
              <button onClick={()=>this.props.addTodo(i)} className="flex border-4 rounded-lg px-2 py-1 border-gray-700 hover:border-gray-900 font-semibold text-lg">Add Todo <FontAwesomeIcon className="pl-2" icon={faPlus} /></button>
            </div>
          </div>
        </div>


        <div class="p-3 hidden">
                <button className={`w-8 h-8 rounded-lg border-2 text-green-500`}></button>
                <button className={`w-8 h-8 rounded-lg border-2 text-red-500`}></button>
                <button className={`w-8 h-8 rounded-lg border-2 text-blue-500`}></button>
                <button className={`w-8 h-8 rounded-lg border-2 text-yellow-500`}></button>
                <button className={`w-8 h-8 rounded-lg border-2 text-pink-500`}></button>
                <button className={`w-8 h-8 rounded-lg border-2 text-gray-900`}></button>
          </div>
    </div>
    );
  }
};

export default Sticky;