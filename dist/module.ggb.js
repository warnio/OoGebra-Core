'use strict';

var OoGebra;

(function(OoGebra) {
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
        return ggbApplet.exists('development') && ggbApplet.getValue('development') ? 'development' : 'production';
    }
    OoGebra.getMode = getMode;
    function log(message) {
        if (getMode() === 'development') {
            alert('[Development]: ' + message);
        }
    }
    OoGebra.log = log;
})(OoGebra || (OoGebra = {}));

var OoGebra;

(function(OoGebra) {
    var Color = function() {
        function Color(red, green, blue) {
            this.r = red;
            this.g = green;
            this.b = blue;
        }
        return Color;
    }();
    OoGebra.Color = Color;
    var Style = function() {
        function Style() {}
        Style.internal = Object.freeze({
            visible: false,
            trace: false,
            labelVisible: false,
            auxiliary: true,
            fixed: true,
            selectionAllowed: false
        });
        return Style;
    }();
    OoGebra.Style = Style;
    function setStyle(objName, style) {
        var _a;
        var isMoveable = ggbApplet.isMoveable(objName);
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
        style.fixed == null || ggbApplet.setFixed(objName, style.fixed);
        style.selectionAllowed == null || ggbApplet.setFixed(objName, (_a = style.fixed) !== null && _a !== void 0 ? _a : !isMoveable, style.selectionAllowed);
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
            fillOpacity: ggbApplet.getFilling(objName)
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

(function(OoGebra) {
    var listeners = {};
    var Internal;
    (function(Internal) {
        var Listeners = function() {
            function Listeners() {}
            Listeners.listeners = listeners;
            return Listeners;
        }();
        Internal.Listeners = Listeners;
    })(Internal = OoGebra.Internal || (OoGebra.Internal = {}));
    function registerListener(name, fn) {
        listeners[name] = fn;
        return 'OoGebra.Internal.Listeners.listeners[' + JSON.stringify(name) + ']';
    }
    OoGebra.registerListener = registerListener;
    function unregisterListener(name) {
        delete listeners[name];
    }
    OoGebra.unregisterListener = unregisterListener;
})(OoGebra || (OoGebra = {}));

var OoGebra;

(function(OoGebra) {
    var Data;
    (function(Data) {
        Data.version = '3.0';
        Data.name = 'OoGebraData';
        var dataObjNameRegex = /^OoGebraData_\{3\.0_\[([^}]*)]}$/;
        function isData(objName) {
            return dataObjNameRegex.test(objName);
        }
        function getDataKey(objName) {
            var match = dataObjNameRegex.exec(objName);
            if (match == null) return null;
            return keyUnescape(match[1]);
        }
        function getKeyObjName(key) {
            var escapedKey = keyEscape(key);
            return Data.name + '_{' + Data.version + '_[' + escapedKey + ']}';
        }
        var keyEscapeRegex = /&|}/g;
        var keyEscapeReplacer = function(match) {
            switch (match) {
              case '}':
                return '&c';

              default:
                return '&a';
            }
        };
        var keyUnescapeRegex = /&c|&a/g;
        var keyUnescapeReplacer = function(match) {
            switch (match) {
              case '&c':
                return '}';

              default:
                return '&';
            }
        };
        var dataEscapeRegex = /&|\u0022/g;
        var dataEscapeReplacer = function(match) {
            switch (match) {
              case '\u0022':
                return '&q';

              default:
                return '&a';
            }
        };
        var dataUnescapeRegex = /&q|&a/g;
        var dataUnescapeReplacer = function(match) {
            switch (match) {
              case '&q':
                return '\u0022';

              default:
                return '&';
            }
        };
        function keyEscape(string) {
            return string.replace(keyEscapeRegex, keyEscapeReplacer);
        }
        function keyUnescape(string) {
            return string.replace(keyUnescapeRegex, keyUnescapeReplacer);
        }
        function dataEscape(string) {
            return string.replace(dataEscapeRegex, dataEscapeReplacer);
        }
        function dataUnescape(string) {
            return string.replace(dataUnescapeRegex, dataUnescapeReplacer);
        }
        var cache = null;
        function ensureCache() {
            if (cache == null) {
                cache = {};
                var objNames = ggbApplet.getAllObjectNames();
                for (var _i = 0, objNames_1 = objNames; _i < objNames_1.length; _i++) {
                    var objName = objNames_1[_i];
                    if (isData(objName + '')) {
                        var key = getDataKey(objName + '');
                        var data = JSON.parse(dataUnescape(ggbApplet.getValueString(objName + '') + ''));
                        cache[key] = data;
                    }
                }
            }
        }
        function set(key, data) {
            var prevIgnoreImm = OoGebra.getIgnoreImmutables();
            OoGebra.setIgnoreImmutables(true);
            ensureCache();
            cache[key] = data;
            var objName = getKeyObjName(key);
            var escapedData = dataEscape(JSON.stringify(data));
            var objDidNotExist = !ggbApplet.exists(objName);
            var command = objName + ' = \u0022' + escapedData + '\u0022';
            ggbApplet.evalCommand(command);
            if (objDidNotExist) {
                OoGebra.setStyle(objName, OoGebra.Style.internal);
                OoGebra.setImmutable(objName, true);
            }
            OoGebra.setIgnoreImmutables(prevIgnoreImm);
        }
        Data.set = set;
        function get(key) {
            ensureCache();
            return cache[key];
        }
        Data.get = get;
        function del(key) {
            var prevIgnoreImm = OoGebra.getIgnoreImmutables();
            OoGebra.setIgnoreImmutables(true);
            ensureCache();
            delete cache[key];
            var objName = getKeyObjName(key);
            ggbApplet.deleteObject(objName);
            OoGebra.setIgnoreImmutables(prevIgnoreImm);
        }
        Data.del = del;
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
        return Data.del(key);
    }
    OoGebra.deleteData = deleteData;
})(OoGebra || (OoGebra = {}));

var OoGebra;

(function(OoGebra) {
    var lastRefKey = '865482c3-64ff-429e-9793-62a6f38808e2';
    var nameToRefMapKey = 'bff1a578-02d2-4dbe-97fc-4a160b6326cd';
    var refToNameMapKey = '0c60bcd5-fd1a-45ee-b539-991beebf8afd';
    var onRenameListenerName = 'f40190fe-c057-4993-a8f4-90bd4392d44b';
    var onRemoveListenerName = 'be12c789-55cd-4ff6-b881-255d13765277';
    var lastRef;
    var nameToRefMap;
    var refToNameMap;
    function getReference(objName) {
        if (!(objName in nameToRefMap)) {
            var ref = lastRef++;
            nameToRefMap[objName] = ref;
            refToNameMap[ref] = objName;
            updateData();
        }
        return nameToRefMap[objName];
    }
    OoGebra.getReference = getReference;
    function getObjName(reference) {
        var _a;
        return (_a = refToNameMap[reference]) !== null && _a !== void 0 ? _a : null;
    }
    OoGebra.getObjName = getObjName;
    function onRename(oldObjName, objName) {
        oldObjName += '';
        objName += '';
        if (oldObjName in nameToRefMap) {
            var ref = nameToRefMap[objName] = nameToRefMap[oldObjName];
            refToNameMap[ref] = objName;
            delete nameToRefMap[oldObjName];
            updateData();
        }
    }
    function onRemove(objName) {
        objName += '';
        if (objName in nameToRefMap) {
            var ref = getReference(objName);
            delete nameToRefMap[objName];
            delete refToNameMap[ref];
            updateData();
        }
    }
    var onRenameListener = OoGebra.registerListener(onRenameListenerName, onRename);
    var onRemoveListener = OoGebra.registerListener(onRemoveListenerName, onRemove);
    ggbApplet.registerRenameListener(onRenameListener);
    ggbApplet.registerRemoveListener(onRemoveListener);
    function updateData() {
        OoGebra.setData(lastRefKey, lastRef);
        OoGebra.setData(nameToRefMapKey, nameToRefMap);
        OoGebra.setData(refToNameMapKey, refToNameMap);
    }
    OoGebra.onInit(function() {
        var _a, _b, _c;
        lastRef = (_a = OoGebra.getData(lastRefKey)) !== null && _a !== void 0 ? _a : 0;
        nameToRefMap = (_b = OoGebra.getData(nameToRefMapKey)) !== null && _b !== void 0 ? _b : {};
        refToNameMap = (_c = OoGebra.getData(refToNameMapKey)) !== null && _c !== void 0 ? _c : {};
    });
})(OoGebra || (OoGebra = {}));

var OoGebra;

(function(OoGebra) {
    var Immutable;
    (function(Immutable) {
        var immutableObjNamesKey = 'b31ef8a7-d6de-439c-a283-6dddd9c96ca7';
        var onRenameListenerName = 'f08a8677-3c6a-4c03-a051-cb15c374a502';
        var onClickListenerName = 'dbe3e5b4-0a23-49a8-89fa-f298ee2218aa';
        var onUpdateListenerName = '28092476-efaa-4244-a580-87ab358a46ae';
        var onRemoveListenerName = '1a2bfcbb-7d60-44af-8813-038769db62f3';
        var onClientListenerName = '0e0bcdc3-a558-49a6-8a4e-87b4dae99cf8';
        Immutable.ignoreExplicitly = false;
        function shouldIgnoreImmutable() {
            return OoGebra.getMode() === 'development' || Immutable.ignoreExplicitly;
        }
        var onRenameListener = OoGebra.registerListener(onRenameListenerName, function(oldObjName, _objName) {
            oldObjName += '';
            _objName += '';
            if (!shouldIgnoreImmutable() && getImmutable(oldObjName)) {
                ggbApplet.undo();
            }
        });
        var onClickListener = OoGebra.registerListener(onClickListenerName, function(objName) {
            objName += '';
            if (!shouldIgnoreImmutable() && getImmutable(objName)) {
                ggbApplet.setUndoPoint();
            }
        });
        var onUpdateListener = OoGebra.registerListener(onUpdateListenerName, function(objName) {
            objName += '';
            if (!shouldIgnoreImmutable() && getImmutable(objName)) {
                ggbApplet.undo();
            }
        });
        var onRemoveListener = OoGebra.registerListener(onRemoveListenerName, function(objName) {
            objName += '';
            if (!shouldIgnoreImmutable() && getImmutable(objName)) {
                ggbApplet.undo();
            }
        });
        var onClientListener = OoGebra.registerListener(onClientListenerName, function(type, target, _argument) {
            type += '';
            target += '';
            _argument += '';
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
            var _a;
            return (_a = OoGebra.getData(immutableObjNamesKey)) !== null && _a !== void 0 ? _a : [];
        }
        Immutable.getObjNames = getObjNames;
        function setObjNames(objNames) {
            OoGebra.setData(immutableObjNamesKey, objNames);
        }
        Immutable.setObjNames = setObjNames;
        function registerObjName(objNames, objName, immutable) {
            var objNameIndex = objNames.indexOf(objName);
            if (objNameIndex > -1 && !immutable) {
                objNames.splice(objNameIndex, 1);
            } else if (objNameIndex < 0 && immutable) {
                objNames.push(objName);
            }
            return objNames;
        }
        Immutable.registerObjName = registerObjName;
        function register() {
            ggbApplet.registerRenameListener(onRenameListener);
            ggbApplet.registerClickListener(onClickListener);
            ggbApplet.registerUpdateListener(onUpdateListener);
            ggbApplet.registerRemoveListener(onRemoveListener);
            ggbApplet.registerClientListener(onClientListener);
        }
        Immutable.register = register;
        function unregister() {
            ggbApplet.unregisterRenameListener(onRenameListener);
            ggbApplet.unregisterClickListener(onClickListener);
            ggbApplet.unregisterUpdateListener(onUpdateListener);
            ggbApplet.unregisterRemoveListener(onRemoveListener);
            ggbApplet.unregisterClientListener(onClientListener);
        }
        Immutable.unregister = unregister;
        function load() {
            var immutableObjNames = getObjNames();
            if (immutableObjNames.length > 0) {
                register();
            } else {
                unregister();
            }
        }
        load();
    })(Immutable || (Immutable = {}));
    function setImmutable(objName, immutable) {
        var immObjNames = Immutable.getObjNames();
        var noImmutableObjNamesBefore = immObjNames.length == 0;
        immObjNames = Immutable.registerObjName(immObjNames, objName, immutable);
        Immutable.setObjNames(immObjNames);
        if (!getIgnoreImmutables()) {
            if (noImmutableObjNamesBefore && immObjNames.length > 0) {
                Immutable.register();
            } else if (immObjNames.length === 0) {
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
        var immutableObjNames = Immutable.getObjNames();
        Immutable.ignoreExplicitly = ignore;
        if (ignore || immutableObjNames.length === 0) {
            Immutable.unregister();
        } else {
            Immutable.register();
        }
    }
    OoGebra.setIgnoreImmutables = setIgnoreImmutables;
    function getIgnoreImmutables() {
        return Immutable.ignoreExplicitly;
    }
    OoGebra.getIgnoreImmutables = getIgnoreImmutables;
})(OoGebra || (OoGebra = {}));

var OoGebra;

(function(OoGebra) {
    var GeoType;
    (function(GeoType) {
        GeoType['Angle'] = 'angle';
        GeoType['Axis'] = 'axis';
        GeoType['Boolean'] = 'boolean';
        GeoType['Button'] = 'button';
        GeoType['TextField'] = 'textfield';
        GeoType['Conic'] = 'conic';
        GeoType['ConicPart'] = 'conicpart';
        GeoType['Function'] = 'function';
        GeoType['Interval'] = 'interval';
        GeoType['Image'] = 'image';
        GeoType['Line'] = 'line';
        GeoType['List'] = 'list';
        GeoType['Locus'] = 'locus';
        GeoType['Numeric'] = 'numeric';
        GeoType['Point'] = 'point';
        GeoType['Polygon'] = 'polygon';
        GeoType['Ray'] = 'ray';
        GeoType['Segment'] = 'segment';
        GeoType['Text'] = 'text';
        GeoType['Formula'] = 'formula';
        GeoType['Vector'] = 'vector';
        GeoType['CurveCartesian'] = 'curvecartesian';
        GeoType['ImplicitPoly'] = 'implicitpoly';
        GeoType['FunctionNVar'] = 'functionnvar';
        GeoType['PolyLine'] = 'polyline';
        GeoType['PenStroke'] = 'penstroke';
        GeoType['Turtle'] = 'turtle';
        GeoType['CasCell'] = 'cascell';
        GeoType['Plane'] = 'plane';
        GeoType['Quadric'] = 'quadric';
        GeoType['Polyhedron'] = 'polyhedron';
        GeoType['Net'] = 'net';
        GeoType['Surface'] = 'surface';
        GeoType['ImplicitSurface'] = 'implicitsurface';
        GeoType['ClippingCube3D'] = 'clippingcube3D';
        GeoType['Space'] = 'space';
        GeoType['Audio'] = 'audio';
        GeoType['Video'] = 'video';
        GeoType['Embed'] = 'embed';
        GeoType['Default'] = 'default';
        GeoType['Symbolic'] = 'symbolic';
        GeoType['InlineText'] = 'inlineText';
        GeoType['Table'] = 'table';
    })(GeoType = OoGebra.GeoType || (OoGebra.GeoType = {}));
    var GeoStyle = function() {
        function GeoStyle(geo) {
            this.geo = geo;
        }
        GeoStyle.prototype.assign = function(style) {
            OoGebra.setStyle(this.geo.name, style);
        };
        Object.defineProperty(GeoStyle.prototype, 'visible', {
            get: function() {
                return ggbApplet.getVisible(this.geo.name);
            },
            set: function(visible) {
                ggbApplet.setVisible(this.geo.name, visible);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'layer', {
            get: function() {
                return ggbApplet.getLayer(this.geo.name);
            },
            set: function(layer) {
                ggbApplet.setLayer(this.geo.name, layer);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'trace', {
            get: function() {
                return ggbApplet.isTracing(this.geo.name);
            },
            set: function(flag) {
                ggbApplet.setTrace(this.geo.name, flag);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'labelVisible', {
            get: function() {
                return ggbApplet.getLabelVisible(this.geo.name);
            },
            set: function(visible) {
                ggbApplet.setLabelVisible(this.geo.name, visible);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'labelStyle', {
            get: function() {
                return ggbApplet.getLabelStyle(this.geo.name);
            },
            set: function(style) {
                ggbApplet.setLabelStyle(this.geo.name, style);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'lineThickness', {
            get: function() {
                return ggbApplet.getLineThickness(this.geo.name);
            },
            set: function(thickness) {
                ggbApplet.setLineThickness(this.geo.name, thickness);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'lineStyle', {
            get: function() {
                return ggbApplet.getLineStyle(this.geo.name);
            },
            set: function(style) {
                ggbApplet.setLineStyle(this.geo.name, style);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'pointSize', {
            get: function() {
                return ggbApplet.getPointSize(this.geo.name);
            },
            set: function(size) {
                ggbApplet.setPointSize(this.geo.name, size);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'pointStyle', {
            get: function() {
                return ggbApplet.getPointStyle(this.geo.name);
            },
            set: function(style) {
                ggbApplet.setPointStyle(this.geo.name, style);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'color', {
            get: function() {
                return OoGebra.getColor(this.geo.name);
            },
            set: function(color) {
                ggbApplet.setColor(this.geo.name, color.r, color.g, color.b);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'fillOpacity', {
            get: function() {
                return ggbApplet.getFilling(this.geo.name);
            },
            set: function(opacity) {
                ggbApplet.setFilling(this.geo.name, opacity);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'fixed', {
            set: function(fixed) {
                ggbApplet.setFixed(this.geo.name, fixed);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoStyle.prototype, 'selectionAllowed', {
            set: function(selectionAllowed) {
                var isMovable = this.geo.isMovable;
                var fixed = !isMovable;
                ggbApplet.setFixed(this.geo.name, fixed, selectionAllowed);
            },
            enumerable: false,
            configurable: true
        });
        return GeoStyle;
    }();
    OoGebra.GeoStyle = GeoStyle;
    var GeoPosition = function() {
        function GeoPosition(geo) {
            this.geo = geo;
        }
        GeoPosition.prototype.assign = function(pos, threeDimensional) {
            if (threeDimensional === void 0) {
                threeDimensional = false;
            }
            this.x = pos.x;
            this.y = pos.y;
            if (threeDimensional) {
                this.z = pos.z;
            }
        };
        GeoPosition.prototype.setCoords = function(x, y, z) {
            if (z == null) {
                ggbApplet.setCoords(this.geo.name, x, y);
            } else {
                ggbApplet.setCoords(this.geo.name, x, y, z);
            }
        };
        Object.defineProperty(GeoPosition.prototype, 'x', {
            get: function() {
                return ggbApplet.getXcoord(this.geo.name);
            },
            set: function(x) {
                ggbApplet.setCoords(this.geo.name, x, this.y);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoPosition.prototype, 'y', {
            get: function() {
                return ggbApplet.getYcoord(this.geo.name);
            },
            set: function(y) {
                ggbApplet.setCoords(this.geo.name, this.x, y);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeoPosition.prototype, 'z', {
            get: function() {
                return ggbApplet.getZcoord(this.geo.name);
            },
            set: function(z) {
                ggbApplet.setCoords(this.geo.name, this.x, this.y, z);
            },
            enumerable: false,
            configurable: true
        });
        return GeoPosition;
    }();
    OoGebra.GeoPosition = GeoPosition;
    var Geo = function() {
        function Geo(name, definition) {
            if (name == null) {
                name = this.__createWithoutLabel(definition);
            } else if (!(definition == null && ggbApplet.exists(name))) {
                this.__create(definition, name);
            }
            this.__reference = OoGebra.getReference(name);
            this.__position = new GeoPosition(this);
            this.__style = new GeoStyle(this);
        }
        Geo.prototype.rename = function(newName) {
            ggbApplet.renameObject(this.name, newName);
        };
        Geo.prototype.delete = function() {
            ggbApplet.deleteObject(this.name);
        };
        Geo.prototype.toString = function() {
            return this.name;
        };
        Object.defineProperty(Geo.prototype, 'exists', {
            get: function() {
                return ggbApplet.exists(this.name);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'name', {
            get: function() {
                return OoGebra.getObjName(this.__reference);
            },
            set: function(newName) {
                this.rename(newName);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'definition', {
            get: function() {
                var valueString = ggbApplet.getValueString(this.name) + '';
                if (this.type === GeoType.Text) {
                    return this.name + ' = \u0022' + valueString + '\u0022';
                }
                return valueString;
            },
            set: function(newDefinition) {
                this.__create(newDefinition, this.name);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'type', {
            get: function() {
                return ggbApplet.getObjectType(this.name) + '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'pos', {
            get: function() {
                return this.__position;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'position', {
            get: function() {
                return this.__position;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'style', {
            get: function() {
                return this.__style;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'value', {
            get: function() {
                return ggbApplet.getValue(this.name);
            },
            set: function(value) {
                ggbApplet.setValue(this.name, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'text', {
            get: function() {
                return ggbApplet.getValueString(this.name) + '';
            },
            set: function(text) {
                ggbApplet.setTextValue(this.name, text);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'caption', {
            get: function() {
                return ggbApplet.getCaption(this.name, false) + '';
            },
            set: function(caption) {
                ggbApplet.setCaption(this.name, caption);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'description', {
            get: function() {
                return ggbApplet.getDefinitionString(this.name) + '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'isDefined', {
            get: function() {
                return ggbApplet.isDefined(this.name);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'isIndependent', {
            get: function() {
                return ggbApplet.isIndependent(this.name);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'isMovable', {
            get: function() {
                return ggbApplet.isMoveable(this.name);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'animating', {
            set: function(animate) {
                ggbApplet.setAnimating(this.name, animate);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geo.prototype, 'animationSpeed', {
            set: function(speed) {
                ggbApplet.setAnimationSpeed(this.name, speed);
            },
            enumerable: false,
            configurable: true
        });
        Geo.prototype.setCoords = function(x, y, z) {
            if (z == null) {
                ggbApplet.setCoords(this.name, x, y);
            } else {
                ggbApplet.setCoords(this.name, x, y, z);
            }
        };
        Geo.prototype.getCommandString = function() {
            return ggbApplet.getCommandString(this.name) + '';
        };
        Geo.prototype.getFormattedCaption = function() {
            return ggbApplet.getCaption(this.name, true) + '';
        };
        Geo.prototype.getLaTeXString = function() {
            return ggbApplet.getLaTeXString(this.name) + '';
        };
        Geo.prototype.getLaTeXImageBase64 = function(forValueString) {
            return ggbApplet.getLaTeXBase64(this.name, forValueString) + '';
        };
        Geo.prototype.__create = function(definition, name) {
            var namedDefinition = this.__replaceDefinitionName(definition, name);
            ggbApplet.evalCommand(namedDefinition);
        };
        Geo.prototype.__createWithoutLabel = function(definition) {
            return ggbApplet.evalCommandGetLabels(definition) + '';
        };
        Geo.prototype.__replaceDefinitionName = function(unnamedDefinition, name) {
            return unnamedDefinition.replace(/^[^\s_():=]*(?:_{[^\s}]+})?/, name);
        };
        return Geo;
    }();
    OoGebra.Geo = Geo;
})(OoGebra || (OoGebra = {}));

var OoGebra;

(function(OoGebra) {
    var Core;
    (function(Core) {
        Core.version = '2.0';
        Core.name = 'OoGebraCore';
        Core.geoName = Core.name + '_{' + Core.version + '}';
        OoGebra.onInit(function() {
            var prevIgnoreImm = OoGebra.getIgnoreImmutables();
            OoGebra.setIgnoreImmutables(true);
            OoGebra.setStyle(Core.geoName, OoGebra.Style.internal);
            OoGebra.setImmutable(Core.geoName, true);
            OoGebra.setIgnoreImmutables(prevIgnoreImm);
        });
    })(Core = OoGebra.Core || (OoGebra.Core = {}));
})(OoGebra || (OoGebra = {}));

var OoGebra;

(function(OoGebra) {
    var onAddListenerName = 'a73e022e-55a8-4305-a36e-c15bc38847ce';
    var onUpdateListenerName = '4d75fcd2-4729-463c-82d2-4039ad436460';
    var onRenameListenerName = '8bde32d9-7c95-4ef9-8c69-f5c390db0da7';
    var onRemoveListenerName = '81c6e4dd-c99a-41eb-b485-dc5b134ee5ea';
    var moduleRegex = /^OoGebraModule_\{([^}]+)}$/;
    var objNames = ggbApplet.getAllObjectNames();
    var geval = eval;
    var Register;
    (function(Register) {
        var modules = {};
        function set(name, code) {
            modules[name] = code;
        }
        Register.set = set;
        function rename(oldName, name) {
            modules[name] = modules[oldName];
            remove(modules[oldName]);
        }
        Register.rename = rename;
        function remove(name) {
            delete modules[name];
        }
        Register.remove = remove;
        function has(name, code) {
            return modules[name] === code;
        }
        Register.has = has;
    })(Register || (Register = {}));
    function isModule(objName) {
        return moduleRegex.test(objName);
    }
    function getModuleName(objName) {
        return moduleRegex.exec(objName)[1];
    }
    function loadModule(objName, moduleName) {
        OoGebra.setImmutable(objName, true);
        OoGebra.setStyle(objName, OoGebra.Style.internal);
        var moduleCode = ggbApplet.getValueString(objName);
        try {
            geval('(' + moduleCode + ')')(objName);
            OoGebra.log('Module ' + moduleName + ' successfully loaded.');
        } catch (e) {
            OoGebra.log([ 'Module ' + moduleName + ' failed to load.', e.message, 'FileName: ' + e.fileName, 'LineNumber: ' + e.lineNumber ].join('\n'));
        }
    }
    function loadPotentialModule(objName) {
        objName += '';
        var code = ggbApplet.getValueString(objName) + '';
        if (isModule(objName) && !Register.has(objName, code)) {
            Register.set(objName, code);
            var moduleName = getModuleName(objName);
            loadModule(objName, moduleName);
        }
    }
    OoGebra.onInit(function() {
        for (var _i = 0, objNames_2 = objNames; _i < objNames_2.length; _i++) {
            var objName = objNames_2[_i];
            loadPotentialModule(objName + '');
        }
    });
    function onAdd(objName) {
        loadPotentialModule(objName + '');
    }
    function onUpdate(objName) {
        loadPotentialModule(objName + '');
    }
    function onRename(oldObjName, objName) {
        Register.rename(oldObjName + '', objName + '');
    }
    function onRemove(objName) {
        Register.remove(objName + '');
    }
    var onAddListener = OoGebra.registerListener(onAddListenerName, onAdd);
    var onUpdateListener = OoGebra.registerListener(onUpdateListenerName, onUpdate);
    var onRenameListener = OoGebra.registerListener(onRenameListenerName, onRename);
    var onRemoveListener = OoGebra.registerListener(onRemoveListenerName, onRemove);
    ggbApplet.registerAddListener(onAddListener);
    ggbApplet.registerUpdateListener(onUpdateListener);
    ggbApplet.registerRenameListener(onRenameListener);
    ggbApplet.registerRemoveListener(onRemoveListener);
})(OoGebra || (OoGebra = {}));

if (!global.hasOwnProperty('OoGebra')) {
    Object.defineProperty(global, 'OoGebra', {
        value: OoGebra
    });
}

OoGebra.init();