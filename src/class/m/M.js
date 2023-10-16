class M {
	constructor() {}
	init(classList) {
		this.vmconfig = this.getVm();
		this.vmClasses = {};
		// if (this.vmconfig.classes) {}
		for (const className in classList) {
			if (Object.hasOwnProperty.call(classList, className)) {
				// getting class ********************************
				this[className] = classList[className];
				// getting class ********************************
			}
		}
	}
	init_allinitiables() {
		for (const className in this.vmconfig.classes) {
			if (typeof this[className] === "undefined") {
				// la classe n'existe pas
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
	}
	init_classe(datas) {
		let classes = {};
		datas.dependances.forEach((className) => {
			classes[className] = this[className];
		});
		datas.classes = classes;
		// inititalisation de la classe
		this[datas.className].init(classes);
	}
	setinitiables() {
		for (const className in this.vmconfig.classes) {
			if (typeof this[className] != "undefined") {
				this.vmconfig.classes[className].init =
					typeof this[className].init != "undefined";
				this.vmconfig.classes[className].dependant =
					typeof this.vmconfig.classes[className].dependances != "undefined";
			}
		}
	}
	getVm() {
		return {
			classes: {
				cameras: {
					auto: true,
					order: new Number(0),
					className: "cameras",
					dependances: ["config"],
				},
				controls: {
					auto: true,
					order: new Number(1),
					className: "controls",
					dependances: ["config"],
				},
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
					dependances: ["config", "controls", "formula"],
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
			},
		};
	}
}
export { M };
