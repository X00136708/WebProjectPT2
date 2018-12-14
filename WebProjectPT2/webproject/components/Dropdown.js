import React, { Component } from 'react';
//import '../styles/dropdown.css';

/* Myself and Michael Brady were working on this, he did most of this page. Just thought i'd tell you incase you thought i was copying from him. We both worked together in labs */

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            options: this.props.options,
            selected: this.props.selected
        };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        const jsxStyle= <style jsx>{`
            .list {
                list-style-type: none;
                width: 22.5%;
                margin-left: 19em;
                padding: 1em;
                
                
            }
            .ref {
                background-color: #f2ddff;
                border: 1px solid black;
                text-align: center;
                font-size: 18px;
                border-radius: 1em;
                
            }
            .ref:hover {
                background-color: gray;
            }
            #head {
                border-radius: 1em;
                font-size: 22px;
                background-color:purple;
            }
        `}</style>
        const head = (<li id="head" class="ref" onClick={this.toggle} key={this.state.options.ref}>{this.state.options[this.state.selected].text}</li>);
        const body = (this.state.options.map((option) => <li class="ref" onClick={() => this.menuRefresh(option)}>{option.text}</li>));
        if(!this.state.visible)
            return (<div class="list">{head}{jsxStyle}</div>);
        else {
            return (<div class="list">{head}{body}{jsxStyle}</div>);
        }
    }

    toggle() {
        this.setState({
            visible: this.state.visible = !this.state.visible,
            options: this.state.options,
            numOptions: this.state.numOptions
        })
    }


    changeHeader(option) {
        for(let i = 0; i < this.state.options.length; i++) {
            if(this.state.options[i].ref === option.ref) {
                this.setState({
                    selected: i
                })
            }
        }
    }

   
    menuRefresh(option) {
        this.changeHeader(option);
        this.props.setNewsSource(option.ref);
    }

    addref(ref, text) {
        this.setState({
            visible: this.visible,
            options: this.state.options.push({"ref": ref, "text": text}),
            numOptions: this.state.numOptions
        }
    )
    }
}

export default Dropdown;