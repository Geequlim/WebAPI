//@ts-ignore
declare module globalThis {
	type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text";
	type XMLHttpRequestMethod = "GET" | "POST" | "DELETE";
	type BodyInit = string | Record<string, any>;

	interface XMLHttpRequestEventTargetEventMap {
		"abort": ProgressEvent<XMLHttpRequestEventTarget>;
		"error": ProgressEvent<XMLHttpRequestEventTarget>;
		"load": ProgressEvent<XMLHttpRequestEventTarget>;
		"loadend": ProgressEvent<XMLHttpRequestEventTarget>;
		"loadstart": ProgressEvent<XMLHttpRequestEventTarget>;
		"progress": ProgressEvent<XMLHttpRequestEventTarget>;
		"timeout": ProgressEvent<XMLHttpRequestEventTarget>;
	}

	interface XMLHttpRequestEventMap extends XMLHttpRequestEventTargetEventMap {
		"readystatechange": Event;
	}

	class XMLHttpRequestEventTarget extends EventTarget {
		onabort: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
		onerror: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
		onload: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
		onloadend: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
		onloadstart: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
		onprogress: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
		ontimeout: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
		addEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestEventTarget, ev: XMLHttpRequestEventTargetEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
		removeEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestEventTarget, ev: XMLHttpRequestEventTargetEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	}

	class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {}

	enum XMLHttpRequestReadyState {
		UNSENT = 0,
		OPENED = 1,
		HEADERS_RECEIVED = 2,
		LOADING = 3,
		DONE = 4
	}
	
	/** Use XMLHttpRequest (XHR) objects to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. */
	class XMLHttpRequest extends XMLHttpRequestEventTarget {
		onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null;
		/**
		 * Returns client's state.
		*/
		get readyState(): XMLHttpRequestReadyState;
		set readyState(value: XMLHttpRequestReadyState);
		protected _readyState: XMLHttpRequestReadyState;
		/**
			* Returns the response's body.
			*/
		get response(): any;
		protected _response: any;
		/**
		 * Returns the text response.
		 *
		 * Throws an "InvalidStateError" DOMException if responseType is not the empty string or "text".
		*/
		readonly responseText: string;
		/**
		 * Returns the response type.
		 *
		 * Can be set to change the response type. Values are: the empty string (default), "arraybuffer", "blob", "document", "json", and "text".
		 *
		 * When set: setting to "document" is ignored if current global object is not a Window object.
		 *
		 * When set: throws an "InvalidStateError" DOMException if state is loading or done.
		 *
		 * When set: throws an "InvalidAccessError" DOMException if the synchronous flag is set and current global object is a Window object.
		*/
		responseType: XMLHttpRequestResponseType;
		readonly responseURL: string;
		/**
		 * Returns the document response.
		 *
		 * Throws an "InvalidStateError" DOMException if responseType is not the empty string or "document".
		*/
		readonly responseXML: string | null;
		readonly status: number;
		readonly statusText: string;
		/**
		 * Can be set to a time in milliseconds. When set to a non-zero value will cause fetching to terminate after the given time has passed. When the time has passed, the request has not yet completed, and the synchronous flag is unset, a timeout event will then be dispatched, or a "TimeoutError" DOMException will be thrown otherwise (for the send() method).
		 *
		 * When set: throws an "InvalidAccessError" DOMException if the synchronous flag is set and current global object is a Window object.
		*/
		timeout: number;
		/**
		 * Returns the associated XMLHttpRequestUpload object. It can be used to gather transmission information when data is transferred to a server.
		*/
		get upload(): XMLHttpRequestUpload;
		/**
		 * True when credentials are to be included in a cross-origin request. False when they are to be excluded in a cross-origin request and when cookies are to be ignored in its response. Initially false.
		 *
		 * When set: throws an "InvalidStateError" DOMException if state is not unsent or opened, or if the send() flag is set.
		*/
		withCredentials: boolean;
		/**
		 * Cancels any network activity.
		*/
		abort(): void;
		getAllResponseHeaders(): string;
		getResponseHeader(name: string): string | null;
		/**
		 * Sets the request method, request URL, and synchronous flag.
		 *
		 * Throws a "SyntaxError" DOMException if either method is not a valid HTTP method or url cannot be parsed.
		 *
		 * Throws a "SecurityError" DOMException if method is a case-insensitive match for `CONNECT`, `TRACE`, or `TRACK`.
		 *
		 * Throws an "InvalidAccessError" DOMException if async is false, current global object is a Window object, and the timeout attribute is not zero or the responseType attribute is not the empty string.
		*/
		open(method: XMLHttpRequestMethod, url: string, async?: boolean, username?: string | null, password?: string | null): void;
		/**
		 * Acts as if the `Content-Type` header value for response is mime. (It does not actually change the header though.)
		 *
		 * Throws an "InvalidStateError" DOMException if state is loading or done.
		*/
		overrideMimeType(mime: string): void;
		/**
		 * Initiates the request. The body argument provides the request body, if any, and is ignored if the request method is GET or HEAD.
		 *
		 * Throws an "InvalidStateError" DOMException if either state is not opened or the send() flag is set.
		*/
		send(body?: BodyInit | null): void;
		/**
		 * Combines a header in author request headers.
		 *
		 * Throws an "InvalidStateError" DOMException if either state is not opened or the send() flag is set.
		 *
		 * Throws a "SyntaxError" DOMException if name is not a header name or if value is not a header value.
		*/
		setRequestHeader(name: string, value: string): void;
		addEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
		removeEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	}
}
