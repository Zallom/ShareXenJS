const fs = require("fs");
const request = require("request-promise-native");

class ShareXenJS {
	constructor() {
		this.token = undefined;
		this.dest = undefined;
	}
	async login(dest = String(), token = String()) {
		if (dest.match(/^https?:\/\/.+\.php/) || dest.match(/^http?:\/\/.+\.php/)) this.dest = dest;
		else return console.error("Error : Invalid destination !");
		this.token = token;
	}
	async upload(file) {
		let image;
		if (file !== undefined) { 
			if (file.match(/^https?:\/\/.+\./) || file.match(/^http?:\/\/.+\./)) image = file;
			else if (fs.existsSync(file)) image = `file:${file}`;
			else return { err: true, endpoint: "upload", code: "403", error: "File doesn't exists", exists: false, time: -1 };
		} else return { err: true, endpoint: "upload", code: "403", error: "File is a required argument", exists: false, time: -1 };
		let res;
		if (!image.startsWith("file:")) {
			res = await request({ uri: image, encoding: null, resolveWithFullResponse: true }).catch(errr => { return { err: true, endpoint: "upload", code: "403", error: errr, time: -1 }; });
			if (!res) return { err: true, endpoint: "upload", code: "403", error: "File cannot be downloaded", time: -1 };
			res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "upload", token: this.token, image: { value: res.body, options: { contentType: res.headers["content-type"], filename: `file.${res.headers["content-type"].split("/").pop().replace("jpeg", "jpg")}` } } }, simple: false }).catch(errr => { return { err: true, endpoint: "upload", code: "403", error: errr, time: -1 }; });
			if (!res) return { err: true, endpoint: "upload", code: "403", error: "File cannot be uploaded", time: -1 };
			res = JSON.parse(res);
			if (res.status === "error") return { err: true, endpoint: res.endpoint, code: res.http_code, error: res.error, time: res.execution_time };
			else return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, filename: res.filename, url: res.url, deletion_url: res.deletion_url, key: res.key, iterations: res.iteration_count, time: res.execution_time };
		} else {
			res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "upload", token: this.token, image:{ value: fs.createReadStream(`${image.replace("file:", "")}`), options: { filename: `${image.replace("file:", "")}`, contentType: null } } }, simple: false }).catch(errr => { return { err: true, endpoint: "upload", code: "403", error: errr, time: -1 } });
			if (!res) return { err: true, endpoint: "upload", code: "403", error: "File cannot be uploaded", time: -1 };
			res = JSON.parse(res);
			if (res.status === "error") return { err: true, endpoint: res.endpoint, code: res.http_code, error: res.error, time: res.execution_time };
			else return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, filename: res.filename, url: res.url, deletion_url: res.deletion_url, key: res.key, iterations: res.iteration_count, time: res.execution_time };
		}
	}
	async delete(file) {
		let image;
		if (file !== undefined) { 
			if (file.match(/^https?:\/\/.+\./) || file.match(/^http?:\/\/.+\./)) {
				image = file.replace(/[<>]/g, '').split('/').pop();
				let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "info", token: this.token, filename: image }, simple: false }).catch(errr => { return { err: true, endpoint: "delete", code: "403", error: errr, exists: false, time: -1 }; });
				if (!res) return { err: true, endpoint: "delete", code: "403", error: "File cannot be deleted", exists: false, time: -1 };
				res = JSON.parse(res);
				if (!res.file_exists) return { err: true, endpoint: "delete", code: "403", error: "File doesn't exists", exists: res.file_exists, time: res.execution_time };
			} else {
				image = file;
				let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "info", token: this.token, filename: image }, simple: false }).catch(errr => { return { err: true, endpoint: "delete", code: "403", error: errr, exists: false, time: -1 }; });
				if (!res) return { err: true, endpoint: "delete", code: "403", error: "File cannot be deleted", exists: false, time: -1 };
				res = JSON.parse(res);
				if (!res.file_exists) return { err: true, endpoint: "delete", code: "403", error: "File doesn't exists", exists: res.file_exists, time: res.execution_time };
			}
		} else return { err: true, endpoint: "delete", code: "403", error: "File is a required argument", exists: false, time: -1 };
		let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "delete", token: this.token, filename: image }, simple: false }).catch(errr => { return { err: true, endpoint: "delete", code: "403", error: errr, exists: false, time: -1 }; });
		if (!res) return { err: true, endpoint: "delete", code: "403", error: "File cannot be deleted", exists: false, time: -1 };
		res = JSON.parse(res);
		if (res.status === "error") return { err: true, endpoint: res.endpoint, code: res.http_code, error: res.error, exists: true, time: res.execution_time };
		else return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, filename: res.filename, method: res.method, time: res.execution_time };
	}
	async rename(file, newfilename) {
		let image;
		if (newfilename !== undefined) 
		if (file !== undefined) { 
			if (file.match(/^https?:\/\/.+\./) || file.match(/^http?:\/\/.+\./)) {
				image = file.replace(/[<>]/g, '').split('/').pop();
				let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "info", token: this.token, filename: image }, simple: false }).catch(errr => { return { err: true, endpoint: "rename", code: "403", error: errr, exists: false, time: -1 }; });
				if (!res) return { err: true, endpoint: "rename", code: "403", error: "File cannot be renamed", exists: false, time: -1 };
				res = JSON.parse(res);
				if (!res.file_exists) return { err: true, endpoint: res.endpoint, code: res.http_code, error: "File doesn't exists", exists: res.file_exists, time: res.execution_time };
			} else {
				image = file;
				let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "info", token: this.token, filename: image }, simple: false }).catch(errr => { return { err: true, endpoint: "rename", code: "403", error: errr, exists: false, time: -1 }; });
				if (!res) return { err: true, endpoint: "rename", code: "403", error: "File cannot be renamed", exists: false, time: -1 };
				res = JSON.parse(res);
				if (!res.file_exists) return { err: true, endpoint: res.endpoint, code: res.http_code, error: "File doesn't exists", exists: res.file_exists, time: res.execution_time };
			}
		} else return { err: true, endpoint: "rename", code: "403", error: "File is a required argument", exists: false, time: -1 };
		let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "rename", token: this.token, filename: image, new_name: newfilename }, simple: false }).catch(errr => { return { err: true, endpoint: "rename", code: "403", error: errr, exists: false, time: -1 }; });
		if (!res) return { err: true, endpoint: "rename", code: "403", error: "File cannot be renamed", exists: false, time: -1 };
		res = JSON.parse(res);
		if (res.status === "error") return { err: true, endpoint: res.endpoint, code: res.http_code, error: res.error, exists: true, time: res.execution_time };
		else return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, old_name: res.old_name, new_name: res.filename, url: res.url, deletion_url: res.deletion_url, key: res.key, method: res.method, time: res.execution_time };
	}
	
	async info(file = undefined) {
		let image;
		if (file !== undefined) { 
			if (file.match(/^https?:\/\/.+\./) || file.match(/^http?:\/\/.+\./)) image = file.replace(/[<>]/g, '').split('/').pop();
			else image = file;
			let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "info", token: this.token, filename: image }, simple: false }).catch(errr => { return { err: true, endpoint: "info", code: errr.statusCode, error: errr, exists: false, time: -1 }; });
			if (!res) return { err: true, endpoint: "info", code: "403", error: "File cannot be reached", exists: false, time: -1 };
			res = JSON.parse(res);
			if (res.status === "error") return { err: true, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, error: res.error, time: res.execution_time };
			else {
				if (res.is_admin === true) {
					if (!res.file_exists) return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, is_admin: res.is_admin, exists: res.	file_exists, time: res.execution_time };
					else return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, is_admin: res.is_admin, filename: res.filename, filesize: res.filesize, url: res.url, deletion_url: res.deletion_url, key: res.key, exists: res.file_exists, uploaded_time: res.uploaded_at, time: res.execution_time };
				} else {
					if (!res.file_exists) return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, is_admin: res.is_admin, exists: res.file_exists, time: res.execution_time };
					else return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, is_admin: res.is_admin, filename: res.filename, filesize: res.filesize, url: res.url, exists: res.file_exists, uploaded_time: res.uploaded_at, time: res.execution_time };
				}
			}
		} else {
			let res = await request({ uri: this.dest, method: "POST", formData: { endpoint: "info", token: this.token }, simple: false }).catch(errr => { return { err: true, endpoint: "info", code: "403", error: errr, exists: false, time: -1 }; });
			if (!res) return { err: true, endpoint: "info", code: "403", error: "invalid_credentials", exists: false, time: -1 };
			res = JSON.parse(res);
			if (res.status === "error") return { err: true, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, error: res.error, time: res.execution_time };
			else {
				if (res.is_admin === true) return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, is_admin: res.is_admin, endpoints: res.endpoints, keyspace: res.keyspace, name_length: res.name_length, allowed_extensions: res.allowed_extensions, allowed_characters: res.allowed_characters, custom_names: res.custom_names, files_count: res.files_count, time: res.execution_time };
				else return { err: false, api_version: res.api_version, endpoint: res.endpoint, code: res.http_code, is_admin: res.is_admin, endpoints: res.endpoints, keyspace: res.keyspace, name_length: res.name_length, allowed_extensions: res.allowed_extensions, allowed_characters: res.allowed_characters, custom_names: res.custom_names, files: res.files, files_count: res.files_count, time: res.execution_time };
			}
		}
	}	
}
module.exports = ShareXenJS;
