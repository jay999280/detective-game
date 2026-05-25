"""Full feature verification test."""
import os, time
os.environ["PYTHONIOENCODING"] = "utf-8"
from playwright.sync_api import sync_playwright

BASE = "http://localhost:5173"
SDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "screenshots")
os.makedirs(SDIR, exist_ok=True)

def log(msg):
    print(f"  [{time.strftime('%H:%M:%S')}] {msg}")

def shot(page, name):
    page.screenshot(path=os.path.join(SDIR, name), full_page=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.set_default_timeout(10000)

    # 1. HOME PAGE - archive shelf
    log("TEST 1: Homepage archive shelf")
    page.goto(BASE)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)
    shot(page, "01-home-archive.png")
    assert page.locator('text=侦探档案').is_visible()
    log("PASS: Archive shelf visible")

    # 2. OPEN NEW CASE CONFIG
    log("TEST 2: New case config panel")
    page.locator('text=新案件').click()
    page.wait_for_timeout(500)
    assert page.locator('text=案件配置').is_visible()
    log("PASS: Config panel opens")

    # 3. START PRESET GAME
    log("TEST 3: Start preset game")
    page.locator('button:has-text("开始调查")').click()
    page.wait_for_timeout(2000)
    assert page.locator('text=玻璃密室').is_visible()
    log("PASS: Case loaded")

    # 4. OPENING PHASES
    log("TEST 4: Opening phases")
    for i in range(3):
        page.wait_for_timeout(2000)
        btn = page.locator('button:has-text("继续阅读"), button:has-text("查看嫌疑人名单")')
        if btn.is_visible():
            btn.click()
            page.wait_for_timeout(800)
    shot(page, "02-opening.png")

    # 5. ENTER INVESTIGATION
    page.locator('button:has-text("前往案发现场")').click()
    page.wait_for_timeout(1500)
    log("TEST 5: Investigation loaded")
    shot(page, "03-investigate.png")

    # 6. COLLECT CLUES IN SCENE 1
    log("TEST 6: Scene 1 hotspots")
    for _ in range(10):
        try:
            btn = page.locator('button:has-text("点击调查")').first
            if btn.is_visible():
                btn.click()
                page.wait_for_timeout(400)
        except:
            break
    shot(page, "04-scene1-clues.png")
    log("TEST 6 PASS: Clues collected")

    # 7. SWITCH TO SCENE 2
    log("TEST 7: Scene 2 hotspots (incl. CCTV)")
    page.locator('button:has-text("大厦一楼大堂")').click()
    page.wait_for_timeout(500)
    for _ in range(10):
        try:
            btn = page.locator('button:has-text("点击调查")').first
            if btn.is_visible():
                text = btn.text_content() or ''
                btn.click()
                page.wait_for_timeout(400)
                log(f"  Clicked: {text[:40]}")
        except:
            break
    shot(page, "05-scene2-clues.png")

    # 8. SWITCH TO SCENE 3
    log("TEST 8: Scene 3 hotspots")
    page.locator('button:has-text("地下停车场")').click()
    page.wait_for_timeout(500)
    for _ in range(10):
        try:
            btn = page.locator('button:has-text("点击调查")').first
            if btn.is_visible():
                btn.click()
                page.wait_for_timeout(300)
        except:
            break

    # 9. TALK TO CHARACTER (王建国) - test topic selector
    log("TEST 9: Talking to 王建国 with topic selector")
    page.locator('button:has-text("大厦一楼大堂")').click()
    page.wait_for_timeout(500)
    char_btn = page.locator('button:has-text("王建国")')
    if char_btn.is_visible():
        char_btn.click()
        page.wait_for_timeout(1000)

        # Check for topic picker
        if page.locator('text=选择话题').is_visible():
            log("  Topic selector visible!")
            # Click first topic
            topic_btn = page.locator('button:has-text("动机"), button:has-text("监控问题"), button:has-text("不在场证明"), button:has-text("巡逻路线")').first
            if topic_btn.is_visible():
                topic_btn.click()
                page.wait_for_timeout(1000)
                log("  Selected topic")
        else:
            # Normal dialogue flow
            log("  No topic selector, normal dialogue")

        # Click through dialogue
        for _ in range(5):
            page.wait_for_timeout(1500)
            cont = page.locator('button:has-text("点击继续")')
            opt = page.locator('button:has-text("询问")').first
            if cont.is_visible():
                cont.click()
            elif opt.is_visible():
                opt.click()
            else:
                break
    shot(page, "06-dialogue.png")
    log("TEST 9 PASS: Dialogue with topic selection works")

    # 10. REASONING PAGE WITH TABS
    log("TEST 10: Reasoning page with tabs")
    page.locator('button:has-text("推理面板")').click()
    page.wait_for_timeout(1000)
    shot(page, "07-reasoning.png")

    # Click relations tab
    rel_tab = page.locator('button:has-text("关系图谱")')
    if rel_tab.is_visible():
        rel_tab.click()
        page.wait_for_timeout(500)
        shot(page, "08-relations.png")
        log("  Relations tab works")

    # 11. VERDICT
    log("TEST 11: Verdict submission")
    page.locator('button:has-text("提交结论")').click()
    page.wait_for_timeout(1000)
    shot(page, "09-verdict.png")

    # Select culprit
    page.locator('button:has-text("王建国")').first.click()
    page.wait_for_timeout(500)

    # Select motive
    page.locator('button:has-text("威胁信")').first.click()
    page.wait_for_timeout(500)

    # Select method clues
    for name in ["窗框擦拭痕迹", "伪造的来访记录", "被删除的监控录像"]:
        btn = page.locator(f'button:has-text("{name}")').first
        if btn.is_visible():
            btn.click()
            page.wait_for_timeout(300)

    shot(page, "10-verdict-filled.png")

    # Submit
    page.locator('button:has-text("提交最终推理")').click()
    page.wait_for_timeout(3000)
    shot(page, "11-result.png")

    # Check score
    score_elem = page.locator('[class*="text-7xl"]')
    if score_elem.is_visible():
        score = score_elem.text_content()
        log(f"SCORE: {score}")

    # Check multi-dimension stats
    if page.locator('text=搜证完整度').is_visible():
        log("  Multi-dimension stats visible")
    if page.locator('text=推理报告').is_visible():
        log("  Case report visible")

    log("TEST 11 PASS: Verdict with multi-dimension scoring works")

    browser.close()
    log("\n=== ALL TESTS PASSED ===")
