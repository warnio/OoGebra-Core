
namespace OoGebra {

  export type GeoReference = number

  const lastRefKey = '865482c3-64ff-429e-9793-62a6f38808e2';
  const nameToRefMapKey = 'bff1a578-02d2-4dbe-97fc-4a160b6326cd';
  const refToNameMapKey = '0c60bcd5-fd1a-45ee-b539-991beebf8afd';

  const onRenameListenerName = 'f40190fe-c057-4993-a8f4-90bd4392d44b';
  const onRemoveListenerName = 'be12c789-55cd-4ff6-b881-255d13765277';

  let lastRef: number;
  let nameToRefMap: {[name: string]: GeoReference};
  let refToNameMap: {[reference: number]: string};

  export function getReference(objName: string) {
    if (!(objName in nameToRefMap)) {
      const ref = lastRef++;
      nameToRefMap[objName] = ref;
      refToNameMap[ref] = objName;
      updateData();
    }
    return nameToRefMap[objName];
  }

  export function getObjName(reference: GeoReference) {
    return refToNameMap[reference] ?? null;
  }

  function onRename(oldObjName: string, objName: string) {
    oldObjName += ''; objName += '';
    if (oldObjName in nameToRefMap) {
      let ref = nameToRefMap[objName] = nameToRefMap[oldObjName];
      refToNameMap[ref] = objName;
      delete nameToRefMap[oldObjName];
      updateData();
    }
  }

  function onRemove(objName: string) {
    objName += '';
    if (objName in nameToRefMap) {
      let ref = getReference(objName)
      delete nameToRefMap[objName];
      delete refToNameMap[ref];
      updateData();
    }
  }

  const onRenameListener = registerListener(onRenameListenerName, onRename);
  const onRemoveListener = registerListener(onRemoveListenerName, onRemove);

  ggbApplet.registerRenameListener(onRenameListener);
  ggbApplet.registerRemoveListener(onRemoveListener);

  function updateData() {
    setData(lastRefKey, lastRef);
    setData(nameToRefMapKey, nameToRefMap);
    setData(refToNameMapKey, refToNameMap);
  }

  onInit(() => {
    lastRef = getData(lastRefKey) ?? 0;
    nameToRefMap = getData(nameToRefMapKey) ?? {};
    refToNameMap = getData(refToNameMapKey) ?? {};
  })

}
