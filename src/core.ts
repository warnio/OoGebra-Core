
namespace OoGebra {

  export namespace Core {

    export const version = '2.0';

    export const name = 'OoGebraCore';

    export const geoName = `${name}_{${version}}`;

    setIgnoreImmutables(true);
    setInternal(Core.geoName);
    setImmutable(geoName, true);
    setIgnoreImmutables(false);

  }

}
