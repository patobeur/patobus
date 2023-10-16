import * as THREE from "three";
class FloorsManager {
	constructor() {
		this.activatedNumFloors = []
		this.allFloors = []
	}
	init(datas) {
		this.config = datas.config;
		this.addFirstFloor();
	}
	addFirstFloor() {
		this.newFloorMesh = this._get_floorMesh(this.config.defaultMapNum);
		this.activatedNumFloors.push(this.config.defaultMapNum)
		this.allFloors.push(this.newFloorMesh)
	}
	addNewFloor(scene,newMapNum) {
			let newFloorMesh = this._get_floorMesh(newMapNum);
			this.activatedNumFloors.push(newMapNum)
			this.allFloors.push(newFloorMesh)
			scene.add(newFloorMesh)
	}
	_get_floorMesh = (MapNum) => {
		let floorConfig = this.config.floors[MapNum];
		var groundGeometry = false;
		var groundMaterial = false;
		var mesh = false;

		switch (floorConfig.mode.type) {
			case "BoxGeometry":
				groundGeometry = new THREE.BoxGeometry(
					floorConfig.size.x,
					floorConfig.size.y,
					floorConfig.size.z
				);
				groundMaterial = new THREE.MeshPhongMaterial({
					color: floorConfig.color,
				});
				mesh = new THREE.Mesh(groundGeometry, groundMaterial);
				mesh.position.x = floorConfig.position.x;
				mesh.position.y = floorConfig.position.y;
				mesh.position.z = -(floorConfig.size.z / 2);
				break;
			case "PlaneGeometry":
				if (floorConfig.mode.fileName) {
					const mapLoader = new THREE.TextureLoader();
					const boardTexture = mapLoader.load(
						this.config.floorsRootPath + floorConfig.mode.fileName
					);
					// boardTexture.encoding = THREE.sRGBEncoding;
					boardTexture.anisotropy = this.config.MaxAnisotropy;
					boardTexture.repeat.set(
						(floorConfig.size.x / floorConfig.repeat[0]) * 2,
						(floorConfig.size.y / floorConfig.repeat[1]) * 2
					);

					boardTexture.wrapS = THREE.RepeatWrapping;
					boardTexture.wrapT = THREE.RepeatWrapping;
					mesh = new THREE.Mesh(
						new THREE.PlaneGeometry(
							floorConfig.size.x,
							floorConfig.size.y,
							10,
							10
						),
						new THREE.MeshStandardMaterial({ map: boardTexture })
					);
					mesh.position.x = floorConfig.position.x;
					mesh.position.y = floorConfig.position.y;
					mesh.position.z = 0;

				}
				break;
			default:
				break;
		}
		// create mesh
		if (!mesh === false) {
			mesh.castShadow = false;
			mesh.receiveShadow = true;
			mesh.name = "floor_" + floorConfig.name;
			// si une position est indiqué
			// if(!typeof floorConfig.position === 'undefined') mesh.position.set(floorConfig.position);
			return mesh;
		}
		return false;
	};
}
export { FloorsManager };
