
namespace OoGebra {

  const OnAdd = 'a73e022e-55a8-4305-a36e-c15bc38847ce';
  const OnUpdate = '4d75fcd2-4729-463c-82d2-4039ad436460';
  const OnRename = '8bde32d9-7c95-4ef9-8c69-f5c390db0da7';
  const OnRemove = '81c6e4dd-c99a-41eb-b485-dc5b134ee5ea';

  const moduleRegex = /^OoGebraModule_\{([^}]+)}$/
  const objNames = ggbApplet.getAllObjectNames();
  const geval = eval;

  namespace Register {

    const modules: {[name: string]: string} = {};

    export function set(name: string, code: string) {
      modules[name] = code;
    }

    export function rename(oldName: string, name: string) {
      modules[name] = modules[oldName];
      remove(modules[oldName]);
    }

    export function remove(name: string) {
      delete modules[name];
    }

    export function has(name: string, code: string) {
      return modules[name] === code;
    }

  }

  function isModule(objName: string): boolean {
    return moduleRegex.test(objName);
  }

  function getModuleName(objName: string): string {
    return moduleRegex.exec(objName)![1];
  }

  function loadModule(objName: string, moduleName: string) {
    OoGebra.setImmutable(objName, true);
    OoGebra.setStyle(objName, Style.internal);
    const moduleCode = ggbApplet.getValueString(objName);
    try {
      geval(`(${moduleCode})`)(objName)
      log(`Module ${moduleName} successfully loaded.`)
    } catch (e) {
      log([`Module ${moduleName} failed to load.`, e.message, 'FileName: ' + e.fileName, 'LineNumber: ' + e.lineNumber].join('\n'))
    }
  }

  function loadPotentialModule(objName: string) {
    objName += '';
    const code = ggbApplet.getValueString(objName)+'';
    if (isModule(objName) && !Register.has(objName, code)) {
      Register.set(objName, code);
      const moduleName = getModuleName(objName);
      loadModule(objName, moduleName);
    }
  }

  onInit(() => {
    for (const objName of objNames) {
      loadPotentialModule(objName+'')
    }
  });

  function onAdd(objName: String) {
    loadPotentialModule(objName+'');
  }

  function onUpdate(objName: String) {
    loadPotentialModule(objName+'');
  }

  function onRename(oldObjName: String, objName: String) {
    Register.rename(oldObjName+'', objName+'');
  }

  function onRemove(objName: String) {
    Register.remove(objName+'');
  }

  const OnAddListener = registerListener(OnAdd, onAdd);
  const OnUpdateListener = registerListener(OnUpdate, onUpdate);
  const OnRenameListener = registerListener(OnRename, onRename);
  const OnRemoveListener = registerListener(OnRemove, onRemove);
  ggbApplet.registerAddListener(OnAddListener);
  ggbApplet.registerUpdateListener(OnUpdateListener);
  ggbApplet.registerRenameListener(OnRenameListener);
  ggbApplet.registerRemoveListener(OnRemoveListener);

}
