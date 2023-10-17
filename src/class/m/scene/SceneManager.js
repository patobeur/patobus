import * as THREE from "three";
class SceneManager {
	constructor() {}
	init(datas) {
		this.config = datas.config;
		// ----------------------------------
		this.scene = new THREE.Scene();
		this.scene.name = "WTFScene";
		// ----------------------------------
		this._Lights = datas.lights;
		this._Cameras = datas.cameras;
		this._FloorsManager = datas.floorsManager;
		this._Vehicules = datas.vehicules;
		// ----------------------------------
		this.lights = this._Lights.lights;
		this.camera = this._Cameras.camera;
		this.vehicule = this._Vehicules._vehicule;
		this.allFloors = this._FloorsManager.allFloors;
		// les lumières----------------------
		// les lumières
		for (const key in this.lights) {
			if (Object.hasOwnProperty.call(this.lights, key)) {
				this.scene.add(this.lights[key]);
			}
		}
		// le reste--------------------------
		if (this.allFloors[0]) this.scene.add(this.allFloors[0]);
		this.scene.add(this.camera);
		// ----------------------------------
		// this.listener = new Listeners();
		// this._M.dom.resizeListener(this.canva.renderer, this.camera);
	}
	init_vehicule() {
		this.vehicule = this._Vehicules._vehicule;
		this.scene.add(this.vehicule);
	}
}
export { SceneManager };
