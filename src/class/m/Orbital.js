
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
class Orbital {
	constructor() {
	}
	init(datas) {
		this.sceneManager = datas.sceneManager;
		this.canva = datas.canva;
		this.orbitControlsClass = datas.orbitControls;
		this.init_OrbitControls()
		
	}
	init_OrbitControls(){
		this.orbitControls = new OrbitControls(
			this.sceneManager.camera,
			this.canva.renderer.domElement
		);
		// target
		this.orbitControls.target =
		this.sceneManager._Vehicules._vehicule.position.clone();
		// target
		this.orbitControls.panSpeed = 1;
		this.orbitControls.rotateSpeed = 0.5;
		// target
		this.orbitControls.maxDistance = 35.0;
		this.orbitControls.minDistance = 10.0;
		// this.orbitControls.minPolarAngle = Math.PI/3;
		// this.orbitControls.maxPolarAngle = Math.PI;

		// target
		this.orbitControls.enableDamping = true;
		this.orbitControls.dampingFactor = 0.05;
		// let distance = this.orbitControls.getDistance();

		// this.orbitControls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
		// this.orbitControls.mouseButtons.LEFT = false//THREE.MOUSE.ROTATE;
		// this.orbitControls.autoRotate = true;
		// this.orbitControls.autoRotateSpeed = 0.2;

		// this.orbitControls.enableDoll = false

		// this.orbitControls.touches = {
		// 	ONE: THREE.TOUCH.ROTATE,
		// 	TWO: THREE.TOUCH.DOLLY_PAN
		// }
		// this.orbitControls.maxAzimuthAngle=Math.PI
		this.orbitControls.update();
	}
}
export { Orbital };
