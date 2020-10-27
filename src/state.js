export class State {
	_storage;
	/**
	 * @var {'local' | 'session'}
	 */
	_driver;
	_key;

	_listeners = {};

	constructor(key = 'school-state') {
		this._key = key;
		this._driver = localStorage.getItem(this.getKey('driver')) || 'local';
		this.boot();
	}

	boot() {
		switch (this._driver) {
			case 'local':
				this._storage = localStorage;
				break;
			case 'session':
				this._storage = sessionStorage;
				break;
			default:
				this._storage = localStorage;
				break;
		}
	}

	/**
	 *
	 * @param {localStorage | sessionStorage} storage
	 */
	use(storage) {
		this._driver = storage === localStorage ? 'local' : 'session';
		this._storage = storage;
	}

	/**
	 * @return {localStorage}
	 */
	getStorage() {
		return this._storage;
	}

	getKey(key = '') {
		return `${this._key}-${key}`;
	}

	/**
	 *
	 * @param {string} key
	 */
	has(key) {
		return key in this.getAll();
	}

	getAll() {
		const data = this._storage.getItem(this.getKey());
		if (!data) {
			return {};
		}
		try {
			return JSON.parse(data);
		} catch (error) {
			return {};
		}
	}

	setAll(data) {
		this._storage.setItem(this.getKey(), JSON.stringify(data));
		return this;
	}

	/**
	 *
	 * @param {string} key
	 */
	get(key) {
		if (!this.has(key)) {
			return null;
		}
		return this.getAll()[key];
	}

	/**
	 *
	 * @param {string} key
	 * @param {any} value
	 */
	set(key, value) {
		const data = this.getAll();
		data[key] = value;
		this._dispatch(key, value);
		return this.setAll(data);
	}

	/**
	 *
	 * @param {string} key
	 */
	remove(key) {
		if (this.has(key)) {
			const data = this.getAll();
			delete data[key];
			this.setAll(data);
			if (key in this._listeners) {
				delete this._listeners[key];
			}
			this._dispatch(key, null);
		}
		return this;
	}

	/**
	 *
	 * @param {string} key
	 * @param {Function} callback
	 * @return {number} The index of the newly registered listener.
	 */
	listen(key, callback) {
		if (!(key in this._listeners)) {
			this._listeners[key] = [];
		}

		return this._listeners[key].push(callback) - 1;
	}

	/**
	 *
	 * @param {string} key
	 * @param {number} index
	 */
	removeListener(key, index) {
		if (!(key in this._listeners)) {
			return;
		}
		if (index >= this._listeners[key].length) {
			return;
		}
		this._listeners[key].splice(index, 1);
		return this;
	}

	_dispatch(key, value) {
		if (!(key in this._listeners)) {
			return;
		}
		for (const callback of this._listeners[key]) {
			callback(value, this);
		}
	}
}
const state = new State();
window.state = state;
export default state;
