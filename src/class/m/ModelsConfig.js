class ModelsConfig {
	constructor() {
		this._init();
	}
	_init() {
		this.config = this.get_config();
		this.path = './gltf/';
	}
	get_config() {
		let config = {
			Car:{
				name:'Car',
				fullName:'BobCar',
				category:'vehicules',
				path:this.path+'vehicules/car.gltf',
				positions:{x:0,y:0,z:0},
				rotations:{x:Math.PI/2,y:Math.PI/1,z:false},
				scales:false,
				anime:'idle'
			},
		}
		return config
	}
}
export { ModelsConfig };
