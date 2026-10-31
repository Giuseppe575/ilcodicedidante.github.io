'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/rilievo-consent.js'), 'utf8');
function boot(saved, blocked = false) {
  const elements = new Map(); const scripts = []; const cookies = []; let reloads = 0;
  for (const key of ['cookie-banner','accept-marketing','reject-marketing','cookie-preferences'])
    elements.set(key, {hidden:true, addEventListener(_event, callback){this.click=callback;}});
  const window = {};
  const document = {getElementById:id=>elements.get(id),createElement:()=>({}),head:{appendChild:script=>scripts.push(script)}};
  Object.defineProperty(document,'cookie',{set:value=>cookies.push(value)});
  const localStorage = {getItem:()=>{if(blocked)throw Error('blocked');return saved;},setItem:(_key,value)=>{if(blocked)throw Error('blocked');saved=value;}};
  vm.runInNewContext(source,{window,document,localStorage,location:{hostname:'www.ilcodicedidante.it',reload(){reloads++;}}});
  return {window,elements,scripts,cookies,saved:()=>saved,reloads:()=>reloads};
}
test('nessuna richiesta Meta prima del consenso, con scelta rifiutata o record non valido',()=>{
  const cases=[null,'seen','{}',JSON.stringify({choice:'rejected',version:'2026-10-31',timestamp:Date.now()}),
    JSON.stringify({choice:'accepted',version:'old',timestamp:Date.now()}),
    JSON.stringify({choice:'accepted',version:'2026-10-31',timestamp:Date.now()-181*86400000})];
  for(const saved of cases){const app=boot(saved);app.window.rilievoLead();assert.equal(app.scripts.length,0);assert.equal(app.window.fbq,undefined);}
});
test('accettazione esplicita carica una sola volta; revoca blocca Lead e rimuove i cookie',()=>{
  const app=boot(null);assert.equal(app.elements.get('cookie-banner').hidden,false);
  app.elements.get('reject-marketing').click();assert.equal(app.scripts.length,0);
  app.elements.get('cookie-preferences').click();assert.equal(app.elements.get('cookie-banner').hidden,false);
  app.elements.get('accept-marketing').click();app.elements.get('accept-marketing').click();
  assert.equal(app.scripts.length,1);assert.match(app.scripts[0].src,/connect.facebook.net/);
  app.window.rilievoLead();assert.equal(app.window.fbq.queue.at(-1)[1],'Lead');
  app.elements.get('reject-marketing').click();const length=app.window.fbq.queue.length;
  app.window.rilievoLead();assert.equal(app.window.fbq.queue.length,length);
  assert.equal(app.reloads(),1);assert.ok(app.cookies.some(value=>value.startsWith('_fbp=;')));
  assert.equal(JSON.parse(app.saved()).choice,'rejected');
});
test('consenso corrente ripristinato, storage indisponibile non concede il consenso',()=>{
  const saved=JSON.stringify({choice:'accepted',version:'2026-10-31',timestamp:Date.now()});
  assert.equal(boot(saved).scripts.length,1);assert.equal(boot(saved,true).scripts.length,0);
});
