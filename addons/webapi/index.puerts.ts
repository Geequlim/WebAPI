import './console.puerts';
import animation_frame from './animation_frame';
import event from './event';
import timer from './timer';
import performance from './performance';

import { initialize } from "./index";
initialize([
	animation_frame,
	event,
	timer,
	performance
]);
