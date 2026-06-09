import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 800 });

// 강의 영상 페이지
await p.goto('http://localhost:5173/#/videos/ai-basics');
await p.waitForTimeout(1500);
await p.screenshot({ path: 'ss_videos_page.png' });

// 홈 - 강의 영상 섹션
await p.goto('http://localhost:5173/');
await p.waitForTimeout(1000);
await p.evaluate(() => window.scrollTo(0, 900));
await p.waitForTimeout(400);
await p.screenshot({ path: 'ss_home_videos_section.png' });

await b.close();
console.log('done');
