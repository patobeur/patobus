import * as THREE from "three";
class Lights {
	constructor() {}
	init(datas) {
		this.config = datas.config;
		this.lights = [];
		this._init_Lights();
		this._push_Lights();
	}
	_init_Lights() {
		this._set_Sun();
		this._set_ambientLight();
		this._set_directionalLight();
		this._set_spotLight();
		this._set_bulb(0xffffff, 40, 1);
	}
	_push_Lights() {
		this.lights.push(this.sun);

		if (this.ambientLight) this.lights.push(this.ambientLight);
		if (this.directionalLight) this.lights.push(this.directionalLight);
		if (this.spotLight) this.lights.push(this.spotLight);
		if (this.bulb) this.lights.push(this.bulb);
	}
	_set_Sun() {
		this.sun = new THREE.DirectionalLight(
			this.config.sun.color,
			this.config.sun.power
		);

		this.sun.castShadow = true;
		this.sun.shadow.bias = -0.001;

		this.sun.shadow.mapSize.width = 2048;
		this.sun.shadow.mapSize.height = 2048;
		this.sun.shadow.camera.near = 0.5;
		this.sun.shadow.camera.far = 500.0;
		this.sun.shadow.camera.left = 100;
		this.sun.shadow.camera.right = -100;
		this.sun.shadow.camera.top = 100;
		this.sun.shadow.camera.bottom = -100;
		this.sun.position.set(
			this.config.sun.position.x,
			this.config.sun.position.y,
			this.config.sun.position.z
		);
		this.sunDistance = this.sun.position.distanceTo(new THREE.Vector3(0, 0, 0));
		this.sun.direction = { x: 0, y: 0, z: 0 };
		this.sun.vitessesDeRotation = new THREE.Vector3(1 / 30, 1 / 30, 1 / 30);
		// this.sunGroupe.add(this.sun)
		// this.sunGroupe.add(this.Sol)
		// this.sunGroupe.add(bulbLight)
	}
	_set_ambientLight() {
		if (this.config.ambientLight) {
			// this.ambientLight = new THREE.AmbientLight(
			// 	this.config.ambientLight.color,
			// 	this.config.ambientLight.intensity
			// );
			this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
			if (this.ambientLight) {
				this.ambientLight.name = "ambientLight";
				// this.ambientLight.castShadow = true
			}
		}
	}
	_set_directionalLight() {
		if (this.config.directionalLight) {
			// this.directionalLight = new THREE.DirectionalLight(
			// 	this.config.directionalLight.color,
			// 	this.config.directionalLight.intensity
			// );
			this.directionalLight = new THREE.DirectionalLight(
				this.config.directionalLight.color,
				this.config.directionalLight.intensity
			);
			this.directionalLight.name = "directionalLight";
			this.directionalLight.position.set(
				this.config.directionalLight.position.x,
				this.config.directionalLight.position.y,
				this.config.directionalLight.position.z
			);
			// this.directionalLight.position.set(1, 1, 30);
			this.directionalLight.penumbra = 1;
			this.directionalLight.decay = 1;
			this.directionalLight.distance = 2000;
			this.directionalLight.shadow.mapSize.width = 1024;
			this.directionalLight.shadow.mapSize.height = 1024;
			this.directionalLight.shadow.camera.near = 0.001;
			this.directionalLight.shadow.camera.far = 2000;
			this.directionalLight.shadow.focus = 1;
			this.directionalLight.castShadow = true;
		}
	}
	_set_spotLight() {
		if (this.config.spotLight) {
			// set up spot light + helper
			this.spotLight = new THREE.SpotLight(0xff0000, 1);
			this.spotLight.name = "spotLight";
			this.spotLight.angle = Math.PI / 3;
			this.spotLight.penumbra = 0.1;
			this.spotLight.decay = 2;
			this.spotLight.distance = 1000;

			this.spotLight.shadow.mapSize.width = 512;
			this.spotLight.shadow.mapSize.height = 512;
			this.spotLight.shadow.camera.near = 1;
			this.spotLight.shadow.camera.far = 200;
			this.spotLight.shadow.focus = 0.8;
			this.spotLight.castShadow = true;
			this.spotLight.position.set(3, 3, 0);
		}
	}
	_set_bulb(color, power, index) {
		let bulbGeometry = new THREE.SphereGeometry(0.5, 16, 8);
		let bulbMat = new THREE.MeshStandardMaterial({
			emissive: color,
			emissiveIntensity: 1,
			color: 0xffffff00,
		});
		this.bulb = new THREE.PointLight(0xffffff, 0.5, 200, 0.2);
		this.bulb.castShadow = true;
		this.bulb.add(new THREE.Mesh(bulbGeometry, bulbMat));
		this.bulb.power = power;
		this.bulb.name = "bulb_" + index;
		
		this.bulb.position.set(0, 0, 30);

	}
	rotateSun = (object = false) => {
		if (object === false) {
			object = this.sun;
		}
		// if (objet.position.z<0) {
		// 	// nigth mode faster
		// }
		const periodeDeRotations = {
			x: (1 / this.sun.vitessesDeRotation.x) * 1000, // en millisecondes
			y: (1 / this.sun.vitessesDeRotation.y) * 1000,
			z: (1 / this.sun.vitessesDeRotation.z) * 1000,
		};
		const times = {
			x: performance.now() % periodeDeRotations.x, //temps écoulé
			y: performance.now() % periodeDeRotations.y,
			z: performance.now() % periodeDeRotations.z,
		};
		object.position.x =
			this.sunDistance *
			Math.sin((times.x / periodeDeRotations.x) * 2 * Math.PI);
		object.position.y =
			this.sunDistance *
			Math.sin((times.y / periodeDeRotations.y) * 2 * Math.PI);
		object.position.z =
			this.sunDistance *
			Math.cos((times.z / periodeDeRotations.z) * 2 * Math.PI);
	};
}
export { Lights };
