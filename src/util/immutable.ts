
namespace Oogebra {

  namespace Immutable {
    const Key = 'b31ef8a7-d6de-439c-a283-6dddd9c96ca7';

    const OnRename = 'f08a8677-3c6a-4c03-a051-cb15c374a502';
    const OnUpdate = '28092476-efaa-4244-a580-87ab358a46ae';
    const OnRemove = '1a2bfcbb-7d60-44af-8813-038769db62f3';
    const OnClient = '0e0bcdc3-a558-49a6-8a4e-87b4dae99cf8';

    function shouldIgnoreImmutable() {
      return getMode() === "development";
    }

    const OnRenameListener = registerListener(OnRename, (oldObjName: string, _objName: string) => {
      if (!shouldIgnoreImmutable()) {
        let immutableObjNames: string[] = getData(Key) || [];
        let isImmutable = immutableObjNames.indexOf(oldObjName) > -1;
        if (isImmutable) {
          ggbApplet.undo();
        }
      }
    })

    const OnUpdateListener = registerListener(OnUpdate, (objName: string) => {
      if (!shouldIgnoreImmutable()) {
        let immutableObjNames: string[] = getData(Key) || [];
        let isImmutable = immutableObjNames.indexOf(objName) > -1;
        if (isImmutable) {
          ggbApplet.undo();
        }
      }
    })

    const OnRemoveListener = registerListener(OnRemove, (objName: string) => {
      if (!shouldIgnoreImmutable()) {
        const immutableObjNames: string[] = getData(Key) || [];
        const isImmutable = immutableObjNames.indexOf(objName) > -1;
        if (isImmutable) {
          ggbApplet.undo();
        }
      }
    })

    const OnClientListener = registerListener(OnClient, (type: string, target: string, _argument: string) => {
      if (!shouldIgnoreImmutable()) {
        const immutableObjNames: string[] = getData(Key) || [];
        const isImmutable = immutableObjNames.indexOf(target) > -1;
        if (isImmutable) {
          if (type === 'updateStyle') {
            ggbApplet.undo();
          }
          if (type === 'select') {
            ggbApplet.setUndoPoint();
          }
        }
      }
    })

    export function getObjNames() {
      return getData(Key) || [];
    }

    export function setObjNames(objNames: string[]) {
      setData(Key, objNames);
    }

    export function registerObjName(objNames: string[], objName: string, immutable: boolean) {
      const objNameIndex = objNames.indexOf(objName);
      if (objNameIndex > -1 && !immutable) {
        objNames = objNames.splice(objNameIndex, 1);
      } else if (objNameIndex < 0 && immutable) {
        objNames.push(objName);
      }
      return objNames;
    }

    export function register() {
      ggbApplet.registerRenameListener(OnRenameListener);
      ggbApplet.registerUpdateListener(OnUpdateListener);
      ggbApplet.registerRemoveListener(OnRemoveListener);
      ggbApplet.registerClientListener(OnClientListener);
    }

    export function unregister() {
      ggbApplet.unregisterRenameListener(OnRename);
      ggbApplet.unregisterUpdateListener(OnUpdate);
      ggbApplet.unregisterRemoveListener(OnRemove);
      ggbApplet.unregisterClientListener(OnClient);
    }

    export function load() {
      let immutableObjNames: string[] = getObjNames();;

      if (immutableObjNames.length > 0) {
        register();
      } else {
        unregister();
      }
    }

  }

  export function setImmutable(objName: string, immutable: boolean) {

    let immObjNames: string[] = Immutable.getObjNames();

    const noImmutableObjNamesBefore = immObjNames.length == 0;
    immObjNames = Immutable.registerObjName(immObjNames, objName, immutable);

    Immutable.setObjNames(immObjNames);

    if (noImmutableObjNamesBefore && immObjNames.length > 0) {
      Immutable.register();
    } else if (immObjNames.length === 0) {
      Immutable.unregister();
    }

  }

  export function ignoreImmutables(ignore: boolean) {
    if (ignore) {
      Immutable.unregister();
    } else {
      Immutable.load();
    }
  }

  Immutable.load();

}
