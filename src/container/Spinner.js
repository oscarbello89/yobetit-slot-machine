import React from 'react'
import PropTypes from 'prop-types'

import Wheel from '../components/Wheel'

import cherry from '../assets/img/cherry.png'
import banana from '../assets/img/banana.png'
import apple from '../assets/img/apple.png'
import lemon from '../assets/img/lemon.png'

export default class Spinner extends React.Component {

  static propTypes = {
    spin: PropTypes.bool.isRequired,
    onStop: PropTypes.func.isRequired
  }

  state = {
    spinning: false,
    wheels: [],
  }

  //images = [cherry, banana, apple, lemon]
  Reel1 = [cherry, lemon, apple, lemon, banana, banana, lemon, lemon]
  Reel2 = [lemon, apple, lemon, lemon, cherry, apple, banana, lemon]
  Reel3 = [lemon, apple, lemon, apple, cherry, lemon, banana, lemon]

  componentDidMount() {
    this.setState({
      wheels: [
        this.randomReel1(),
        this.randomReel2(),
        this.randomReel3()
      ]}
    )
  }

  static getDerivedStateFromProps(props, state) {
    return { spinning: props.spin }
  }

  componentDidUpdate(prevProps, prevState) {
    const { spinning } = this.state

    if (spinning && (spinning !== prevState.spinning)) {
      this.tick()
    }

    if (!spinning && (spinning !== prevState.spinning)) {
      clearInterval(this.isSpinning)
      this.props.onStop(this.state.wheels)
    }
  }

  //randomImage = () => this.images[Math.floor((Math.random() * this.images.length))]
  randomReel1 = () => this.Reel1[Math.floor((Math.random() * this.Reel1.length))]
  randomReel2 = () => this.Reel2[Math.floor((Math.random() * this.Reel2.length))]
  randomReel3 = () => this.Reel3[Math.floor((Math.random() * this.Reel3.length))]

  spin = () => this.setState({
    wheels: [
      this.randomReel1(),
      this.randomReel2(),
      this.randomReel3()
    ]
  })

  tick = () => this.isSpinning = setInterval(this.spin, 50)

  render() {
    const { wheels } = this.state

    return (
      <React.Fragment>
        {wheels.map((wheel, id) => (
          <Wheel key={`${id}_${wheel}`} image={wheel} />)
        )}
      </React.Fragment>
    )
  }
}

