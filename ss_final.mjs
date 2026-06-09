import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 800 });
await p.goto('http://localhost:5173/');
await p.waitForTimeout(1500);
await p.screenshot({ path: 'final_hero.png' });

// 강의 영상 메뉴 hover
await p.hover('text=강의 영상');
await p.waitForTimeout(600);
await p.screenshot({ path: 'final_dropdown.png' });

await b.close();
console.log('done');
