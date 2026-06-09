import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 800 });

// 팔레트 1 - Ocean Blue (화이트 베이스 확인)
await p.goto('http://localhost:5173/');
await p.waitForTimeout(1500);
await p.screenshot({ path: 'w_p1_hero.png' });
await p.evaluate(() => window.scrollTo(0, 900));
await p.waitForTimeout(300);
await p.screenshot({ path: 'w_p1_white.png' });

// 팔레트 2 - Teal 로 변경
await p.evaluate(() => window.scrollTo(0, 0));
await p.click('button[title="Emerald Teal"]');
await p.waitForTimeout(500);
await p.screenshot({ path: 'w_p2_hero.png' });
await p.evaluate(() => window.scrollTo(0, 900));
await p.waitForTimeout(300);
await p.screenshot({ path: 'w_p2_white.png' });

// 팔레트 5 - Rose Red
await p.evaluate(() => window.scrollTo(0, 0));
await p.click('button[title="Rose Red"]');
await p.waitForTimeout(500);
await p.screenshot({ path: 'w_p5_hero.png' });
await p.evaluate(() => window.scrollTo(0, 900));
await p.waitForTimeout(300);
await p.screenshot({ path: 'w_p5_white.png' });

await b.close();
console.log('done');
