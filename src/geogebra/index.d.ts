// Type definitions for GeoGebra
// Project: Oogebra
// Definitions by: Dylan Groeneveld

/*~ This is the global-modifying module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ Note: If your global-modifying module is callable or constructable, you'll
 *~ need to combine the patterns here with those in the module-class or module-function
 *~ template files
 */

type byte = number;

type int = number;

type double = number;

declare global {

  const ggbApplet: GgbAPIW;

}

interface GgbAPIW {

  // JavaScriptAPI.java

  /**
   * Returns current construction as a ggb file in form of a byte array.
   *
   * @return null if something went wrong
   */
  getGGBfile(): byte[]

  /**
   * Returns current construction in XML format. May be used for saving.
   *
   * @return XML representation of construction
   */
  getXML(): String

  /**
   * @return XML representation of perspective
   */
  getPerspectiveXML(): String

  /**
   * @return base64 representation of current file
   */
  getBase64(): String

  /**
   * @param includeThumbnail
   * whether thumbnail should be included
   * @return base64 representation of current file
   */
  getBase64(includeThumbnail: boolean): String

  /**
   * Returns the GeoGebra XML string for the given GeoElement object, i.e.
   * only the <element> tag is returned.
   *
   * @param objName
   * object name
   * @return style XML
   */
  getXML(objName: String): String

  /**
   * For a dependent GeoElement objName the XML string of the parent algorithm
   * and all its output objects is returned. For a free GeoElement objName ""
   * is returned.
   *
   * @param objName
   * object name
   *
   * @return algorithm XML
   */
  getAlgorithmXML(objName: String): String

  /**
   * Opens construction given in XML format. May be used for loading
   * constructions.
   *
   * @param xml
   * construction XML
   */
  setXML(xml: String): void

  /**
   * Loads encoded file into the applet
   *
   * @param base64
   * base64 encoded content
   */
  setBase64(base64: String): void

  /**
   * Evaluates the given XML string and changes the current construction.
   * Note: the construction is NOT cleared before evaluating the XML string.
   *
   * @param xmlString
   * (partial) construction XML
   */
  evalXML(xmlString: String): void

  /**
   * Evaluates the given string as if it was entered into GeoGebra's input
   * text field.
   *
   * @param cmdString
   * command
   * @return whether execution was successful
   */
  evalCommand(cmdString: String): boolean

  /**
   * Runs command in CAS without checking GeoGebra variables
   *
   * @param cmdString
   * CAS command
   * @return CAS result
   */
  evalCommandCAS(cmdString: String): String

  /**
   * Runs command in CAS, all variables are substituted by GeoGebra objects
   *
   * @param cmdString
   * CAS command
   * @return CAS result
   */
  evalGeoGebraCAS(cmdString: String): String

  /**
   * prints a string to the JavaScript / Java Console
   *
   * @param string
   * string to be printed in console
   */
  debug(string: String): void

  /**
   * Turns showing of error dialogs on (true) or (off). Note: this is
   * especially useful together with evalCommand().
   */
  setErrorDialogsActive(flag: boolean): void

  /**
   * Turns on the fly creation of points in graphics view on (true) or (off).
   * Note: this is useful if you don't want tools to have the side effect of
   * creating points. For example, when this flag is set to false, the tool
   * "line through two points" will not create points on the fly when you
   * click on the background of the graphics view.
   */
  setOnTheFlyPointCreationActive(flag: boolean): void

  /**
   *
   */
  setUndoPoint(): void

  /**
   * Resets the initial construction (given in filename parameter) of this
   * applet.
   */
  reset(): void

  /**
   * Refreshs all views. Note: clears traces in geometry window.
   */
  refreshViews(): void

  /**
   * Loads a construction from a file (given URL). ...but the actual code is
   * in a thread to avoid JavaScript security issues
   */
  openFile(strURL: String): void

  /**
   * Shows or hides the object with the given name in the geometry window.
   */
  setVisible(objName: String, visible: boolean): void

  /**
   * returns true or false depending on whether the object is visible
   *
   * @param objName
   * object label
   * @return whether object is visible
   */
  getVisible(objName: String): boolean

  /**
   * @param objName
   * object name
   * @param view
   * graphics view ID: 1 or 2
   * @return whether object is visible in given view
   */
  getVisible(objName: String, view: int): boolean

  /**
   * Sets the layer of the object with the given name in the geometry window.
   * Michael Borcherds 2008-02-27
   */
  setLayer(objName: String, layer: int): void

  /**
   * Returns the layer of the object with the given name in the geometry
   * window. returns layer, or -1 if object doesn't exist Michael Borcherds
   * 2008-02-27
   *
   * @param objName
   * object label
   * @return layer index or -1
   */
  getLayer(objName: String): int

  /**
   * Shows or hides a complete layer Michael Borcherds 2008-02-27
   *
   * @param layer
   * layer index
   * @param visible
   * visibility flag
   */
  setLayerVisible(layer: int, visible: boolean): void

  /**
   * Sets the fixed state of the object with the given name.
   *
   * @param objName
   * object name
   * @param fixed
   * whether the object should be fixed
   */
  setFixed(objName: String, fixed: boolean): void

  /**
   *
   */
  setAuxiliary(objName: String, flag: boolean): void

  /**
   * Turns the trace of the object with the given name on or off.
   */
  setTrace(objName: String, flag: boolean): void

  /**
   * @param objName
   * object name
   * @return whether the trace for given object is on
   */
  isTracing(objName: String): boolean

  /**
   * Shows or hides the label of the object with the given name in the
   * geometry window.
   */
  setLabelVisible(objName: String, visible: boolean): void

  /**
   * @param objName
   * object label
   * @return whether its label is visible
   */
  getLabelVisible(objName: String): boolean

  /**
   * Sets the label style of the object with the given name in the geometry
   * window.
   *
   * @param objName
   * object label
   * @param style
   * Possible label styles are NAME = 0, NAME_VALUE = 1 and VALUE =
   * 2.
   */
  setLabelStyle(objName: String, style: int): void

  /**
   * Returns labeling style of the object
   *
   * @param objName
   * object label
   * @return labeling style
   */
  getLabelStyle(objName: String): int

  /**
   * Sets the line thickness of the object with the given name.
   */
  setLineThickness(objName: String, thickness: int): void

  /**
   * Returns the line thickness of the object
   *
   * @param objName
   * object label
   * @return line thickness
   */
  getLineThickness(objName: String): int

  /**
   * Sets the lineType of the object with the given name.(if possible)
   */
  setLineStyle(objName: String, style: int): void

  /**
   * Returns the lineType of the object
   *
   * @param objName
   * object label
   * @return line style
   */
  getLineStyle(objName: String): int

  /**
   * Sets the filling of the object with the given name. (if possible)
   */
  setFilling(objName: String, filling: double): void

  /**
   * Returns the filling of the object as an int (or -1 for no filling)
   *
   * @param objName
   * object label
   * @return the filling of the object as an int (or -1 for no filling)
   */
  getFilling(objName: String): double

  /**
   * Returns the point style of the object as an int (or -1 for default, or
   * not a point)
   *
   * @param objName
   * object label
   * @return the point style of the object as an int (or -1 for default, or
   * not a point)
   */
  getPointStyle(objName: String): int

  /**
   * Sets the point style of the object (-1 for default)
   *
   * @param objName
   * object label
   * @param style
   * point style
   */
  setPointSize(objName: String, style: int): void

  /**
   * Returns the point style of the object as an int (or -1 for default, or
   * not a point)
   *
   * @param objName
   * object label
   * @return point size
   */
  getPointSize(objName: String): int

  /**
   * Sets the point style of the object (-1 for default)
   *
   * @param objName
   * object label
   * @param style
   * point style
   */
  setPointStyle(objName: String, style: int): void

  /**
   * Sets the color of the object with the given name.
   *
   * @param objName
   * object label
   * @param red
   * red part (0-255)
   * @param green
   * green part (0-255)
   * @param blue
   * blue part (0-255)
   */
  setColor(objName: String, red: int, green: int, blue: int): void

  /**
   * @param red
   * red part (0-255)
   * @param green
   * green part (0-255)
   * @param blue
   * blue part (0-255)
   */
  setPenColor(red: int, green: int, blue: int): void

  /**
   * @param size
   * size in pixels
   */
  setPenSize(size: int): void

  /**
   *
   * @return pen size in pixels
   */
  getPenSize(): int

  /**
   *
   * @return pen color as RGB hex string (eg #AB1234)
   */
  getPenColor(): String

  /**
   * Returns the color of the object as an hex string. Note that the
   * hex-string starts with # and uses upper case letters, e.g. "#FF0000" for
   * red.
   *
   * @param objName
   * object label
   * @return hex color
   */
  getColor(objName: String): String

  /**
   * Deletes the object with the given name.
   */
  deleteObject(objName: String): void

  /**
   * Returns true if the object with the given name exists.
   *
   * @param objName
   * object label
   * @return whether object exists
   */
  exists(objName: String): boolean

  /**
   * Renames an object from oldName to newName.
   *
   * @return whether renaming worked
   */
  renameObject(oldObjName: String, newObjName: String, forceRename: boolean): boolean

  /**
   * Renames an object from oldName to newName.
   *
   * @return whether renaming worked
   */
  renameObject(oldObjName: String, newObjName: String): boolean

  /**
   * Sets whether an object should be animated. This does not start the
   * animation yet, use startAnimation() to do so.
   */
  setAnimating(objName: String, animate: boolean): void

  /**
   * Sets the animation speed of an object.
   */
  setAnimationSpeed(objName: String, speed: double): void

  /**
   * Starts automatic animation for all objects with the animating flag set.
   *
   * @see #setAnimating(String, boolean)
   */
  startAnimation(): void

  /**
   * Stops animation for all objects with the animating flag set.
   *
   * @see #setAnimating(String, boolean)
   */
  stopAnimation(): void

  /**
   * @param hideCursorWhenDragging
   * Whether or not to show the mouse pointer (cursor) when
   * dragging
   */
  hideCursorWhenDragging(hideCursorWhenDragging: boolean): void

  /**
   * Returns whether automatic animation is currently running.
   *
   * @return whether automatic animation is currently running.
   */
  isAnimationRunning(): boolean

  /**
   * Current frame rate of the animation.
   *
   * @return in seconds
   */
  getFrameRate(): double

  /**
   * Returns true if the object with the given name has a vaild value at the
   * moment.
   *
   * @param objName
   * object label
   * @return whether it's currently defined
   */
  isDefined(objName: String): boolean

  /**
   * Returns true if the object with the given name is independent.
   *
   * @param objName
   * object label
   * @return whether it is independent on other objects
   */
  isIndependent(objName: String): boolean

  /**
   * @param objName
   * object label
   * @return whether it can be moved
   */
  isMoveable(objName: String): boolean

  /**
   * Returns the value of the object with the given name as a string.
   *
   * @param objName
   * object name
   * @return value string
   */
  getValueString(objName: String): String

  /**
   * Returns the description of the object with the given name as a string.
   *
   * @param objName
   * object label
   * @return description string
   */
  getDefinitionString(objName: String): String

  /**
   * Returns the description of the object with the given name as a string.
   *
   * @param objName
   * object label
   * @param localize
   * whether to localize it
   * @return description string
   */
  getDefinitionString(objName: String, localize: boolean): String

  /**
   * Returns the object with the given name as a LaTeX string.
   *
   * @param objName
   * object label
   * @return object value as LaTeX
   */
  getLaTeXString(objName: String): String

  /**
   * Returns the command of the object with the given name as a string.
   *
   * @param objName
   * object label
   * @return defining command
   */
  getCommandString(objName: String): String

  /**
   * Returns the command of the object with the given name as a string.
   *
   * @param objName
   * object name
   * @param localize
   * whether local or English command should be used
   * @return command description of given object
   */
  getCommandString(objName: String, localize: boolean): String

  /**
   * @param objName
   * object name
   * @param substituteVars
   * whether %n, %v, ... should be replaced by name, value, ...
   * @return caption
   */
  getCaption(objName: String, substituteVars: boolean): String

  /**
   * @param objName
   * object name
   * @param caption
   * new caption
   */
  setCaption(objName: String, caption: String): void

  /**
   * Returns the x-coord of the object with the given name. Note: returns 0 if
   * the object is not a point or a vector.
   *
   * @param objName
   * object label
   * @return x-coordinate
   */
  getXcoord(objName: String): double

  /**
   * Returns the y-coord of the object with the given name. Note: returns 0 if
   * the object is not a point or a vector.
   *
   * @param objName
   * object label
   * @return y-coordinate
   */
  getYcoord(objName: String): double

  /**
   * Returns the z-coord of the object with the given name. Note: returns 0 if
   * the object is not a point or a vector.
   *
   * @param objName
   * object label
   * @return z-coordinate
   */
  getZcoord(objName: String): double

  /**
   * Sets the coordinates of the object with the given name. Note: if the
   * specified object is not a point or a vector, nothing happens.
   *
   * @param objName
   * object label
   * @param x
   * x-coordinate
   * @param y
   * y-coordinate
   */
  setCoords(objName: String, x: double, y: double): void

  /**
   *
   */
  setCoords(objName: String, x: double, y: double, z: double): void

  /**
   * Returns the double value of the object with the given name. Note: returns
   * 0 if the object does not have a value.
   *
   * @param objName
   * object label
   * @return value or 0
   */
  getValue(objName: String): double

  /**
   * Sets the double value of the object with the given name. Note: if the
   * specified object is not a number, nothing happens.
   *
   * @param objName
   * object label
   * @param value
   * value
   */
  setValue(objName: String, value: double): void

  /**
   * @param objName
   * object label
   * @param x
   * text value
   */
  setTextValue(objName: String, x: String): void

  /**
   * Sets the double value of the specified index of the list. Can be used to
   * extend the size of a list
   */
  setListValue(objName: String, x: double, y: double): void

  /**
   * Turns the repainting of all views on or off.
   */
  setRepaintingActive(flag: boolean): void

  /**
   *
   */
  writePNGtoFile(filename: String, exportScale: double, transparent: boolean, DPI: double, greyscale: boolean): boolean

  /**
   * @param exportScale
   * eg 1
   * @param transparent
   * eg true
   * @param dpi
   * eg 72
   * @param copyToClipboard
   * only supported in desktop, waiting for
   * https://code.google.com/p/chromium/issues/detail?id=150835
   * @param greyscale
   * true for monochrome
   * @return base64 encoded picture of active view
   */
  getPNGBase64(exportScale: double, transparent: boolean, dpi: double, copyToClipboard: boolean, greyscale: boolean): String

  /**
   * Sets the Cartesian coordinate system in the graphics window.
   */
  setCoordSystem(xmin: double, xmax: double, ymin: double, ymax: double): void

  /**
   * Shows or hides the x- and y-axis of the coordinate system in the graphics
   * window.
   */
  setAxesVisible(xVisible: boolean, yVisible: boolean): void

  /**
   * Shows or hides the x- and y-axis of the coordinate system in the graphics
   * window.
   */
  setAxesVisible(view: int, xVisible: boolean, yVisible: boolean, zVisible: boolean): void

  /**
   *
   */
  setAxisSteps(view: int, xStep: String, yStep: String, zStep: String): void

  /**
   *
   */
  setAxisLabels(view: int, xLabel: String, yLabel: String, zLabel: String): void

  /**
   *
   */
  setAxisUnits(view: int, xLabel: String, yLabel: String, zLabel: String): void

  /**
   *
   */
  setPointCapture(view: int, capture: int): void

  /**
   * Shows or hides the coordinate grid in the graphics windows 1 and 2.
   *
   * @param flag
   * visibility flag
   */
  setGridVisible(flag: boolean): void

  /**
   * Shows or hides the coordinate grid in the given graphics window.
   */
  setGridVisible(view: int, flag: boolean): void

  /**
   * @param view
   * view number
   * @return whether grid is visible in that view
   */
  getGridVisible(view: int): boolean

  /**
   * @return whether grid is visible in graphics 1
   */
  getGridVisible(): boolean

  /**
   * Returns an array with all object names.
   *
   * @return all object names
   */
  getAllObjectNames(): String[]

  /**
   * Returns an array with all object names.
   *
   * @param type
   * object type
   * @return objects of this type
   */
  getAllObjectNames(type: String): String[]

  /**
   * Returns the number of objects in the construction.
   *
   * @return number of objects
   */
  getObjectNumber(): int

  /**
   * Returns the name of the n-th object of this construction.
   *
   * @param i
   * index in construction
   * @return object label
   */
  getObjectName(i: int): String

  /**
   * Returns the type of the object with the given name as a string (e.g.
   * point, line, circle, ...)
   *
   * @param objName
   * object label
   * @return object type
   */
  getObjectType(objName: String): String

  /**
   * Sets the mode of the geometry window (EuclidianView).
   *
   * @param mode
   * app mode
   */
  setMode(mode: int): void

  /**
   * @return the current mode
   */
  getMode(): int

  /**
   * Registers a JavaScript function as an add listener for the applet's
   * construction. Whenever a new object is created in the GeoGebraApplet's
   * construction, the JavaScript function JSFunctionName is called using the
   * name of the newly created object as a single argument.
   */
  registerAddListener(JSFunctionName: String): void

  /**
   * Removes a previously registered add listener
   *
   * @see #registerAddListener(String)
   */
  unregisterAddListener(JSFunctionName: String): void

  /**
   * Registers a JavaScript function as a remove listener for the applet's
   * construction. Whenever an object is deleted in the GeoGebraApplet's
   * construction, the JavaScript function JSFunctionName is called using the
   * name of the deleted object as a single argument.
   */
  registerRemoveListener(JSFunctionName: String): void

  /**
   * Removes a previously registered remove listener
   *
   * @see #registerRemoveListener(String)
   */
  unregisterRemoveListener(JSFunctionName: String): void

  /**
   * Registers a JavaScript function as a clear listener for the applet's
   * construction. Whenever the construction in the GeoGebraApplet's is
   * cleared (i.e. all objects are removed), the JavaScript function
   * JSFunctionName is called using no arguments.
   */
  registerClearListener(JSFunctionName: String): void

  /**
   * Removes a previously registered clear listener
   *
   * @see #registerClearListener(String)
   */
  unregisterClearListener(JSFunctionName: String): void

  /**
   * Registers a JavaScript function as a rename listener for the applet's
   * construction. Whenever an object is renamed in the GeoGebraApplet's
   * construction, the JavaScript function JSFunctionName is called using the
   * name of the deleted object as a single argument.
   */
  registerRenameListener(JSFunctionName: String): void

  /**
   * Removes a previously registered rename listener.
   *
   * @see #registerRenameListener(String)
   */
  unregisterRenameListener(JSFunctionName: String): void

  /**
   * Registers a JavaScript function as an update listener for the applet's
   * construction. Whenever any object is updated in the GeoGebraApplet's
   * construction, the JavaScript function JSFunctionName is called using the
   * name of the updated object as a single argument.
   */
  registerUpdateListener(JSFunctionName: String): void

  /**
   * Removes a previously registered update listener.
   *
   * @see #registerRemoveListener(String)
   */
  unregisterUpdateListener(JSFunctionName: String): void

  /**
   * Registers a JavaScript update listener for an object. Whenever the object
   * with the given name changes, a JavaScript function named JSFunctionName
   * is called using the name of the changed object as the single argument. If
   * objName previously had a mapping JavaScript function, the old value is
   * replaced.
   *
   * Example: First, set a change listening JavaScript function:
   * ggbApplet.registerObjectUpdateListener("A", "myJavaScriptFunction"); Then
   * the GeoGebra Applet will call the Javascript function
   * myJavaScriptFunction("A"); whenever object A changes.
   */
  registerObjectUpdateListener(objName: String, JSFunctionName: String): void

  /**
   * Removes a previously set change listener for the given object.
   *
   * @see #registerObjectUpdateListener
   */
  unregisterObjectUpdateListener(objName: String): void

  /**
   * Registers a JavaScript function as an click listener for the applet's
   * construction. Whenever any object is clicked in the GeoGebraApplet's
   * construction, the JavaScript function JSFunctionName is called using the
   * name of the updated object as a single argument.
   */
  registerClickListener(JSFunctionName: String): void

  /**
   * Removes a previously registered Click listener.
   */
  unregisterClickListener(JSFunctionName: String): void

  /**
   *
   */
  registerClientListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterClientListener(JSFunctionName: String): void

  /**
   * Registers a JavaScript Click listener for an object. Whenever the object
   * with the given name changes, a JavaScript function named JSFunctionName
   * is called using the name of the changed object as the single argument. If
   * objName previously had a mapping JavaScript function, the old value is
   * replaced.
   */
  registerObjectClickListener(objName: String, JSFunctionName: String): void

  /**
   * Removes a previously set change listener for the given object.
   *
   * @see #registerObjectClickListener
   */
  unregisterObjectClickListener(objName: String): void

  /**
   *
   */
  registerStoreUndoListener(objName: String): void

  /**
   * Gets the double value of the specified index of the list.
   *
   * Returns Double.NaN if the object is not a GeoNumeric/Angle
   *
   * @param objName
   * list label
   * @param index
   * index
   * @return value at index
   */
  getListValue(objName: String, index: int): double

  /**
   *
   */
  setCorner(objName: String, x: double, y: double, index: int): void

  /**
   *
   */
  setCorner(objName: String, x: double, y: double): void

  /**
   *
   */
  setPerspective(s: String): void

  /**
   *
   */
  getCASObjectNumber(): int

  /**
   *
   */
  getVersion(): String

  /**
   *
   */
  enableCAS(enable: boolean): void

  /**
   *
   */
  enable3D(enable: boolean): void

  /**
   * @param enable
   * whether geogebra-web applet rightclick enabled or not
   */
  enableRightClick(enable: boolean): void

  /**
   * @param enable
   *
   * wheter labels draggable in geogebra-web applets or not
   */
  enableLabelDrags(enable: boolean): void

  /**
   * @param enable
   *
   * wheter shift - drag - zoom enabled in geogebra-web applets or
   * not
   */
  enableShiftDragZoom(enable: boolean): void

  /**
   *
   */
  setFont(label: String, size: int, bold: boolean, italic: boolean, serif: boolean): void

  /**
   *
   */
  setRounding(format: String): void

  /**
   *
   */
  newConstruction(): void

  /**
   * Cast undo
   *
   * @param repaint
   * true to repaint the views afterwards
   */
  undo(repaint: boolean): void

  /**
   * Cast redo
   *
   * @param repaint
   * true to repaint the views afterwards
   */
  redo(repaint: boolean): void

  /**
   *
   */
  getViewProperties(viewID: int): String

  /**
   *
   */
  logout(): void

  /**
   *
   */
  login(token: String): void

  /**
   * Returns localized name of given tool.
   *
   * @param mode
   * number
   * @return name of given tool.
   */
  getToolName(mode: int): String

  /**
   *
   */
  evalLaTeX(input: String, mode: int): void

  /**
   *
   * @return 3D model exported in collada format
   */
  exportCollada(xmin: double, xmax: double, ymin: double, ymax: double, zmin: double, zmax: double, xyScale: double, xzScale: double, xTickDistance: double, yTickDistance: double, zTickDistance: double): String

  /**
   *
   * @return 3D model exported in simple 3d format
   */
  exportSimple3d(name: String, xmin: double, xmax: double, ymin: double, ymax: double, zmin: double, zmax: double, xyScale: double, xzScale: double, xTickDistance: double, yTickDistance: double, zTickDistance: double): String

  // GgbAPI.java

  /**
   * Returns reference to Construction
   *
   * @return construction
   */
  getConstruction(): any // = Construction

  /**
   * Returns reference to Kernel
   *
   * @return kernel
   */
  getKernel(): any // = Kernel

  /**
   * Returns reference to AlgebraProcessor
   *
   * @return algebra processor
   */
  getAlgebraProcessor(): any // = AlgebraProcessor

  /**
   *
   */
  reset(): void

  /**
   * Evaluates the given XML string and changes the current construction.
   * Note: the construction is NOT cleared before evaluating the XML string.
   */
  evalXML(xmlString: String): void

  /**
   * Evaluates the given string as if it was entered into GeoGebra's CAS View
   * (but it won't create any objects etc in GeoGebra)
   *
   * @param cmdString
   * input to CAS
   * @return output from CAS
   */
  evalCommandCAS(cmdString: String): String

  /**
   * Evaluates the given string as if it was entered into GeoGebra's input
   * text field.
   */
  evalCommand(cmdString: String): boolean

  /**
   * Evaluates the given string as if it was entered into GeoGebra's input
   * text field.
   *
   * @param cmdString
   * command string
   * @return comma separated labels
   */
  evalCommandGetLabels(cmdString: String): String

  /**
   *
   */
  debug(string: String): void

  /**
   * Returns the GeoGebra XML string for the given GeoElement object, i.e.
   * only the <element> tag is returned.
   */
  getXML(objName: String): String

  /**
   * For a dependent GeoElement objName the XML string of the parent algorithm
   * and all its output objects is returned. For a free GeoElement objName ""
   * is returned.
   */
  getAlgorithmXML(objName: String): String

  /**
   * Shows or hides the object with the given name in the geometry window.
   */
  setVisible(objName: String, visible: boolean): void

  /**
   * Shows or hides the object with the given name in the geometry window.
   */
  getVisible(objName: String): boolean

  /**
   * Sets the layer of the object with the given name in the geometry window.
   * Michael Borcherds 2008-02-27
   */
  setLayer(objName: String, layer: int): void

  /**
   * Returns the layer of the object with the given name in the geometry
   * window. returns layer, or -1 if object doesn't exist Michael Borcherds
   * 2008-02-27
   */
  getLayer(objName: String): int

  /**
   * Shows or hides a complete layer Michael Borcherds 2008-02-27
   */
  setLayerVisible(layer: int, visible: boolean): void

  /**
   *
   */
  getAllObjectNames(): String[]

  /**
   *
   */
  getAllObjectNames(type: String): String[]

  /**
   *
   */
  setFixed(objName: String, fixed: boolean): void

  /**
   *
   */
  setFixed(objName: String, fixed: boolean, selectionAllowed: boolean): void

  /**
   * Turns the trace of the object with the given name on or off.
   */
  setTrace(objName: String, flag: boolean): void

  /**
   * Shows or hides the label of the object with the given name in the
   * geometry window.
   */
  setLabelVisible(objName: String, visible: boolean): void

  /**
   *
   */
  getLabelVisible(objName: String): boolean

  /**
   * Sets the label style of the object with the given name in the geometry
   * window. Possible label styles are NAME = 0, NAME_VALUE = 1 and VALUE = 2.
   */
  setLabelStyle(objName: String, style: int): void

  /**
   *
   */
  getLabelStyle(objName: String): int

  /**
   * Sets the color of the object with the given name.
   */
  setColor(objName: String, red: int, green: int, blue: int): void

  /**
   *
   */
  setCorner(objName: String, x: double, y: double): void

  /**
   *
   */
  setCorner(objName: String, x: double, y: double, index: int): void

  /**
   * Starts/stops an object animating
   */
  setAnimating(objName: String, animate: boolean): void

  /**
   * Sets the animation speed of an object
   */
  setAnimationSpeed(objName: String, speed: double): void

  /**
   * Returns the color of the object as an hex string. Note that the
   * hex-string starts with # and uses upper case letters, e.g. "#FF0000" for
   * red.
   */
  getColor(objName: String): String

  /**
   *
   */
  getLineThickness(objName: String): int

  /**
   *
   */
  setLineThickness(objName: String, lineThickness: int): void

  /**
   *
   */
  getPointStyle(objName: String): int

  /**
   *
   */
  setPointStyle(objName: String, style: int): void

  /**
   *
   */
  getPointSize(objName: String): int

  /**
   *
   */
  setPointSize(objName: String, style: int): void

  /**
   *
   */
  getFilling(objName: String): double

  /**
   *
   */
  setFilling(objName: String, filling: double): void

  /**
   *
   */
  setOnTheFlyPointCreationActive(flag: boolean): void

  /**
   *
   */
  setUndoPoint(): void

  /**
   * should only be used by web
   */
  initCAS(): void

  /**
   *
   */
  uploadToGeoGebraTube(): void

  /**
   *
   */
  startAnimation(): void

  /**
   *
   */
  stopAnimation(): void

  /**
   *
   */
  hideCursorWhenDragging(hideCursorWhenDragging: boolean): void

  /**
   *
   */
  isAnimationRunning(): boolean

  /**
   *
   */
  getFrameRate(): double

  /**
   *
   */
  registerAddListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterAddListener(JSFunctionName: String): void

  /**
   *
   */
  registerRemoveListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterRemoveListener(JSFunctionName: String): void

  /**
   *
   */
  registerClearListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterClearListener(JSFunctionName: String): void

  /**
   *
   */
  registerRenameListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterRenameListener(JSFunctionName: String): void

  /**
   *
   */
  registerUpdateListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterUpdateListener(JSFunctionName: String): void

  /**
   *
   */
  registerObjectUpdateListener(objName: String, JSFunctionName: String): void

  /**
   *
   */
  unregisterObjectUpdateListener(objName: String): void

  /**
   *
   */
  registerClickListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterClickListener(JSFunctionName: String): void

  /**
   *
   */
  registerClientListener(JSFunctionName: String): void

  /**
   *
   */
  unregisterClientListener(JSFunctionName: String): void

  /**
   *
   */
  registerObjectClickListener(objName: String, JSFunctionName: String): void

  /**
   *
   */
  unregisterObjectClickListener(objName: String): void

  /**
   *
   */
  registerStoreUndoListener(JSFunctionName: String): void

  /**
   *
   */
  isMoveable(objName: String): boolean

  /**
   * Returns the type of the object with the given name as a string (e.g.
   * point, line, circle, ...)
   */
  getObjectType(objName: String): String

  /**
   * Sets the mode of the geometry window (EuclidianView).
   */
  setMode(mode: int): void

  /**
   *
   */
  getMode(): int

  /**
   *
   */
  getLineStyle(objName: String): int

  /**
   *
   */
  setLineStyle(objName: String, style: int): void

  /**
   * Deletes the object with the given name.
   */
  deleteObject(objName: String): void

  /**
   *
   */
  renameObject(oldName: String, suggestedName: String, forceRename: boolean): boolean

  /**
   * Renames an object from oldName to newName.
   *
   * @return whether renaming worked
   */
  renameObject(oldName: String, newName: String): boolean

  /**
   * Returns true if the object with the given name exists.
   */
  exists(objName: String): boolean

  /**
   * Returns true if the object with the given name has a vaild value at the
   * moment.
   */
  isDefined(objName: String): boolean

  /**
   * Returns true if the object with the given name is independent.
   */
  isIndependent(objName: String): boolean

  /**
   * Returns the value of the object with the given name as a string.
   */
  getValueString(objName: String): String

  /**
   * Returns the definition of the object with the given name as a string.
   */
  getDefinitionString(objName: String): String

  /**
   *
   */
  getDefinitionString(objName: String, localize: boolean): String

  /**
   * Returns the object with the given name as a LaTeX string.
   */
  getLaTeXString(objName: String): String

  /**
   *
   */
  evalLaTeX(input: String, mode: int): void

  /**
   *
   * eg ggbApplet.evalMathML(
   * "<mrow><mi> x</mi><mo> +</mo><mrow><mi> 1</mi><mo>/</mo><mi> 2</mi></mrow></mrow>"
   * )
   *
   * @param input
   * command as presentation mathml
   * @return success
   */
  evalMathML(input: String): boolean

  /**
   * Returns the command of the object with the given name as a string.
   */
  getCommandString(objName: String): String

  /**
   *
   */
  getCommandString(objName: String, localize: boolean): String

  /**
   *
   */
  getCaption(objName: String, substituteVars: boolean): String

  /**
   *
   */
  setCaption(objName: String, caption: String): void

  /**
   *
   */
  getPerspectiveXML(): String

  /**
   * Returns the x-coord of the object with the given name. Note: returns 0 if
   * the object is not a point or a vector.
   */
  getXcoord(objName: String): double

  /**
   * Returns the y-coord of the object with the given name. Note: returns 0 if
   * the object is not a point or a vector.
   */
  getYcoord(objName: String): double

  /**
   *
   */
  getZcoord(objName: String): double

  /**
   * Sets the coordinates of the object with the given name. Note: if the
   * specified object is not a point or a vector, nothing happens.
   */
  setCoords(objName: String, x: double, y: double): void

  /**
   *
   */
  setCoords(objName: String, x: double, y: double, z: double): void

  /**
   * Returns the double value of the object with the given name. For a
   * boolean, returns 0 for false, 1 for true Note: returns 0 if the object
   * does not have a value.
   */
  getValue(objName: String): double

  /**
   * Sets the double value of the object with the given name. For a boolean 0
   * -> false, any other value -> true Note: if the specified object is not a
   * number, nothing happens.
   */
  setValue(objName: String, x: double): void

  /**
   *
   */
  setTextValue(objName: String, x: String): void

  /**
   *
   */
  setListValue(objName: String, x: double, y: double): void

  /**
   * Turns the repainting of all views on or off.
   */
  setRepaintingActive(flag: boolean): void

  /**
   * Sets the Cartesian coordinate system in the graphics window.
   */
  setCoordSystem(xmin: double, xmax: double, ymin: double, ymax: double): void

  /**
   * @param xmin
   * min of x axis range
   * @param xmax
   * max of x axis range
   * @param ymin
   * min of y axis range
   * @param ymax
   * max of y axis range
   * @param zmin
   * min of z axis range
   * @param zmax
   * max of z axis range
   * @param verticalY
   * true to set yAxis in vertical direction
   */
  setCoordSystem(xmin: double, xmax: double, ymin: double, ymax: double, zmin: double, zmax: double, verticalY: boolean): void

  /**
   * Shows or hides the x- and y-axis of the coordinate system in the graphics
   * window.
   */
  setAxesVisible(xVisible: boolean, yVisible: boolean): void

  /**
   *
   */
  setAxesVisible(view: int, xVisible: boolean, yVisible: boolean, zVisible: boolean): void

  /**
   * If the origin is off screen and the axes are visible, GeoGebra shows
   * coordinates of the upper-left and bottom-right screen corner. This method
   * lets you hide these corner coordinates.
   *
   * @param showAxesCornerCoords
   * true to show corner coordinates
   */
  setAxesCornerCoordsVisible(showAxesCornerCoords: boolean): void

  /**
   * Shows or hides the coordinate grid in the graphics window.
   */
  setGridVisible(flag: boolean): void

  /**
   *
   */
  setGridVisible(view: int, flag: boolean): void

  /**
   * Returns an array with the names of all selected objects.
   *
   * @return an array with the names of all selected objects.
   */
  getSelectedObjectNames(): String[]

  /**
   * Returns the number of objects in the construction.
   */
  getObjectNumber(): int

  /**
   * Returns the name of the n-th object of this construction.
   */
  getObjectName(i: int): String

  /**
   * Opens construction given in XML format. May be used for loading
   * constructions.
   */
  setXML(xml: String): void

  /**
   * Returns current construction in XML format. May be used for saving.
   */
  getXML(): String

  /**
   *
   */
  getPenSize(): int

  /**
   *
   */
  getPenColor(): String

  /**
   *
   */
  getListValue(objName: String, index: int): double

  /**
   *
   */
  undo(repaint: boolean): void

  /**
   * Undo without forced repaint
   */
  undo(): void

  /**
   * Redo without forced repaint
   */
  redo(): void

  /**
   *
   */
  redo(repaint: boolean): void

  /**
   * Cast redo
   */
  setSaved(): void

  /**
   * Deletes all construction elements
   */
  newConstruction(): void

  /**
   * @param view
   * view number
   * @return JSON string describing the view
   */
  getViewProperties(view: int): String

  /**
   * @param label
   * object
   * @param size
   * font size
   * @param bold
   * true for bold
   * @param italic
   * true for italic
   * @param serif
   * true for serif
   */
  setFont(label: String, size: int, bold: boolean, italic: boolean, serif: boolean): void

  /**
   * Evaluates the given string as if it was entered into GeoGebra CAS's input
   * text field.
   *
   * @param cmdString
   * CAS command
   *
   * @return evaluation result in GeoGebraCAS syntax
   */
  evalGeoGebraCAS(cmdString: String): String

  /**
   * Evaluates the given string as if it was entered into GeoGebra CAS's input
   * text field.
   *
   * @param cmdString
   * command string
   *
   * @param debugOutput
   * states whether debugging information should be printed to the
   * console
   * @return evaluation result in GeoGebraCAS syntax
   */
  evalGeoGebraCAS(cmdString: String, debugOutput: boolean): String

  /**
   * Performs login
   *
   * @param token
   * login token
   */
  login(token: String): void

  /**
   * Log current user out
   */
  logout(): void

  /**
   *
   */
  setPerspective(code: String): void

  /**
   *
   */
  getVisible(label: String, view: int): boolean

  /**
   *
   */
  getGridVisible(): boolean

  /**
   *
   */
  getGridVisible(view: int): boolean

  /**
   *
   */
  getCASObjectNumber(): int

  /**
   * @param localeStr
   * language or language_country
   */
  setLanguage(localeStr: String): void

  /**
   * @param rounding
   * eg "10" for 10dp or "10s" for 10 significant figures
   */
  setRounding(rounding: String): void

  /**
   *
   */
  getRounding(): String

  /**
   *
   */
  getVersion(): String

  /**
   * Changes display style of line or conic
   *
   * @param objName
   * object name
   * @param style
   * one of "parametric", "explicit", "implicit", "specific"
   */
  setDisplayStyle(objName: String, style: String): void

  /**
   *
   */
  enableCAS(enable: boolean): void

  /**
   *
   */
  enable3D(enable: boolean): void

  /**
   * @param enable
   * whether geogebra-web applet rightclick enabled or not
   */
  enableRightClick(enable: boolean): void

  /**
   * @param enable
   * wheter labels draggable in geogebra-web applets or not
   */
  enableLabelDrags(enable: boolean): void

  /**
   * @param enable
   * wheter shift - drag - zoom enabled in geogebra-web applets or
   * not
   */
  enableShiftDragZoom(enable: boolean): void

  /**
   *
   */
  setAxisSteps(view: int, xStep: String, yStep: String, zStep: String): void

  /**
   *
   */
  setAxisLabels(view: int, xLabel: String, yLabel: String, zLabel: String): void

  /**
   *
   */
  getAxisLabels(view: int): String[]

  /**
   *
   */
  setAxisUnits(view: int, xLabel: String, yLabel: String, zLabel: String): void

  /**
   *
   */
  getAxisUnits(view: int): String[]

  /**
   *
   */
  setPointCapture(view: int, capture: int): void

  /**
   *
   */
  setAuxiliary(objName: String, flag: boolean): void

  /**
   * Returns localized name of given tool.
   *
   * @param mode
   * number
   * @return name of given tool.
   */
  getToolName(mode: int): String

  /**
   * @param text
   * tooltip text
   */
  showTooltip(text: String): void

  /**
   *
   */
  isTracing(objName: String): boolean

  /**
   * @param filename
   * output filename
   * @return SVG export
   */
  exportSVG(filename: String): String

  /**
   * @param exportScale
   * scale
   * @param filename
   * output filename
   * @param sliderLabel
   * animation slider
   * @return PDF
   */
  exportPDF(exportScale: double, filename: String, sliderLabel: String): String

  /**
   * @param sliderLabel
   * animation slider
   * @param scale
   * scale
   * @param timeBetweenFrames
   * delay between frames
   * @param isLoop
   * whether to play as loop
   * @param filename
   * filename
   * @param rotate
   * rotation speed
   */
  exportGIF(sliderLabel: String, scale: double, timeBetweenFrames: double, isLoop: boolean, filename: String, rotate: double): void

  /**
   * @param sliderLabel
   * animation slider
   * @param scale
   * scale
   * @param timeBetweenFrames
   * delay between frames
   * @param isLoop
   * whether to play as loop
   * @param filename
   * filename
   * @param rotate
   * rotation speed
   */
  exportWebM(sliderLabel: String, scale: double, timeBetweenFrames: double, isLoop: boolean, filename: String, rotate: double): void

  /**
   * @param columnNames
   * column names
   * @return html of construction protocol
   */
  exportConstruction(...columnNames: String[]): String

  /**
   *
   * @param label
   * label of GeoElement
   * @return screen reader output for GeoElement
   */
  getScreenReaderOutput(label: String): String

  /**
   * @param breakpoints
   * whether to return steps taking breakpoints into account
   * @return number of steps
   */
  getConstructionSteps(breakpoints: boolean): double

  /**
   * @param i
   * new step
   * @param breakpoints
   * use breakpoints
   */
  setConstructionStep(i: double, breakpoints: boolean): void

  /**
   * Advance to previous construction step (using breakpoints if enabled in
   * .ggb file)
   */
  previousConstructionStep(): void

  /**
   * Advance to next construction step (using breakpoints if enabled in .ggb
   * file)
   */
  nextConstructionStep(): void

  /**
   *
   */
  writePNGtoFile(filename: String, exportScale: double, transparent: boolean, DPI: double, grayscale: boolean): boolean

  /**
   * @return exercise fraction (same as getValue("correct"))
   */
  getExerciseFraction(): double

  /**
   *
   */
  enableFpsMeasurement(): void

  /**
   *
   */
  disableFpsMeasurement(): void

  /**
   *
   */
  testDraw(): void

  /**
   *
   */
  startDrawRecording(): void

  /**
   *
   */
  endDrawRecordingAndLogResults(): void

  // GgbAPIW.java

  /**
   * Register equation editor for the get/setEditorState methods.
   *
   * @param editor
   * equation editor API
   *
   * @only html5
   */
  setEditor(editor: MathEditorAPI): void

  /**
   *
   *
   * @only html5
   */
  getGGBfile(): byte[]

  /**
   *
   *
   * @only html5
   */
  setBase64(base64: String): void

  /**
   * @param base64
   * base64 encoded file
   * @param callback
   * callback when file loaded
   *
   * @only html5
   */
  setBase64(base64: String, callback: () => void /* JavaScriptObject */): void

  /**
   * @param filename
   * file URL
   * @param callback
   * callback when file loaded
   *
   * @only html5
   */
  openFile(filename: String, callback: () => void /* JavaScriptObject */): void

  /**
   *
   *
   * @only html5
   */
  setErrorDialogsActive(flag: boolean): void

  /**
   *
   *
   * @only html5
   */
  refreshViews(): void

  /**
   *
   *
   * @only html5
   */
  openFile(filename: String): void

  /**
   *
   *
   * @only html5
   */
  writePNGtoFile(filename: String, exportScale: double, transparent: boolean, dpi: double, greyscale: boolean): boolean

  /**
   *
   *
   * @only html5
   */
  getPNGBase64(exportScale: double, transparent: boolean, dpi: double, copyToClipboard: boolean, greyscale: boolean): String

  /**
   * @param label
   * object label
   * @param value
   * whether to use value string
   * @return base64 encoded PNG of LaTeX formula
   *
   * @only html5
   */
  getLaTeXBase64(label: String, value: boolean): String

  /**
   * @param includeThumbnail
   * whether to include thumbnail
   * @param callback
   * handler for the file
   *
   * @only html5
   */
  getGGBfile(includeThumbnail: boolean, callback: String /* = JavaScriptObject */): void

  /**
   * @param includeThumbnail
   * whether to include thumbnail
   * @param callback
   * callback
   *
   * @only html5
   */
  getBase64(includeThumbnail: boolean, callback: (base64: string) => void /* = JavaScriptObject */): void

  /**
   * Base64 for ggt file
   *
   * @param includeThumbnail
   * whether to add thumbnail
   * @param callback
   * callback
   *
   * @only html5
   */
  getMacrosBase64(includeThumbnail: boolean, callback: (base64: string) => void /* = JavaScriptObject */): void

  /**
   * @param includeThumbnail
   * whether to include thumbnail
   * @return native JS object representing the archive
   *
   * @only html5
   */
  getFileJSON(includeThumbnail: boolean): Object /* = JavaScriptObject */

  /**
   * Load construction and images from JSON
   *
   * @param obj
   * JSON archive
   *
   * @only html5
   */
  setFileJSON(obj: Object /* = JavaScriptObject */): void

  /**
   *
   *
   * @only html5
   */
  getBase64(includeThumbnail: boolean): String

  /**
   * @return base64 for ggt file
   *
   * @only html5
   */
  getMacrosBase64(): String

  /**
   * @param includeThumbnail
   * whether to include thumbnail
   * @param callback
   * callback
   *
   * @only html5
   */
  getBase64(includeThumbnail: boolean, callback: (base64: string) => void /* = AsyncOperation<String> */): void

  /**
   * @param includeThumbnail
   * whether to include thumbnail
   * @param callback
   * callback
   *
   * @only html5
   */
  getMacrosBase64(includeThumbnail: boolean, callback: (base64: string) => void): void

  /**
   * @param includeThumbnail
   * whether to include thumbnail
   * @param archiveContent
   * zip archive
   * @return zip archive (as a map)
   *
   * @only html5
   */
  createArchiveContent(includeThumbnail: boolean, archiveContent: GgbFile): GgbFile

  /**
   * @return base64 encoded thumbnail
   *
   * @only html5
   */
  getThumbnailBase64(): String

  /**
   * @return view for thumbnail
   *
   * @only html5
   */
  getViewForThumbnail(): EuclidianViewInterfaceCommon

  /**
   * @return archive with macros + icons
   *
   * @only html5
   */
  createMacrosArchive(): GgbFile

  /**
   * @param material
   * material ID
   *
   * @only html5
   */
  openMaterial(material: String): void

  /**
   * @param width
   * setst the applet width
   *
   * @only html5
   */
  setWidth(width: int): void

  /**
   * @param height
   * sets the applet height
   *
   * @only html5
   */
  setHeight(height: int): void

  /**
   * @param width
   * height
   * @param height
   * width
   *
   * Sets the size of the applet
   *
   * @only html5
   */
  setSize(width: int, height: int): void

  /**
   * @param show
   *
   * wheter show the toolbar in geogebra-web applets or not
   *
   * @only html5
   */
  showToolBar(show: boolean): void

  /**
   * @param show
   *
   * wheter show the menubar in geogebra-web applets or not
   *
   * @only html5
   */
  showMenuBar(show: boolean): void

  /**
   * @param show
   *
   * whether show the algebrainput in geogebra-web applets or not
   *
   * @only html5
   */
  showAlgebraInput(show: boolean): void

  /**
   * @param show
   *
   * wheter show the reseticon in geogebra-web applets or not
   *
   * @only html5
   */
  showResetIcon(show: boolean): void

  /**
   * @param url
   * image URL
   * @param corner1
   * bottom left corner
   * @param corner2
   * bottom right corner
   * @param corner4
   * top left corner
   * @return image label
   *
   * @only html5
   */
  insertImage(url: String, corner1: String, corner2: String, corner4: String): String

  /**
   * recalculates euclidianviews environments
   *
   * @only html5
   */
  recalculateEnvironments(): void

  /**
   * remove applet from the page, and free memory. If applet is the last one,
   * it remove the style elements injected by the applet too.
   *
   * @only html5
   */
  removeApplet(): void

  /**
   *
   *
   * @only html5
   */
  showTooltip(tooltip: String): void

  /**
   *
   *
   * @only html5
   */
  asyncEvalCommand(command: String, onSuccess: () => void /* = JavaScriptObject */, onFailure: () => void /* = JavaScriptObject */): void

  /**
   *
   *
   * @only html5
   */
  asyncEvalCommandGetLabels(command: String, onSuccess: () => void /* = JavaScriptObject */, onFailure: () => void /* = JavaScriptObject */): void

  /**
   * Try to evaluate command only once, might fail if the command is not loaded
   * @param cmdString command to evaluate
   * @return whether the evaluation succeeded
   *
   * @only html5
   */
  evalCommandNoException(cmdString: String): boolean

  /**
   * Try to evaluate command only once, might fail if the command is not loaded
   * @param cmdString command to evaluate
   * @return comma separated list of labels of the resulting Geos
   *
   * @only html5
   */
  evalCommandGetLabelsNoException(cmdString: String): String

  /**
   * Remember where file was stored in WinStore app
   *
   * @param s
   * external saving path
   *
   * @only html5
   */
  setExternalPath(s: String): void

  /**
   * If all content is saved, run immediately, otherwise wait until user
   * saves.
   *
   * @param callback
   * callback after file is saved
   *
   * @only html5
   */
  checkSaved(callback: (saved: boolean) => void /* = JavaScriptObject */): void

  /**
   * @param toolbarString
   * custom toolbar definition
   *
   * @only html5
   */
  setCustomToolBar(toolbarString: String): void

  /**
   * Make screenshot of the whole app as PNG.
   *
   * @param callback
   * callback
   *
   * @only html5
   */
  getScreenshotBase64(callback: (base64: string) => void /* = JavaScriptObject */): void

  /**
   *
   *
   * @only html5
   */
  exportGIF(sliderLabel: String, scale: double, timeBetweenFrames: double, isLoop: boolean, filename: String, rotate: double): void

  /**
   *
   *
   * @only html5
   */
  exportWebM(sliderLabel: String, scale: double, timeBetweenFrames: double, isLoop: boolean, filename: String, rotate: double): void

  /**
   * @param callback
   * native callback
   *
   * @only html5
   */
  exportPSTricks(callback: (pstTricks: string) => void /* = JavaScriptObject */): void

  /**
   * @param callback
   * native callback
   *
   * @only html5
   */
  exportPGF(callback: (pgf: string) => void /* = JavaScriptObject */): void

  /**
   * @param callback
   * native callback
   *
   * @only html5
   */
  exportAsymptote(callback: (asymptote: string) => void /* JavaScriptObject */): void

  /**
   * @param columnNamesJS
   * JS string array
   * @return exported construction
   *
   * @only html5
   */
  exportConstruction(columnNamesJS: string[] /* = JsArrayString */): String

  /**
   * @param token
   * token
   * @param showUI
   * whether to show UI when token is invalid
   *
   * @only html5
   */
  login(token: String, showUI: boolean): void

  /**
   * @param text
   * JSON describing editor state
   * @param label
   * label for geo element, empty string or null for new input
   *
   * @only html5
   */
  setEditorState(text: String, label: String): void

  /**
   * @return JSON describing editor state
   *
   * @only html5
   */
  getEditorState(): String

  /**
   *
   * @return then embedded calculator apis.
   *
   * @only html5
   */
  getEmbeddedCalculators(): any // = JavaScriptObject

  /**
   * @return frame DOM element
   *
   * @only html5
   */
  getFrame(): Element

  /**
   *
   *
   * @only html5
   */
  newConstruction(): void

}

export type MathEditorAPI = unknown

export type EuclidianViewInterfaceCommon = unknown

export type GgbFile = unknown
