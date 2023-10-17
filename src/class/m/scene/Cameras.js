import * as THREE from "three";
class Cameras {
	constructor() {}
	init(datas) {
		this.config = datas.config;		
		this.thirdPersonCamera = datas.thirdPersonCamera;
		this.vehicules = datas.vehicules;
		
		this.init_camera();
	}
	init_camera() {
		this.camera = new THREE.PerspectiveCamera(
			this.config.camera.fov,
			window.innerWidth / window.innerHeight,
			this.config.camera.near,
			this.config.camera.far
		);
		this.camera.position.x = this.config.camera.idealOffset.x;
		this.camera.position.y = this.config.camera.idealOffset.y;
		this.camera.position.z = this.config.camera.idealOffset.z;

		this.thirdPersonCamera.initialise({
			config: this.config,
			camera: this.camera,
			target: this.vehicules._vehicule
		});
	}
	update() {
		this.thirdPersonCamera.update(this.vehicules._vehicule);
	}
	// updateCameraPosition(target) {
	// 	this.camera.position.copy(
	// 		target.position.clone().add(this.config.camera.idealOffset)
	// 	);
	// 	this.camera.lookAt(target.position);
	// }
	// ------------------------------------
	// ------------------------------------
	// ------------------------------------
	// ------------------------------------
}
export { Cameras };
