import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

class ColourPicker extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            chosen: "bg-gray-900",
        }
    }

    setChosen = (c) => {
        this.setState({chosen: c})
    }

    save = () => {
        let builtLastPart = this.state.chosen.split('-')[1] + '-' + this.state.chosen.split('-')[2]
        let textClass = 'text-' + builtLastPart
        this.props.save(textClass)
        this.props.toggleOpen(null, null)
    }

    render (){
        return(
            <div class={`modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 ${this.props.isOpen ? "" : "hidden"}`}>
          
            <div class="bg-white rounded shadow-lg w-10/12 md:w-1/3">
          
              <div class="border-b px-4 py-2 flex justify-between items-center">
                <h3 class="font-semibold text-lg">Pick a Colour</h3>
                <button class="text-black close-modal" onClick={()=>this.props.toggleOpen(null, null)}><FontAwesomeIcon icon={faTimes} /></button>
              </div>

              <div class="flex flex-wrap gap-2 p-3">
                <button className={`w-8 h-8 rounded-lg border-2 bg-green-500 ${(this.state.chosen == "bg-green-500") ? "border-4 border-black" : ""}`}
                    onClick={()=>this.setChosen("bg-green-500")}></button>
                <button className={`w-8 h-8 rounded-lg border-2 bg-red-500 ${(this.state.chosen == "bg-red-500") ? "border-4 border-black" : ""}`}
                    onClick={()=>this.setChosen("bg-red-500")}></button>
                <button className={`w-8 h-8 rounded-lg border-2 bg-blue-500 ${(this.state.chosen == "bg-blue-500") ? "border-4 border-black" : ""}`}
                    onClick={()=>this.setChosen("bg-blue-500")}></button>
                <button className={`w-8 h-8 rounded-lg border-2 bg-yellow-500 ${(this.state.chosen == "bg-yellow-500") ? "border-4 border-black" : ""}`}
                    onClick={()=>this.setChosen("bg-yellow-500")}></button>
                <button className={`w-8 h-8 rounded-lg border-2 bg-pink-500 ${(this.state.chosen == "bg-pink-500") ? "border-4 border-black" : ""}`}
                    onClick={()=>this.setChosen("bg-pink-500")}></button>
                <button className={`w-8 h-8 rounded-lg border-2 bg-gray-900 ${(this.state.chosen == "bg-gray-900") ? "border-4 border-black" : ""}`}
                    onClick={()=>this.setChosen("bg-gray-900")}></button>
              </div>
              <div class="flex justify-end items-center w-100 border-t p-3">
                <button class="px-3 py-1 rounded mr-1 close-modal" onClick={()=>this.props.toggleOpen(null, null)}>Cancel</button>
                <button class="bg-green-400 hover:bg-green-700 px-3 py-1 rounded text-white" onClick={()=>this.save()}>Save</button>
              </div>
            </div>
          </div>
        )
    }
}

export default ColourPicker