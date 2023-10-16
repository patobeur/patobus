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
			0.1,
			1000
		);
		this.camera.position.x = this.config.camera.position.x;
		this.camera.position.y = this.config.camera.position.y;
		this.camera.position.z = this.config.camera.position.z;
		this.thirdPersonCamera.init({
			camera: this.camera
		});
	}
	update() {
		this.thirdPersonCamera.update(this.vehicules._vehicule);
	}
	updateCameraPosition(target) {
		this.camera.position.copy(
			target.position.clone().add(this.config.camera.offset)
		);
		this.camera.lookAt(target.position);
	}
	// ------------------------------------
	// ------------------------------------
	// ------------------------------------
	// ------------------------------------
}
export { Cameras };
