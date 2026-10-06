export const STORAGE_KEY='planning-kpi-box-v1';
export const VERSION=2;
export const DEFAULT_SETTINGS={dailyLimit:10};
const clone=x=>JSON.parse(JSON.stringify(x));
export function initialState(seed){return {version:VERSION,settings:clone(DEFAULT_SETTINGS),cards:seed.map((kpi,index)=>({...kpi,enabled:index<10,box:1,due:null,attempts:0,correct:0,incorrect:0})),history:[]}}
export function load(seed,store=localStorage){
  try{
    const raw=JSON.parse(store.getItem(STORAGE_KEY));
    if(!raw||!Array.isArray(raw.cards))return initialState(seed);
    if((raw.version||1)<VERSION){raw.cards.forEach((card,index)=>card.enabled=index<10);raw.version=VERSION}
    const existing=new Set(raw.cards.map(x=>x.id));
    const additions=seed.filter(x=>!existing.has(x.id)).map(kpi=>({...kpi,enabled:false,box:1,due:null,attempts:0,correct:0,incorrect:0}));
    return {...initialState(seed),...raw,settings:{...DEFAULT_SETTINGS,...raw.settings},cards:[...raw.cards,...additions]};
  }catch{return initialState(seed)}
}
export function save(state,store=localStorage){store.setItem(STORAGE_KEY,JSON.stringify(state))}
export function exportState(state){return JSON.stringify(state,null,2)}
export function importState(text){const value=JSON.parse(text);if(!value||!Array.isArray(value.cards)||!value.settings)throw new Error('Invalid backup file');return value}
