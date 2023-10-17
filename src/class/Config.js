import * as THREE from "three";
class Config {
	name='PatoBus'
	pauseModalText='PatoBus'
	constructor() {
		this._setConfig();
	}
	_setConfig() {
		this.floorsRootPath = "./floors/";
		this.defaultMapNum = 0;
		this.floors = {
			0: {
				name: "groundZero",
				next:[1],
				fullName: "Lobby Room",
				// mode: { type: "BoxGeometry" },
				mode: {
					type: "PlaneGeometry",
					fileName: "stone_floor_736x736.jpg",
					size: { x: 512, y: 512 },
				},
				color: 0xFFeaea,
				receiveShadow: true,
				repeat: [64, 64],
				spawns: [
					{ x: 0, y: 0, z: 5 },
					{ x: 0, y: 0, z: 0 },
				],
				mobs: { number: 1 },
				size: { x: 2048, y: 2048, z: 0 },
				position: { x: 0, y: 0, z: 0 },
			},
			1: {
				name: "groundTwo",
				next:[3],
				fullName: "Ground-Two",
				mode: { type: "BoxGeometry" },
				size: { x: 64, y: 64, z: 1 },
				position: { x: 0, y: 80, z: .5 },
				color: 0x1010ff,
				receiveShadow: true,
				repeat: [32, 32],
				spawns: [
					{ x: 0, y: -30, z: 20 },
					{ x: 0, y: 0, z: 15 },
				],
				mobs: { number: 1},
			},
		};
		this.renderer = {
			color: 0xb7c3f3,
			// clearcolor,intensity
			shadowMapenabled: true,
			colorManagement: true,
			// outputEncoding: THREE.SRGBColorSpace,
			// outputEncoding: THREE.sRGBEncoding,
		};
		this.sun = {
			name: "soleil",
			color: 0xffffff,
			power: 1,
			position: new THREE.Vector3(-30, 0, 0),
			rotation: new THREE.Vector3(0.2, 0.2, 0.2),
			size: (5, 16, 5),
			mat: {
				color: 0xffffff00,
				emissive: 0xffffff,
				emissiveIntensity: 2,
			},
		};

		this.ambientLight = {
			color: 0xffffff,
			intensity: 0,
		};
		this.directionalLight = {
			color: 0x00ffff,
			intensity: 0.3,
			castShadow: true,
			position: new THREE.Vector3(0, 3, 2),
			lookat: new THREE.Vector3(0, 0, 0),
		};
		this.spotLight = {
			color: 0xff00ff,
			intensity: 0.7,
			position: new THREE.Vector3(0, 100, 0),
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
			position: new THREE.Vector3(0, 0, 50),
			idealLookat: new THREE.Vector3(0, 50, 0),
			idealOffset: new THREE.Vector3(0, 0, 35), // same as position
		};
		this.vehicule = {
			velocity:new THREE.Vector3(.2, 0,0),
			rotation: new THREE.Vector3(0, 0, 0),
			rotationAmplitude: Math.PI / 90,
			size: { x: 2, y: 4, z: 1 },
			position: new THREE.Vector3(0, 0, .5),
		};
	}
}
export { Config };
