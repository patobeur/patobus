import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

class Canva {
	constructor() {
		this.canva = new THREE.WebGLRenderer({ antialias: true });
		this.canva.domElement.id='game'
		this.canva.outputEncoding = THREE.sRGBEncoding;
		this.canva.shadowMap.enabled = true;
		this.canva.shadowMap.type = THREE.PCFSoftShadowMap;
		this.canva.gammaFactor = 2.2;
		this.canva.setClearColor(0x0000ff, new Number(0.0));
		this.canva.setSize(window.innerWidth, window.innerHeight);
		this.canva.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}
	_init(M) {
		this.config = M.config;
	}
}
export { Canva };
