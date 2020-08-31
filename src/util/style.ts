
namespace OoGebra {

  export class Color {

    r: number;
    g: number;
    b: number;

    constructor(red: number, green: number, blue: number) {
      this.r = red;
      this.g = green;
      this.b = blue;
    }

  }

  export type Layer = 0|1|2|3|4|5|6|7|8|9;

  export type LineThickness = 1|2|3|4|5|6|7|8|9|10|11|12|13;

  export type PointSize = 1|2|3|4|5|6|7|8|9;

  export const enum LabelStyle {
    Name = 0,
    NameValue = 1,
    Value = 2,
    Caption = 3,
  }

  export const enum LineStyle {
    Normal = 0,
    Dashed = 1,
    Smalldash = 2,
    Dotted = 3,
    Dotdash = 4
  }

  export const enum PointStyle {
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
    TriangleWest = 9,
  }

  export class Style {

    static readonly internal: Style = Object.freeze({
      visible: false,
      trace: false,
      labelVisible: false,
      auxiliary: true,
      fixed: true,
      selectionAllowed: false
    })

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

  export interface ObservableStyle {
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

  export function setStyle(objName: string, style: Style): void {
    const isMoveable = ggbApplet.isMoveable(objName);
    style.visible           == null || ggbApplet.setVisible       (objName, style.visible);
    style.layer             == null || ggbApplet.setLayer         (objName, style.layer);
    style.trace             == null || ggbApplet.setTrace         (objName, style.trace);
    style.labelVisible      == null || ggbApplet.setLabelVisible  (objName, style.labelVisible);
    style.labelStyle        == null || ggbApplet.setLabelStyle    (objName, style.labelStyle);
    style.lineThickness     == null || ggbApplet.setLineThickness (objName, style.lineThickness);
    style.lineStyle         == null || ggbApplet.setLineStyle     (objName, style.lineStyle);
    style.pointSize         == null || ggbApplet.setPointSize     (objName, style.pointSize);
    style.pointStyle        == null || ggbApplet.setLayer         (objName, style.pointStyle);
    style.color             == null || ggbApplet.setColor         (objName, style.color.r, style.color.g, style.color.b);
    style.fillOpacity       == null || ggbApplet.setFilling       (objName, style.fillOpacity);
    style.auxiliary         == null || ggbApplet.setAuxiliary     (objName, style.auxiliary);
    style.fixed             == null || ggbApplet.setFixed         (objName, style.fixed);
    style.selectionAllowed  == null || ggbApplet.setFixed         (objName, style.fixed ?? !isMoveable, style.selectionAllowed);
  }

  export function getStyle(objName: string): ObservableStyle {
    return {
      visible:        ggbApplet.getVisible(objName),
      layer:          ggbApplet.getLayer(objName) as Layer,
      trace:          ggbApplet.isTracing(objName),
      labelVisible:   ggbApplet.getLabelVisible(objName),
      labelStyle:     ggbApplet.getLabelStyle(objName),
      lineThickness:  ggbApplet.getLineThickness(objName) as LineThickness,
      lineStyle:      ggbApplet.getLineStyle(objName),
      pointSize:      ggbApplet.getPointSize(objName) as PointSize,
      pointStyle:     ggbApplet.getPointStyle(objName),
      color:          getColor(objName),
      fillOpacity:    ggbApplet.getFilling(objName),
    }
  }

  export function getColor(objName: string): Color {
    const colorText = ggbApplet.getColor(objName);
    const r = parseInt(colorText.slice(1, 3), 16);
    const g = parseInt(colorText.slice(3, 5), 16);
    const b = parseInt(colorText.slice(5, 7), 16);
    return new Color(r, g, b);
  }

}
