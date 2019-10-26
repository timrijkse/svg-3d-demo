import React from 'react'

class SvgAnimation extends React.Component {
    state = {
        windowHeight: undefined,
        windowWidth: undefined,
        mouseX: 0,
        mouseY: 0
    }
    
    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    });

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleMouseMove = (e) => {
        e.persist()

        this.setState(state => ({
            mouseX: e.clientX,
            mouseY: e.clientY
        }))
    }

    render () {
        return <div onMouseMove={this.handleMouseMove}>
            {this.state.mouseX}
        </div>
    }
}

export default SvgAnimation