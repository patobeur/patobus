import { Config } from "./Config.js";
import { Formula } from "./m/Formula.js";
import { Canva } from "./m/dom/Canva.js";
import { DomManager } from "./m/dom/DomManager.js";
import { WindowActive } from "./m/dom/WindowActive.js";
import { Cameras } from "./m/scene/Cameras.js";
import { ThirdPersonCamera } from "./m/scene/ThirdPersonCamera.js";
import { Lights } from "./m/scene/Lights.js";
import { SceneManager } from "./m/scene/SceneManager.js";
import { Vehicules } from "./m/scene/Vehicules.js";
import { FloorsManager } from "./m/scene/FloorsManager.js";
import { Controls } from "./m/controls/Controls.js";
import { Orbital } from "./m/controls/Orbital.js";
import { ModelsConfig } from "./m/models/ModelsConfig.js";
import { ModelsManager } from "./m/models/ModelsManager.js";
import { M } from "./m/M.js";

class Game {
	constructor() {
		this.pause = false;
		this._M = new M();
		this.init();
	}
	init() {
		this._M.init({
			classList: {
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
				windowActive: new WindowActive(),
				thirdPersonCamera: new ThirdPersonCamera(),
				modelsConfig: new ModelsConfig(),
				modelsManager: new ModelsManager({
					callback: (allModelsAndAnimations) => {
						this.allModelsAndAnimations = allModelsAndAnimations;
						this.modelok();
					},
				}),
			},
			callback: (e) => {
				console.log('1',e);
				this._M.init_allinitiables({
					callback: (e) => {
						console.log('2',e);
					},
				}); // class with init()
			},
		});
	}

	modelok() {
		// this._M.orbital.init_OrbitControls();
		// ----------------------------------
		this._M.vehicules.init_vehicule();
		this._M.sceneManager.init_vehicule();
		this._M.cameras.update();
		this._M.canva.initRender();
		this._M.controls.start();
		this._M.dom.resizeListener(this._M.canva.renderer, this._M.cameras.camera);
		// ----------------------------------
		this.START();
	}
	START() {
		this._REFRESH();
	}
	_Step(timeElapsed) {
		timeElapsed = timeElapsed * 0.001;
		if (this._M.windowActive._windowActive === true) {
			this._M.vehicules._mooves();
			this._M.lights.rotateSun();
			this._M.cameras.update();
			this._M.cameras.camera.updateProjectionMatrix();
			// ----------------------------------
			this._M.canva.initRender();
			if (this._M.orbital.active) this._M.orbital.orbitControls.update();
			if (this.pause === true) this.pause = false;
		} else {
			if (this.pause === false) this.pause = true;
		}
	}
	_REFRESH() {
		requestAnimationFrame((t) => {
			if (this._previousREFRESH === null) this._previousREFRESH = t;
			this._REFRESH();
			this._Step(t - this._previousREFRESH);
			this._previousREFRESH = t;
		});
	}
}
export { Game };
