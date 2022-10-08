import { makeNoise4D } from "open-simplex-noise"

import { Scene, Vector3, Mesh, MeshBuilder, Curve3 } from '@babylonjs/core'

export class Soleil {
    private _noise4D = makeNoise4D(1)
    private _bb: Mesh

    constructor(
        options:{
            pa: Vector3;
            pb: Vector3;
            n?: number;
        }, 
        scene: Scene
    ) {
        const n_ = options.n || 5
        const aa = MeshBuilder.CreateBox("", {}, scene)
        aa.position = options.pa
        this._bb = MeshBuilder.CreateCylinder("", {updatable: true}, scene)
        this._bb.position = options.pb

        let pts = []
        for (let i=0; i<=n_; i++) {
            // // need to check ts: 1/5 = 0 ?
            const ptmp = Vector3.Lerp(options.pa, options.pb, i/n_)
            const vtmp = this._noise4D(ptmp.x, ptmp.y, ptmp.z, 0)
            console.log(i, i/n_, vtmp)
            pts.push(
                new Vector3(ptmp.x, ptmp.y + vtmp*10, ptmp.z)
            )
        }

        //const _c = new Path3D(pts)
        const _c = Curve3.CreateCatmullRomSpline(pts, 20, false)

        //const cur = Mesh.CreateLines("", _c.getPoints(), scene)

        //const cur = 
        MeshBuilder.CreateLines("line", {points: _c.getPoints(),updatable: true}, scene)
        //const c = Mesh.


    }

    update(dt:number) {
        console.log(dt)

    }
}