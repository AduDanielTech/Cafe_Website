// Tests that clicking on the play button opens the video modal
it('test_click_play_button', () => {
    document.body.innerHTML = codeSnippet({});
    const playButton = document.querySelector('.btn-play');
    const modal = document.querySelector('#videoModal iframe');
    playButton.click();
    expect(modal.src).toBe('https://www.youtube.com/embed/DWRcNpR6Kdc');
});

// Tests that the form can be filled and submitted successfully
it('test_fill_form_and_submit', async () => {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.type('#name', 'John Doe');
    await page.type('#email', 'johndoe@example.com');
    await page.type('#datetime', '2022-12-31 23:59');
    await page.select('#select1', '3');
    await page.type('#message', 'I have a special request');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toContain('success.html');
    await browser.close();
});

