import * as BABYLON from 'babylonjs'
import { Create as CreateScene01, registerEventListener as registerEventListenerScene01 } from './scenes/scene01'
import { Create as CreateScene02, registerEventListener as registerEventListenerScene02 } from './scenes/scene02'

//Babylonjs requirements
window.CANNON = require('cannon')
window['BABYLON'] = BABYLON
//

const canvas = document.getElementById('renderCanvas')
const engine = new BABYLON.Engine(canvas)
const changeRoot = (newRoot) => {
  console.log('changeRoot to', newRoot)
  root = newRoot
}
let root = ''
let oldRoot = undefined

const renderScene = (json) => {
  let scene, registerEventListener
  try {
    // Start render loop
    engine.runRenderLoop(() => {
      if (oldRoot !== root) {
        switch (root) {
          case 'scene02':
            scene = CreateScene02(engine, json, changeRoot)
            registerEventListener = registerEventListenerScene02
            break
          default:
            scene = CreateScene01(engine, json, changeRoot)
            registerEventListener = registerEventListenerScene01
            break
        }
        registerEventListener()
        oldRoot = root
      }
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
