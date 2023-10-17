class M {
	constructor() {}
	init(datas) {
		const classList = datas.classList
		const callback = datas.callback

		this.vmconfig = this.getVm();
		this.vmClasses = {};
		// if (this.vmconfig.classes) {}
		for (const className in classList) {
			if (Object.hasOwnProperty.call(classList, className)) {
				// getting all classes
				this[className] = classList[className];
			}
		}
		for (const className in this.vmconfig.classes) {
			if (typeof this[className] != "undefined") {
				// set init value to true if init, false if not
				this.vmconfig.classes[className].init = (typeof this[className].init != "undefined");
				this.vmconfig.classes[className].dependant = (typeof this.vmconfig.classes[className].dependances != "undefined");
			}
		}
		callback('Class montées')

	}
	init_allinitiables(datas) {
		let callback = datas.callback
		for (const className in this.vmconfig.classes) {
			if (typeof this[className] === "undefined") {
				// la classe n'existe pas
				console.log('la classe n\'existe pas')
			} else {
				let init = this.vmconfig.classes[className].init === true;
				let dependant = this.vmconfig.classes[className].dependant === true;
				let dependances =
					typeof this.vmconfig.classes[className].dependances != "undefined";
				// -------------------------------------------------
				if (init) {
					// if (dependant && dependances) {
					this.init_classe(this.vmconfig.classes[className]);
					// } else {
					// this.init_classe(this.vmconfig.classes[className])
					// }
				}
			}
		}
		callback('Class initialisées')
	}
	init_classe(datas) {
		let classes = {};
		datas.dependances.forEach((className) => {
			if(typeof this[className] === 'object'){
				classes[className] = this[className];
			}
			else {
				console.log("bug avec ",className)
			}
		});
		datas.classes = classes;
		// inititalisation de la classe
		this[datas.className].init(classes);
	}
	getVm() {
		return {
			classes: {
				cameras: {
					auto: true,
					order: new Number(0),
					className: "cameras",
					dependances: ["config","thirdPersonCamera","vehicules","controls"],
				},
				// thirdPersonCamera: {
				// 	auto: true,
				// 	order: new Number(0),
				// 	className: "thirdPersonCamera",
				// 	dependances: ["config","cameras"],
				// },
				lights: {
					auto: true,
					order: new Number(2),
					className: "lights",
					dependances: ["config"],
				},
				floorsManager: {
					auto: true,
					order: new Number(3),
					className: "floorsManager",
					dependances: ["config"],
				},
				vehicules: {
					auto: true,
					order: new Number(4),
					className: "vehicules",
					dependances: ["config", "controls", "formula", "modelsManager"],
				},
				sceneManager: {
					auto: true,
					order: new Number(5),
					className: "sceneManager",
					dependances: [
						"config",
						"lights",
						"cameras",
						"vehicules",
						"floorsManager",
					],
				},
				canva: {
					auto: true,
					order: new Number(6),
					className: "canva",
					dependances: ["config", "dom", "sceneManager"],
				},
				orbital: {
					auto: true,
					order: new Number(7),
					className: "orbital",
					dependances: ["sceneManager","canva"],
				},
				windowActive: {
					auto: true,
					order: new Number(7),
					className: "windowActive",
					dependances: ["config"],
				},
				modelsConfig: {
					auto: true,
					order: new Number(7),
					className: "modelsConfig",
					dependances: [],
				},
				modelsManager: {
					auto: true,
					order: new Number(7),
					className: "modelsManager",
					dependances: ["modelsConfig"],
				},
				controls: {
					auto: true,
					order: new Number(1),
					className: "controls",
					dependances: ["config","formula"],
				},
			},
		};
	}
}
export { M };
