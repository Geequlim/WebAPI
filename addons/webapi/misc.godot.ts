function atob(data: string): string {
	// @ts-ignore
	return godot.Marshalls.base64_to_utf8(data);
}

function btoa(data: string): string {
	// @ts-ignore
	return godot.Marshalls.utf8_to_base64(data);
}

export default {
	exports: {
		atob,
		btoa
	}
};
