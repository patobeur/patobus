import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

import { Config } from "./Config.js";
import { Formula } from "./m/Formula.js";
import { Controls } from "./m/Controls.js";
import { Lights } from "./m/Lights.js";
import { Canva } from "./m/Canva.js";
import { DomManager } from "./m/DomManager.js";
import { Listeners } from "./m/Listeners.js";
import { M } from "./m/M.js";

class Game {
	_pause = false;
	_ControlsM;
	_Listener;
	_Config;
	_Dom;
	_Formula;

	_Scene;
	_Camera;
	_Canva;
	_OrbitControls;
	_Lights;
	_clock = new THREE.Clock();
	theta = 0;
	constructor() {
		this._M = new M();
		this._M.init({
			config:new Config(),
			formula:new Formula(),
			controls:new Controls(),
			dom:new DomManager(),
		});
		this._Canva = new Canva();

		this._Listener = new Listeners();

		this._init();
		this._initCamera();
	}
	_init() {
		// -- SCENE
		this._init_Scene();
		this._init_Camera();
		// this._init_Renderer();

		// if (this._Canva.canva.get_orbitcontrols()) {
		this._OrbitControls = new OrbitControls(
			this._Camera,
			this._Canva.canva.domElement
		);
		// }

		// -- LIGHTS
		this._Lights = new Lights(this._Scene, this._M.config);

		this._addFloor();
		this._addVehicule();
		// --
		// this._addCosmicAxeHelper()
		// --
		// adding canvas scene to dom
		// this._init_Dom();
		this._M.dom.appendChild(this._Canva.canva.domElement, document.body);
		// this._Dom.appendChild(this._Renderer.domElement, document.body);
		this._M.dom.resizeListener(this._Canva.canva, this._Camera);

		this._Listener.addListener();
		

		this.animate();
	}
	_initCamera() {
		// Créez une caméra de perspective
		this._Camera = new THREE.PerspectiveCamera(
			this._M.config.camera.fov,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		// Ajustez la position initiale de la caméra (par exemple, derrière le véhicule)
		this._Camera.position.x = 0;
		this._Camera.position.y = -10;
		this._Camera.position.z = 30;
		const lookAtVector = new THREE.Vector3(0, 0, 0);
		this._Camera.lookAt(lookAtVector);
	}

	_Animate = () => {
		console.log("update");
		this._checkMooves();
		// if (this._OrbitControls)
		// this._OrbitControls.update();
		this._Camera.updateProjectionMatrix();
		this._Renderer.render(this._Scene, this._Camera);
		requestAnimationFrame(this._Animate);
	};
	_checkMooves() {
		// console.log(this.vehicule.position)
		let oldpos = this.vehicule.position;
		if (this._M.controls.forward) {
			this._M.config.v.speed = 0.1;
		} else if (this._M.controls.reverse) {
			this._M.config.v.speed = -0.1;
		}
		if (this._M.controls.left) {
			this.theta += this._M.config.v.rotationAmplitude;
		} else if (this._M.controls.right) {
			this.theta -= this._M.config.v.rotationAmplitude;
		}

		if (this._M.controls.left || this._M.controls.right) {
			this.vehicule.rotation.z = this.theta;
		}
		if (this._M.controls.forward || this._M.controls.reverse) {
			let neoPos = this._M.formula.getNextPos(
				this.vehicule.position.x,
				this.vehicule.position.y,
				this.theta,
				this._M.config.v.speed
			);
			this.vehicule.position.x = neoPos.x;
			this.vehicule.position.y = neoPos.y;
			this._M.config.v.position = new THREE.Vector3(neoPos.x, neoPos.y, neoPos.z);
			this._updateCameraPosition();
		} else if (this._M.controls.reverse) console.log(this._M.controls.reverse);
	}
	_updateCameraPosition() {
		// Ajustez la position de la caméra pour suivre le véhicule
		const offset = new THREE.Vector3(0, -10, 30); // Ajustez l'offset de la caméra selon vos besoins
		const cameraPosition = this._M.config.v.position.clone().add(offset);
		this._Camera.position.copy(cameraPosition);
		this._Camera.lookAt(this._M.config.v.position);
	}
	// _init_Renderer() {
	// 	this._Renderer = new THREE.WebGLRenderer();
	// 	this._Renderer.domElement.id='game'
	// 	this._Renderer.setSize(window.innerWidth, window.innerHeight);
	// 	this._Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	// 	this._Renderer.outputEncoding = this._Canva.canva.get_value(
	// 		"canva",
	// 		"outputEncoding"
	// 	);
	// 	this._Renderer.shadowMap.enabled = this._Canva.canva.get_value(
	// 		"canva",
	// 		"shadowMap"
	// 	);;
	// 	// this._Renderer.outputEncoding = this._Canva.canva.get_Canva('outputEncoding')
	// 	// this._Renderer.shadowMap.enabled = this._Canva.canva.get_Canva('shadowMapenabled')

	// 	this._Renderer.shadowMap.type = this._Canva.canva.get_value(
	// 		"canva",
	// 		"shadowMaptype"
	// 	);

	// 	this._Renderer.setClearColor(
	// 		this._Canva.canva.get_value("canva", "clearcolor")
	// 		// this._Canva.canva.get_value("canva", "intensity")
	// 	);
	// }
	animate = () => {
		// cube.rotation.x += 0.01;
		// cube.rotation.y += 0.01;

		// canva.render(scene, camera);
		this._checkMooves();
		this._Camera.updateProjectionMatrix();
		this._Canva.canva.render(this._Scene, this._Camera);

		console.log("update");
		requestAnimationFrame(this.animate);
	};
	_init_Scene() {
		this._Scene = new THREE.Scene();
		this._Scene.name = "Trash";
	}
	_init_Dom() {
	}
	_init_Camera() {
		this._Camera = new THREE.PerspectiveCamera(
			this._M.config.camera.fov,
			this._M.config.camera.aspect,
			this._M.config.camera.near,
			this._M.config.camera.far
		);
		// this._Camera.rotation.z = Math.PI/4

		this._Camera.updateProjectionMatrix();
		// this._Camera = new THREE.OrthographicCamera(
		// 	window.innerWidth/2,
		// 	window.innerWidth/2,
		// 	window.innerHeight/2,
		// 	window.innerHeight/2,
		// 	1,
		// 	1000
		// );

		// this._Camera.aspect = window.innerWidth / window.innerHeight;
		// this._Camera.position.set(this._Canva.canva.camera.pos);
		// this._Camera.position.x = this._Canva.canva.camera.position.x
		// this._Camera.position.y = this._Canva.canva.camera.position.y
		// this._Camera.position.z = this._Canva.canva.camera.position.z
		// this._Camera.lookAt.x = this._Canva.canva.camera.lookat.x
		// this._Camera.lookAt.y = this._Canva.canva.camera.lookat.y
		// this._Camera.lookAt.z = this._Canva.canva.camera.lookat.z

		this._Camera.position.x = 0;
		this._Camera.position.y = -10;
		this._Camera.position.z = 30;

		let newVector3 = new THREE.Vector3(0, 0, 0);
		this._Camera.lookAt(newVector3);

		// this._Camera.rotation.y = Math.PI /3
	}
	_hydrateCosmos() {
		// https://codepen.io/Anna_Batura/pen/eYVqoxd
		var geometry = new THREE.SphereGeometry(0.6, 10, 10);
		var material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			flatShading: THREE.FlatShading,
		});
		for (var i = 0; i < 10000; i++) {
			var mesh = new THREE.Mesh(geometry, material);

			mesh.position
				.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
				.normalize();

			mesh.position.multiplyScalar(500 + Math.random() * 500);
			mesh.rotation.set(
				Math.random() * 3,
				Math.random() * 3,
				Math.random() * 3
			);
			this._Scene.add(mesh);
		}
	}
	_gridMap() {
		// Sea
		// let type = 'floors';
		// let imagefloor = 'grid64_512_blanc.png';
		// let imagefloorBump = 'grid64_512.png';
		// let floorPath = '../assets/img/' + type + '/' + imagefloor
		// let floorBumpPath = '../assets/img/' + type + '/' + imagefloorBump

		// var floor = new THREE.TextureLoader().load(floorPath);
		// floor.repeat.set(5, 5);
		// floor.wrapS = floor.wrapT = THREE.RepeatWrapping;

		// var floorBump = new THREE.TextureLoader().load(floorBumpPath);
		// floorBump.repeat.set(4, 4);
		// floorBump.wrapS = floorBump.wrapT = THREE.RepeatWrapping;

		// var material = new THREE.MeshToonMaterial({//MeshToonMaterial
		// 	map: floor,
		// 	bumpMap: floorBump,
		// 	side: THREE.DoubleSide,
		// 	// 		transparent: true,
		// 	bumpScale: 100,
		// 	// opacity: 0.5, transparent: true
		// });

		// var geometry = new THREE.PlaneGeometry(512, 512);
		// var mesh = new THREE.Mesh(geometry, material);

		const groundGeometry = new THREE.BoxGeometry(90, 90, 0.5);
		const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
		var mesh = new THREE.Mesh(groundGeometry, groundMaterial);

		mesh.receiveShadow = true;
		mesh.castShadow = true;
		mesh.rotation.x = -Math.PI / 2;
		mesh.position.y = -5;
		// mesh.castShadow = true;
		mesh.name = "thefloor";

		this._Scene.add(mesh);
	}
	_tryBackground() {
		let type = "background";
		let imagefloor = "2k_stars_milky_way.jpg";
		let imagePath = "../assets/img/" + type + "/" + imagefloor;
		this._Scene.background = new THREE.TextureLoader().load(imagePath);
	}
	_addFloor() {
		// set up red box mesh
		const bg1 = new THREE.BoxGeometry(10, 10, 0.1);
		const bm1 = new THREE.MeshPhongMaterial({ color: 0xffffff });
		const boxMesh1 = new THREE.Mesh(bg1, bm1);
		boxMesh1.castShadow = true;
		boxMesh1.position.x = 0;
		boxMesh1.position.y = 0;
		boxMesh1.position.z = 0.05;
		boxMesh1.rotation.z = Math.PI / 2;
		this._Scene.add(boxMesh1);
	}
	_addVehicule() {
		const bg1 = new THREE.BoxGeometry(
			this._M.config.v.size.x,
			this._M.config.v.size.y,
			this._M.config.v.size.z
		);
		const bm1 = new THREE.MeshPhongMaterial({ color: 0xffff00 });
		this.vehicule = new THREE.Mesh(bg1, bm1);
		this.vehicule.castShadow = true;
		this.vehicule.position.x = 0;
		this.vehicule.position.y = 0;
		(this.vehicule.position.z = 1), 5;
		this.vehicule.rotation.z = 0;
		this._Scene.add(this.vehicule);
	}
}
export { Game };
