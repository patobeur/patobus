class ModelsConfig {
	constructor() {
		this.path = "./gltf/";
	}
	init() {
		this.config = this.get_config();
	}
	get_config() {
		let config = {
			Patobus: {
				name: "Patobus",
				fullName: "Patobus",
				category: "vehicules",
				path: this.path + "vehicules/car.gltf",
				positions: { x: 0, y: 0, z: 0 },
				rotations: { x: Math.PI / 2, y: -Math.PI/2, z: false },
				scales: false,
				anime: "idle",
			},
			car2: {
				name: "car2",
				fullName: "car2",
				category: "vehicules",
				path: this.path + "vehicules2/scene.gltf",
				positions: { x: 0, y: 0, z: 0 },
				rotations: { x: Math.PI / 2, y: -Math.PI/2, z: false },
				scales: false,
				anime: "idle",
			},
			route1: {
				name: "route1",
				fullName: "route1",
				category: "routes",
				path: this.path + "route1/scene.gltf",
				positions: { x: 0, y: 0, z: 0 },
				rotations: { x: Math.PI / 2, y: -Math.PI/2, z: false },
				scales: false,
				anime: "idle",
			},
			small: {
				name: "small",
				fullName: "small",
				category: "vehicules",
				path: this.path + "small/scene.gltf",
				positions: { x: 0, y: 0, z: 0 },
				rotations: { x: Math.PI / 2, y: Math.PI , z: false },
				scales: { x: 0.25, y: 0.25, z: 0.25 },
				anime: "idle",
			},
		};
		return config;
	}
}
export { ModelsConfig };
