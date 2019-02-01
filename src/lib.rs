extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn gen() -> Vec<u8> {
    let v = vec![1, 2, 3, 4, 5];
    v
}
