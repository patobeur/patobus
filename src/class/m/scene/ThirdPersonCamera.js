import * as THREE from "three";
class ThirdPersonCamera {
	constructor() {
		this.active = true;
	}
	initialise(params) {
		this._config = params.config;
		this.camera = params.camera;
		this.target = params.target;

		this.idealOffset = new THREE.Vector3();
		this.idealLookat = new THREE.Vector3();
		this.idealOffset.copy(this._config.camera.idealOffset);
		this.idealLookat.copy(this._config.camera.idealLookat);

		this._currentPosition = new THREE.Vector3();
		this._currentLookat = new THREE.Vector3();
	}
	_calculateIdealOffset() {
		const idealOffsetA = new THREE.Vector3();
		idealOffsetA.copy(this.idealOffset);
		// idealOffset.applyQuaternion(this.target.rotation);
		idealOffsetA.add(this.target.position);
		return idealOffsetA;
	}
	_calculateIdealLookat() {
		const idealLookatA = new THREE.Vector3();
		idealLookatA.copy(this.idealLookat);
		// idealLookatA.applyQuaternion(this.target.rotation);
		idealLookatA.add(this.target.position);
		return idealLookatA;
	}
	update(target) {
		if (this.active) {
			// console.log(target.position)
			this.target = target;
			// let idealOffset = this._calculateIdealOffset();
			// let idealLookat = this._calculateIdealLookat();
			this._currentPosition = this._calculateIdealOffset();
			this._currentLookat = this._calculateIdealLookat();

			// this._currentPosition.copy(idealOffset);
			// this._currentLookat.copy(idealLookat);

			this.camera.position.copy(this._currentPosition);
			this.camera.lookAt(this._currentLookat)
			// this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		}
	}
	handleZoom(zooming) {
		// console.log('zooming',zooming)
		let step = this._config.camera.zoom.z.step;
		let apresZoomz = ((zooming === "out") ? step : -step);
// console.log('step',step)
		let zmax = Math.max(
			this._config.camera.zoom.z.min,
			this.idealOffset.z + apresZoomz
		);
		let z = Math.min(zmax, this._config.camera.zoom.z.max);

		// let ymax = Math.max(this._CamerasConfig[CameraNum].zoom.y.min, this._CamerasConfig[CameraNum].followDecalage.y + apresZoomz)
		// let y = Math.min(ymax, this._CamerasConfig[CameraNum].zoom.y.max)

		this.idealOffset.z = z;
		// this._CamerasConfig[CameraNum].followDecalage.y = y;
	}
}
export { ThirdPersonCamera };
