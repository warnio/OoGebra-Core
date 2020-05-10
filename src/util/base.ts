
namespace Oogebra {

  export function getMode() {
    return (ggbApplet.exists('development') && ggbApplet.getValue('development')) ? 'development' : 'production';
  }

  export function log(message: string) {
    if (getMode() === 'development') {
      alert(`[Development]: ${message}`);
    }
  }

  export function setInternal(name: string) {
    ggbApplet.setVisible(name, false);
    ggbApplet.setAuxiliary(name, true);
    ggbApplet.setFixed(name, true, false);
  }

}
