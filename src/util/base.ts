
namespace OoGebra {

  const loadFunctions: (() => void)[] = []

  export function onInit(fn: () => void) {
    loadFunctions.push(fn);
  }

  export function init() {
    for (const fn of loadFunctions) {
      fn();
    }
    log('OoGebra sucessfully loaded!');
  }

  export function getMode(): 'development' | 'production' {
    return (ggbApplet.exists('development') && ggbApplet.getValue('development')) ? 'development' : 'production';
  }

  export function log(message: string) {
    if (getMode() === 'development') {
      alert(`[Development]: ${message}`);
    }
  }

}
