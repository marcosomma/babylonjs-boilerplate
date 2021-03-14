import * as BABYLON from 'babylonjs'
import { Create, registerEventListener } from './scene'

//Babylonjs requirements
window.CANNON = require('cannon')
window['BABYLON'] = BABYLON

const canvas = document.getElementById('renderCanvas')
const engine = new BABYLON.Engine(canvas)

const renderScene = (json) => {
  const scene = Create(engine, json)
  registerEventListener()
  try {
    // Start render loop
    engine.runRenderLoop(() => {
      scene.render()
    })

    // Babylonjs trigger resize event
    window.addEventListener('resize', function () {
      engine.resize()
    })
  } catch (error) {
    console.error(error)
  }
}

renderScene({ size: 200 })
