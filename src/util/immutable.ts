
namespace OoGebra {

  namespace Immutable {
    const Key = 'b31ef8a7-d6de-439c-a283-6dddd9c96ca7';

    const OnRename = 'f08a8677-3c6a-4c03-a051-cb15c374a502';
    const OnClick  = 'dbe3e5b4-0a23-49a8-89fa-f298ee2218aa';
    const OnUpdate = '28092476-efaa-4244-a580-87ab358a46ae';
    const OnRemove = '1a2bfcbb-7d60-44af-8813-038769db62f3';
    const OnClient = '0e0bcdc3-a558-49a6-8a4e-87b4dae99cf8';

    export let ignoreExplicitly = false;

    function shouldIgnoreImmutable() {
      return getMode() === "development" || ignoreExplicitly;
    }

    const OnRenameListener = registerListener(OnRename, (oldObjName: string, _objName: string) => {
      oldObjName += ''; _objName += '';
      if (!shouldIgnoreImmutable() && getImmutable(oldObjName)) {
        ggbApplet.undo();
      }
    })

    const OnClickListener = registerListener(OnClick, (objName: string) => {
      objName += '';
      if (!shouldIgnoreImmutable() && getImmutable(objName)) {
        ggbApplet.setUndoPoint();
      }
    })

    const OnUpdateListener = registerListener(OnUpdate, (objName: string) => {
      objName += '';
      if (!shouldIgnoreImmutable() && getImmutable(objName)) {
        ggbApplet.undo();
      }
    })

    const OnRemoveListener = registerListener(OnRemove, (objName: string) => {
      objName += '';
      if (!shouldIgnoreImmutable() && getImmutable(objName)) {
        ggbApplet.undo();
      }
    })

    const OnClientListener = registerListener(OnClient, (type: string, target: string, _argument: string) => {
      type += ''; target += ''; _argument += '';
      if (!shouldIgnoreImmutable() && getImmutable(target)) {
        if (type === 'updateStyle') {
          ggbApplet.undo();
        }
        if (type === 'select') {
          ggbApplet.setUndoPoint();
        }
      }
    })

    export function getObjNames() {
      return getData(Key) ?? [];
    }

    export function setObjNames(objNames: string[]) {
      setData(Key, objNames);
    }

    export function registerObjName(objNames: string[], objName: string, immutable: boolean) {
      const objNameIndex = objNames.indexOf(objName);
      if (objNameIndex > -1 && !immutable) {
        objNames.splice(objNameIndex, 1);
      } else if (objNameIndex < 0 && immutable) {
        objNames.push(objName);
      }
      return objNames;
    }

    export function register() {
      ggbApplet.registerRenameListener(OnRenameListener);
      ggbApplet.registerClickListener (OnClickListener);
      ggbApplet.registerUpdateListener(OnUpdateListener);
      ggbApplet.registerRemoveListener(OnRemoveListener);
      ggbApplet.registerClientListener(OnClientListener);
    }

    export function unregister() {
      ggbApplet.unregisterRenameListener(OnRenameListener);
      ggbApplet.unregisterClickListener (OnClickListener);
      ggbApplet.unregisterUpdateListener(OnUpdateListener);
      ggbApplet.unregisterRemoveListener(OnRemoveListener);
      ggbApplet.unregisterClientListener(OnClientListener);
    }

    function load() {
      let immutableObjNames: string[] = getObjNames();;

      if (immutableObjNames.length > 0) {
        register();
      } else {
        unregister();
      }
    }

    load();

  }

  export function setImmutable(objName: string, immutable: boolean) {
    let immObjNames: string[] = Immutable.getObjNames();

    const noImmutableObjNamesBefore = immObjNames.length == 0;
    immObjNames = Immutable.registerObjName(immObjNames, objName, immutable);

    Immutable.setObjNames(immObjNames);

    if (!getIgnoreImmutables()) {
      if (noImmutableObjNamesBefore && immObjNames.length > 0) {
        Immutable.register();
      } else if (immObjNames.length === 0) {
        Immutable.unregister();
      }
    }

  }

  export function getImmutable(objName: string) {
    return Immutable.getObjNames().indexOf(objName) > -1;
  }

  export function setIgnoreImmutables(ignore: boolean) {
    let immutableObjNames: string[] = Immutable.getObjNames();;
    Immutable.ignoreExplicitly = ignore;
    if (ignore || immutableObjNames.length === 0) {
      Immutable.unregister();
    } else {
      Immutable.register();
    }
  }

  export function getIgnoreImmutables() {
    return Immutable.ignoreExplicitly;
  }

}
