
namespace OoGebra {

  export namespace Core {

    export const version = '2.0';

    export const name = 'OoGebraCore';

    export const geoName = `${name}_{${version}}`;

    onInit(() => {
      const prevIgnoreImm = getIgnoreImmutables();
      setIgnoreImmutables(true);
      setStyle(Core.geoName, Style.internal);
      setImmutable(geoName, true);
      setIgnoreImmutables(prevIgnoreImm);
    })

  }

}
