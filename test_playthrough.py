"""Full playthrough test of the detective game."""
from playwright.sync_api import sync_playwright
import time, os

os.environ["PYTHONIOENCODING"] = "utf-8"
BASE = "http://localhost:5173"
SCREEN_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "screenshots")
os.makedirs(SCREEN_DIR, exist_ok=True)

def log(msg):
    print(f"  [{time.strftime('%H:%M:%S')}] {msg}")

def ss(page, name):
    path = os.path.join(SCREEN_DIR, name)
    page.screenshot(path=path, full_page=True)
    log(f"Screenshot: {name}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.set_default_timeout(10000)

    # HOME PAGE
    log("Step 1: Loading homepage...")
    page.goto(BASE)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)
    ss(page, "01-home.png")

    # START GAME
    log("Step 2: Clicking start button...")
    page.locator('button:has-text("开始调查")').click()
    page.wait_for_timeout(2000)
    ss(page, "02-opening-1.png")

    # Click through opening phases
    for i in range(3):
        page.wait_for_timeout(2000)
        btn = page.locator('button:has-text("继续阅读"), button:has-text("查看嫌疑人名单")')
        if btn.is_visible():
            btn.click()
            log(f"Opening phase {i+1} passed")
            page.wait_for_timeout(800)

    ss(page, "03-opening-chars.png")

    # Enter investigation
    page.locator('button:has-text("前往案发现场")').click()
    page.wait_for_timeout(1500)
    log("Entered investigation page")
    ss(page, "04-scene1.png")

    # Scene 1 hotspots
    log("Step 3: Collecting scene 1 clues...")
    for _ in range(5):
        try:
            btn = page.locator('button:has-text("点击调查")').first
            if btn.is_visible():
                btn.click()
                page.wait_for_timeout(400)
                log("  Collected a clue in scene 1")
            else:
                break
        except:
            break
    ss(page, "05-scene1-done.png")

    # Switch to scene 2
    log("Step 4: Switching to scene 2...")
    page.locator('button:has-text("大厦一楼大堂")').click()
    page.wait_for_timeout(500)
    ss(page, "06-scene2.png")

    # Scene 2 hotspots (monitor + visitor log)
    log("Step 5: Collecting scene 2 clues...")
    for _ in range(5):
        try:
            btn = page.locator('button:has-text("点击调查")').first
            if btn.is_visible():
                text = btn.text_content() or ''
                btn.click()
                page.wait_for_timeout(400)
                log(f"  Clicked hotspot: {text[:40]}")
            else:
                break
        except:
            break
    ss(page, "07-scene2-done.png")

    # Switch to scene 3
    log("Step 6: Switching to scene 3...")
    page.locator('button:has-text("地下停车场")').click()
    page.wait_for_timeout(500)

    for _ in range(5):
        try:
            btn = page.locator('button:has-text("点击调查")').first
            if btn.is_visible():
                btn.click()
                page.wait_for_timeout(300)
            else:
                break
        except:
            break

    # Talk to character
    log("Step 7: Talking to 王建国...")
    page.locator('button:has-text("大厦一楼大堂")').click()
    page.wait_for_timeout(500)
    char_btn = page.locator('button:has-text("王建国")')
    if char_btn.is_visible():
        char_btn.click()
        page.wait_for_timeout(1000)
        # Click through dialogue
        for _ in range(5):
            page.wait_for_timeout(1500)  # wait for typing
            cont = page.locator('button:has-text("点击继续")')
            opt1 = page.locator('button:has-text("询问")').first
            opt2 = page.locator('button:has-text("追问")').first
            if cont.is_visible():
                cont.click()
                page.wait_for_timeout(500)
            elif opt1.is_visible():
                opt1.click()
                page.wait_for_timeout(500)
            elif opt2.is_visible():
                opt2.click()
                page.wait_for_timeout(500)
            else:
                break
    ss(page, "08-dialogue.png")

    # Reasoning
    log("Step 8: Opening reasoning panel...")
    page.locator('button:has-text("推理面板")').click()
    page.wait_for_timeout(1000)
    ss(page, "09-reasoning.png")

    # Verdict
    log("Step 9: Going to verdict...")
    page.locator('button:has-text("提交结论")').click()
    page.wait_for_timeout(1000)
    ss(page, "10-verdict.png")

    # Select culprit
    log("Step 10: Selecting culprit...")
    page.locator('button:has-text("王建国")').click()
    page.wait_for_timeout(500)

    # Select motive
    log("Step 11: Selecting motive clue...")
    page.locator('button:has-text("威胁信")').click()
    page.wait_for_timeout(500)

    # Select method clues (use .first to avoid strict mode on duplicates)
    log("Step 12: Selecting method clues...")
    for name in ["窗框擦拭痕迹", "伪造的来访记录", "被删除的监控录像"]:
        btn = page.locator(f'button:has-text("{name}")').first
        if btn.is_visible():
            btn.click()
            page.wait_for_timeout(300)
            log(f"  Method clue: {name}")

    ss(page, "11-verdict-filled.png")

    # Submit
    log("Step 13: Submitting...")
    page.locator('button:has-text("提交最终推理")').click()
    page.wait_for_timeout(3000)
    ss(page, "12-result.png")

    # Check score
    score_elem = page.locator('[class*="text-7xl"]')
    if score_elem.is_visible():
        score = score_elem.text_content()
        log(f"SCORE: {score}")

    browser.close()
    log("Playthrough complete! 12 screenshots saved.")
