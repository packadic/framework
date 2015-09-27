var packadic;
(function (packadic) {
    var storage;
    (function (storage) {
        storage.bags = {};
        function hasBag(name) {
            return typeof storage.bags[name] !== 'undefined';
        }
        storage.hasBag = hasBag;
        function createBag(name, provider) {
            if (hasBag(name)) {
                throw new Error('StorageBag ' + name + ' already exists');
            }
            return storage.bags[name] = new StorageBag(provider);
        }
        storage.createBag = createBag;
        function getBag(name) {
            if (!hasBag(name)) {
                throw new Error('StorageBag ' + name + ' does not exist');
            }
            return storage.bags[name];
        }
        storage.getBag = getBag;
        var StorageBag = (function () {
            function StorageBag(provider) {
                this.provider = provider;
            }
            StorageBag.prototype.on = function (callback) {
                this.provider.onStoreEvent(callback);
            };
            StorageBag.prototype.set = function (key, val, options) {
                var options = _.merge({ json: false, expires: false }, options);
                if (options.json) {
                    val = JSON.stringify(val);
                }
                if (options.expires) {
                    var now = Math.floor((Date.now() / 1000) / 60);
                    this.provider.setItem(key + ':expire', now + options.expires);
                }
                this.provider.setItem(key, val);
            };
            StorageBag.prototype.get = function (key, options) {
                var options = _.merge({ json: false, def: null }, options);
                if (!packadic.defined(key)) {
                    return options.def;
                }
                if (_.isString(this.provider.getItem(key))) {
                    if (_.isString(this.provider.getItem(key + ':expire'))) {
                        var now = Math.floor((Date.now() / 1000) / 60);
                        var expires = parseInt(this.provider.getItem(key + ':expire'));
                        if (now > expires) {
                            this.del(key);
                            this.del(key + ':expire');
                        }
                    }
                }
                var val = this.provider.getItem(key);
                if (!packadic.defined(val) || packadic.defined(val) && val == null) {
                    return options.def;
                }
                if (options.json) {
                    return JSON.parse(val);
                }
                return val;
            };
            StorageBag.prototype.del = function (key) {
                this.provider.removeItem(key);
            };
            StorageBag.prototype.clear = function () {
                this.provider.clear();
            };
            StorageBag.prototype.getSize = function (key) {
                return this.provider.getSize(key);
            };
            return StorageBag;
        })();
        storage.StorageBag = StorageBag;
        var LocalStorage = (function () {
            function LocalStorage() {
            }
            Object.defineProperty(LocalStorage.prototype, "length", {
                get: function () {
                    return window.localStorage.length;
                },
                enumerable: true,
                configurable: true
            });
            LocalStorage.prototype.getSize = function (key) {
                key = key || false;
                if (key) {
                    return ((window.localStorage[x].length * 2) / 1024 / 1024).toFixed(2);
                }
                else {
                    var total = 0;
                    for (var x in window.localStorage) {
                        total += (window.localStorage[x].length * 2) / 1024 / 1024;
                    }
                    return total.toFixed(2);
                }
            };
            LocalStorage.prototype.onStoreEvent = function (callback) {
                if (window.addEventListener) {
                    window.addEventListener("storage", callback, false);
                }
                else {
                    window.attachEvent("onstorage", callback);
                }
            };
            LocalStorage.prototype.clear = function () {
                window.localStorage.clear();
            };
            LocalStorage.prototype.getItem = function (key) {
                return window.localStorage.getItem(key);
            };
            LocalStorage.prototype.key = function (index) {
                return window.localStorage.key(index);
            };
            LocalStorage.prototype.removeItem = function (key) {
                window.localStorage.removeItem(key);
            };
            LocalStorage.prototype.setItem = function (key, data) {
                window.localStorage.setItem(key, data);
            };
            return LocalStorage;
        })();
        storage.LocalStorage = LocalStorage;
        var SessionStorage = (function () {
            function SessionStorage() {
            }
            Object.defineProperty(SessionStorage.prototype, "length", {
                get: function () {
                    return window.sessionStorage.length;
                },
                enumerable: true,
                configurable: true
            });
            SessionStorage.prototype.getSize = function (key) {
                key = key || false;
                if (key) {
                    return ((window.sessionStorage[x].length * 2) / 1024 / 1024).toFixed(2);
                }
                else {
                    var total = 0;
                    for (var x in window.sessionStorage) {
                        total += (window.sessionStorage[x].length * 2) / 1024 / 1024;
                    }
                    return total.toFixed(2);
                }
            };
            SessionStorage.prototype.onStoreEvent = function (callback) {
                if (window.addEventListener) {
                    window.addEventListener("storage", callback, false);
                }
                else {
                    window.attachEvent("onstorage", callback);
                }
            };
            SessionStorage.prototype.clear = function () {
                window.sessionStorage.clear();
            };
            SessionStorage.prototype.getItem = function (key) {
                return window.sessionStorage.getItem(key);
            };
            SessionStorage.prototype.key = function (index) {
                return window.sessionStorage.key(index);
            };
            SessionStorage.prototype.removeItem = function (key) {
                window.sessionStorage.removeItem(key);
            };
            SessionStorage.prototype.setItem = function (key, data) {
                window.sessionStorage.setItem(key, data);
            };
            return SessionStorage;
        })();
        storage.SessionStorage = SessionStorage;
        var CookieStorage = (function () {
            function CookieStorage() {
                this.cookieRegistry = [];
            }
            Object.defineProperty(CookieStorage.prototype, "length", {
                get: function () {
                    return this.keys().length;
                },
                enumerable: true,
                configurable: true
            });
            CookieStorage.prototype.getSize = function (key) {
                key = key || false;
                if (key) {
                    return ((window.sessionStorage[x].length * 2) / 1024 / 1024).toFixed(2);
                }
                else {
                    var total = 0;
                    for (var x in window.sessionStorage) {
                        total += (window.sessionStorage[x].length * 2) / 1024 / 1024;
                    }
                    return total.toFixed(2);
                }
            };
            CookieStorage.prototype.listenCookieChange = function (cookieName, callback) {
                var _this = this;
                setInterval(function () {
                    if (_this.hasItem(cookieName)) {
                        if (_this.getItem(cookieName) != _this.cookieRegistry[cookieName]) {
                            _this.cookieRegistry[cookieName] = _this.getItem(cookieName);
                            return callback();
                        }
                    }
                    else {
                        _this.cookieRegistry[cookieName] = _this.getItem(cookieName);
                    }
                }, 100);
            };
            CookieStorage.prototype.onStoreEvent = function (callback) {
                var _this = this;
                this.keys().forEach(function (name) {
                    _this.listenCookieChange(name, callback);
                });
            };
            CookieStorage.prototype.clear = function () {
                var _this = this;
                this.keys().forEach(function (name) {
                    _this.removeItem(name);
                });
            };
            CookieStorage.prototype.key = function (index) {
                return this.keys()[index];
            };
            CookieStorage.prototype.getItem = function (sKey) {
                if (!sKey) {
                    return null;
                }
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            };
            CookieStorage.prototype.setItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                    return;
                }
                var sExpires = "";
                if (vEnd) {
                    switch (vEnd.constructor) {
                        case Number:
                            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                            break;
                        case String:
                            sExpires = "; expires=" + vEnd;
                            break;
                        case Date:
                            sExpires = "; expires=" + vEnd.toUTCString();
                            break;
                    }
                }
                document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
                return;
            };
            CookieStorage.prototype.removeItem = function (key, sPath, sDomain) {
                if (!this.hasItem(key)) {
                    return false;
                }
                document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
                return true;
            };
            CookieStorage.prototype.hasItem = function (sKey) {
                if (!sKey) {
                    return false;
                }
                return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            };
            CookieStorage.prototype.keys = function () {
                var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
                    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
                }
                return aKeys;
            };
            return CookieStorage;
        })();
        storage.CookieStorage = CookieStorage;
        if (typeof window.localStorage !== 'undefined') {
            createBag('local', new LocalStorage());
        }
        if (typeof window.sessionStorage !== 'undefined') {
            createBag('session', new SessionStorage());
        }
        if (typeof window.document.cookie !== 'undefined') {
            createBag('cookie', new CookieStorage());
        }
    })(storage = packadic.storage || (packadic.storage = {}));
})(packadic || (packadic = {}));
//# sourceMappingURL=Storage.js.map