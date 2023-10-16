import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
class Config {
	#orbitcontrols = true;
	constructor() {
		this.#Init();
	}
	#Init() {
		this.renderer = {
			color: 0xb7c3f3,
			// clearcolor,intensity
			shadowMapenabled: true,
			colorManagement: true,
			// outputEncoding: THREE.SRGBColorSpace,
			outputEncoding: THREE.sRGBEncoding,
		};
		this.ambientLight = {
			color: 0xffffff,
			intensity: 0,
		};
		this.directionalLight = {
			color: 0xffffff,
			intensity: 0.3,
			castShadow: true,
			position: new THREE.Vector3(0, 300, 0),
			lookat: new THREE.Vector3(0, 0, 0),
		};
		this.spotLight = {
			color: 0xffffff,
			intensity: 0.7,
			position: new THREE.Vector3(100, 0, 0),
			angle: Math.PI / 4,
			penumbra: 0.1,
			decay: 0.1,
			distance: 0.1,
			castShadow: {
				mapSize: {
					width: 512,
					height: 512,
				},
				camera: {
					near: 1,
					far: 200,
				},
				focus: 1,
			},
			lookat: new THREE.Vector3(0, 0, 0),
		};
		this.camera = {
			fov: 40,
			aspect: window.innerWidth / window.innerHeight,
			near: 0.0001,
			far: 10000,
			position: new THREE.Vector3(0, -10, 5),
			lookat: new THREE.Vector3(0, 0, -5),
		};
		this.v = {
			speed: 0.4,
			rotationAmplitude: Math.PI / 90,
			size: { x: 2, y: 4, z: 1 },
			position: new THREE.Vector3(0, 0, 0),
		};
	}
	// get_value(valuename, value) {
	// 	if (this[valuename] && this[valuename][value]) {
	// 		return this[valuename][value];
	// 	}
	// 	console.log(
	// 		"'" + valuename + "' ou '" + value + "' n'existe pas (get_value)"
	// 	);
	// }
	// get_renderer(value) {
	// 	if (this.renderer && this.renderer[value]) {
	// 		return this.renderer[value]
	// 	}
	// 	console.log("'" + value + '" n\'existe pas (get_renderer)')
	// }
	// get_directionalLight(value) {
	// 	if (this.directionalLight && this.directionalLight[value]) {
	// 		return this.directionalLight[value];
	// 	}
	// 	console.log("'" + value + "\" n'existe pas (get_directionalLight)");
	// }
	// get_ambientLight(value) {
	// 	if (this.ambientLight && this.ambientLight[value]) {
	// 		return this.ambientLight[value];
	// 	}
	// 	console.log("'" + value + "\" n'existe pas (get_ambientLight)");
	// }
	// get_orbitcontrols() {
	// 	return this.#orbitcontrols;
	// }
}
export { Config };
