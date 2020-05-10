
namespace Oogebra {

  export namespace Core {

    export const version = '1.0';

    export const name = `OogebraCore_{${version}}`

    ignoreImmutables(true);
    setInternal(Core.name);
    ignoreImmutables(false);

    setImmutable(name, true);

  }

}
