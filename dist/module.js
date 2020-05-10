"use strict";
var Oogebra;
(function (Oogebra) {
    function getMode() {
        return (ggbApplet.exists('development') && ggbApplet.getValue('development')) ? 'development' : 'production';
    }
    Oogebra.getMode = getMode;
    function log(message) {
        if (getMode() === 'development') {
            alert("[Development]: " + message);
        }
    }
    Oogebra.log = log;
    function setInternal(name) {
        ggbApplet.setVisible(name, false);
        ggbApplet.setAuxiliary(name, true);
        ggbApplet.setFixed(name, true, false);
    }
    Oogebra.setInternal = setInternal;
})(Oogebra || (Oogebra = {}));
var Oogebra;
(function (Oogebra) {
    var listeners = {};
    var Internal;
    (function (Internal) {
        var Listeners = /** @class */ (function () {
            function Listeners() {
            }
            Listeners.listeners = listeners;
            return Listeners;
        }());
        Internal.Listeners = Listeners;
    })(Internal = Oogebra.Internal || (Oogebra.Internal = {}));
    function registerListener(name, fn) {
        listeners[name] = fn;
        return "Oogebra.Internal.Listeners.listeners[" + JSON.stringify(name) + "]";
    }
    Oogebra.registerListener = registerListener;
    function unregisterListener(name) {
        delete listeners[name];
    }
    Oogebra.unregisterListener = unregisterListener;
})(Oogebra || (Oogebra = {}));
var Oogebra;
(function (Oogebra) {
    var DOUBLE_QUOTE = String.fromCharCode(34);
    var Data;
    (function (Data) {
        Data.version = '1.0';
        Data.name = "OogebraData_{" + Data.version + "}";
        var dataEscapeRegex = new RegExp('&|' + DOUBLE_QUOTE, 'g');
        var dataEscapeReplacer = function (match) {
            switch (match) {
                case DOUBLE_QUOTE: return '&q';
                default: return '&a';
            }
        };
        var dataUnescapeRegex = new RegExp('&q|&a', 'g');
        var dataUnescapeReplacer = function (match) {
            switch (match) {
                case '&q': return DOUBLE_QUOTE;
                default: return '&';
            }
        };
        function dataEscape(string) {
            return string.replace(dataEscapeRegex, dataEscapeReplacer);
        }
        function dataUnescape(string) {
            return string.replace(dataUnescapeRegex, dataUnescapeReplacer);
        }
        var indexBits = 8;
        var listLength = Math.pow(2, indexBits);
        var cache = [];
        function ensureDataObject() {
            if (!ggbApplet.exists(Data.name)) {
                var listElements = new Array(listLength);
                for (var i = 0; i < listElements.length; i++) {
                    listElements[i] = DOUBLE_QUOTE + DOUBLE_QUOTE;
                }
                ggbApplet.evalCommand(Data.name + " = {" + listElements.join(',') + "}");
                Oogebra.ignoreImmutables(true);
                Oogebra.setInternal(Data.name);
                Oogebra.ignoreImmutables(false);
                Oogebra.setImmutable(Data.name, true);
            }
        }
        function ensureCache() {
            if (cache.length === 0) {
                var tempObjName = ggbApplet.evalCommandGetLabels(DOUBLE_QUOTE + DOUBLE_QUOTE);
                for (var i = 0; i < listLength; i++) {
                    var listIndex = i + 1;
                    ggbApplet.evalCommand(tempObjName + " = " + Data.name + "(" + listIndex + ")");
                    var jsonString = ggbApplet.getValueString(tempObjName) + '';
                    cache[i] = JSON.parse(dataUnescape(jsonString || 'null'));
                }
                ggbApplet.deleteObject(tempObjName);
            }
        }
        function getHash(str) {
            var hash = 0, i, chr;
            for (i = 0; i < str.length; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }
        function set(key, data) {
            ensureDataObject();
            ensureCache();
            var hash = getHash(key);
            var hashLow = hash & (listLength - 1);
            var listIndex = hashLow + 1;
            cache[hashLow] = cache[hashLow] || {};
            if (data === undefined) {
                delete cache[hashLow][key];
            }
            else {
                cache[hashLow][key] = data;
            }
            var escapedData = dataEscape(JSON.stringify(cache[hashLow]));
            var command = "SetValue(" + Data.name + ", " + listIndex + ", " + (DOUBLE_QUOTE + escapedData + DOUBLE_QUOTE) + ")";
            Oogebra.ignoreImmutables(true);
            ggbApplet.evalCommand(command);
            Oogebra.ignoreImmutables(false);
            return;
        }
        Data.set = set;
        function get(key) {
            ensureDataObject();
            ensureCache();
            var hash = getHash(key);
            var hashLow = hash & (listLength - 1);
            var cacheMapping = cache[hashLow];
            if (cacheMapping == null) {
                return null;
            }
            return cacheMapping[key];
        }
        Data.get = get;
    })(Data || (Data = {}));
    function setData(key, data) {
        return Data.set(key, data);
    }
    Oogebra.setData = setData;
    function getData(key) {
        return Data.get(key);
    }
    Oogebra.getData = getData;
    function deleteData(key) {
        return Data.set(key, undefined);
    }
    Oogebra.deleteData = deleteData;
})(Oogebra || (Oogebra = {}));
var Oogebra;
(function (Oogebra) {
    var Immutable;
    (function (Immutable) {
        var Key = 'b31ef8a7-d6de-439c-a283-6dddd9c96ca7';
        var OnRename = 'f08a8677-3c6a-4c03-a051-cb15c374a502';
        var OnUpdate = '28092476-efaa-4244-a580-87ab358a46ae';
        var OnRemove = '1a2bfcbb-7d60-44af-8813-038769db62f3';
        var OnClient = '0e0bcdc3-a558-49a6-8a4e-87b4dae99cf8';
        function shouldIgnoreImmutable() {
            return Oogebra.getMode() === "development";
        }
        var OnRenameListener = Oogebra.registerListener(OnRename, function (oldObjName, _objName) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = Oogebra.getData(Key) || [];
                var isImmutable = immutableObjNames.indexOf(oldObjName) > -1;
                if (isImmutable) {
                    ggbApplet.undo();
                }
            }
        });
        var OnUpdateListener = Oogebra.registerListener(OnUpdate, function (objName) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = Oogebra.getData(Key) || [];
                var isImmutable = immutableObjNames.indexOf(objName) > -1;
                if (isImmutable) {
                    ggbApplet.undo();
                }
            }
        });
        var OnRemoveListener = Oogebra.registerListener(OnRemove, function (objName) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = Oogebra.getData(Key) || [];
                var isImmutable = immutableObjNames.indexOf(objName) > -1;
                if (isImmutable) {
                    ggbApplet.undo();
                }
            }
        });
        var OnClientListener = Oogebra.registerListener(OnClient, function (type, target, _argument) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = Oogebra.getData(Key) || [];
                var isImmutable = immutableObjNames.indexOf(target) > -1;
                if (isImmutable) {
                    if (type === 'updateStyle') {
                        ggbApplet.undo();
                    }
                    if (type === 'select') {
                        ggbApplet.setUndoPoint();
                    }
                }
            }
        });
        function getObjNames() {
            return Oogebra.getData(Key) || [];
        }
        Immutable.getObjNames = getObjNames;
        function setObjNames(objNames) {
            Oogebra.setData(Key, objNames);
        }
        Immutable.setObjNames = setObjNames;
        function registerObjName(objNames, objName, immutable) {
            var objNameIndex = objNames.indexOf(objName);
            if (objNameIndex > -1 && !immutable) {
                objNames = objNames.splice(objNameIndex, 1);
            }
            else if (objNameIndex < 0 && immutable) {
                objNames.push(objName);
            }
            return objNames;
        }
        Immutable.registerObjName = registerObjName;
        function register() {
            ggbApplet.registerRenameListener(OnRenameListener);
            ggbApplet.registerUpdateListener(OnUpdateListener);
            ggbApplet.registerRemoveListener(OnRemoveListener);
            ggbApplet.registerClientListener(OnClientListener);
        }
        Immutable.register = register;
        function unregister() {
            ggbApplet.unregisterRenameListener(OnRename);
            ggbApplet.unregisterUpdateListener(OnUpdate);
            ggbApplet.unregisterRemoveListener(OnRemove);
            ggbApplet.unregisterClientListener(OnClient);
        }
        Immutable.unregister = unregister;
        function load() {
            var immutableObjNames = getObjNames();
            ;
            if (immutableObjNames.length > 0) {
                register();
            }
            else {
                unregister();
            }
        }
        Immutable.load = load;
    })(Immutable || (Immutable = {}));
    function setImmutable(objName, immutable) {
        var immObjNames = Immutable.getObjNames();
        var noImmutableObjNamesBefore = immObjNames.length == 0;
        immObjNames = Immutable.registerObjName(immObjNames, objName, immutable);
        Immutable.setObjNames(immObjNames);
        if (noImmutableObjNamesBefore && immObjNames.length > 0) {
            Immutable.register();
        }
        else if (immObjNames.length === 0) {
            Immutable.unregister();
        }
    }
    Oogebra.setImmutable = setImmutable;
    function ignoreImmutables(ignore) {
        if (ignore) {
            Immutable.unregister();
        }
        else {
            Immutable.load();
        }
    }
    Oogebra.ignoreImmutables = ignoreImmutables;
    Immutable.load();
})(Oogebra || (Oogebra = {}));
var Oogebra;
(function (Oogebra) {
    var Core;
    (function (Core) {
        Core.version = '1.0';
        Core.name = "OogebraCore_{" + Core.version + "}";
        Oogebra.ignoreImmutables(true);
        Oogebra.setInternal(Core.name);
        Oogebra.ignoreImmutables(false);
        Oogebra.setImmutable(Core.name, true);
    })(Core = Oogebra.Core || (Oogebra.Core = {}));
})(Oogebra || (Oogebra = {}));
var Oogebra;
(function (Oogebra) {
    Oogebra.log('OogebraCore sucessfully loaded!');
})(Oogebra || (Oogebra = {}));
if (!global.hasOwnProperty('Oogebra')) {
    Object.defineProperty(global, 'Oogebra', {
        value: Oogebra
    });
}
