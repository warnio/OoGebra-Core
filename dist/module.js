"use strict";
var OoGebra;
(function (OoGebra) {
    function getMode() {
        return (ggbApplet.exists('development') && ggbApplet.getValue('development')) ? 'development' : 'production';
    }
    OoGebra.getMode = getMode;
    function log(message) {
        if (getMode() === 'development') {
            alert("[Development]: " + message);
        }
    }
    OoGebra.log = log;
    function setInternal(name) {
        ggbApplet.setVisible(name, false);
        ggbApplet.setAuxiliary(name, true);
        ggbApplet.setFixed(name, true, false);
    }
    OoGebra.setInternal = setInternal;
})(OoGebra || (OoGebra = {}));
var OoGebra;
(function (OoGebra) {
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
    })(Internal = OoGebra.Internal || (OoGebra.Internal = {}));
    function registerListener(name, fn) {
        listeners[name] = fn;
        return "OoGebra.Internal.Listeners.listeners[" + JSON.stringify(name) + "]";
    }
    OoGebra.registerListener = registerListener;
    function unregisterListener(name) {
        delete listeners[name];
    }
    OoGebra.unregisterListener = unregisterListener;
})(OoGebra || (OoGebra = {}));
var OoGebra;
(function (OoGebra) {
    var DOUBLE_QUOTE = String.fromCharCode(34);
    var Data;
    (function (Data) {
        Data.version = '2.0';
        Data.name = "OoGebraData";
        function getElemGeoName(index) {
            return Data.name + "_{" + Data.version + "_[" + index + "]}";
        }
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
        function ensureDataObject(elemGeoName) {
            if (!ggbApplet.exists(elemGeoName)) {
                var elemGeoValue = DOUBLE_QUOTE + DOUBLE_QUOTE;
                ggbApplet.evalCommand(elemGeoName + " = " + elemGeoValue);
                OoGebra.setInternal(elemGeoName);
                OoGebra.setImmutable(elemGeoName, true);
            }
        }
        function ensureCache() {
            for (var i = 0; i < listLength; i++) {
                if (cache[i] == null) {
                    var elemGeoName = getElemGeoName(i);
                    if (ggbApplet.exists(elemGeoName)) {
                        var unescapedJsonString = ggbApplet.getValueString(elemGeoName) + '';
                        if (unescapedJsonString) {
                            cache[i] = JSON.parse(dataUnescape(unescapedJsonString));
                        }
                        else {
                            cache[i] = {};
                        }
                    }
                }
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
            var prevIgnoreImm = OoGebra.getIgnoreImmutables();
            OoGebra.setIgnoreImmutables(true);
            var hash = getHash(key);
            var index = hash & (listLength - 1);
            var elemGeoName = getElemGeoName(index);
            ensureDataObject(elemGeoName);
            ensureCache();
            if (data === undefined) {
                delete cache[index][key];
            }
            else {
                cache[index][key] = data;
            }
            if (Object.keys(cache[index]).length == 0) {
                ggbApplet.deleteObject(elemGeoName);
                OoGebra.setImmutable(elemGeoName, false);
            }
            else {
                var escapedData = dataEscape(JSON.stringify(cache[index]));
                var command = elemGeoName + " = " + (DOUBLE_QUOTE + escapedData + DOUBLE_QUOTE);
                ggbApplet.evalCommand(command);
            }
            OoGebra.setIgnoreImmutables(prevIgnoreImm);
        }
        Data.set = set;
        function get(key) {
            var hash = getHash(key);
            var index = hash & (listLength - 1);
            var elemGeoName = getElemGeoName(index);
            ensureDataObject(elemGeoName);
            ensureCache();
            return cache[index][key];
        }
        Data.get = get;
    })(Data || (Data = {}));
    function setData(key, data) {
        return Data.set(key, data);
    }
    OoGebra.setData = setData;
    function getData(key) {
        return Data.get(key);
    }
    OoGebra.getData = getData;
    function deleteData(key) {
        return Data.set(key, undefined);
    }
    OoGebra.deleteData = deleteData;
})(OoGebra || (OoGebra = {}));
var OoGebra;
(function (OoGebra) {
    var Immutable;
    (function (Immutable) {
        var Key = 'b31ef8a7-d6de-439c-a283-6dddd9c96ca7';
        var OnRename = 'f08a8677-3c6a-4c03-a051-cb15c374a502';
        var OnUpdate = '28092476-efaa-4244-a580-87ab358a46ae';
        var OnRemove = '1a2bfcbb-7d60-44af-8813-038769db62f3';
        var OnClient = '0e0bcdc3-a558-49a6-8a4e-87b4dae99cf8';
        Immutable.ignoreExplicitly = false;
        function shouldIgnoreImmutable() {
            return OoGebra.getMode() === "development" || Immutable.ignoreExplicitly;
        }
        var OnRenameListener = OoGebra.registerListener(OnRename, function (oldObjName, _objName) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = OoGebra.getData(Key) || [];
                var isImmutable = immutableObjNames.indexOf(oldObjName) > -1;
                if (isImmutable) {
                    ggbApplet.undo();
                }
            }
        });
        var OnUpdateListener = OoGebra.registerListener(OnUpdate, function (objName) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = OoGebra.getData(Key) || [];
                var isImmutable = immutableObjNames.indexOf(objName) > -1;
                if (isImmutable) {
                    ggbApplet.undo();
                }
            }
        });
        var OnRemoveListener = OoGebra.registerListener(OnRemove, function (objName) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = OoGebra.getData(Key) || [];
                var isImmutable = immutableObjNames.indexOf(objName) > -1;
                if (isImmutable) {
                    ggbApplet.undo();
                }
            }
        });
        var OnClientListener = OoGebra.registerListener(OnClient, function (type, target, _argument) {
            if (!shouldIgnoreImmutable()) {
                var immutableObjNames = OoGebra.getData(Key) || [];
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
            return OoGebra.getData(Key) || [];
        }
        Immutable.getObjNames = getObjNames;
        function setObjNames(objNames) {
            OoGebra.setData(Key, objNames);
        }
        Immutable.setObjNames = setObjNames;
        function registerObjName(objNames, objName, immutable) {
            var objNameIndex = objNames.indexOf(objName);
            if (objNameIndex > -1 && !immutable) {
                objNames.splice(objNameIndex, 1);
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
            ggbApplet.unregisterRenameListener(OnRenameListener);
            ggbApplet.unregisterUpdateListener(OnUpdateListener);
            ggbApplet.unregisterRemoveListener(OnRemoveListener);
            ggbApplet.unregisterClientListener(OnClientListener);
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
        if (!getIgnoreImmutables()) {
            if (noImmutableObjNamesBefore && immObjNames.length > 0) {
                Immutable.register();
            }
            else if (immObjNames.length === 0) {
                Immutable.unregister();
            }
        }
    }
    OoGebra.setImmutable = setImmutable;
    function setIgnoreImmutables(ignore) {
        Immutable.ignoreExplicitly = ignore;
        if (ignore) {
            Immutable.unregister();
        }
        else {
            Immutable.load();
        }
    }
    OoGebra.setIgnoreImmutables = setIgnoreImmutables;
    function getIgnoreImmutables() {
        return Immutable.ignoreExplicitly;
    }
    OoGebra.getIgnoreImmutables = getIgnoreImmutables;
    Immutable.load();
})(OoGebra || (OoGebra = {}));
var OoGebra;
(function (OoGebra) {
    var Core;
    (function (Core) {
        Core.version = '2.0';
        Core.name = 'OoGebraCore';
        Core.geoName = Core.name + "_{" + Core.version + "}";
        OoGebra.setIgnoreImmutables(true);
        OoGebra.setInternal(Core.geoName);
        OoGebra.setImmutable(Core.geoName, true);
        OoGebra.setIgnoreImmutables(false);
    })(Core = OoGebra.Core || (OoGebra.Core = {}));
})(OoGebra || (OoGebra = {}));
var OoGebra;
(function (OoGebra) {
    OoGebra.log('OoGebra sucessfully loaded!');
})(OoGebra || (OoGebra = {}));
if (!global.hasOwnProperty('OoGebra')) {
    Object.defineProperty(global, 'OoGebra', {
        value: OoGebra
    });
}
