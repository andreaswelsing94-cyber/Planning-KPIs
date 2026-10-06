export const BOX_INTERVALS=[3,7,14,30,90,180];
const DAY=86400000;
export function normalizeAnswer(value=''){return value.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
export function acceptedAnswers(kpi){return [kpi.name,kpi.acronym,...(kpi.aliases||[])].filter(Boolean)}
export function isCorrect(input,kpi){const answer=normalizeAnswer(input);return acceptedAnswers(kpi).some(x=>normalizeAnswer(x)===answer)}
export function dateKey(date=new Date()){return date.toISOString().slice(0,10)}
export function addDays(iso,days){const date=new Date(`${iso.slice(0,10)}T12:00:00Z`);date.setTime(date.getTime()+days*DAY);return dateKey(date)}
export function isDue(card,today=dateKey()){return !card.due||card.due<=today}
export function gradeCard(card,correct,today=dateKey()){
  const current=Math.min(6,Math.max(1,card.box||1));
  if(!correct)return {...card,box:1,due:addDays(today,1),lastReviewed:today,attempts:(card.attempts||0)+1,incorrect:(card.incorrect||0)+1};
  const next=Math.min(6,current+1);
  return {...card,box:next,due:addDays(today,BOX_INTERVALS[current-1]),lastReviewed:today,attempts:(card.attempts||0)+1,correct:(card.correct||0)+1};
}
export function dueCards(cards,today=dateKey()){return cards.filter(x=>x.enabled!==false&&isDue(x,today)).sort((a,b)=>(a.due||'').localeCompare(b.due||'')||a.box-b.box)}
export function buildSession(cards,limit,today=dateKey()){return dueCards(cards,today).slice(0,Math.max(1,limit))}
export function nextDue(cards,today=dateKey()){return cards.map(x=>x.due).filter(x=>x&&x>today).sort()[0]||null}
