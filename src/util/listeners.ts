
namespace Oogebra {

  const listeners: { [name: string]: Function } = {}

  export namespace Internal {

    export class Listeners {

      private static readonly listeners: { [name: string]: Function } = listeners;

    }

  }

  export function registerListener(name: string, fn: Function) {
    listeners[name] = fn;
    return `Oogebra.Internal.Listeners.listeners[${JSON.stringify(name)}]`;
  }

  export function unregisterListener(name: string) {
    delete listeners[name];
  }

}
