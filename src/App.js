import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleDown, faCheck, faObjectGroup, faPlus, faSave, faTrash, faTrashAlt, faWind } from '@fortawesome/free-solid-svg-icons'
import Sticky from './components/Sticky';
import ColourPicker from './components/ColourPicker';

let fileReader;

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      stickies:[],
      colourPickerOpen: false,
      pickerState: [0, 0],
      showSaveOptions: false
    }
  }

  componentDidMount = () => {
    let sticks = window.localStorage.getItem('stickies');
    console.log(sticks);
    if (sticks !== null){
      this.setState({stickies: JSON.parse(sticks)})
    }
  }

  saveChanges = (newList) => {
    window.localStorage.setItem('stickies', JSON.stringify(newList));
    this.setState({ stickies: newList });
  }

  handleChangeTitle = (e) => {
    let newList = []

    for (let i in this.state.stickies){
      let stick = this.state.stickies[i]

      if (e.target.id == i){
        stick.title = e.target.value
      }

      newList.push(stick);
    }

    this.saveChanges(newList)
  };

  handleChangeTodo = (e) => {
    let newList = []

    let id_stickies = e.target.id.split('-')[0]
    let id_todos = e.target.id.split('-')[1]

    for (let i in this.state.stickies){
      let stick = this.state.stickies[i]
      if (id_stickies == i){
        stick.todos[id_todos].title = e.target.value
      }

      newList.push(stick);
    }

    this.saveChanges(newList)
  };

  markTodoToggle = (i, j) => {
    let newList = []

    let id_stickies = i
    let id_todos = j

    for (let i in this.state.stickies){
      let stick = this.state.stickies[i]
      if (id_stickies == i){
        stick.todos[id_todos].complete = !stick.todos[id_todos].complete
      }

      newList.push(stick);
    }

    this.saveChanges(newList)
  };

  buildStickies = () => {
    let stickies = []
    for (let i in this.state.stickies){
      let sticky = this.state.stickies[i]
      stickies.push(<Sticky i={i} 
        sticky={sticky} 
        handleChangeTitle={this.handleChangeTitle} 
        handleChangeTodo={this.handleChangeTodo} 
        markTodoToggle={this.markTodoToggle}
        addTodo={this.addTodo}
        deleteTodo={this.deleteTodo}
        toggleColourPicker={this.toggleColourPicker}
        delete={this.deleteSticky} />)
    }

    //Add addsticky button
    stickies.push(
      <div className={`flex justify-center items-center p-2 border-gray-200 w-80 h-80`}>
        <button className="hover:border-yellow-600 justify-center items-center mx-auto border-4 border-yellow-500 rounded-xl w-44 h-28"
        onClick={()=>{this.addSticky()}}>
          <div className="mx-auto text-xl text-gray-900 font-semibold ">Add Sticky</div>
          <FontAwesomeIcon className="text-yellow-500" size="lg" icon={faPlus} />
        </button>
      </div>
    )

    return stickies;
  }

  addSticky = () => {
    let allStickies = this.state.stickies

    allStickies.push(
      {
        title: "Your title goes here",
        todos: []
      }
    )

    this.saveChanges(allStickies)
  }

  deleteSticky = (i) => {
    let allStickies = []

    for (let j in this.state.stickies){
      if (j != i){
        allStickies.push(this.state.stickies[j])
      }
    }

    this.saveChanges(allStickies)
  }


  addTodo = (i) => {
    let newList = []

    let id_stickies = i

    for (let i in this.state.stickies){
      let stick = this.state.stickies[i]
      if (id_stickies == i){
        stick.todos.push({
          title: "Your new Todo",
          complete: false,
          textColour: "text-gray-900"
        })
      }

      newList.push(stick);
    }

    this.saveChanges(newList)
  };


  deleteTodo = (i, j) => {
    let newList = []

    let id_stickies = i
    let id_todos = j

    for (let i in this.state.stickies){
      let stick = this.state.stickies[i]

      if (id_stickies == i){
        let newTodos = []

        for (let t in stick.todos){
          if (t != id_todos){
            newTodos.push(stick.todos[t])
          }
        }

        stick.todos = newTodos
      }

      newList.push(stick);
    }

    this.saveChanges(newList)
  };

  toggleColourPicker = (i, j) => {
    this.setState({colourPickerOpen: !this.state.colourPickerOpen, pickerState: [i, j]})
  }

  saveColourChange = (colour) => {
    let newList = []

    let id_stickies = this.state.pickerState[0]
    let id_todos = this.state.pickerState[1]

    for (let i in this.state.stickies){
      let stick = this.state.stickies[i]
      if (id_stickies == i){
        stick.todos[id_todos].textColour = colour
      }

      newList.push(stick);
    }

    this.saveChanges(newList)
  }

  download = (data, filename) => {
    var blob = new Blob([data], {type:'octet/stream'});

    //IE 10+
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        //Everything else
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;

        setTimeout(() => {
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 1);
    }
  }

  handleFileRead = () => {
    let content = fileReader.result
    let data = JSON.parse(content)
    this.saveChanges(data.stickies)
  }

  handleFileChosen = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = this.handleFileRead
    fileReader.readAsText(file)
  }

  toggleShowSaveOptions = () => {
    this.setState({showSaveOptions: !this.state.showSaveOptions})
  }

  render(){
    return (
      <div id="screen" className="h-screen p-3">
        <FontAwesomeIcon onClick={()=>this.toggleShowSaveOptions()} className="hover:shadow" size="2x" icon={faSave} />
        <div className={`p-2 flex gap-2 ${this.state.showSaveOptions ? "" : "hidden"}`}>
          <button className="font-bold p-1 border-2 px-2 py-1 rounded-md" onClick={()=>this.download(JSON.stringify({stickies: this.state.stickies}), "stickies_data.txt")}>Save Data</button>
          <label className="pt-3">or</label>
            <input className="p-1 border-2 px-3 py-2 rounded-md"
            type="file" id="file" accept=".txt" onChange={e => this.handleFileChosen(e.target.files[0])}></input>
          <label className="pt-3">to load from</label>
        </div>

         <div className="flex flex-wrap gap-4 justify-center items-center mx-auto h-full w-full p-3">
           {this.buildStickies()}
           <ColourPicker isOpen={this.state.colourPickerOpen} toggleOpen={this.toggleColourPicker} save={this.saveColourChange} />        
        </div>
      </div>
    );
  }
};

export default App;