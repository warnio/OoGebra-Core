declare namespace OoGebra {
    function onInit(fn: () => void): void;
    function init(): void;
    function getMode(): 'development' | 'production';
    function log(message: string): void;
}
declare namespace OoGebra {
    class Color {
        r: number;
        g: number;
        b: number;
        constructor(red: number, green: number, blue: number);
    }
    type Layer = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    type LineThickness = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    type PointSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    const enum LabelStyle {
        Name = 0,
        NameValue = 1,
        Value = 2,
        Caption = 3
    }
    const enum LineStyle {
        Normal = 0,
        Dashed = 1,
        Smalldash = 2,
        Dotted = 3,
        Dotdash = 4
    }
    const enum PointStyle {
        Default = -1,
        FilledCircle = 0,
        Cross = 1,
        Circle = 2,
        Plus = 3,
        FilledDiamond = 4,
        UnfilledDiamond = 5,
        TriangleNorth = 6,
        TriangleSouth = 7,
        TriangleEast = 8,
        TriangleWest = 9
    }
    class Style {
        static readonly internal: Style;
        visible?: boolean;
        layer?: Layer;
        trace?: boolean;
        labelVisible?: boolean;
        labelStyle?: LabelStyle;
        lineThickness?: LineThickness;
        lineStyle?: LineStyle;
        pointSize?: PointSize;
        pointStyle?: PointStyle;
        color?: Color;
        fillOpacity?: number;
        auxiliary?: boolean;
        fixed?: boolean;
        selectionAllowed?: boolean;
    }
    interface ObservableStyle {
        visible: boolean;
        layer: Layer;
        trace: boolean;
        labelVisible: boolean;
        labelStyle: LabelStyle;
        lineThickness: LineThickness;
        lineStyle: LineStyle;
        pointSize: PointSize;
        pointStyle: PointStyle;
        color: Color;
        fillOpacity: number;
    }
    function setStyle(objName: string, style: Style): void;
    function getStyle(objName: string): ObservableStyle;
    function getColor(objName: string): Color;
}
declare namespace OoGebra {
    namespace Internal {
        class Listeners {
            private static readonly listeners;
        }
    }
    function registerListener(name: string, fn: Function): string;
    function unregisterListener(name: string): void;
}
declare namespace OoGebra {
    function setData(key: string, data: any): void;
    function getData(key: string): any;
    function deleteData(key: string): void;
}
declare namespace OoGebra {
    type GeoReference = number;
    function getReference(objName: string): number;
    function getObjName(reference: GeoReference): string;
}
declare namespace OoGebra {
    function setImmutable(objName: string, immutable: boolean): void;
    function getImmutable(objName: string): boolean;
    function setIgnoreImmutables(ignore: boolean): void;
    function getIgnoreImmutables(): boolean;
}
declare namespace OoGebra {
    enum GeoType {
        /** ANGLE */
        Angle = "angle",
        /** AXIS */
        Axis = "axis",
        /** BOOLEAN */
        Boolean = "boolean",
        /** BUTTON */
        Button = "button",
        /** TEXTFIELD */
        TextField = "textfield",
        /** CONIC */
        Conic = "conic",
        /** CONICPART */
        ConicPart = "conicpart",
        /** FUNCTION */
        Function = "function",
        /** INTERVAL */
        Interval = "interval",
        /** IMAGE */
        Image = "image",
        /** LINE */
        Line = "line",
        /** LIST */
        List = "list",
        /** LOCUS */
        Locus = "locus",
        /** NUMERIC */
        Numeric = "numeric",
        /** POINT */
        Point = "point",
        /** POLYGON */
        Polygon = "polygon",
        /** RAY */
        Ray = "ray",
        /** SEGMENT */
        Segment = "segment",
        /** TEXT */
        Text = "text",
        /** Formula */
        Formula = "formula",
        /** VECTOR */
        Vector = "vector",
        /** CURVE_CARTESIAN */
        CurveCartesian = "curvecartesian",
        /** IMPLICIT_POLY */
        ImplicitPoly = "implicitpoly",
        /** FUNCTION_NVAR */
        FunctionNVar = "functionnvar",
        /** POLYLINE */
        PolyLine = "polyline",
        /** PENSTROKE */
        PenStroke = "penstroke",
        /** TURTLE */
        Turtle = "turtle",
        /** CAS_CELL */
        CasCell = "cascell",
        /** PLANE */
        Plane = "plane",
        /** QUADRIC */
        Quadric = "quadric",
        /** POLYHEDRON */
        Polyhedron = "polyhedron",
        /** NET */
        Net = "net",
        /** SURFACECARTESIAN */
        Surface = "surface",
        /** IMPLICIT_SURFACE_ */
        ImplicitSurface = "implicitsurface",
        /** CLIPPINGCUBE */
        ClippingCube3D = "clippingcube3D",
        /** SPACE */
        Space = "space",
        /** AUDIO */
        Audio = "audio",
        /** VIDEO */
        Video = "video",
        /**
         * Embedded GeoGebra applet
         */
        Embed = "embed",
        /** DEFAULT */
        Default = "default",
        /** SYmbolic row in CAS calc */
        Symbolic = "symbolic",
        /** Inline text */
        InlineText = "inlineText",
        /** Inline editable table */
        Table = "table"
    }
    class GeoStyle implements Style {
        readonly geo: Geo;
        constructor(geo: Geo);
        assign(style: Style): void;
        get visible(): boolean;
        set visible(visible: boolean);
        get layer(): Layer;
        set layer(layer: Layer);
        get trace(): boolean;
        set trace(flag: boolean);
        get labelVisible(): boolean;
        set labelVisible(visible: boolean);
        get labelStyle(): LabelStyle;
        set labelStyle(style: LabelStyle);
        get lineThickness(): LineThickness;
        set lineThickness(thickness: LineThickness);
        get lineStyle(): LineStyle;
        set lineStyle(style: LineStyle);
        get pointSize(): PointSize;
        set pointSize(size: PointSize);
        get pointStyle(): PointStyle;
        set pointStyle(style: PointStyle);
        get color(): Color;
        set color(color: Color);
        get fillOpacity(): number;
        set fillOpacity(opacity: number);
        set fixed(fixed: boolean);
        set selectionAllowed(selectionAllowed: boolean);
    }
    interface Position {
        x: number;
        y: number;
        z: number;
    }
    class GeoPosition implements Position {
        readonly geo: Geo;
        constructor(geo: Geo);
        assign(pos: Position, threeDimensional?: boolean): void;
        setCoords(x: number, y: number, z?: number): void;
        get x(): number;
        set x(x: number);
        get y(): number;
        set y(y: number);
        get z(): number;
        set z(z: number);
    }
    class Geo {
        private __reference;
        private __position;
        private __style;
        constructor(name: string | null, definition: string);
        rename(newName: string): void;
        delete(): void;
        toString(): string;
        get exists(): boolean;
        set name(newName: string);
        get name(): string;
        set definition(newDefinition: string);
        get definition(): string;
        get type(): GeoType;
        get pos(): GeoPosition;
        get position(): GeoPosition;
        get style(): GeoStyle;
        set value(value: number);
        get value(): number;
        set text(text: string);
        get text(): string;
        set caption(caption: string);
        get caption(): string;
        get description(): string;
        get isDefined(): boolean;
        get isIndependent(): boolean;
        get isMovable(): boolean;
        set animating(animate: boolean);
        set animationSpeed(speed: number);
        setCoords(x: number, y: number, z?: number): void;
        getCommandString(): string;
        getFormattedCaption(): string;
        getLaTeXString(): string;
        getLaTeXImageBase64(forValueString: boolean): string;
        private __create;
        private __createWithoutLabel;
        private __replaceDefinitionName;
    }
}
declare namespace OoGebra {
    namespace Core {
        const version = "2.0";
        const name = "OoGebraCore";
        const geoName: string;
    }
}
declare namespace OoGebra {
}
declare const global: any;
