/* Oogebra: initaite oogebra */
Object.defineProperty(this, 'global', {
  value: this
});

function enableOogebra() {
  if (global.Oogebra == null || ggbApplet.getValue("reload")) {
    try {
      eval(ggbApplet.getValueString('OogebraCore_{1.0}') + '')
    } catch (e) {
      alert(e)
    }
  }
}
enableOogebra();
/* End */

function ggbOnInit() {
  /* Oogebra: initiate oogebra on load */
  enableOogebra();
  /* End */
}
