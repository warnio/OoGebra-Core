
namespace OoGebra {

  export enum GeoType {

    /** ANGLE */
    Angle = 'angle',

    /** AXIS */
    Axis = 'axis',

    /** BOOLEAN */
    Boolean = 'boolean',

    /** BUTTON */
    Button = 'button',

    /** TEXTFIELD */
    TextField = 'textfield',

    /** CONIC */
    Conic = 'conic',

    /** CONICPART */
    ConicPart = 'conicpart',

    /** FUNCTION */
    Function = 'function',

    /** INTERVAL */
    Interval = 'interval',

    /** IMAGE */
    Image = 'image',

    /** LINE */
    Line = 'line',

    /** LIST */
    List = 'list',

    /** LOCUS */
    Locus = 'locus',

    /** NUMERIC */
    Numeric = 'numeric',

    /** POINT */
    Point = 'point',

    /** POLYGON */
    Polygon = 'polygon',

    /** RAY */
    Ray = 'ray',

    /** SEGMENT */
    Segment = 'segment',

    /** TEXT */
    Text = 'text',

    /** Formula */
    Formula = 'formula',

    /** VECTOR */
    Vector = 'vector',

    /** CURVE_CARTESIAN */
    CurveCartesian = 'curvecartesian',

    /** IMPLICIT_POLY */
    ImplicitPoly = 'implicitpoly',

    /** FUNCTION_NVAR */
    FunctionNVar = 'functionnvar',

    /** POLYLINE */
    PolyLine = 'polyline',

    /** PENSTROKE */
    PenStroke = 'penstroke',

    /** TURTLE */
    Turtle = 'turtle',

    /** CAS_CELL */
    CasCell = 'cascell',

    /** PLANE */
    Plane = 'plane',

    /** QUADRIC */
    Quadric = 'quadric',

    /** POLYHEDRON */
    Polyhedron = 'polyhedron',

    /** NET */
    Net = 'net',

    /** SURFACECARTESIAN */
    Surface = 'surface',

    /** IMPLICIT_SURFACE_ */
    ImplicitSurface = 'implicitsurface',

    /** CLIPPINGCUBE */
    ClippingCube3D = 'clippingcube3D',

    /** SPACE */
    Space = 'space',

    /** AUDIO */
    Audio = 'audio',

    /** VIDEO */
    Video = 'video',

    /**
     * Embedded GeoGebra applet
     */
    Embed = 'embed',

    /** DEFAULT */
    Default = 'default',

    /** SYmbolic row in CAS calc */
    Symbolic = 'symbolic',

    /** Inline text */
    InlineText = 'inlineText',

    /** Inline editable table */
    Table = 'table',

  }

  export class GeoStyle implements Style {

    readonly geo: Geo;

    constructor(geo: Geo) {
      this.geo = geo;
    }

    assign(style: Style) {
      setStyle(this.geo.name, style);
    }

    get visible(): boolean {
      return ggbApplet.getVisible(this.geo.name);
    }

    set visible(visible: boolean) {
      ggbApplet.setVisible(this.geo.name, visible);
    }

    get layer(): Layer {
      return ggbApplet.getLayer(this.geo.name) as Layer;
    }

    set layer(layer: Layer) {
      ggbApplet.setLayer(this.geo.name, layer);
    }

    get trace(): boolean {
      return ggbApplet.isTracing(this.geo.name);
    }

    set trace(flag: boolean) {
      ggbApplet.setTrace(this.geo.name, flag);
    }

    get labelVisible(): boolean {
      return ggbApplet.getLabelVisible(this.geo.name);
    }

    set labelVisible(visible: boolean) {
      ggbApplet.setLabelVisible(this.geo.name, visible);
    }

    get labelStyle(): LabelStyle {
      return ggbApplet.getLabelStyle(this.geo.name);
    }

    set labelStyle(style: LabelStyle) {
      ggbApplet.setLabelStyle(this.geo.name, style);
    }

    get lineThickness(): LineThickness {
      return ggbApplet.getLineThickness(this.geo.name) as LineThickness;
    }

    set lineThickness(thickness: LineThickness) {
      ggbApplet.setLineThickness(this.geo.name, thickness);
    }

    get lineStyle(): LineStyle {
      return ggbApplet.getLineStyle(this.geo.name);
    }

    set lineStyle(style: LineStyle) {
      ggbApplet.setLineStyle(this.geo.name, style);
    }

    get pointSize(): PointSize {
      return ggbApplet.getPointSize(this.geo.name) as PointSize;
    }

    set pointSize(size: PointSize) {
      ggbApplet.setPointSize(this.geo.name, size);
    }

    get pointStyle(): PointStyle {
      return ggbApplet.getPointStyle(this.geo.name);
    }

    set pointStyle(style: PointStyle) {
      ggbApplet.setPointStyle(this.geo.name, style);
    }

    get color(): Color {
      return getColor(this.geo.name)
    }

    set color(color: Color) {
      ggbApplet.setColor(this.geo.name, color.r, color.g, color.b)
    }

    get fillOpacity(): number {
      return ggbApplet.getFilling(this.geo.name);
    }

    set fillOpacity(opacity: number) {
      ggbApplet.setFilling(this.geo.name, opacity);
    }

    set fixed(fixed: boolean) {
      ggbApplet.setFixed(this.geo.name, fixed);
    }

    set selectionAllowed(selectionAllowed: boolean) {
      const isMovable = this.geo.isMovable;
      const fixed = !isMovable;
      ggbApplet.setFixed(this.geo.name, fixed, selectionAllowed);
    }

  }

  export interface Position {
    x: number;
    y: number;
    z: number;
  }

  export class GeoPosition implements Position {

    readonly geo: Geo;

    constructor(geo: Geo) {
      this.geo = geo;
    }

    assign(pos: Position, threeDimensional = false) {
      this.x = pos.x;
      this.y = pos.y;
      if (threeDimensional) {
        this.z = pos.z;
      }
    }

    public setCoords(x: number, y: number, z?: number) {
      if (z == null) {
        ggbApplet.setCoords(this.geo.name, x, y);
      } else {
        ggbApplet.setCoords(this.geo.name, x, y, z);
      }
    }

    public get x(): number {
      return ggbApplet.getXcoord(this.geo.name);
    }

    public set x(x: number) {
      ggbApplet.setCoords(this.geo.name, x, this.y);
    }

    public get y(): number {
      return ggbApplet.getYcoord(this.geo.name);
    }

    public set y(y: number) {
      ggbApplet.setCoords(this.geo.name, this.x, y);
    }

    public get z(): number {
      return ggbApplet.getZcoord(this.geo.name);
    }

    public set z(z: number) {
      ggbApplet.setCoords(this.geo.name, this.x, this.y, z);
    }

  }

  export class Geo {

    private __reference: GeoReference;

    private __position: GeoPosition;

    private __style: GeoStyle;

    constructor(name: string | null, definition: string) {
      if (name == null) {
        name = this.__createWithoutLabel(definition);
      } else if (!(definition == null && ggbApplet.exists(name))) {
        this.__create(definition, name);
      }
      this.__reference = getReference(name);
      this.__position = new GeoPosition(this);
      this.__style = new GeoStyle(this);
    }

    public rename(newName: string) {
      ggbApplet.renameObject(this.name, newName)
    }

    public delete() {
      ggbApplet.deleteObject(this.name);
    }

    public toString() {
      return this.name;
    }

    public get exists(): boolean {
      return ggbApplet.exists(this.name);
    }

    public set name(newName: string) {
      this.rename(newName);
    }

    public get name(): string {
      return getObjName(this.__reference);
    }

    public set definition(newDefinition: string) {
      this.__create(newDefinition, this.name);
    }

    public get definition(): string {
      const valueString = ggbApplet.getValueString(this.name)+'';
      if (this.type === GeoType.Text) {
        return `${this.name} = "${valueString}"`;
      }
      return valueString;
    }

    public get type(): GeoType {
      return ggbApplet.getObjectType(this.name)+'' as GeoType;
    }

    public get pos(): GeoPosition {
      return this.__position
    }

    public get position(): GeoPosition {
      return this.__position
    }

    public get style(): GeoStyle {
      return this.__style
    }

    public set value(value: number) {
      ggbApplet.setValue(this.name, value);
    }

    public get value(): number {
      return ggbApplet.getValue(this.name);
    }

    public set text(text: string) {
      ggbApplet.setTextValue(this.name, text);
    }

    public get text(): string {
      return ggbApplet.getValueString(this.name)+'';
    }

    public set caption(caption: string) {
      ggbApplet.setCaption(this.name, caption)
    }

    public get caption(): string {
      return ggbApplet.getCaption(this.name, false)+''
    }

    public get description(): string {
      return ggbApplet.getDefinitionString(this.name)+'';
    }

    public get isDefined(): boolean {
      return ggbApplet.isDefined(this.name);
    }

    public get isIndependent(): boolean {
      return ggbApplet.isIndependent(this.name);
    }

    public get isMovable(): boolean {
      return ggbApplet.isMoveable(this.name);
    }

    public set animating(animate: boolean) {
      ggbApplet.setAnimating(this.name, animate)
    }

    public set animationSpeed(speed: number) {
      ggbApplet.setAnimationSpeed(this.name, speed);
    }

    public setCoords(x: number, y: number, z?: number) {
      if (z == null) {
        ggbApplet.setCoords(this.name, x, y);
      } else {
        ggbApplet.setCoords(this.name, x, y, z);
      }
    }

    public getCommandString(): string {
      return ggbApplet.getCommandString(this.name)+'';
    }

    public getFormattedCaption(): string {
      return ggbApplet.getCaption(this.name, true)+'';
    }

    public getLaTeXString(): string {
      return ggbApplet.getLaTeXString(this.name)+'';
    }

    public getLaTeXImageBase64(forValueString: boolean): string {
      return ggbApplet.getLaTeXBase64(this.name, forValueString)+'';
    }
    private __create(definition: string, name: string) {
      const namedDefinition = this.__replaceDefinitionName(definition, name)
      ggbApplet.evalCommand(namedDefinition);
    }

    private __createWithoutLabel(definition: string): string {
      return ggbApplet.evalCommandGetLabels(definition) + '';
    }

    private __replaceDefinitionName(unnamedDefinition: string, name: string) {
      return unnamedDefinition.replace(/^[^\s_():=]*(?:_{[^\s}]+})?/, name)
    }

  }

}
