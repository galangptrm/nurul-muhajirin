import re
from playwright.sync_api import Page, expect


def test_hero_and_cta(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page).to_have_title("Nurul Muhajirin")
    expect(page.get_by_test_id("hero-title")).to_contain_text("Nurul Muhajirin")
    page.get_by_title("Lihat layanan publik masjid").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/#services")
    expect(page.get_by_role("heading", name="Layanan Publik Masjid")).to_be_in_viewport()


def test_service_cards(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_test_id("section-services").get_by_role("link", name="PILIH LAYANAN")).to_have_count(5)
    page.get_by_test_id("service-card-koperasi").hover()
    page.get_by_role("link", name="Pilih layanan Koperasi YAMU Sejahtera").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/layanan/koperasi")


def test_service_lks_hafara_link(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    page.get_by_test_id("service-link-lks-hafara").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/layanan/lks-hafara")


def test_latest_articles_see_all(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_test_id("section-latest-articles")).to_be_visible()
    page.get_by_title("Lihat semua berita").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/articles")


def test_prayer_times(page: Page) -> None:
    # Depends on the external islamicapi.com response
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_test_id("section-prayer-times")).to_be_visible()
    for name in ["subuh", "dzuhur", "ashar", "maghrib", "isya"]:
        expect(page.get_by_test_id(f"prayer-time-{name}")).to_have_text(re.compile(r"^\d{2}:\d{2}$"))
    expect(page.get_by_test_id("prayer-next-name")).to_contain_text("Menuju")


def test_petugas_jumat(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_test_id("petugas-jumat-date")).to_contain_text("Jumat")
    expect(page.get_by_test_id("petugas-jumat-khatib")).not_to_be_empty()
    expect(page.get_by_test_id("petugas-jumat-imam")).not_to_be_empty()


def test_video_card_play_with_keyboard(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    video = page.get_by_test_id("video-card").first
    expect(video).to_have_attribute("aria-pressed", "false")
    video.focus()
    video.press("Enter")
    expect(video).to_have_attribute("aria-pressed", "true")
    video.click()
    expect(video).to_have_attribute("aria-pressed", "false")


def test_footer_social_links(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/")
    expect(page.get_by_title("Ikuti kami di Instagram")).to_have_attribute("href", "https://www.instagram.com/nurulmuhajirin.official/")
    expect(page.get_by_label("YouTube Nurul Muhajirin")).to_have_attribute("target", "_blank")
    expect(page.get_by_test_id("footer-email")).to_contain_text("nurulmuhajirin.yayasan@gmail.com")
    with page.expect_popup() as popup_info:
        page.get_by_test_id("footer-social-tiktok").click()
    popup = popup_info.value
    expect(popup).to_have_url(re.compile(r"tiktok\.com"))
