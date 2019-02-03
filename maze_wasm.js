(function() {
  var wasm;
  const __exports = {};

  __exports.__wbg_random_a9e4a093cb0fddb9 = function() {
    return Math.random();
  };

  let cachegetUint8Memory = null;
  function getUint8Memory() {
    if (
      cachegetUint8Memory === null ||
      cachegetUint8Memory.buffer !== wasm.memory.buffer
    ) {
      cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
  }

  function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
  }

  let cachedGlobalArgumentPtr = null;
  function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
      cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
  }

  let cachegetUint32Memory = null;
  function getUint32Memory() {
    if (
      cachegetUint32Memory === null ||
      cachegetUint32Memory.buffer !== wasm.memory.buffer
    ) {
      cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
  }
  /**
   * @param {number} arg0
   * @param {number} arg1
   * @returns {Uint8Array}
   */
  __exports.gen_maze = function(arg0, arg1) {
    const retptr = globalArgumentPtr();
    wasm.gen_maze(retptr, arg0, arg1);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 1);
    return realRet;
  };

  function init(path_or_module) {
    let instantiation;
    const imports = {'./maze_wasm': __exports};
    if (path_or_module instanceof WebAssembly.Module) {
      instantiation = WebAssembly.instantiate(path_or_module, imports).then(
        instance => {
          return {instance, module: path_or_module};
        },
      );
    } else {
      const data = fetch(path_or_module);
      if (typeof WebAssembly.instantiateStreaming === 'function') {
        instantiation = WebAssembly.instantiateStreaming(data, imports);
      } else {
        instantiation = data
          .then(response => response.arrayBuffer())
          .then(buffer => WebAssembly.instantiate(buffer, imports));
      }
    }
    return instantiation.then(({instance}) => {
      wasm = init.wasm = instance.exports;
    });
  }
  self.wasm_bindgen = Object.assign(init, __exports);
})();
