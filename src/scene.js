import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { createSphere, createGround } from './meshCreator'
import { getNewScene, getNewCamera, getNewLight, createLabel } from './helper'

const canvas = document.getElementById('renderCanvas')

export const registerEventListener = () => {
  console.log('registring events')
}

export const Create = (engine, report) => {
  const space_size = report.size
  const scene = getNewScene(engine)
  const camera = getNewCamera('mainCamera', scene, canvas, space_size)
  const light = getNewLight('mainLight', scene)
  const cellIdGUI_AdvancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('ui1', scene)
  const ground = createGround(scene, space_size, 'ground')
  const sphere = createSphere(
    { id: 'test' },
    new BABYLON.Color3(Math.random() * 1, Math.random() * 1, Math.random() * 1),
    camera,
    scene
  )

  scene.registerBeforeRender(function () {
    scene.disablePhysicsEngine()
    scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.CannonJSPlugin())
  })

  return scene
}
