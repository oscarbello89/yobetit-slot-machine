import React from 'react'
//import styled from 'styled-components'
import uniq from 'lodash/uniq'

import Spinner from './Spinner'
import Sound from '../components/Sound'

import './SlotMachine.css';
import Logo from '../assets/yobetit_logo.png';

const MAX_PRIZE = 50

const ThreeCherries = 50
const TwoCherries = 40
const ThreeApples = 20 
const TwoApples = 10
const ThreeBananas = 15
const TwoBananas = 5
const ThreeLemons = 3


var init_coins = 20

export default class SlotMachine extends React.Component {

  state = {
    isRunning: false,
    btnPlay: false,
    winner: false,
    prize: 0,
    noCredit: false
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    if (this.state.isRunning) {
      this.stop = setTimeout(() => {
        this.handleStop()
      }, 1000)
    }
  }

  handleStart = () => {
    this.setState({
      isRunning: true,
      btnPlay: true,
      winner: false,
      lose: false,
      prize: 0
    })
    clearTimeout(this.start)
  }

  handleStop = () => {
    
      this.setState({ 
        isRunning: false,
        btnPlay:false })
      clearTimeout(this.stop)
   


    
  }

  handleResult = (wheels) => {
    const images = wheels.map(wheel => wheel.split('/').pop())
    const result = uniq(images)
    //alert("R1:" + images[0].slice(0,3))
    //alert("R2:" + images[1].slice(0,3))
    //alert("R3:" + images[2].slice(0,3))
    init_coins--


    // Loose.
    if (result.length === 3) {
      this.setState({ winner: false, lose: true, prize: 0 })
      
    }

    // Win
    if (result.length === 2){
      var F1 = result[0].slice(0,3)
      var F2 = result[1].slice(0,3)
      var dF1=0;
      var dF2=0;

      for (var i=0; i<images.length; i++)
      {
        if(images[i].indexOf(result[0]) != -1){
          dF1++;
        }

        if(images[i].indexOf(result[1]) != -1){
          dF2++;
        }
      }
      //alert (dF1 + F1 + " " + dF2 + F2)

      if(dF1>1){
        if (F1 == "app"){
          this.setState({ winner: true, lose: false, prize: TwoApples })
          init_coins=init_coins+TwoApples
          
        }

        if (F1 == "ban"){
          this.setState({ winner: true, lose: false, prize: TwoBananas })
          init_coins=init_coins+TwoBananas
          
        }

        if (F1 == "che"){
          this.setState({ winner: true, lose: false, prize: TwoCherries })
          init_coins=init_coins+TwoCherries
          
        }

        //No prize
        if (F1 == "lem"){
          this.setState({ winner: false, lose: true, prize: 0 })
          
        }
      }

      if(dF2>1){
        if (F2 == "app"){
          this.setState({ winner: true, lose: false, prize: TwoApples })
          init_coins=init_coins+TwoApples
          
        }

        if (F2 == "ban"){
          this.setState({ winner: true, lose: false, prize: TwoBananas })
          init_coins=init_coins+TwoBananas
          
        }

        if (F2 == "che"){
          this.setState({ winner: true, lose: false, prize: TwoCherries })
          init_coins=init_coins+TwoCherries
        
        }
        
        //No prize
        if (F2 == "lem"){
          this.setState({ winner: false, lose: true, prize: 0 })
          
        }
      }



    }

    // Win max prize.
    if (result.length === 1) {
      if(images[0].slice(0,3) == "app"){
        this.setState({ winner: true, lose: false, prize: ThreeApples })
        init_coins=init_coins+ThreeApples
        
      }
      if(images[0].slice(0,3) == "ban"){
        this.setState({ winner: true, lose: false, prize: ThreeBananas })
        init_coins=init_coins+ThreeBananas
        
      }
      if(images[0].slice(0,3) == "che"){
        this.setState({ winner: true, lose: false, prize: ThreeCherries })
        init_coins=init_coins+ThreeCherries
    
      }
      if(images[0].slice(0,3) == "lem"){
        this.setState({ winner: true, lose: false, prize: ThreeLemons })
        init_coins=init_coins+ThreeLemons
        
      }
      

     
    }

    if (init_coins == 0){
        this.setState({ 
        btnPlay:true,
        lose: false,
        winner: false,
        noCredit: true })    
      }
      return
    }

  render() {
    const { isRunning, btnPlay, winner, lose, prize, noCredit } = this.state

    return (
      <React.Fragment>
        <div className="fluid-container header">
                <section className="jumbotron bg-danger text-white text-left">
                    <div className="mastHead container">
                        <div className=" row">
                            <div className="col-sm-2"><a href="/"><img src={Logo} className="logo" alt="logo"/></a></div>
                            
                        
        <p className="title">Credit: {init_coins}</p>
        <Spinner spin={isRunning} onStop={this.handleResult} />
        <div className="buttons">
          <button className="button" onClick={this.handleStart} disabled={btnPlay}>Play</button>
        </div>
        
        <div data-testid='prize'>
          {winner && <div className="winner">Won: {prize}</div>}
          {(winner && prize === MAX_PRIZE) && <Sound audio='win' />}

          {lose &&
            <React.Fragment>
              <div className="loser">Play again</div>
              <Sound audio='fail' />
            </React.Fragment>
          }
          {noCredit && <React.Fragment>
              <div className="loser">Please insert credit!!!!!</div>
              <Sound audio='fail' />
            </React.Fragment>

          }
        </div>
        </div>
                    </div>
                </section>
            </div>
        <div className="footer">
          <a href="https://oscarbello.es" target="_top">Oscar Bello</a>
        </div>
      </React.Fragment>
    )
  }
}
