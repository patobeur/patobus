import * as THREE from "three";
class Vehicules {
	constructor() {
		this._stats = {};
		this._oldstats = {};
		this._vehicule = null;
	}
	init(datas) {
		this.config = datas.config;
		this.controls = datas.controls;
		this.formula = datas.formula;
		this.init_vehicule();
	}
	init_vehicule() {
		this._stats = {
			position: this.config.vehicule.position,
			rotation: this.config.vehicule.rotation,
			velocity: this.config.vehicule.velocity,
			rotationAmplitude: this.config.vehicule.rotationAmplitude,
			sens: 1,
		};
		this._oldstats = this._stats;
		this._vehicule = new THREE.Mesh(
			new THREE.BoxGeometry(
				this.config.vehicule.size.x,
				this.config.vehicule.size.y,
				this.config.vehicule.size.z
			),
			new THREE.MeshBasicMaterial({
				color: 0x00ff00,
			})
		);
		this._vehicule.name = "vehicule";
		this._vehicule.castShadow = true;
		this._vehicule.receiveShadow = true;
	}
	_saveStats() {
		this._oldstats.position.copy(this._stats.position.clone());
	}
	_mooves() {
		this._saveStats();
		if (this.controls.forward) {
			this.sens = 1;
		} else if (this.controls.reverse) {
			this.sens = -1;
		}
		if (this.controls.left) {
			this._vehicule.rotation.z += this._stats.rotationAmplitude;
		} else if (this.controls.right) {
			this._vehicule.rotation.z -= this._stats.rotationAmplitude;
		}
		if (this.controls.forward || this.controls.reverse) {
			let speed = this._stats.velocity.x * this.sens;
			let neoPos = this.formula.getNextPos(
				this._vehicule.position.x,
				this._vehicule.position.y,
				this._vehicule.rotation.z,
				speed
			);
			this._vehicule.position.x = neoPos.x;
			this._vehicule.position.y = neoPos.y;
		}
	}
}
export { Vehicules };
