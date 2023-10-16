class M {
	constructor() {
	}
	init(m){
		for (const key in m) {
			if (Object.hasOwnProperty.call(m, key)) {
				const element = m[key];
				this[key] = m[key]
				console.log('----------ok :',key)
			}
		}
	}
}
export { M };
