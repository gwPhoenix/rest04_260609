import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 900 });

// rest03 홈
await p.goto('https://aebonlee.github.io/rest03/');
await p.waitForLoadState('networkidle');
await p.screenshot({ path: 'rest03_home.png', fullPage: false });

// 스크롤 다운
await p.evaluate(() => window.scrollTo(0, 800));
await p.waitForTimeout(300);
await p.screenshot({ path: 'rest03_home2.png' });

await p.evaluate(() => window.scrollTo(0, 1600));
await p.waitForTimeout(300);
await p.screenshot({ path: 'rest03_home3.png' });

// 모바일
await p.setViewportSize({ width: 390, height: 844 });
await p.goto('https://aebonlee.github.io/rest03/');
await p.waitForLoadState('networkidle');
await p.screenshot({ path: 'rest03_mobile.png' });

await b.close();
console.log('done');
