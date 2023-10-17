import * as THREE from "three";
class Canva {
	constructor() {}
	init(datas) {
		this.sceneManager = datas.sceneManager;
		this.config = datas.config;
		this.dom = datas.dom;
		// -----------------------------------------------
		this.renderer = new THREE.WebGLRenderer({ antialias: true });

		this.renderer.domElement.id = "game";
		// this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.gammaFactor = 2.2;
		this.renderer.setClearColor(0x0000ff, new Number(0.0));
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		this.config.MaxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
	}
	initRender() {
		this.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
		this.dom.appendChild(this.renderer.domElement, document.body);
	}
}
export { Canva };
