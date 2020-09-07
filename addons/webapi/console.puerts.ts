import { UnityEngine } from 'csharp';
enum LogType {
	Error = 0,
	Assert = 1,
	Warning = 2,
	Log = 3,
	Exception = 4
}

let unity_log_target = null;

function print(type: LogType, showStack : boolean, ...args) {
	let message = '';
	for (let i = 0; i < args.length; i++) {
		const element = args[i];
		if (typeof element === 'object' && console.LOG_OBJECT_TO_JSON) {
			message += JSON.stringify(element);
		} else {
			message += element;
		}
		if (i < args.length - 1) {
			message += ' ';
		}
	}

	if (showStack || UnityEngine.Application.isEditor) {
		var stacks = new Error().stack.split('\n');
		for (let i = 3; i < stacks.length; i++) {
			const line = stacks[i];
			message += '\n';
			message += line;
		}
	}
	message = message.replace(/{/gm, '{{');
	message = message.replace(/}/gm, '}}');
	if (!unity_log_target) { unity_log_target = new UnityEngine.Object(); }
	UnityEngine.Debug.LogFormat(type, UnityEngine.LogOption.NoStacktrace, unity_log_target, message);
}

const ConsoleObject = {
	log: (...args) => print(LogType.Log, false, ...args),
	info: (...args) => print(LogType.Log, true, ...args),
	trace: (...args) => print(LogType.Log, true, ...args),
	warn: (...args) => print(LogType.Warning, true, ...args),
	error: (...args) => print(LogType.Error, true, ...args),
	LOG_OBJECT_TO_JSON: false,
};

if (typeof(console) === 'undefined') {
	Object.defineProperty(globalThis, 'console', {
		value: ConsoleObject,
		enumerable: true,
		configurable: true,
		writable: false
	});
} else {
	let globalConsole = (globalThis as unknown)['console'];
	for (const key in ConsoleObject) {
		Object.defineProperty(globalConsole, key, { value: ConsoleObject[key], enumerable: true, configurable: true, writable: typeof(ConsoleObject[key]) !== 'function' });
	}
}