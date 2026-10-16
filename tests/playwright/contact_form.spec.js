import { test, expect } from '@playwright/test';

test('contact submit disabled until consent', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/#kontak');
  await expect(page.getByRole('button', { name: 'Kirim Pesan' })).toBeDisabled();
  await page.getByLabel('Saya setuju data saya digunakan').check();
  await expect(page.getByRole('checkbox')).toBeChecked();
  await expect(page.getByRole('button', { name: 'Kirim Pesan' })).toBeEnabled();
  await page.getByLabel('Saya setuju data saya digunakan').uncheck();
  await expect(page.getByRole('button', { name: 'Kirim Pesan' })).toBeDisabled();
});

test('contact required fields', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/#kontak');
  await page.getByTestId('contact-consent').check();
  await page.getByRole('button', { name: 'Kirim Pesan' }).click();
  await expect(page.getByTestId('contact-error')).toHaveText('Semua kolom wajib diisi.');
});

test('contact invalid email', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/#kontak');
  await page.getByLabel('Nama Lengkap').fill('Ahmad Fauzi');
  await page.getByLabel('Email').fill('ahmad-bukan-email');
  await page.getByLabel('Keperluan').selectOption('informasi');
  await page.getByLabel('Pesan').fill('Assalamualaikum, mohon info jadwal kajian.');
  await page.getByLabel('Saya setuju data saya digunakan').check();
  await page.getByRole('button', { name: 'Kirim Pesan' }).click();
  await expect(page.getByTestId('contact-error')).toHaveText('Format email tidak valid.');
  await expect(page.getByTestId('contact-success')).toBeHidden();
});

test('contact submit success', async ({ page }) => {
  await page.goto('https://nurul-muhajirin.vercel.app/#kontak');
  await page.getByPlaceholder('Masukkan nama lengkap').click();
  await page.getByPlaceholder('Masukkan nama lengkap').fill('Ahmad Fauzi');
  await page.getByPlaceholder('Masukkan email Anda').fill('ahmad@example.com');
  await page.getByLabel('Keperluan').selectOption({ label: 'Pendaftaran Tahfidz' });
  await page.getByPlaceholder('Tulis pesan Anda di sini...').fill('Saya ingin mendaftarkan anak saya ke program tahfidz.');
  await page.getByRole('checkbox', { name: 'Saya setuju data saya digunakan' }).check();
  await page.getByRole('button', { name: 'Kirim Pesan' }).click();
  await expect(page.getByRole('button', { name: 'Mengirim...' })).toBeDisabled();
});
