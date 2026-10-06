import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,load,save} from '../js/storage.js';
class MemoryStore{constructor(){this.value=null}getItem(){return this.value}setItem(_,v){this.value=v}}
test('creates and restores local state',()=>{const store=new MemoryStore();const seed=[{id:'a',name:'A'}];const state=initialState(seed);state.settings.dailyLimit=7;save(state,store);assert.equal(load(seed,store).settings.dailyLimit,7)});
test('adds newly shipped seed cards without losing progress',()=>{const store=new MemoryStore();save(initialState([{id:'a',name:'A'}]),store);const state=load([{id:'a',name:'A'},{id:'b',name:'B'}],store);assert.deepEqual(state.cards.map(x=>x.id),['a','b'])});
test('selects only the first ten KPIs for a new learner',()=>{const seed=Array.from({length:15},(_,i)=>({id:String(i),name:String(i)}));const state=initialState(seed);assert.equal(state.cards.filter(x=>x.enabled).length,10);assert.equal(state.cards[10].enabled,false)});
test('migrates an older collection to ten selected KPIs',()=>{const store=new MemoryStore();const seed=Array.from({length:12},(_,i)=>({id:String(i),name:String(i)}));store.setItem('',JSON.stringify({version:1,settings:{dailyLimit:5},cards:seed.map(x=>({...x,enabled:true,box:1})),history:[]}));const state=load(seed,store);assert.equal(state.cards.filter(x=>x.enabled).length,10);assert.equal(state.version,2)});
