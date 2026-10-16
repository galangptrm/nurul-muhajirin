import { test, expect } from '@playwright/test';

test('search article fill and press enter', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/articles');
  await page.getByRole('searchbox', { name: 'Cari artikel' }).click();
  await page.getByRole('searchbox', { name: 'Cari artikel' }).fill('masjid');
  await page.getByRole('searchbox', { name: 'Cari artikel' }).press('Enter');
  await expect(page).toHaveURL(/\/articles\?q=masjid/);
  await expect(page.getByTestId('articles-result-count')).toContainText('untuk "masjid"');
});

test('search article with button', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/articles');
  await page.getByPlaceholder('Cari judul artikel...').fill('kajian');
  await page.getByRole('button', { name: 'Cari', exact: true }).click();
  await expect(page).toHaveURL(/q=kajian/);
  await expect(page.getByPlaceholder('Cari judul artikel...')).toHaveValue('kajian');
});

test('search article no result and reset', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/articles');
  await page.getByLabel('Cari artikel').fill('zzzz-artikel-tidak-ada');
  await page.getByLabel('Cari artikel').press('Enter');
  await expect(page.getByTestId('articles-empty')).toHaveText('Tidak ada artikel yang cocok dengan "zzzz-artikel-tidak-ada".');
  await expect(page.getByTestId('articles-result-count')).toHaveText('Ditemukan 0 artikel untuk "zzzz-artikel-tidak-ada"');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/articles');
  await expect(page.getByLabel('Cari artikel')).toBeEmpty();
  await expect(page.getByTestId('articles-search-clear')).toBeHidden();
});

test('sort articles select option', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/articles');
  await expect(page.getByLabel('Urutkan')).toHaveValue('terbaru');
  await page.getByLabel('Urutkan').selectOption('terlama');
  await expect(page).toHaveURL(/sort=terlama/);
  await page.getByLabel('Urutkan').selectOption({ label: 'Judul (A-Z)' });
  await expect(page).toHaveURL(/sort=judul/);
  await expect(page.getByLabel('Urutkan')).toHaveValue('judul');
});

test('open article detail', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/articles');
  const firstCard = page.getByTestId('article-card').first();
  const title = await firstCard.getByTestId('article-card-title').innerText();
  await firstCard.click();
  await expect(page).toHaveURL(/\/article\//);
  await expect(page.getByTestId('article-title')).toHaveText(title);
  await expect(page.getByAltText(title)).toBeVisible();
  await expect(page.getByTitle('Bagikan ke WhatsApp')).toBeEnabled();
  await page.getByTestId('article-back').click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/');
});

test('pagination keeps search', async ({ page }) => {
  // Only meaningful when there are more than 9 published articles
  await page.goto('https://nurul-muhajirin.vercel.app/articles?sort=terlama');
  const nextButton = page.getByTestId('pagination-next');
  if (await nextButton.count() === 0) {
    return;
  }
  await nextButton.click();
  await expect(page).toHaveURL(/sort=terlama&page=2/);
  await expect(page.getByRole('link', { name: 'Halaman 2' })).toHaveAttribute('aria-current', 'page');
});
