import * as THREE from "three";
class ThirdPersonCamera {
	constructor() {
		this.active = true;
		this.idealOffset = new THREE.Vector3(0, 0, 25);
		this.idealLookat = new THREE.Vector3(0, 3, 5);
	}
	init(params) {
		this._camera = params.camera;

		this._currentPosition = new THREE.Vector3();
		this._currentLookat = new THREE.Vector3();
	}
	_calculateIdealOffset() {
		const idealOffsetA = new THREE.Vector3();
		idealOffsetA.copy(this.idealOffset)
		// idealOffset.applyQuaternion(this.target.rotation);
		idealOffsetA.add(this.target.position);
		return idealOffsetA;
	}
	_calculateIdealLookat() {
		const idealLookatA = new THREE.Vector3();
		idealLookatA.copy(this.idealLookat)
		// idealLookat.applyQuaternion(this.target.rotation);
		idealLookatA.add(this.target.position);
		return idealLookatA;
	}
	update(target) {
		if (this.active) {
			// console.log(target.position)
			this.target = target;
			const idealOffset = this._calculateIdealOffset();
			const idealLookat = this._calculateIdealLookat();
			// console.log(idealOffset)
			// console.log(idealLookat)
			this._currentPosition.copy(idealOffset);
			this._currentLookat.copy(idealLookat);
			this._camera.position.copy(this._currentPosition)
			// this._camera.lookAt.copy(this._currentLookat)
		}
	}
}
export { ThirdPersonCamera };
