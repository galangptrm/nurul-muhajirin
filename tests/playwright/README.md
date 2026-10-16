# Playwright tests (Python / pytest)

Test cases are written in the same format as `playwright codegen --target python-pytest`, so they can be re-recorded or imported as-is.

## Setup

```bash
pip install pytest-playwright
playwright install
```

## Run

Start the web first (`npm run dev`, served at http://localhost:3000), then:

```bash
pytest tests/playwright                                  # headless
pytest tests/playwright --headed --slowmo 300            # watch it run
pytest tests/playwright --tracing retain-on-failure      # keep a trace .zip for failed tests
playwright show-trace test-results/<test-name>/trace.zip # open the Trace Viewer
```

Record new steps with:

```bash
playwright codegen --target python-pytest http://localhost:3000
```

## Files

| File | Covers |
| --- | --- |
| `test_navbar.py` | `get_by_alt_text`, `get_by_title`, image load check, `.click()`, `.go_back()`, `.hover()` dropdown, mobile menu `to_be_hidden` |
| `test_home.py` | hero CTA, service cards, prayer times, petugas Jumat, video card (`.press("Enter")`), footer links / popup |
| `test_articles.py` | search bar (`.fill()`, `.press("Enter")`), sort dropdown (`.select_option()`), article detail, pagination |
| `test_contact_form.py` | `get_by_label`, `get_by_placeholder`, `.check()` / `.uncheck()`, `to_be_enabled` / `to_be_disabled`, success / error messages |

Notes:
- `test_prayer_times` depends on the external islamicapi.com API; `test_petugas_jumat`, `test_video_card_*`, `test_open_article_detail` depend on Supabase data.
- The contact form is client-side only (submission is simulated, nothing is sent).
