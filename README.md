# WebAPI
Minimal Web API support for godot

### Usage
- Clone or download this repo
- Compile the TypeScript with tsc
- Put the `addons` folder to your godot project
- Add `addons/webapi/index.jsx` as an `autoload` to your project

### Implemented Web APIs
- WindowOrWorkerGlobalScope
	- setTimeout
	- clearTimeout
	- setInterval
	- clearInterval
	- btoa
	- atob
	- performance
	- localStorage
	- sessionStorage
- Performance API
- Storage API
- Event
- EventTarget
- XMLHttpRequest
