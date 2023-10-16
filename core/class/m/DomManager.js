class DomManager {
	constructor() {
	}
	appendChild = (element, targetElement = document.body) => {
		if (targetElement) { targetElement.appendChild(element) }
	}
	resizeListener = (renderer, camera) => {
		window.addEventListener('resize', () => {
			// console.log('resize')
			// console.log(camera)
			// console.log(renderer)
			camera.aspect = window.innerWidth / window.innerHeight;
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.updateProjectionMatrix();
		});
	}
	addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}

export { DomManager };