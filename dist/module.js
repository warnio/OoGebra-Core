"use strict";
var OoGebra;
(function (OoGebra) {
    var loadFunctions = [];
    function onInit(fn) {
        loadFunctions.push(fn);
    }
    OoGebra.onInit = onInit;
    function init() {
        for (var _i = 0, loadFunctions_1 = loadFunctions; _i < loadFunctions_1.length; _i++) {
            var fn = loadFunctions_1[_i];
            fn();
        }
        log('OoGebra sucessfully loaded!');
    }
    OoGebra.init = init;
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
})(OoGebra || (OoGebra = {}));
var OoGebra;
(function (OoGebra) {
    var Color = /** @class */ (function () {
        function Color(red, green, blue) {
            this.r = red;
            this.g = green;
            this.b = blue;
        }
        return Color;
    }());
    OoGebra.Color = Color;
    var Style = /** @class */ (function () {
        function Style() {
        }
        Style.internal = Object.freeze({
            visible: false,
            trace: false,
            labelVisible: false,
            auxiliary: true,
            fixed: {
                fixed: true,
                selectionAllowed: false
            },
        });
        return Style;
    }());
    OoGebra.Style = Style;
    function setStyle(objName, style) {
        style.visible == null || ggbApplet.setVisible(objName, style.visible);
        style.layer == null || ggbApplet.setLayer(objName, style.layer);
        style.trace == null || ggbApplet.setTrace(objName, style.trace);
        style.labelVisible == null || ggbApplet.setLabelVisible(objName, style.labelVisible);
        style.labelStyle == null || ggbApplet.setLabelStyle(objName, style.labelStyle);
        style.lineThickness == null || ggbApplet.setLineThickness(objName, style.lineThickness);
        style.lineStyle == null || ggbApplet.setLineStyle(objName, style.lineStyle);
        style.pointSize == null || ggbApplet.setPointSize(objName, style.pointSize);
        style.pointStyle == null || ggbApplet.setLayer(objName, style.pointStyle);
        style.color == null || ggbApplet.setColor(objName, style.color.r, style.color.g, style.color.b);
        style.fillOpacity == null || ggbApplet.setFilling(objName, style.fillOpacity);
        style.auxiliary == null || ggbApplet.setAuxiliary(objName, style.auxiliary);
        if (style.fixed != null) {
            if (style.fixed.selectionAllowed != null) {
                ggbApplet.setFixed(objName, style.fixed.fixed, style.fixed.selectionAllowed);
            }
            else {
                ggbApplet.setFixed(objName, style.fixed.fixed);
            }
        }
    }
    OoGebra.setStyle = setStyle;
    function getStyle(objName) {
        return {
            visible: ggbApplet.getVisible(objName),
            layer: ggbApplet.getLayer(objName),
            trace: ggbApplet.isTracing(objName),
            labelVisible: ggbApplet.getLabelVisible(objName),
            labelStyle: ggbApplet.getLabelStyle(objName),
            lineThickness: ggbApplet.getLineThickness(objName),
            lineStyle: ggbApplet.getLineStyle(objName),
            pointSize: ggbApplet.getPointSize(objName),
            pointStyle: ggbApplet.getPointStyle(objName),
            color: getColor(objName),
            fillOpacity: ggbApplet.getFilling(objName),
        };
    }
    OoGebra.getStyle = getStyle;
    function getColor(objName) {
        var colorText = ggbApplet.getColor(objName);
        var r = parseInt(colorText.slice(1, 3), 16);
        var g = parseInt(colorText.slice(3, 5), 16);
        var b = parseInt(colorText.slice(5, 7), 16);
        return new Color(r, g, b);
    }
    OoGebra.getColor = getColor;
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
                OoGebra.setStyle(elemGeoName, OoGebra.Style.internal);
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
            if (!shouldIgnoreImmutable() && getImmutable(oldObjName)) {
                ggbApplet.undo();
            }
        });
        var OnUpdateListener = OoGebra.registerListener(OnUpdate, function (objName) {
            if (!shouldIgnoreImmutable() && getImmutable(objName)) {
                ggbApplet.undo();
            }
        });
        var OnRemoveListener = OoGebra.registerListener(OnRemove, function (objName) {
            if (!shouldIgnoreImmutable() && getImmutable(objName)) {
                ggbApplet.undo();
            }
        });
        var OnClientListener = OoGebra.registerListener(OnClient, function (type, target, _argument) {
            if (!shouldIgnoreImmutable() && getImmutable(target)) {
                if (type === 'updateStyle') {
                    ggbApplet.undo();
                }
                if (type === 'select') {
                    ggbApplet.setUndoPoint();
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
    function getImmutable(objName) {
        return Immutable.getObjNames().indexOf(objName) > -1;
    }
    OoGebra.getImmutable = getImmutable;
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
        OoGebra.onInit(function () {
            var prevIgnoreImm = OoGebra.getIgnoreImmutables();
            OoGebra.setIgnoreImmutables(true);
            OoGebra.setStyle(Core.geoName, OoGebra.Style.internal);
            OoGebra.setImmutable(Core.geoName, true);
            OoGebra.setIgnoreImmutables(prevIgnoreImm);
        });
    })(Core = OoGebra.Core || (OoGebra.Core = {}));
})(OoGebra || (OoGebra = {}));
OoGebra.init();
if (!global.hasOwnProperty('OoGebra')) {
    Object.defineProperty(global, 'OoGebra', {
        value: OoGebra
    });
}
