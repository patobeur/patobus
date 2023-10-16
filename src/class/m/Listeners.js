class Listeners {
	_Actif = true;
	_windowActive = false;
	_overLay;
	_string;
	constructor(string = false) {
		this._string = "false";
	}
	addListener() {
		if (this._Actif) {
			this._overLay = document.createElement("div");
			this._addOverlay();
			window.addEventListener("focus", () => {
				this._windowActive = true;
				this._overLay.style.display = "none";
			});
			window.addEventListener("blur", () => {
				this._windowActive = false;
				// this._overLay.classList.add('paused')
				this._overLay.style.display = "block";
				this._overLay.style.display = "flex";
				this._overLay.style.alignItems = "center";
				this._overLay.style.justifyContent = "center";
			});
		}
	}
	get_isWindowActive() {
		if (this._Actif) {
			console.log("_windowActive");
			return this._windowActive;
		} else {
			return true;
		}
	}
	_addOverlay() {
		this._overLay.id = "Pause";
		this._overLay.textContent = this._string;
		this._overLay.className = "Pause";
		this._overLay.style.display = "none";
		this._overLay.style.position = "absolute";
		this._overLay.style.top = "25%";
		this._overLay.style.left = "25%";
		this._overLay.style.width = "50%";
		this._overLay.style.height = "50%";
		this._overLay.style.zIndex = "100";
		this._overLay.style.borderRadius = "1rem";
		this._overLay.style.backgroundColor = "rgba(255,255,255,.2)";
		this._overLay.style.display = "flex";
		this._overLay.style.alignItems = "center";
		this._overLay.style.justifyContent = "center";
		this._overLay.style.fontSize = "3rem";
		this._overLay.style.color = "yellowGreen";
		this._appendChild(this._overLay, false);
	}
	_appendChild = (element, targetElement = document.body) => {
		if (element) {
			document.body.appendChild(element);
		}
	};
}
export { Listeners };
