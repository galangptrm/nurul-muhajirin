import re
from playwright.sync_api import Page, expect


def test_search_article_fill_and_press_enter(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/articles")
    page.get_by_role("searchbox", name="Cari artikel").click()
    page.get_by_role("searchbox", name="Cari artikel").fill("masjid")
    page.get_by_role("searchbox", name="Cari artikel").press("Enter")
    expect(page).to_have_url(re.compile(r"/articles\?q=masjid"))
    expect(page.get_by_test_id("articles-result-count")).to_contain_text('untuk "masjid"')


def test_search_article_with_button(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/articles")
    page.get_by_placeholder("Cari judul artikel...").fill("kajian")
    page.get_by_role("button", name="Cari", exact=True).click()
    expect(page).to_have_url(re.compile(r"q=kajian"))
    expect(page.get_by_placeholder("Cari judul artikel...")).to_have_value("kajian")


def test_search_article_no_result_and_reset(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/articles")
    page.get_by_label("Cari artikel").fill("zzzz-artikel-tidak-ada")
    page.get_by_label("Cari artikel").press("Enter")
    expect(page.get_by_test_id("articles-empty")).to_have_text('Tidak ada artikel yang cocok dengan "zzzz-artikel-tidak-ada".')
    expect(page.get_by_test_id("articles-result-count")).to_have_text('Ditemukan 0 artikel untuk "zzzz-artikel-tidak-ada"')
    page.get_by_role("button", name="Reset").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/articles")
    expect(page.get_by_label("Cari artikel")).to_be_empty()
    expect(page.get_by_test_id("articles-search-clear")).to_be_hidden()


def test_sort_articles_select_option(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/articles")
    expect(page.get_by_label("Urutkan")).to_have_value("terbaru")
    page.get_by_label("Urutkan").select_option("terlama")
    expect(page).to_have_url(re.compile(r"sort=terlama"))
    page.get_by_label("Urutkan").select_option(label="Judul (A-Z)")
    expect(page).to_have_url(re.compile(r"sort=judul"))
    expect(page.get_by_label("Urutkan")).to_have_value("judul")


def test_open_article_detail(page: Page) -> None:
    page.goto("https://nurul-muhajirin.vercel.app/articles")
    first_card = page.get_by_test_id("article-card").first
    title = first_card.get_by_test_id("article-card-title").inner_text()
    first_card.click()
    expect(page).to_have_url(re.compile(r"/article/"))
    expect(page.get_by_test_id("article-title")).to_have_text(title)
    expect(page.get_by_alt_text(title)).to_be_visible()
    expect(page.get_by_title("Bagikan ke WhatsApp")).to_be_enabled()
    page.get_by_test_id("article-back").click()
    expect(page).to_have_url("https://nurul-muhajirin.vercel.app/")


def test_pagination_keeps_search(page: Page) -> None:
    # Only meaningful when there are more than 9 published articles
    page.goto("https://nurul-muhajirin.vercel.app/articles?sort=terlama")
    next_button = page.get_by_test_id("pagination-next")
    if next_button.count() == 0:
        return
    next_button.click()
    expect(page).to_have_url(re.compile(r"sort=terlama&page=2"))
    expect(page.get_by_role("link", name="Halaman 2")).to_have_attribute("aria-current", "page")
