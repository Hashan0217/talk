const API = (function () {
	const BASE_URL = "https://study.duyiedu.com";
	const TOKEN_KEY = "token";
	function get(url) {
		const token = localStorage.getItem(TOKEN_KEY);
		const headers = {};
		if (token) {
			headers.authorization = `Bearer ${token}`;
		}
		return fetch(BASE_URL + url, { headers });
	}
	function post(url, bodyObj) {
		const body = JSON.stringify(bodyObj);
		const token = localStorage.getItem(TOKEN_KEY);
		const headers = {
			"Content-Type": "application/json",
		};
		if (token) {
			headers.authorization = `Bearer ${token}`;
		}
		return fetch(BASE_URL + url, {
			headers,
			body,
			method: "POST",
		});
	}

	async function reg(bodyObj) {
		const res = await post("/api/user/reg", bodyObj);
		return res.json();
	}

	async function login(bodyObj) {
		const res = await post("/api/user/login", bodyObj);
		// console.log(res.headers.authorization.token);
		const token = res.headers.get("authorization");
		localStorage.setItem(TOKEN_KEY, token);
		return res.json();
	}

	async function exists(id) {
		const res = await get("/api/user/exists?loginId=" + id);
		return res.json();
	}

	async function profile() {
		const res = await get("/api/user/profile");
		return res.json();
	}

	async function sendChat(bodyObj) {
		const res = await post("/api/chat", bodyObj);
		return res.json();
	}

	async function getHistory() {
		const res = await get("/api/chat/history");
		return res.json();
	}

	function loginOut() {
		localStorage.removeItem(TOKEN_KEY);
	}
	return {
		reg,
		login,
		exists,
		profile,
		sendChat,
		getHistory,
		loginOut,
	};
})();
