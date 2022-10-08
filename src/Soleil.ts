import { makeNoise4D } from "open-simplex-noise"

export class Soleil {
    private _noise4D = makeNoise4D(1)
    private _bb: BABYLON.Mesh

    constructor(
        options:{
            pa: BABYLON.Vector3;
            pb: BABYLON.Vector3;
            n?: number;
        }, 
        scene: BABYLON.Scene
    ) {
        const n_ = options.n || 5
        const aa = BABYLON.MeshBuilder.CreateBox("", {}, scene)
        aa.position = options.pa
        this._bb = BABYLON.MeshBuilder.CreateCylinder("", {updatable: true}, scene)
        this._bb.position = options.pb

        let pts = []
        for (let i=0; i<=n_; i++) {
            // // need to check ts: 1/5 = 0 ?
            const ptmp = BABYLON.Vector3.Lerp(options.pa, options.pb, i/n_)
            const vtmp = this._noise4D(ptmp.x, ptmp.y, ptmp.z, 0)
            console.log(i, i/n_, vtmp)
            pts.push(
                new BABYLON.Vector3(ptmp.x, ptmp.y + vtmp*10, ptmp.z)
            )
        }

        //const _c = new BABYLON.Path3D(pts)
        const _c = BABYLON.Curve3.CreateCatmullRomSpline(pts, 20, false)

        //const cur = BABYLON.Mesh.CreateLines("", _c.getPoints(), scene)

        const cur = BABYLON.MeshBuilder.CreateLines("line", {points: _c.getPoints(),updatable: true}, scene)
        //const c = BABYLON.Mesh.


    }

    update(dt:number) {

    }
}