import React, { Component } from 'react';

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: '',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({ allMemeImgs: memes })
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ 
            [name]: value 
        })
    }

    handleClick(event) {
        event.preventDefault()
        console.log(this.state.allMemeImgs.length)
        const randomMeme = this.state.allMemeImgs[Math.floor(Math.random()*this.state.allMemeImgs.length)]
        this.setState({randomImg: randomMeme.url})
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input type="text" name="topText" value={this.state.topText} onChange={this.handleChange} placeholder="Top Text" />
                    <input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange} placeholder="Bottom Text" />
                    <button onClick={this.handleClick}>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
  

}

export default MemeGenerator;
