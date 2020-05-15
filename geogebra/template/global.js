/* OoGebra: initaite */
Object.defineProperty(this, 'global', {
  value: this
});

function enableOogebra() {
  if (global.Oogebra == null || ggbApplet.getValue("reload")) {
    try {
      eval(ggbApplet.getValueString('OoGebraCore_{2.0}') + '')
    } catch (e) {
      alert([e.message, 'FileName: ' + e.fileName, 'LineNumber: ' + e.lineNumber].join('\n'))
    }
  }
}
enableOogebra();
/* End */

function ggbOnInit() {
  /* OoGebra: initiate on load */
  enableOogebra();
  /* End */
}
