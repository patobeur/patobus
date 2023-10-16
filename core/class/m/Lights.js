import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
class Lights {
	#Config;
	#Scene;
	#ambientLight;
	#directionalLight;
	constructor(Scene, Config) {
		this.#Scene = Scene;
		this.#Config = Config;
		this.#Init();
	}
	#Init() {
		console.log("Lights Mounted !");
		this.#init_Lights();
	}
	#init_Lights() {
		if (this.#Config.ambientLight) {
			this.#ambientLight = new THREE.AmbientLight(
				this.#Config.ambientLight.color,
				this.#Config.ambientLight.intensity
			);
			if (this.#ambientLight) {
				this.#Scene.add(this.#ambientLight);
			}
		}
		if (this.#Config.directionalLight) {
			console.log(this.#Config.directionalLight)
			this.#directionalLight = new THREE.DirectionalLight(
				this.#Config.directionalLight.color,
				this.#Config.directionalLight.intensity
			);
			this.#directionalLight.position.set(
				this.#Config.directionalLight.position.x,
				this.#Config.directionalLight.position.y,
				this.#Config.directionalLight.position.z
			);
			// this.#directionalLight.penumbra = 1;
			// this.#directionalLight.decay = 1;
			// this.#directionalLight.distance = 2000;
			// this.#directionalLight.shadow.mapSize.width = 1024;
			// this.#directionalLight.shadow.mapSize.height = 1024;
			// this.#directionalLight.shadow.camera.near = 0.001;
			// this.#directionalLight.shadow.camera.far = 2000;
			// this.#directionalLight.shadow.focus = 1;
			// this.#directionalLight.castShadow =
			// 	this.#Config.directionalLight.castShadow;
			this.#Scene.add(this.#directionalLight);
		}
		//this.#testingPointLight(new THREE.Vector3(0, 100, 0))	}
		this.#testingPointLight2();
	}
	#testingPointLight2() {
		// set up spot light + helper
		const spotLight = new THREE.SpotLight(0xffffff, 1);
		spotLight.position.set(200, 200, 200);
		spotLight.angle = Math.PI / 3;
		spotLight.penumbra = 0.1;
		spotLight.decay = 2;
		spotLight.distance = 1000;

		spotLight.castShadow = true;
		spotLight.shadow.mapSize.width = 512;
		spotLight.shadow.mapSize.height = 512;
		spotLight.shadow.camera.near = 1;
		spotLight.shadow.camera.far = 200;
		spotLight.shadow.focus = 1;

		// const slHelper = new THREE.SpotLightHelper(spotLight);
		this.#Scene.add(spotLight, spotLight.target);
	}
}
export { Lights };
