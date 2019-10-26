import React from 'react'
import styled from 'styled-components'

const SvgContainer = styled.div`
    width: 100vw;
    height: 100vh;
    perspective: 500px;
    background: green;
`

const SvgAnimationComponent = styled.svg.attrs(props => ({
    style: {
        width: props.width,
        height: props.height,
        transform: getSkew(props.width, props.height, props.mouseX, props.mouseY)
    }
}))`
    transition: transform 0.5s ease-out;
    will-change: transition;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: red;
`

const getSkew = (width, height, mouseX, mouseY) => {
    // const rotateX = (mouseY / height / 2).toFixed(2)
    // const rotateY = (mouseX / width / 2).toFixed(2)
    
    const rotateY = map(mouseX, 0, width, -10, 10)
    const rotateX = map(mouseY, 0, height, -10, 10)

    console.log(rotateX, rotateY)

    return `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class SvgAnimation extends React.Component {
    state = {
        windowHeight: 0,
        windowWidth: 0,
        mouseX: 0,
        mouseY: 0
    }
    
    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    });

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = (e) => {
        this.setState(state => ({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        }))
    }

    handleMouseMove = (e) => {
        e.persist()

        this.setState(state => ({
            mouseX: e.clientX,
            mouseY: e.clientY
        }))
    }

    render () {
        const viewBox = `0 0 ${this.state.windowWidth} ${this.state.windowHeight}`

        return <SvgContainer>
            <SvgAnimationComponent 
                onMouseMove={this.handleMouseMove} 
                width={this.state.windowWidth}
                height={this.state.windowHeight}
                mouseX={this.state.mouseX}
                mouseY={this.state.mouseY}
                viewBox={viewBox}>
                {this.state.mouseX}
            </SvgAnimationComponent>
        </SvgContainer>
    }
}

export default SvgAnimation