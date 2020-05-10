
namespace Oogebra {
  log('OogebraCore sucessfully loaded!')
}

declare const global: any;
if (!global.hasOwnProperty('Oogebra')) {
  Object.defineProperty(global, 'Oogebra', {
    value: Oogebra
  });
}
