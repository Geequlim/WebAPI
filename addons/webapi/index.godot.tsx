import { unintialize, initialize, tick } from "./index";
initialize();

//@ts-ignore
export default class GodotWebAPISingleton extends godot.Node {

	_process() {
		tick();
	}

	_exit_tree() {
		unintialize();
	}

}