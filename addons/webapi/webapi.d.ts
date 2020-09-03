//@ts-ignore
declare module globalThis {
	const window: typeof globalThis;

	function setHighResTimeStampProvider(func: () => number);
	function getHighResTimeStamp(): number

	function cancelAnimationFrame(handle: number): void;
	function requestAnimationFrame(callback: (now: number)=>void): number;
}