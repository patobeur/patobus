import * as THREE from "three";

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
import { Orbital } from "./m/Orbital.js";
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
			orbital: new Orbital(),
		});
		// ----------------------------------
		this._M.setinitiables();
		this._M.init_allinitiables();
		// ----------------------------------
		// this._M..init_OrbitControls();
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
		this._M.orbital.orbitControls.update();
		requestAnimationFrame(this._animate);
	};
}
export { Game };
