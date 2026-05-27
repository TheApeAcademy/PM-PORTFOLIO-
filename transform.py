#!/usr/bin/env python3
"""Transform daye-case-study.html with Gemini device images and 3D effects."""

import re

with open('/home/user/PM-PORTFOLIO-/public/daye-case-study.html', 'r', encoding='utf-8') as f:
    html = f.read()

original_len = len(html)
print(f"Original length: {original_len}")

# =====================================================================
# STEP 1: Replace Screen 1 (Apple Watch real photo) with proper watch frame
# Current: <div class="real-photo-device watch-photo device-tilt-enter from-top">
#           <img src="/1779848512552.png" ...>
#          </div>
# Replace the entire real-photo-device div with a proper watch frame
# =====================================================================

old_watch_card = '''<div class="watch-card" style="display:flex;flex-direction:column;align-items:center;">
        <div class="real-photo-device watch-photo device-tilt-enter from-top">
          <img src="/1779848512552.png" alt="Apple Watch on wrist in car at night, Daye Now Playing">
        </div>
        <div class="iphone-screen-label" style="margin-top:14px;">
          <strong>Apple Watch</strong>
          <span>Now Playing</span>
        </div>
      </div>'''

new_watch_card = '''<div class="watch-card" style="display:flex;flex-direction:column;align-items:center;">
        <div class="watch-frame device-tilt-enter from-top" style="box-shadow:0 0 0 1px rgba(29,185,84,0.35),0 32px 80px rgba(0,5,20,0.97),0 12px 28px rgba(0,5,20,0.8);">
          <div class="watch-screen">
            <img src="/daye-watch.png" alt="Daye on Watch" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>
        </div>
      </div>'''

if old_watch_card in html:
    html = html.replace(old_watch_card, new_watch_card)
    print("✓ Screen 1 (Watch real photo) replaced with watch frame")
else:
    print("✗ Screen 1 watch photo NOT found - trying partial match")
    # Try to find it
    idx = html.find('1779848512552.png')
    if idx != -1:
        print(f"  Found 1779848512552.png at index {idx}")
        print(f"  Context: {repr(html[idx-200:idx+200])}")

# =====================================================================
# STEP 2: Replace content inside iphone-mini-screen divs with images
# We need to be targeted. Use section comments to locate each screen.
# =====================================================================

# Helper: replace content inside a screen div (removing inline style and all children)
# We'll work section by section using the comment markers

# --- Hero LEFT iphone-mini-screen (Queue View) ---
old = '''<div class="iphone-mini-screen" style="background:radial-gradient(ellipse 110% 55% at 50% 100%,rgba(0,70,200,0.5) 0%,transparent 55%),linear-gradient(180deg,#020307 0%,#030610 100%);position:relative;display:flex;flex-direction:column;">
            <div style="padding:36px 11px 0;flex:1;display:flex;flex-direction:column;overflow:hidden;">
              <div style="font-family:var(--font-mono);font-size:7px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted2);padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:6px;">Adaptive Queue</div>
              <div style="display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(29,185,84,0.04);">
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--green);width:10px;">▶</span>
                <div style="flex:1;min-width:0;"><div style="font-size:8px;color:var(--green);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Lady</div><div style="font-size:7px;color:var(--muted);">Fela Kuti</div></div>
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);">72</span>
              </div>
              <div style="display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);width:10px;">2</span>
                <div style="flex:1;min-width:0;"><div style="font-size:8px;">Ye</div><div style="font-size:7px;color:var(--muted);">Burna Boy</div></div>
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);">84</span>
              </div>
              <div style="display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);width:10px;">3</span>
                <div style="flex:1;min-width:0;"><div style="font-size:8px;">Soro Soke</div><div style="font-size:7px;color:var(--muted);">Fireboy DML</div></div>
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);">92</span>
              </div>
              <div style="display:flex;align-items:center;gap:7px;padding:6px 0;">
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);width:10px;">4</span>
                <div style="flex:1;min-width:0;"><div style="font-size:8px;">Kora Night</div><div style="font-size:7px;color:var(--muted);">Ballaké Sissoko</div></div>
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);">68</span>
              </div>
              <div style="margin-top:auto;padding:8px 0 4px;border-top:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:space-between;">
                <span style="font-family:var(--font-mono);font-size:7px;color:var(--muted2);">AI re-eval in 2 tracks</span>
                <span style="width:5px;height:5px;border-radius:50%;background:var(--green);display:inline-block;animation:blink 2s ease-in-out infinite;"></span>
              </div>
            </div>
          </div>'''

new = '''<div class="iphone-mini-screen">
            <img src="/daye-phone.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Hero LEFT iphone-mini-screen replaced")
else:
    print("✗ Hero LEFT iphone-mini-screen NOT found")

# --- Hero RIGHT samsung-mini-screen (Artist mode) ---
old = '''<div class="samsung-mini-screen" style="background:radial-gradient(ellipse 110% 55% at 50% 100%,rgba(80,0,200,0.55) 0%,transparent 58%),linear-gradient(180deg,#060210 0%,#0c0320 100%);position:relative;display:flex;flex-direction:column;">
            <div style="padding:36px 11px 0;flex:1;display:flex;flex-direction:column;gap:7px;">
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:5px;height:5px;border-radius:50%;background:#8C5AFF;box-shadow:0 0 5px #8C5AFF;flex-shrink:0;"></div>
                <span style="font-family:var(--font-mono);font-size:8px;font-weight:700;color:#8C5AFF;letter-spacing:0.08em;">DAYE STUDIO</span>
                <span style="margin-left:auto;font-family:var(--font-mono);font-size:6px;color:rgba(140,90,255,0.5);background:rgba(140,90,255,0.1);border:1px solid rgba(140,90,255,0.2);padding:1px 5px;border-radius:3px;">Artist</span>
              </div>
              <div style="font-size:8px;color:rgba(255,255,255,0.85);background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:8px 8px 2px 8px;padding:6px 8px;align-self:flex-end;max-width:90%;line-height:1.35;">lo-fi Afrobeats, deep bass, 85 BPM, F minor</div>
              <div style="font-size:8px;color:rgba(255,255,255,0.85);background:rgba(140,90,255,0.12);border:1px solid rgba(140,90,255,0.28);border-radius:8px 8px 8px 2px;padding:6px 8px;max-width:94%;line-height:1.35;">Generating — Afrobeats foundation, 85 BPM, Fm, deep sub-bass locked in.</div>
              <!-- Waveform -->
              <div style="display:flex;align-items:center;gap:2px;height:24px;padding:0 2px;">
                <div style="flex:1;height:100%;background:rgba(140,90,255,0.08);border-radius:4px;position:relative;overflow:hidden;">
                  <div style="position:absolute;inset:0;display:flex;align-items:center;padding:0 6px;gap:1.5px;">
                    <div style="width:2px;height:40%;background:rgba(140,90,255,0.5);border-radius:1px;animation:pi-wave 0.8s ease-in-out infinite;"></div>
                    <div style="width:2px;height:80%;background:#8C5AFF;border-radius:1px;animation:pi-wave 0.8s 0.1s ease-in-out infinite;"></div>
                    <div style="width:2px;height:55%;background:rgba(140,90,255,0.7);border-radius:1px;animation:pi-wave 0.8s 0.2s ease-in-out infinite;"></div>
                    <div style="width:2px;height:90%;background:#8C5AFF;border-radius:1px;animation:pi-wave 0.8s 0.3s ease-in-out infinite;"></div>
                    <div style="width:2px;height:45%;background:rgba(140,90,255,0.6);border-radius:1px;animation:pi-wave 0.8s 0.4s ease-in-out infinite;"></div>
                    <div style="width:2px;height:70%;background:#8C5AFF;border-radius:1px;animation:pi-wave 0.8s 0.5s ease-in-out infinite;"></div>
                    <div style="width:2px;height:35%;background:rgba(140,90,255,0.5);border-radius:1px;animation:pi-wave 0.8s 0.15s ease-in-out infinite;"></div>
                    <div style="width:2px;height:60%;background:#8C5AFF;border-radius:1px;animation:pi-wave 0.8s 0.35s ease-in-out infinite;"></div>
                  </div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:4px;">
                <div style="background:rgba(140,90,255,0.18);border:1px solid rgba(140,90,255,0.35);border-radius:7px;padding:8px 6px;text-align:center;">
                  <div style="font-size:11px;margin-bottom:2px;">🎵</div>
                  <div style="font-size:6px;color:#8C5AFF;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.05em;">AI Beat</div>
                </div>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:8px 6px;text-align:center;">
                  <div style="font-size:11px;margin-bottom:2px;">🎙</div>
                  <div style="font-size:6px;color:rgba(255,255,255,0.4);font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.05em;">Record</div>
                </div>
              </div>
            </div>
          </div>'''

new = '''<div class="samsung-mini-screen">
            <img src="/daye-phone-2.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Hero RIGHT samsung-mini-screen replaced")
else:
    print("✗ Hero RIGHT samsung-mini-screen NOT found")

# --- Screen 2: Listener iphone-mini-screen (session active) ---
old = '''<div class="iphone-mini-screen" style="background:radial-gradient(ellipse 100% 50% at 50% 100%,rgba(0,80,220,0.5) 0%,transparent 55%),linear-gradient(180deg,#020307 0%,#030610 100%);position:relative;">
            <div style="padding:38px 12px 0;flex:1;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:6px;height:6px;border-radius:50%;background:var(--green);animation:blink 2s ease-in-out infinite;"></div>
                <span style="font-family:var(--font-mono);font-size:9px;font-weight:700;color:var(--green);letter-spacing:0.08em;">DAYE</span>
                <span style="margin-left:auto;font-family:var(--font-mono);font-size:7px;color:rgba(29,185,84,0.6);background:rgba(29,185,84,0.1);border:1px solid rgba(29,185,84,0.2);padding:2px 6px;">Session on</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(29,185,84,0.5),rgba(29,185,84,0.06) 55%);border:1px solid rgba(29,185,84,0.3);animation:orb-breathe 3s ease-in-out infinite;flex-shrink:0;"></div>
                <div>
                  <div style="font-family:var(--font-mono);font-size:8px;letter-spacing:0.1em;color:var(--green);text-transform:uppercase;">Nocturnal</div>
                  <div style="font-size:9px;color:var(--muted);">Deep &amp; atmospheric</div>
                </div>
              </div>
              <div style="font-size:9px;color:rgba(245,245,240,0.85);background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px 10px 3px 10px;padding:7px 9px;align-self:flex-end;max-width:82%;">late-night Lagos rooftop energy</div>
              <div style="font-size:9px;color:rgba(245,245,240,0.85);background:rgba(29,185,84,0.1);border:1px solid rgba(29,185,84,0.2);border-radius:10px 10px 10px 3px;padding:7px 9px;max-width:92%;line-height:1.4;">Building session — Afrobeats, low BPM, gradual energy arc.</div>
            </div>
          </div>'''

new = '''<div class="iphone-mini-screen">
            <img src="/daye-phone.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 2 (Listener iphone-mini-screen) replaced")
else:
    print("✗ Screen 2 listener iphone-mini-screen NOT found")

# --- Screen 3: iPad Pro — Full Session Dashboard ---
# Find the ipad-pro-screen div and replace its content
old = '''<div class="ipad-pro-screen" style="background:radial-gradient(ellipse 100% 50% at 50% 100%,rgba(0,80,220,0.45) 0%,transparent 55%),linear-gradient(180deg,#020307 0%,#030610 100%);">
            <!-- iPad status bar -->
            <div style="padding:8px 14px 0;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
              <span style="font-family:var(--font-mono);font-size:7px;color:rgba(255,255,255,0.4);">9:41</span>
              <span style="font-family:var(--font-mono);font-size:7px;font-weight:700;color:var(--green);letter-spacing:0.07em;">DAYE</span>
              <div style="display:flex;gap:5px;align-items:center;">
                <span style="font-size:7px;color:rgba(255,255,255,0.3);">WiFi</span>
                <div style="width:5px;height:5px;border-radius:50%;background:var(--green);animation:blink 2s ease-in-out infinite;"></div>
              </div>
            </div>
            <!-- Split view body -->
            <div style="display:flex;flex:1;gap:0;overflow:hidden;margin-top:6px;">
              <!-- Left pane: orb + chat -->
              <div style="flex:1;display:flex;flex-direction:column;gap:7px;padding:8px 10px;border-right:1px solid rgba(255,255,255,0.06);">
                <div style="font-family:var(--font-mono);font-size:6px;letter-spacing:0.12em;color:rgba(29,185,84,0.6);text-transform:uppercase;">Nocturnal Session</div>
                <div style="display:flex;justify-content:center;margin:2px 0;">
                  <div style="width:44px;height:44px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(29,185,84,0.6),rgba(29,185,84,0.08) 60%);border:1px solid rgba(29,185,84,0.4);animation:orb-breathe 3s ease-in-out infinite;box-shadow:0 0 20px rgba(29,185,84,0.2);"></div>
                </div>
                <div style="font-size:7px;color:rgba(245,245,240,0.8);background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px 8px 2px 8px;padding:5px 7px;align-self:flex-end;max-width:90%;line-height:1.4;">late-night Lagos rooftop energy</div>
                <div style="font-size:7px;color:rgba(245,245,240,0.8);background:rgba(29,185,84,0.1);border:1px solid rgba(29,185,84,0.22);border-radius:8px 8px 8px 2px;padding:5px 7px;line-height:1.4;">Building session — Afrobeats, low BPM, gradual arc.</div>
                <!-- Now playing mini -->
                <div style="margin-top:auto;background:rgba(29,185,84,0.07);border:1px solid rgba(29,185,84,0.18);border-radius:6px;padding:5px 7px;display:flex;align-items:center;gap:5px;">
                  <span style="font-size:8px;color:var(--green);">▶</span>
                  <div><div style="font-size:7px;color:rgba(255,255,255,0.85);">Lady</div><div style="font-size:6px;color:rgba(255,255,255,0.4);">Fela Kuti · 72 BPM</div></div>
                </div>
              </div>
              <!-- Right pane: adaptive queue -->
              <div style="flex:1;display:flex;flex-direction:column;padding:8px 10px;gap:4px;">
                <div style="font-family:var(--font-mono);font-size:6px;letter-spacing:0.12em;color:var(--muted2);text-transform:uppercase;margin-bottom:2px;">Adaptive Queue</div>
                <div style="display:flex;align-items:center;gap:6px;background:rgba(29,185,84,0.06);border:1px solid rgba(29,185,84,0.15);border-radius:5px;padding:5px 6px;">
                  <span style="font-size:7px;color:var(--green);width:8px;">▶</span>
                  <div style="flex:1;min-width:0;"><div style="font-size:7px;color:var(--green);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Lady</div><div style="font-size:6px;color:rgba(255,255,255,0.35);">Fela Kuti</div></div>
                  <span style="font-family:var(--font-mono);font-size:6px;color:rgba(29,185,84,0.65);">72</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.04);padding:5px 6px;">
                  <span style="font-family:var(--font-mono);font-size:6px;color:var(--muted2);width:8px;">2</span>
                  <div style="flex:1;min-width:0;"><div style="font-size:7px;color:rgba(255,255,255,0.75);">Ye</div><div style="font-size:6px;color:rgba(255,255,255,0.35);">Burna Boy</div></div>
                  <span style="font-family:var(--font-mono);font-size:6px;color:var(--muted2);">84</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.04);padding:5px 6px;">
                  <span style="font-family:var(--font-mono);font-size:6px;color:var(--muted2);width:8px;">3</span>
                  <div style="flex:1;min-width:0;"><div style="font-size:7px;color:rgba(255,255,255,0.75);">Soro Soke</div><div style="font-size:6px;color:rgba(255,255,255,0.35);">Fireboy DML</div></div>
                  <span style="font-family:var(--font-mono);font-size:6px;color:var(--muted2);">92</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;padding:5px 6px;">
                  <span style="font-family:var(--font-mono);font-size:6px;color:var(--muted2);width:8px;">4</span>
                  <div style="flex:1;min-width:0;"><div style="font-size:7px;color:rgba(255,255,255,0.75);">Kora Night</div><div style="font-size:6px;color:rgba(255,255,255,0.35);">Ballaké Sissoko</div></div>
                  <span style="font-family:var(--font-mono);font-size:6px;color:var(--muted2);">68</span>
                </div>
              </div>
            </div>
          </div>'''

new = '''<div class="ipad-pro-screen">
            <img src="/daye-ipad.png" alt="Daye on iPad" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 3 (iPad pro listener) replaced")
else:
    print("✗ Screen 3 ipad-pro-screen NOT found")

# --- Screen 4: Samsung S24 Ultra — AI Beat Generator ---
old = '''<div class="samsung-mini-screen" style="background:radial-gradient(ellipse 110% 55% at 50% 100%,rgba(80,0,200,0.5) 0%,transparent 58%),linear-gradient(180deg,#060210 0%,#0c0320 100%);position:relative;">
            <div style="padding:38px 12px 0;flex:1;display:flex;flex-direction:column;gap:7px;">
              <div style="font-family:var(--font-mono);font-size:8px;letter-spacing:0.1em;color:#8C5AFF;text-transform:uppercase;">AI Beat Generator</div>
              <div style="font-size:9px;color:rgba(255,255,255,0.85);background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:10px 10px 3px 10px;padding:7px 9px;align-self:flex-end;max-width:90%;line-height:1.4;">lo-fi Afrobeats, deep bass, 85 BPM, F minor</div>
              <div style="font-size:9px;color:rgba(255,255,255,0.85);background:rgba(140,90,255,0.12);border:1px solid rgba(140,90,255,0.28);border-radius:10px 10px 10px 3px;padding:7px 9px;max-width:94%;line-height:1.4;">Generating — Afrobeats foundation, 85 BPM, Fm, deep sub-bass locked in. Drum pattern ready.</div>
              <div style="background:rgba(140,90,255,0.07);border:1px solid rgba(140,90,255,0.18);border-radius:8px;padding:8px;margin-top:2px;">
                <div style="font-family:var(--font-mono);font-size:7px;color:rgba(140,90,255,0.55);letter-spacing:0.1em;margin-bottom:6px;text-transform:uppercase;">Beat Parameters</div>
                <div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="font-size:7px;color:rgba(255,255,255,0.35);">BPM</span><span style="font-size:7px;color:#8C5AFF;font-family:var(--font-mono);">85</span></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="font-size:7px;color:rgba(255,255,255,0.35);">Key</span><span style="font-size:7px;color:#8C5AFF;font-family:var(--font-mono);">F minor</span></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="font-size:7px;color:rgba(255,255,255,0.35);">Mood</span><span style="font-size:7px;color:#8C5AFF;font-family:var(--font-mono);">Nocturnal</span></div>
                <div style="display:flex;justify-content:space-between;"><span style="font-size:7px;color:rgba(255,255,255,0.35);">Style</span><span style="font-size:7px;color:#8C5AFF;font-family:var(--font-mono);">Afrobeats / Lo-fi</span></div>
              </div>
              <div style="display:flex;align-items:center;gap:2px;height:18px;padding:0 2px;margin-top:2px;">
                <div style="width:3px;height:6px;background:rgba(140,90,255,0.6);border-radius:1px;animation:pi-wave 0.7s ease-in-out infinite;"></div>
                <div style="width:3px;height:12px;background:rgba(140,90,255,0.7);border-radius:1px;animation:pi-wave 0.7s 0.1s ease-in-out infinite;"></div>
                <div style="width:3px;height:8px;background:rgba(140,90,255,0.5);border-radius:1px;animation:pi-wave 0.7s 0.2s ease-in-out infinite;"></div>
                <div style="width:3px;height:16px;background:rgba(140,90,255,0.8);border-radius:1px;animation:pi-wave 0.7s 0.3s ease-in-out infinite;"></div>
                <div style="width:3px;height:10px;background:rgba(140,90,255,0.6);border-radius:1px;animation:pi-wave 0.7s 0.4s ease-in-out infinite;"></div>
                <div style="width:3px;height:14px;background:rgba(140,90,255,0.75);border-radius:1px;animation:pi-wave 0.7s 0.5s ease-in-out infinite;"></div>
                <div style="width:3px;height:7px;background:rgba(140,90,255,0.5);border-radius:1px;animation:pi-wave 0.7s 0.1s ease-in-out infinite;"></div>
                <div style="width:3px;height:12px;background:rgba(140,90,255,0.65);border-radius:1px;animation:pi-wave 0.7s 0.2s ease-in-out infinite;"></div>
                <div style="flex:1;text-align:right;font-family:var(--font-mono);font-size:7px;color:rgba(140,90,255,0.5);">Preview</div>
              </div>
            </div>
          </div>'''

new = '''<div class="samsung-mini-screen">
            <img src="/daye-phone-2.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 4 (Artist samsung) replaced")
else:
    print("✗ Screen 4 artist samsung NOT found")

# --- Screen 5: iPhone 17 Pro Max — Beat Studio Home ---
old = '''<div class="iphone-mini-screen" style="background:radial-gradient(ellipse 110% 55% at 50% 100%,rgba(80,0,200,0.5) 0%,transparent 58%),linear-gradient(180deg,#060210 0%,#0c0320 100%);position:relative;">
            <div style="padding:38px 12px 0;flex:1;display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
                <div style="width:5px;height:5px;border-radius:50%;background:#8C5AFF;box-shadow:0 0 6px #8C5AFF;"></div>
                <span style="font-family:var(--font-mono);font-size:9px;font-weight:700;color:#8C5AFF;letter-spacing:0.08em;">DAYE STUDIO</span>
                <span style="margin-left:auto;font-family:var(--font-mono);font-size:7px;color:rgba(140,90,255,0.5);background:rgba(140,90,255,0.1);border:1px solid rgba(140,90,255,0.2);padding:1px 5px;border-radius:3px;">Artist</span>
              </div>
              <div style="font-family:var(--font-mono);font-size:7px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.1em;">My Projects</div>
              <div style="display:flex;flex-direction:column;gap:5px;">
                <div style="background:rgba(140,90,255,0.1);border:1px solid rgba(140,90,255,0.25);border-radius:6px;padding:6px 8px;display:flex;align-items:center;gap:7px;">
                  <div style="width:22px;height:22px;border-radius:4px;background:rgba(140,90,255,0.3);display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0;">♫</div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:8px;color:rgba(255,255,255,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Lagos Rooftop Beat</div>
                    <div style="font-size:7px;color:rgba(255,255,255,0.35);">85 BPM · Fm · Draft</div>
                  </div>
                </div>
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:6px;padding:6px 8px;display:flex;align-items:center;gap:7px;">
                  <div style="width:22px;height:22px;border-radius:4px;background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0;">◎</div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:8px;color:rgba(255,255,255,0.5);">Midnight Alté</div>
                    <div style="font-size:7px;color:rgba(255,255,255,0.25);">92 BPM · Am · Draft</div>
                  </div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:4px;">
                <div style="background:rgba(140,90,255,0.18);border:1px solid rgba(140,90,255,0.35);border-radius:8px;padding:10px 6px;text-align:center;">
                  <div style="font-size:13px;margin-bottom:3px;">🎵</div>
                  <div style="font-size:7px;color:#8C5AFF;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.05em;">AI Beat</div>
                </div>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 6px;text-align:center;">
                  <div style="font-size:13px;margin-bottom:3px;">🎙</div>
                  <div style="font-size:7px;color:rgba(255,255,255,0.4);font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.05em;">Record</div>
                </div>
              </div>
            </div>
          </div>'''

new = '''<div class="iphone-mini-screen">
            <img src="/daye-phone.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 5 (Artist iphone Beat Studio) replaced")
else:
    print("✗ Screen 5 artist iphone NOT found")

# --- Screen 6: iPad Pro — Recording Studio (real-photo-device ipad-photo) ---
old = '''<div class="real-photo-device ipad-photo device-tilt-enter">
          <img src="/1779848520333.png" alt="iPad DJ deck in studio, hand on screen">
        </div>'''

new = '''<div class="ipad-pro-frame device-tilt-enter">
          <div class="ipad-camera-pill"></div>
          <div class="ipad-pro-screen">
            <img src="/daye-ipad.png" alt="Daye on iPad" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>
        </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 6 (iPad real photo) replaced with ipad frame")
else:
    print("✗ Screen 6 ipad real photo NOT found")

# --- Screen 7: iPhone DJ Mixing Deck ---
old = '''<div class="iphone-mini-screen" style="background:radial-gradient(ellipse 110% 55% at 50% 100%,rgba(160,100,0,0.45) 0%,transparent 58%),linear-gradient(180deg,#080500 0%,#100800 100%);position:relative;">
            <div style="padding:38px 11px 0;flex:1;display:flex;flex-direction:column;gap:7px;">
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="width:5px;height:5px;border-radius:50%;background:#D4A017;box-shadow:0 0 6px #D4A017;"></div>
                <span style="font-family:var(--font-mono);font-size:8px;font-weight:700;color:#D4A017;letter-spacing:0.08em;">DJ DECK</span>
              </div>
              <!-- Two decks -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:2px;">
                <div style="background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.22);border-radius:6px;padding:6px;">
                  <div style="font-family:var(--font-mono);font-size:6px;color:rgba(212,160,23,0.55);text-transform:uppercase;margin-bottom:4px;">Deck A</div>
                  <div style="font-size:7px;color:rgba(255,255,255,0.8);margin-bottom:2px;">Lady</div>
                  <div style="font-size:6px;color:rgba(255,255,255,0.4);">Fela Kuti</div>
                  <div style="margin-top:5px;display:flex;gap:1px;align-items:center;height:14px;">
                    <div style="width:2px;height:5px;background:rgba(212,160,23,0.5);border-radius:1px;"></div>
                    <div style="width:2px;height:10px;background:rgba(212,160,23,0.7);border-radius:1px;"></div>
                    <div style="width:2px;height:7px;background:rgba(212,160,23,0.55);border-radius:1px;"></div>
                    <div style="width:2px;height:12px;background:rgba(212,160,23,0.8);border-radius:1px;"></div>
                    <div style="width:2px;height:8px;background:rgba(212,160,23,0.6);border-radius:1px;"></div>
                  </div>
                  <div style="font-family:var(--font-mono);font-size:7px;color:#D4A017;margin-top:4px;">72 BPM</div>
                </div>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:6px;">
                  <div style="font-family:var(--font-mono);font-size:6px;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:4px;">Deck B</div>
                  <div style="font-size:7px;color:rgba(255,255,255,0.8);margin-bottom:2px;">Ye</div>
                  <div style="font-size:6px;color:rgba(255,255,255,0.4);">Burna Boy</div>
                  <div style="margin-top:5px;display:flex;gap:1px;align-items:center;height:14px;">
                    <div style="width:2px;height:8px;background:rgba(255,255,255,0.25);border-radius:1px;"></div>
                    <div style="width:2px;height:6px;background:rgba(255,255,255,0.2);border-radius:1px;"></div>
                    <div style="width:2px;height:11px;background:rgba(255,255,255,0.3);border-radius:1px;"></div>
                    <div style="width:2px;height:7px;background:rgba(255,255,255,0.22);border-radius:1px;"></div>
                    <div style="width:2px;height:9px;background:rgba(255,255,255,0.25);border-radius:1px;"></div>
                  </div>
                  <div style="font-family:var(--font-mono);font-size:7px;color:rgba(255,255,255,0.4);margin-top:4px;">84 BPM</div>
                </div>
              </div>
              <!-- Crossfader -->
              <div style="margin-top:4px;">
                <div style="font-family:var(--font-mono);font-size:6px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">Crossfader</div>
                <div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;position:relative;">
                  <div style="height:100%;width:35%;background:linear-gradient(90deg,#D4A017,rgba(212,160,23,0.5));border-radius:2px;"></div>
                  <div style="width:10px;height:10px;border-radius:50%;background:#D4A017;position:absolute;top:50%;left:33%;transform:translate(-50%,-50%);box-shadow:0 0 6px rgba(212,160,23,0.6);"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:3px;">
                  <span style="font-size:6px;color:#D4A017;font-family:var(--font-mono);">A</span>
                  <span style="font-size:6px;color:rgba(255,255,255,0.25);font-family:var(--font-mono);">B</span>
                </div>
              </div>
              <!-- Key match -->
              <div style="background:rgba(212,160,23,0.07);border:1px solid rgba(212,160,23,0.15);border-radius:5px;padding:5px 7px;display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:7px;color:rgba(255,255,255,0.4);">Key match</span>
                <span style="font-size:7px;color:#D4A017;font-family:var(--font-mono);">Fm → Am ✓</span>
              </div>
            </div>
          </div>'''

new = '''<div class="iphone-mini-screen">
            <img src="/daye-phone.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 7 (DJ iphone Mixing Deck) replaced")
else:
    print("✗ Screen 7 DJ iphone NOT found")

# --- Screen 8: Samsung S24 Ultra — Harmonic Key Wheel ---
old = '''<div class="samsung-mini-screen" style="background:radial-gradient(ellipse 110% 55% at 50% 100%,rgba(160,100,0,0.45) 0%,transparent 58%),linear-gradient(180deg,#080500 0%,#100800 100%);position:relative;">
            <div style="padding:38px 12px 0;flex:1;display:flex;flex-direction:column;gap:7px;">
              <div style="font-family:var(--font-mono);font-size:8px;letter-spacing:0.1em;color:#D4A017;text-transform:uppercase;">Harmonic Intelligence</div>
              <!-- Key wheel (SVG circle) -->
              <div style="display:flex;justify-content:center;margin:4px 0 2px;">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(212,160,23,0.1)" stroke-width="12"/>
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(212,160,23,0.55)" stroke-width="12" stroke-dasharray="25 214" stroke-dashoffset="0" stroke-linecap="round"/>
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(212,160,23,0.25)" stroke-width="12" stroke-dasharray="18 214" stroke-dashoffset="-60" stroke-linecap="round"/>
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(212,160,23,0.18)" stroke-width="12" stroke-dasharray="15 214" stroke-dashoffset="-100" stroke-linecap="round"/>
                  <text x="45" y="42" text-anchor="middle" fill="#D4A017" font-size="9" font-family="monospace">Fm</text>
                  <text x="45" y="53" text-anchor="middle" fill="rgba(212,160,23,0.55)" font-size="7" font-family="monospace">Current</text>
                </svg>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:7px;color:rgba(255,255,255,0.35);padding:0 2px;">
                <span>Compatible keys</span>
                <span style="color:#D4A017;font-family:var(--font-mono);">Am · Cm · Ab</span>
              </div>
              <!-- BPM arc -->
              <div style="background:rgba(212,160,23,0.06);border:1px solid rgba(212,160,23,0.15);border-radius:7px;padding:7px 8px;">
                <div style="font-family:var(--font-mono);font-size:7px;color:rgba(212,160,23,0.55);text-transform:uppercase;margin-bottom:5px;">BPM Energy Arc</div>
                <div style="display:flex;align-items:flex-end;gap:2px;height:22px;">
                  <div style="width:6px;height:8px;background:rgba(212,160,23,0.4);border-radius:1px;"></div>
                  <div style="width:6px;height:11px;background:rgba(212,160,23,0.5);border-radius:1px;"></div>
                  <div style="width:6px;height:14px;background:rgba(212,160,23,0.6);border-radius:1px;"></div>
                  <div style="width:6px;height:18px;background:rgba(212,160,23,0.75);border-radius:1px;"></div>
                  <div style="width:6px;height:22px;background:#D4A017;border-radius:1px;"></div>
                  <div style="width:6px;height:19px;background:rgba(212,160,23,0.8);border-radius:1px;"></div>
                  <div style="width:6px;height:15px;background:rgba(212,160,23,0.65);border-radius:1px;"></div>
                  <div style="width:6px;height:12px;background:rgba(212,160,23,0.5);border-radius:1px;"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:4px;">
                  <span style="font-size:6px;color:rgba(255,255,255,0.3);">72 BPM</span>
                  <span style="font-size:6px;color:#D4A017;">Peak → 98</span>
                  <span style="font-size:6px;color:rgba(255,255,255,0.3);">84 BPM</span>
                </div>
              </div>
            </div>
          </div>'''

new = '''<div class="samsung-mini-screen">
            <img src="/daye-phone-2.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 8 (DJ samsung Harmonic) replaced")
else:
    print("✗ Screen 8 DJ samsung NOT found")

# --- Screen 9: MacBook Pro (real-photo-device macbook-photo) → daye-laptop.png ---
old = '''<div class="real-photo-device macbook-photo device-tilt-enter from-top">
          <img src="/1779848525908.png" alt="MacBook Pro showing Daye analytics on studio desk">
        </div>'''

new = '''<div class="macbook-frame device-tilt-enter from-top" style="box-shadow:0 0 0 1px rgba(212,160,23,0.2),0 40px 100px rgba(0,0,0,0.97),0 16px 40px rgba(0,0,0,0.7);">
          <div class="macbook-camera"></div>
          <div class="macbook-screen">
            <img src="/daye-laptop.png" alt="Daye on MacBook" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>
        </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 9 (MacBook real photo) replaced with macbook frame")
else:
    print("✗ Screen 9 macbook real photo NOT found")
    # check if the old macbook-photo structure is there
    idx = html.find('1779848525908.png')
    if idx != -1:
        print(f"  Found 1779848525908.png at index {idx}")
        print(f"  Context: {repr(html[idx-300:idx+100])}")

# --- Screen 10: Apple Watch (watch-screen in Screen 10) ---
old = '''<div class="watch-screen" style="background:radial-gradient(ellipse 110% 60% at 50% 100%,rgba(0,100,40,0.55) 0%,transparent 60%),linear-gradient(180deg,#020f06 0%,#020e05 100%);">
            <!-- status bar -->
            <div style="padding:8px 10px 0;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-family:var(--font-mono);font-size:7px;color:rgba(255,255,255,0.4);">9:41</span>
              <div style="width:5px;height:5px;border-radius:50%;background:var(--green);animation:blink 2s ease-in-out infinite;"></div>
            </div>
            <!-- green checkmark -->
            <div style="display:flex;justify-content:center;margin:6px 0 3px;">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;box-shadow:0 0 18px rgba(29,185,84,0.45);">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-6.5" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </div>
            <!-- text -->
            <div style="padding:0 8px;text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.95);font-weight:700;margin-bottom:2px;">Published!</div>
              <div style="font-size:7px;color:rgba(255,255,255,0.75);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Lagos Rooftop Beat</div>
              <div style="font-size:6px;color:rgba(29,185,84,0.8);margin-top:2px;">Now live on Spotify</div>
            </div>
            <!-- CTA button -->
            <div style="padding:0 10px;margin-top:8px;">
              <div style="background:var(--green);border-radius:8px;padding:6px 8px;text-align:center;">
                <span style="font-family:var(--font-mono);font-size:7px;font-weight:700;color:#000;letter-spacing:0.04em;">View on Spotify</span>
              </div>
            </div>
            <!-- home indicator -->
            <div style="display:flex;justify-content:center;padding:6px 0 4px;">
              <div style="width:28px;height:3px;border-radius:2px;background:rgba(255,255,255,0.2);"></div>
            </div>
          </div>'''

new = '''<div class="watch-screen">
            <img src="/daye-watch.png" alt="Daye on Watch" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">
          </div>'''

if old in html:
    html = html.replace(old, new)
    print("✓ Screen 10 (Apple Watch published) replaced")
else:
    print("✗ Screen 10 watch-screen NOT found")

# =====================================================================
# STEP 3: Remove cluster-device-label blocks
# =====================================================================

# Remove all <div class="cluster-device-label">...</div> blocks
cluster_labels = [
    '''        <div class="cluster-device-label">
          <strong>Queue View</strong>
          AI-managed order
        </div>''',
    '''        <div class="cluster-device-label" style="margin-top:20px;">
          <strong>Voice Session Active</strong>
          iPhone 17 Pro Max · Listener mode
        </div>''',
    '''        <div class="cluster-device-label">
          <strong>Daye Studio</strong>
          Samsung S24 Ultra · Artist mode
        </div>''',
]

for label in cluster_labels:
    if label in html:
        html = html.replace(label, '')
        print(f"✓ Removed cluster-device-label: {label.strip()[:50]}...")
    else:
        print(f"✗ NOT found cluster-device-label: {label.strip()[:50]}...")

# =====================================================================
# STEP 4: Remove iphone-screen-label blocks
# =====================================================================

# Use regex to remove all <div class="iphone-screen-label"...>...</div> blocks
# These can have style attributes
iphone_screen_label_pattern = re.compile(
    r'[ \t]*<div class="iphone-screen-label"[^>]*>.*?</div>\s*',
    re.DOTALL
)

count_before = len(iphone_screen_label_pattern.findall(html))
html = iphone_screen_label_pattern.sub('', html)
print(f"✓ Removed {count_before} iphone-screen-label blocks")

# =====================================================================
# STEP 5: Insert cinematic CSS before the first </style> tag
# =====================================================================

cinematic_css = '''
/* ===== CINEMATIC DEVICE SHOWCASE ===== */
/* Perspective containers */
.cluster-wrap { perspective: 1400px; perspective-origin: 50% 30%; }
.device-mix-row { perspective: 1400px; perspective-origin: 50% 30%; }
.iphone-row { perspective: 1400px; perspective-origin: 50% 30%; }

/* 3D tilt on side devices */
.cluster-left-wrap .iphone-mini-frame,
.cluster-left-wrap .samsung-mini-frame {
  transform: rotateY(16deg) rotateX(2deg) scale(0.96);
  transform-style: preserve-3d;
}
.cluster-right-wrap .iphone-mini-frame,
.cluster-right-wrap .samsung-mini-frame {
  transform: rotateY(-16deg) rotateX(2deg) scale(0.96);
  transform-style: preserve-3d;
}

/* Device image styling */
.iphone-mini-screen img,
.samsung-mini-screen img,
.watch-screen img,
.ipad-pro-screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

/* Cinematic shadows — listener (green) */
.row-ambient:not(.amber-glow):not(.purple-glow) .iphone-mini-frame,
.row-ambient:not(.amber-glow):not(.purple-glow) .samsung-mini-frame,
.cluster-left-wrap .iphone-mini-frame,
.cluster-center-wrap .iphone-doc-frame,
.cluster-right-wrap .samsung-mini-frame {
  filter: drop-shadow(0 40px 80px rgba(0,0,0,0.95)) drop-shadow(0 0 40px rgba(29,185,84,0.1));
}

/* Cinematic shadows — artist (purple) */
.purple-glow .iphone-mini-frame,
.purple-glow .samsung-mini-frame,
.purple-glow .ipad-pro-frame {
  filter: drop-shadow(0 40px 80px rgba(0,0,0,0.95)) drop-shadow(0 0 50px rgba(140,90,255,0.12));
}

/* Cinematic shadows — DJ (amber) */
.amber-glow .iphone-mini-frame,
.amber-glow .samsung-mini-frame {
  filter: drop-shadow(0 40px 80px rgba(0,0,0,0.95)) drop-shadow(0 0 50px rgba(212,160,23,0.12));
}

/* Float animation */
@keyframes deviceFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes deviceFloatSide {
  0%, 100% { transform: rotateY(16deg) rotateX(2deg) scale(0.96) translateY(0px); }
  50% { transform: rotateY(16deg) rotateX(2deg) scale(0.96) translateY(-8px); }
}
@keyframes deviceFloatSideRight {
  0%, 100% { transform: rotateY(-16deg) rotateX(2deg) scale(0.96) translateY(0px); }
  50% { transform: rotateY(-16deg) rotateX(2deg) scale(0.96) translateY(-8px); }
}

/* Apply float to entered devices */
.device-tilt-enter.entered:not(.from-right):not(.from-top) {
  animation: deviceFloat 5s ease-in-out infinite;
}
.cluster-center-wrap .device-tilt-enter.entered {
  animation: deviceFloat 5s ease-in-out infinite;
}
.cluster-left-wrap .device-tilt-enter.entered {
  animation: deviceFloatSide 5.5s ease-in-out infinite 0.3s;
}
.cluster-right-wrap .device-tilt-enter.entered {
  animation: deviceFloatSideRight 5.5s ease-in-out infinite 0.6s;
}

/* Watch + iPad keep simpler float */
.watch-frame.entered,
.ipad-pro-frame.entered {
  animation: deviceFloat 6s ease-in-out infinite 0.4s;
}

/* Remove screen background gradients now that images are used */
.iphone-mini-screen,
.samsung-mini-screen {
  background: #000 !important;
  padding: 0 !important;
  overflow: hidden;
}
.watch-screen {
  background: #000 !important;
  padding: 0 !important;
}
.ipad-pro-screen {
  background: #000 !important;
  padding: 0 !important;
  overflow: hidden;
}

/* Hero center phone stays front and center, no tilt */
.cluster-center-wrap .iphone-doc-frame {
  filter: drop-shadow(0 50px 100px rgba(0,0,0,0.95)) drop-shadow(0 0 60px rgba(29,185,84,0.15));
}
'''

# Insert before first </style>
first_style_close = html.find('</style>')
if first_style_close != -1:
    html = html[:first_style_close] + cinematic_css + html[first_style_close:]
    print("✓ Cinematic CSS inserted before first </style>")
else:
    print("✗ Could not find </style> to insert CSS")

# =====================================================================
# STEP 6: Add car and TV strips
# =====================================================================

# Find end of roadmap section (</section> after roadmap content)
# Roadmap is id="roadmap", followed by <div class="divider"> then GTM section
# We want to insert the car strip AFTER </section> of roadmap and BEFORE <div class="divider">

roadmap_end_marker = '</section>\n\n<div class="divider"></div>\n\n<!-- GTM -->'

car_strip = '''<div style="overflow:hidden;position:relative;max-height:380px;">
  <img src="/daye-car.png" alt="Daye in a vehicle" style="width:100%;object-fit:cover;max-height:380px;display:block;opacity:0.88;">
  <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,0.65) 0%,transparent 55%,rgba(0,0,0,0.3) 100%);display:flex;align-items:center;padding:0 48px;">
    <div>
      <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.2em;color:rgba(29,185,84,0.8);text-transform:uppercase;margin-bottom:8px;">Platform Ecosystem</div>
      <div style="font-family:var(--font-display);font-size:clamp(28px,3vw,42px);font-weight:700;color:#fff;line-height:1.2;">Daye. Everywhere<br>you listen.</div>
    </div>
  </div>
</div>

'''

new_roadmap_end = car_strip + roadmap_end_marker

if roadmap_end_marker in html:
    html = html.replace(roadmap_end_marker, new_roadmap_end)
    print("✓ Car strip inserted after roadmap section")
else:
    print("✗ Roadmap end marker NOT found")
    # Debug: find the GTM section
    idx = html.find('<!-- GTM -->')
    if idx != -1:
        print(f"  Found GTM at {idx}")
        print(f"  Context before: {repr(html[idx-100:idx+20])}")

# Add TV strip before <section id="closing">
closing_marker = '<section id="closing"'

tv_strip = '''<div style="overflow:hidden;position:relative;max-height:420px;">
  <img src="/daye-tv.png" alt="Daye on home TV" style="width:100%;object-fit:cover;max-height:420px;display:block;opacity:0.9;">
</div>

'''

if closing_marker in html:
    html = html.replace(closing_marker, tv_strip + closing_marker)
    print("✓ TV strip inserted before closing section")
else:
    print("✗ Closing section marker NOT found")

# =====================================================================
# STEP 7: Clean up any remaining 1779848 references
# =====================================================================

remaining = html.count('1779848')
if remaining > 0:
    print(f"⚠ Found {remaining} remaining 1779848 references - cleaning up")
    # Replace any remaining 1779848 image in closing section background
    html = re.sub(r"background-image:url\('/1779848[^']+'\)", "background-image:none", html)
    remaining2 = html.count('1779848')
    print(f"  After cleanup: {remaining2} remaining")
else:
    print("✓ No remaining 1779848 references")

# =====================================================================
# WRITE OUTPUT
# =====================================================================

with open('/home/user/PM-PORTFOLIO-/public/daye-case-study.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nDone. New length: {len(html)} (was {original_len})")

# Final verification
print("\n=== VERIFICATION ===")
print(f"cluster-device-label count: {html.count('cluster-device-label') - html.count('.cluster-device-label')}")
isl_count = html.count('<div class="iphone-screen-label"')
print(f"iphone-screen-label count (HTML, not CSS): {isl_count}")
print(f"daye-phone.png count: {html.count('daye-phone.png')}")
print(f"daye-phone-2.png count: {html.count('daye-phone-2.png')}")
print(f"daye-watch.png count: {html.count('daye-watch.png')}")
print(f"daye-ipad.png count: {html.count('daye-ipad.png')}")
print(f"daye-laptop.png count: {html.count('daye-laptop.png')}")
print(f"daye-car.png count: {html.count('daye-car.png')}")
print(f"daye-tv.png count: {html.count('daye-tv.png')}")
print(f"1779848 references: {html.count('1779848')}")
