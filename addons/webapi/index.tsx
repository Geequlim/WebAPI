if (typeof window === 'undefined') {
	Object.defineProperty(globalThis, 'window', { value: globalThis });
}

interface WebAPIModule {
	initialize: Function;
	uninitialize: Function;
	exports: Record<string, any>
}

import Timer from './Timer';
const modules: WebAPIModule[] = [ Timer ];

export default class _ extends godot.Node {
	constructor() {
		super();
		for (const m of modules) {
			m?.initialize();
			for (const key in m?.exports) {
				Object.defineProperty(window, key, { value: m.exports[key] });
			}
		}
	}

	_exit_tree() {
		for (const m of modules) {
			m?.uninitialize();
		}
	}
}
