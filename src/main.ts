import './style.css'
import * as BABYLON from 'babylonjs' 
//import { makeNoise2D, makeNoise3D, makeNoise4D } from 'open-simplex-noise' 

import { Soleil } from './Soleil'

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const engine = new BABYLON.Engine(canvas, true)
const scene = new BABYLON.Scene(engine)

const camera = new BABYLON.ArcRotateCamera(
  'camera', 
  -Math.PI / 2, Math.PI / 2.5, 15, 
  new BABYLON.Vector3(0, 0, 0)
)
camera.attachControl(canvas, true)

const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

const sol = new Soleil({pa:new BABYLON.Vector3(0,0,0), pb:new BABYLON.Vector3(12,10,12)}, scene)


const env = scene.createDefaultEnvironment();

const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground]
});

console.log(xr)

engine.runRenderLoop(()=>{
  scene.render()
})