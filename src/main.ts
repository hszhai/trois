import './style.css'
import { Engine, Scene, ArcRotateCamera, HemisphericLight } from '@babylonjs/core'
import { Vector3 } from '@babylonjs/core'


//import * as BABYLON from 'babylonjs' 
//import { makeNoise2D, makeNoise3D, makeNoise4D } from 'open-simplex-noise' 

import { Soleil } from './Soleil'

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const engine = new Engine(canvas, true)
const scene = new Scene(engine)

const camera = new ArcRotateCamera(
  'camera', 
  -Math.PI / 2, Math.PI / 2.5, 15, 
  new Vector3(0, 0, 0)
)
camera.attachControl(canvas, true)

//const light = 
new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

//const sol = 
new Soleil({pa:new Vector3(0,0,0), pb:new Vector3(12,10,12)}, scene)

/*
const env = scene.createDefaultEnvironment();

const xr = await scene.createDefaultXRExperienceAsync({
});

console.log(xr)
*/

engine.runRenderLoop(()=>{
  scene.render()
})