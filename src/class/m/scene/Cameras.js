import * as THREE from "three";
class Cameras {
	constructor() {}
	init(datas) {
		this.config = datas.config;		
		this.thirdPersonCamera = datas.thirdPersonCamera;
		this.vehicules = datas.vehicules;
		this.controls = datas.controls;
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
		if (this.controls) {
			if (this.controls.zooming) {
				this.thirdPersonCamera.handleZoom(this.controls.zooming);
				this.controls.zooming = false;
				// this._CameraManager.FollowPlayer(this.futurPositions,this.oldPosition,this.CameraNum)
			// console.log(this.zooming)
			}
		}
		this.thirdPersonCamera.update(this.vehicules._vehicule);
	}
}
export { Cameras };
