if (typeof window === 'undefined') {
	Object.defineProperty(globalThis, 'window', { value: globalThis });
}

interface WebAPIModule {
	initialize?: Function;
	uninitialize?: Function;
	exports?: Record<string, any>
}

import Timer from './Timer';
import misc from './misc';
const modules: WebAPIModule[] = [ Timer, misc ];

export default class WebAPIBinder extends godot.Node {
	constructor() {
		super();
		for (const m of modules) {
			if (m.initialize) m.initialize();
			if (!m.exports) continue;
			for (const key in m.exports) {
				Object.defineProperty(window, key, { value: m.exports[key] });
			}
		}
	}

	_exit_tree() {
		for (const m of modules) {
			if (m.uninitialize) m.uninitialize();
		}
	}
}
