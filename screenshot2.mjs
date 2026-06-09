import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 800 });
await p.goto('http://localhost:5173/');
await p.waitForTimeout(1500);
await p.screenshot({ path: 'ss_p1_blue.png' });

await p.click('button[title="Emerald Teal"]');
await p.waitForTimeout(500);
await p.screenshot({ path: 'ss_p2_teal.png' });

await p.click('button[title="Royal Purple"]');
await p.waitForTimeout(500);
await p.screenshot({ path: 'ss_p3_purple.png' });

await p.click('button[title="Forest Green"]');
await p.waitForTimeout(500);
await p.screenshot({ path: 'ss_p4_green.png' });

await p.click('button[title="Rose Red"]');
await p.waitForTimeout(500);
await p.screenshot({ path: 'ss_p5_rose.png' });

await b.close();
console.log('done');
