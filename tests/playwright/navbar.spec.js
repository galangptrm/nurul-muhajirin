import { test, expect } from '@playwright/test';

test('navbar logo alt and title', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByAltText('Logo Nurul Muhajirin')).toBeVisible();
  await expect(page.getByTitle('Kembali ke Beranda')).toBeVisible();
  await expect(page.getByTestId('navbar')).toBeVisible();

  // Image validation (Cara 2): make sure the logo actually loaded and is not broken
  const isLoaded = await page.getByTestId('nav-logo-img').evaluate(
    img => img.complete && img.naturalWidth > 0
  );
  expect(isLoaded, 'Logo gagal dimuat').toBeTruthy();
});

test('navbar menu click and go back', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await page.getByRole('link', { name: 'Berita', exact: true }).click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/articles');
  await expect(page.getByRole('heading', { name: 'Berita & Artikel' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/');
});

test('navbar hover layanan dropdown', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByTestId('nav-layanan-dropdown')).toBeHidden();
  await page.getByTestId('nav-link-layanan').hover();
  await expect(page.getByTestId('nav-layanan-dropdown')).toBeVisible();
  await expect(page.getByRole('menuitem')).toHaveCount(5);
  await page.getByRole('menuitem', { name: 'Lembaga Tahfidz Quran' }).click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/layanan/tahfidz');
});

test('navbar kontak scrolls to contact form', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await page.getByTestId('nav-link-kontak').click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/#kontak');
  await expect(page.getByRole('heading', { name: 'Hubungi Kami' })).toBeInViewport();
});

test('mobile menu toggle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://nurul-muhajirin.vercel.app/');
  await expect(page.getByTestId('nav-desktop')).toBeHidden();
  await expect(page.getByTestId('nav-mobile-menu')).toBeHidden();
  await page.getByRole('button', { name: 'Toggle mobile menu' }).click();
  await expect(page.getByTestId('nav-mobile-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByTestId('nav-mobile-menu')).toBeVisible();
  await page.getByTestId('nav-mobile-link-berita').click();
  await expect(page).toHaveURL('https://nurul-muhajirin.vercel.app/articles');
  await expect(page.getByTestId('nav-mobile-menu')).toBeHidden();
});
