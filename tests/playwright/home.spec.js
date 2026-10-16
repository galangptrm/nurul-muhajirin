import { test, expect } from '@playwright/test';

test('hero and cta', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page).toHaveTitle('Nurul Muhajirin');
  await expect(page.getByTestId('hero-title')).toContainText('Nurul Muhajirin');
  await page.getByTitle('Lihat layanan publik masjid').click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/#services');
  await expect(page.getByRole('heading', { name: 'Layanan Publik Masjid' })).toBeInViewport();
});

test('service cards', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByTestId('section-services').getByRole('link', { name: 'PILIH LAYANAN' })).toHaveCount(5);
  await page.getByTestId('service-card-koperasi').hover();
  await page.getByRole('link', { name: 'Pilih layanan Koperasi YAMU Sejahtera' }).click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/layanan/koperasi');
});

test('service lks hafara link', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await page.getByTestId('service-link-lks-hafara').click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/layanan/lks-hafara');
});

test('latest articles see all', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByTestId('section-latest-articles')).toBeVisible();
  await page.getByTitle('Lihat semua berita').click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/articles');
});

test('prayer times', async ({ page }) => {
  // Depends on the external islamicapi.com response
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByTestId('section-prayer-times')).toBeVisible();
  // for (const name of ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya']) {
    await expect(page.getByTestId(`prayer-time-subuh`)).toHaveText(/^\d{2}:\d{2}$/);
  // }
  await expect(page.getByTestId('prayer-next-name')).toContainText('Menuju');
});

test('petugas jumat', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByTestId('petugas-jumat-date')).toContainText('Jumat');
  await expect(page.getByTestId('petugas-jumat-khatib')).not.toBeEmpty();
  await expect(page.getByTestId('petugas-jumat-imam')).not.toBeEmpty();
});

test('video card play with keyboard', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  const video = page.getByTestId('video-card').first();
  await expect(video).toHaveAttribute('aria-pressed', 'false');
  await video.focus();
  await video.press('Enter');
  await expect(video).toHaveAttribute('aria-pressed', 'true');
  await video.click();
  await expect(video).toHaveAttribute('aria-pressed', 'false');
});

test('footer social links', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByTitle('Ikuti kami di Instagram')).toHaveAttribute('href', 'https://www.instagram.com/nurulmuhajirin.official/');
  await expect(page.getByLabel('YouTube Nurul Muhajirin')).toHaveAttribute('target', '_blank');
  await expect(page.getByTestId('footer-email')).toContainText('nurulmuhajirin.yayasan@gmail.com');
  const popupPromise = page.waitForEvent('popup');
  await page.getByTestId('footer-social-tiktok').click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/tiktok\.com/);
});
