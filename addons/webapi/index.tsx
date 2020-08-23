interface WebAPIModule {
	initialize?: Function;
	uninitialize?: Function;
	exports?: Record<string, any>
}

import event from './event';
import timer from './timer';
import performance from './performance';
import storage from './storage';
import xhr from './xhr/xhr';
import misc from './misc';
const modules: WebAPIModule[] = [ event, timer, performance, storage, xhr, misc];

if (typeof window === 'undefined') {
	Object.defineProperty(globalThis, 'window', { value: globalThis });
	for (const m of modules) {
		if (m.initialize) m.initialize();
		if (!m.exports) continue;
		for (const key in m.exports) {
			Object.defineProperty(window, key, { value: m.exports[key] });
		}
	}
}

export default class WebAPIBinder extends godot.Node {
	_exit_tree() {
		for (const m of modules) {
			if (m.uninitialize) m.uninitialize();
		}
	}
}
