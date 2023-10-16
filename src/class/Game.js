// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import * as THREE from "three";
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Config } from "./Config.js";
import { Formula } from "./m/Formula.js";
import { Controls } from "./m/Controls.js";
import { Cameras } from "./m/scene/Cameras.js";
import { Lights } from "./m/scene/Lights.js";

import { Canva } from "./m/Canva.js";
import { SceneManager } from "./m/SceneManager.js";

import { DomManager } from "./m/DomManager.js";
import { Vehicules } from "./m/scene/Vehicules.js";
import { FloorsManager } from "./m/scene/FloorsManager.js";
// import { Listeners } from "./m/Listeners.js";
import { M } from "./m/M.js";

class Game {
	constructor() {
		this._M = new M();
		this._M.init({
			config: new Config(),
			formula: new Formula(),
			controls: new Controls(),
			sceneManager: new SceneManager(),
			floorsManager: new FloorsManager(),
			cameras: new Cameras(),
			dom: new DomManager(),
			canva: new Canva(),
			lights: new Lights(),
			vehicules: new Vehicules(),
		});
		// ----------------------------------
		this._M.setinitiables();
		this._M.init_allinitiables();
		// ----------------------------------
		this.init_OrbitControls();
		// ----------------------------------
		this._M.canva.initRender();
		this._M.dom.resizeListener(this._M.canva.renderer, this._M.cameras.camera);
		// ----------------------------------
		this._animate();
	}

	_animate = () => {
		console.log("update");
		// ----------------------------------
		this._M.sceneManager._Vehicules._mooves();
		this._M.sceneManager._Lights.rotateSun();
		this._M.sceneManager.camera.updateProjectionMatrix();
		// ----------------------------------
		this._M.canva.initRender();
		// ----------------------------------
		this.orbitControls.update();
		requestAnimationFrame(this._animate);
	};
	init_OrbitControls(){
		this.orbitControls = new OrbitControls(
			this._M.cameras.camera,
			this._M.canva.renderer.domElement
		);
		// target
		this.orbitControls.target =
			this._M.sceneManager._Vehicules._vehicule.position.clone();
		// target
		this.orbitControls.panSpeed = 1;
		this.orbitControls.rotateSpeed = 0.5;
		// target
		this.orbitControls.maxDistance = 35.0;
		this.orbitControls.minDistance = 10.0;
		// this.orbitControls.minPolarAngle = Math.PI/3;
		// this.orbitControls.maxPolarAngle = Math.PI;

		// target
		this.orbitControls.enableDamping = true;
		this.orbitControls.dampingFactor = 0.05;
		// let distance = this.orbitControls.getDistance();

		// this.orbitControls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
		// this.orbitControls.mouseButtons.LEFT = false//THREE.MOUSE.ROTATE;
		// this.orbitControls.autoRotate = true;
		// this.orbitControls.autoRotateSpeed = 0.2;

		// this.orbitControls.enableDoll = false

		// this.orbitControls.touches = {
		// 	ONE: THREE.TOUCH.ROTATE,
		// 	TWO: THREE.TOUCH.DOLLY_PAN
		// }
		// this.orbitControls.maxAzimuthAngle=Math.PI
		this.orbitControls.update();
	}
}
export { Game };
