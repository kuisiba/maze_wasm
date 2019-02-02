extern crate rand;
extern crate wasm_bindgen;
use rand::{thread_rng, Rng};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn gen_maze(w: i32, h: i32) -> Vec<u8> {
    //v: 1が壁で、0が通路の二次元配列
    let mut v = vec![vec![1; w as usize]; h as usize];
    let mut room_count: usize = 0;
    let mut rooms: Vec<Vec<i32>> = vec![vec![-1; w as usize]; h as usize];
    //walls: 通路同士を繋げる為に壊す可能性のある壁のリスト
    let mut walls: Vec<(usize, usize)> = Vec::new();

    //外周は全部壁(= 1)
    //(odd, odd)を通路にして、(odd, even) ないし (even, odd)をwallsに追加
    for i in 1..h - 1 {
        for j in 1..w - 1 {
            if j % 2 == 1 && i % 2 == 1 {
                v[i as usize][j as usize] = 0;
                rooms[i as usize][j as usize] = room_count as i32;
                room_count += 1;
            }
            if (j % 2 == 1 && i % 2 == 0) || (j % 2 == 0 && i % 2 == 1) {
                walls.push((j as usize, i as usize));
            }
        }
    }
    let mut uf = UnionFind::new(room_count);
    //eprintln!("walls: {}", walls.len());
    while !walls.is_empty() {
        let mut rng = thread_rng();
        let w_i = rng.gen_range(0, walls.len());
        let w_pos = walls[w_i];
        if w_pos.0 % 2 == 0 {
            //right, left
            if !uf.same(
                rooms[w_pos.1][w_pos.0 - 1] as usize,
                rooms[w_pos.1][w_pos.0 + 1] as usize,
            ) {
                uf.unite(
                    rooms[w_pos.1][w_pos.0 - 1] as usize,
                    rooms[w_pos.1][w_pos.0 + 1] as usize,
                );
                v[w_pos.1][w_pos.0] = 0;
            }
        } else {
            //up, down
            if !uf.same(
                rooms[w_pos.1 - 1][w_pos.0] as usize,
                rooms[w_pos.1 + 1][w_pos.0] as usize,
            ) {
                uf.unite(
                    rooms[w_pos.1 - 1][w_pos.0] as usize,
                    rooms[w_pos.1 + 1][w_pos.0] as usize,
                );
                v[w_pos.1][w_pos.0] = 0;
            }
        }
        walls.remove(w_i);
    }

    //二次元→一次元に
    let mut ret = Vec::new();
    for i in 0..v.len() {
        for j in 0..v[0].len() {
            ret.push(v[i][j]);
        }
    }
    ret
}
#[derive(Debug)]
struct UnionFind {
    par: Vec<usize>,
    rank: Vec<usize>,
}
impl UnionFind {
    fn new(size: usize) -> UnionFind {
        let mut par = Vec::with_capacity(size);
        let mut rank = Vec::with_capacity(size);
        for i in 0..size {
            par.push(i);
            rank.push(0);
        }
        UnionFind { par, rank }
    }
    fn root(&mut self, x: usize) -> usize {
        if self.par[x] == x {
            x
        } else {
            let par = self.par[x];
            let ppar = self.root(par);
            self.par[x] = ppar;
            ppar
        }
    }
    fn same(&mut self, x: usize, y: usize) -> bool {
        self.root(x) == self.root(y)
    }
    fn unite(&mut self, x: usize, y: usize) {
        let px = self.root(x);
        let py = self.root(y);
        if px == py {
            return;
        }
        if self.rank[px] < self.rank[py] {
            self.par[px] = py;
        } else {
            self.par[py] = px;
            if self.rank[px] == self.rank[py] {
                self.rank[px] += 1;
            }
        }
    }
}
