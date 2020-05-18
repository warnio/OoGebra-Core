declare namespace OoGebra {
    function onInit(fn: () => void): void;
    function init(): void;
    function getMode(): "development" | "production";
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
        fixed?: {
            fixed: boolean;
            selectionAllowed?: boolean;
        };
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
    function setImmutable(objName: string, immutable: boolean): void;
    function getImmutable(objName: string): boolean;
    function setIgnoreImmutables(ignore: boolean): void;
    function getIgnoreImmutables(): boolean;
}
declare namespace OoGebra {
    namespace Core {
        const version = "2.0";
        const name = "OoGebraCore";
        const geoName: string;
    }
}
declare namespace OoGebra { }
declare const global: any;
