interface WebAPIModule {
	tick?: (now: number) => void;
	initialize?: () => void;
	uninitialize?: () => void;
	exports?: Record<string, any>
}

import animation_frame from './animation_frame';
import event from './event';
import timer from './timer';
import performance from './performance';

// import storage from './storage';
// import xhr from './xhr/xhr';
// import misc from './misc';

const modules: WebAPIModule[] = [animation_frame, event, timer, performance, /*storage, xhr, misc */ ];

let now = () => Date.now();
function setHighResTimeStampProvider(func: ()=>number) {
	if (typeof func === 'function') {
		now = func;
	}
}
function getHighResTimeStamp() {
	return now();
}

export function initialize() {
	Object.defineProperty(globalThis, 'window', { value: globalThis });
	Object.defineProperty(globalThis, 'setHighResTimeStampProvider', { value: setHighResTimeStampProvider});
	Object.defineProperty(globalThis, 'getHighResTimeStamp', { value: getHighResTimeStamp});
	for (const m of modules) {
		if (m.initialize) m.initialize();
		if (!m.exports) continue;
		for (const key in m.exports) {
			Object.defineProperty(window, key, { value: m.exports[key] });
		}
	}
}

export function unintialize() {
	for (const m of modules) {
		if (m.uninitialize) m.uninitialize();
	}
}

export function tick() {
	for (const m of modules) {
		if (m.tick) m.tick(now());
	}
}