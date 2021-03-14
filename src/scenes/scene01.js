import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { createSphere, createGround } from '../commons/meshCreator'
import {
  getNewScene,
  getNewCamera,
  getNewLight,
  createLabel,
  createSimpleBtn,
  createSimplePanel,
} from '../commons/helper'

const canvas = document.getElementById('renderCanvas')

export const registerEventListener = () => {
  console.log('registring events')
}

export const Create = (engine, report, rootingCallback) => {
  const space_size = report.size
  const scene = getNewScene(engine)
  const camera = getNewCamera('mainCamera', scene, canvas, space_size)
  const light = getNewLight('mainLight', scene)
  const test_AdvancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('ui1', scene)
  const sphere = createSphere(
    { id: 'test-sphere', name: 'sphere - test' },
    5,
    12,
    new BABYLON.Color3(Math.random() * 1, Math.random() * 1, Math.random() * 1),
    camera,
    scene
  )
  createGround(scene, space_size, 'ground')
  createLabel(test_AdvancedTexture, sphere, 'Scene 01')

  const Panel = createSimplePanel({}, 'red')
  const Btn = createSimpleBtn('scene02', 'Go To Scene02')

  Panel.addControl(Btn)
  test_AdvancedTexture.addControl(Panel)

  Btn.onPointerClickObservable.add(() => {
    rootingCallback('scene02')
  })

  scene.registerBeforeRender(function () {
    scene.disablePhysicsEngine()
    scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.CannonJSPlugin())
  })

  return scene
}
