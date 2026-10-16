import re
from playwright.sync_api import Page, expect


def test_navbar_logo_alt_and_title(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_alt_text("Logo Nurul Muhajirin")).to_be_visible()
    expect(page.get_by_title("Kembali ke Beranda")).to_be_visible()
    expect(page.get_by_test_id("navbar")).to_be_visible()

    # Image validation (Cara 2): make sure the logo actually loaded and is not broken
    is_loaded = page.get_by_test_id("nav-logo-img").evaluate(
        "img => img.complete && img.naturalWidth > 0"
    )
    assert is_loaded, "Logo gagal dimuat"


def test_navbar_menu_click_and_go_back(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    page.get_by_role("link", name="Berita", exact=True).click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/articles")
    expect(page.get_by_role("heading", name="Berita & Artikel")).to_be_visible()
    page.go_back()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/")


def test_navbar_hover_layanan_dropdown(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_test_id("nav-layanan-dropdown")).to_be_hidden()
    page.get_by_test_id("nav-link-layanan").hover()
    expect(page.get_by_test_id("nav-layanan-dropdown")).to_be_visible()
    expect(page.get_by_role("menuitem")).to_have_count(5)
    page.get_by_role("menuitem", name="Lembaga Tahfidz Quran").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/layanan/tahfidz")


def test_navbar_kontak_scrolls_to_contact_form(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    page.get_by_test_id("nav-link-kontak").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/#kontak")
    expect(page.get_by_role("heading", name="Hubungi Kami")).to_be_in_viewport()


def test_mobile_menu_toggle(page: Page) -> None:
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_test_id("nav-desktop")).to_be_hidden()
    expect(page.get_by_test_id("nav-mobile-menu")).to_be_hidden()
    page.get_by_role("button", name="Toggle mobile menu").click()
    expect(page.get_by_test_id("nav-mobile-toggle")).to_have_attribute("aria-expanded", "true")
    expect(page.get_by_test_id("nav-mobile-menu")).to_be_visible()
    page.get_by_test_id("nav-mobile-link-berita").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/articles")
    expect(page.get_by_test_id("nav-mobile-menu")).to_be_hidden()
