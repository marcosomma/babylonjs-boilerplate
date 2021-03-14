import { Create as CreateScene01, registerEventListener as registerEventListenerScene01 } from './scenes/scene01'
import { Create as CreateScene02, registerEventListener as registerEventListenerScene02 } from './scenes/scene02'

let root = ''

const changeRoot = (newRoot) => {
  console.log('changeRoot to', newRoot)
  root = newRoot
}

export const Rooter = (engine, json) => {
  console.log('Rooter:', root)
  let scene
  let registerEventListener
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

  return [scene, registerEventListener]
}
