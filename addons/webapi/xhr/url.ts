export interface IURL {
	url: string;
	hostname?: string;
	path?: string;
	port?: number;
	protocal?: string;
}

export function parse_url(url: string): IURL {
	const regex = /^([a-z]+?)\:\/\/([^\/?#:]+)(:(\d+))?(?:[\/?#]|$)(.*)/i;
	const matches = url.match(regex);
	return {
		url,
		protocal: matches[1],
		hostname: matches[2],
		port: matches[4] ? parseInt(matches[4]) : undefined,
		path: matches[5],
	};
}


