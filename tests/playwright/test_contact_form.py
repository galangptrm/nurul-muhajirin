import re
from playwright.sync_api import Page, expect


def test_contact_submit_disabled_until_consent(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/#kontak")
    expect(page.get_by_role("button", name="Kirim Pesan")).to_be_disabled()
    page.get_by_label("Saya setuju data saya digunakan").check()
    expect(page.get_by_role("checkbox")).to_be_checked()
    expect(page.get_by_role("button", name="Kirim Pesan")).to_be_enabled()
    page.get_by_label("Saya setuju data saya digunakan").uncheck()
    expect(page.get_by_role("button", name="Kirim Pesan")).to_be_disabled()


def test_contact_required_fields(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/#kontak")
    page.get_by_test_id("contact-consent").check()
    page.get_by_role("button", name="Kirim Pesan").click()
    expect(page.get_by_test_id("contact-error")).to_have_text("Semua kolom wajib diisi.")


def test_contact_invalid_email(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/#kontak")
    page.get_by_label("Nama Lengkap").fill("Ahmad Fauzi")
    page.get_by_label("Email").fill("ahmad-bukan-email")
    page.get_by_label("Keperluan").select_option("informasi")
    page.get_by_label("Pesan").fill("Assalamualaikum, mohon info jadwal kajian.")
    page.get_by_label("Saya setuju data saya digunakan").check()
    page.get_by_role("button", name="Kirim Pesan").click()
    expect(page.get_by_test_id("contact-error")).to_have_text("Format email tidak valid.")
    expect(page.get_by_test_id("contact-success")).to_be_hidden()


def test_contact_submit_success(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/#kontak")
    page.get_by_placeholder("Masukkan nama lengkap").click()
    page.get_by_placeholder("Masukkan nama lengkap").fill("Ahmad Fauzi")
    page.get_by_placeholder("Masukkan email Anda").fill("ahmad@example.com")
    page.get_by_label("Keperluan").select_option(label="Pendaftaran Tahfidz")
    page.get_by_placeholder("Tulis pesan Anda di sini...").fill("Saya ingin mendaftarkan anak saya ke program tahfidz.")
    page.get_by_role("checkbox", name="Saya setuju data saya digunakan").check()
    page.get_by_role("button", name="Kirim Pesan").click()
    expect(page.get_by_role("button", name="Mengirim...")).to_be_disabled()
    expect(page.get_by_role("status")).to_have_text("Pesan berhasil dikirim. Terima kasih, Ahmad Fauzi!")
    # Form is cleared after a successful submit
    expect(page.get_by_label("Nama Lengkap")).to_be_empty()
    expect(page.get_by_label("Saya setuju data saya digunakan")).not_to_be_checked()
