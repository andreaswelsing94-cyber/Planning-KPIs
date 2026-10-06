import test from 'node:test';
import assert from 'node:assert/strict';
import {addDays,buildSession,gradeCard,isCorrect} from '../js/engine.js';
const kpi={id:'otd',name:'On-Time Delivery',acronym:'OTD',aliases:['On Time Delivery']};
test('accepts acronym, name, and punctuation variants',()=>{assert.equal(isCorrect('otd',kpi),true);assert.equal(isCorrect('On time delivery',kpi),true);assert.equal(isCorrect('inventory turns',kpi),false)});
test('uses the six box intervals',()=>{let card={...kpi,box:1};card=gradeCard(card,true,'2026-10-06');assert.equal(card.box,2);assert.equal(card.due,'2026-10-09');card={...card,box:5};card=gradeCard(card,true,'2026-10-06');assert.equal(card.box,6);assert.equal(card.due,'2027-01-04');card=gradeCard(card,true,'2026-10-06');assert.equal(card.box,6);assert.equal(card.due,'2027-04-04')});
test('wrong answers return to box one for tomorrow',()=>{const card=gradeCard({...kpi,box:4},false,'2026-10-06');assert.equal(card.box,1);assert.equal(card.due,'2026-10-07')});
test('session includes only due cards and respects limit',()=>{const cards=[{id:'a',box:1,due:null},{id:'b',box:2,due:'2026-10-06'},{id:'c',box:3,due:'2026-10-07'}];assert.deepEqual(buildSession(cards,1,'2026-10-06').map(x=>x.id),['a']);assert.equal(addDays('2026-10-06',3),'2026-10-09')});
test('excluded cards keep their state but do not enter a session',()=>{const cards=[{id:'a',box:4,due:null,enabled:false},{id:'b',box:2,due:null,enabled:true}];assert.deepEqual(buildSession(cards,10,'2026-10-06').map(x=>x.id),['b']);assert.equal(cards[0].box,4);assert.equal(cards[0].due,null)});
