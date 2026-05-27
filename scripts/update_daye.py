#!/usr/bin/env python3
"""
Script to update daye-case-study.html with Gemini device images
and cinematic 3D CSS effects.
"""

import re

FILE = '/home/user/PM-PORTFOLIO-/public/daye-case-study.html'

with open(FILE, 'r', encoding='utf-8') as f:
    html = f.read()

original_len = len(html)
print(f"Original length: {original_len}")

# ============================================================
# STEP 1: Replace screen content in specific devices
# We'll use a function to replace content inside a screen div
# ============================================================

def replace_screen_content(html, screen_class, img_src, img_alt, nth=None):
    """
    Replace all content inside divs with the given class with an img tag.
    If nth is specified, only replace the nth occurrence (1-indexed).
    """
    # Pattern to find the screen div and all its content
    pattern = r'(<div class="' + re.escape(screen_class) + r'"[^>]*>)(.*?)(</div>)'

    img_tag = f'<img src="/{img_src}" alt="{img_alt}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">'

    matches = list(re.finditer(pattern, html, re.DOTALL))
    print(f"  Found {len(matches)} matches for class '{screen_class}'")

    if nth is not None:
        # Replace only nth occurrence
        if nth <= len(matches):
            m = matches[nth-1]
            replacement = m.group(1) + img_tag + m.group(3)
            html = html[:m.start()] + replacement + html[m.end():]
    else:
        # Replace all occurrences, working backwards to preserve positions
        for m in reversed(matches):
            replacement = m.group(1) + img_tag + m.group(3)
            html = html[:m.start()] + replacement + html[m.end():]

    return html

# ============================================================
# STEP 2: Handle iphone-mini-screen replacements
# ============================================================
print("\n--- Replacing iphone-mini-screen content ---")

# Pattern: find <div class="iphone-mini-screen"...> ... </div>
# The screen divs have style attrs, so match class with potential style attr
# We need to handle nested divs carefully - find the outermost content

def replace_screen_div_content(html, class_name, img_html):
    """
    Replace content inside screen divs. These divs may have style attrs.
    Uses a careful approach: finds opening tag, then finds the matching closing tag.
    """
    count = 0
    result = html

    # Find all occurrences of the opening div
    # Match <div class="CLASSNAME"...> or <div class="CLASSNAME ...">
    open_pattern = re.compile(r'<div\s+class="' + re.escape(class_name) + r'"[^>]*>')

    new_result = []
    pos = 0

    for m in open_pattern.finditer(result):
        start = m.start()
        tag_end = m.end()

        # Now find the matching closing </div> by counting nesting
        depth = 1
        i = tag_end
        while i < len(result) and depth > 0:
            open_tag = result.find('<div', i)
            close_tag = result.find('</div>', i)

            if close_tag == -1:
                break

            if open_tag != -1 and open_tag < close_tag:
                depth += 1
                i = open_tag + 4
            else:
                depth -= 1
                if depth == 0:
                    # Found the matching closing tag
                    end = close_tag + 6  # len('</div>') = 6
                    # Build replacement
                    opening_tag = m.group(0)
                    replacement = opening_tag + img_html + '</div>'
                    new_result.append((start, end, replacement))
                    count += 1
                    break
                i = close_tag + 6

    # Apply replacements in reverse order
    result_chars = list(result)
    for start, end, replacement in reversed(new_result):
        result_chars[start:end] = list(replacement)

    print(f"  Replaced {count} '{class_name}' screens")
    return ''.join(result_chars)

# iphone-mini-screen -> daye-phone.png
iphone_img = '<img src="/daye-phone.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">'
html = replace_screen_div_content(html, 'iphone-mini-screen', iphone_img)

# samsung-mini-screen -> daye-phone-2.png
samsung_img = '<img src="/daye-phone-2.png" alt="Daye app" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">'
html = replace_screen_div_content(html, 'samsung-mini-screen', samsung_img)

# watch-screen -> daye-watch.png
watch_img = '<img src="/daye-watch.png" alt="Daye on Watch" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">'
html = replace_screen_div_content(html, 'watch-screen', watch_img)

# ipad-pro-screen -> daye-ipad.png
ipad_img = '<img src="/daye-ipad.png" alt="Daye on iPad" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;">'
html = replace_screen_div_content(html, 'ipad-pro-screen', ipad_img)

# ============================================================
# STEP 3: Replace real-photo-device blocks with proper frames
# ============================================================
print("\n--- Replacing real-photo-device blocks ---")

# Screen 1: real-photo-device watch-photo -> watch-frame with watch-screen containing daye-watch.png
# Find: <div class="real-photo-device watch-photo device-tilt-enter from-top">
#         <img src="/1779848512552.png" ...>
#       </div>
# Replace with: <div class="watch-frame device-tilt-enter from-top">
#                 <div class="watch-screen"><img src="/daye-watch.png" ...></div>
#               </div>

old_watch_photo = '''<div class="real-photo-device watch-photo device-tilt-enter from-top">
          <img src="/1779848512552.png" alt="Apple Watch on wrist in car at night, Daye Now Playing">
        </div>'''

new_watch_frame = '''<div class="watch-frame device-tilt-enter from-top">
          <div class="watch-screen"><img src="/daye-watch.png" alt="Daye on Watch" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;"></div>
        </div>'''

if old_watch_photo in html:
    html = html.replace(old_watch_photo, new_watch_frame)
    print("  Replaced watch-photo block (Screen 1)")
else:
    print("  WARNING: watch-photo block not found!")

# Screen 6: real-photo-device ipad-photo -> ipad-pro-frame with ipad-pro-screen containing daye-ipad.png
old_ipad_photo = '''<div class="real-photo-device ipad-photo device-tilt-enter">
          <img src="/1779848520333.png" alt="iPad DJ deck in studio, hand on screen">
        </div>'''

new_ipad_frame = '''<div class="ipad-pro-frame device-tilt-enter">
          <div class="ipad-camera-pill"></div>
          <div class="ipad-pro-screen"><img src="/daye-ipad.png" alt="Daye on iPad" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;"></div>
        </div>'''

if old_ipad_photo in html:
    html = html.replace(old_ipad_photo, new_ipad_frame)
    print("  Replaced ipad-photo block (Screen 6)")
else:
    print("  WARNING: ipad-photo block not found!")

# Screen 9: real-photo-device macbook-photo -> simple img with daye-laptop.png
# The macbook block is more complex - it has hidden CSS content too
# Find: <div class="macbook-card">
#         <div class="real-photo-device macbook-photo device-tilt-enter from-top">
#           <img src="/1779848525908.png"...>
#         </div>
#         <div style="display:none;">...</div>
# Replace the real-photo-device block with just the laptop image in a simple wrapper

old_macbook_photo = '''<div class="real-photo-device macbook-photo device-tilt-enter from-top">
          <img src="/1779848525908.png" alt="MacBook Pro showing Daye analytics on studio desk">
        </div>'''

new_macbook_img = '''<div class="device-tilt-enter from-top" style="width:100%;max-width:480px;">
          <img src="/daye-laptop.png" alt="Daye on MacBook" style="width:100%;display:block;object-fit:contain;">
        </div>'''

if old_macbook_photo in html:
    html = html.replace(old_macbook_photo, new_macbook_img)
    print("  Replaced macbook-photo block (Screen 9)")
else:
    print("  WARNING: macbook-photo block not found!")

# ============================================================
# STEP 4: Remove all cluster-device-label divs
# ============================================================
print("\n--- Removing cluster-device-label divs ---")

label_pattern = re.compile(r'\s*<div class="cluster-device-label"[^>]*>.*?</div>', re.DOTALL)
before_count = len(label_pattern.findall(html))
html = label_pattern.sub('', html)
print(f"  Removed {before_count} cluster-device-label divs")

# ============================================================
# STEP 5: Remove all iphone-screen-label divs
# ============================================================
print("\n--- Removing iphone-screen-label divs ---")

screen_label_pattern = re.compile(r'\s*<div class="iphone-screen-label"[^>]*>.*?</div>', re.DOTALL)
before_count = len(screen_label_pattern.findall(html))
html = screen_label_pattern.sub('', html)
print(f"  Removed {before_count} iphone-screen-label divs")

# ============================================================
# STEP 6: Replace any remaining 1779848 image references
# ============================================================
print("\n--- Checking for remaining 1779848 references ---")
remaining = re.findall(r'src="/1779848[^"]*"', html)
print(f"  Found {len(remaining)} remaining references: {remaining}")

# Replace any remaining ones
html = re.sub(r'src="/1779848\d+\.png"', 'src="/daye-laptop.png"', html)

# ============================================================
# STEP 7: Insert cinematic CSS before last </style> in <head>
# ============================================================
print("\n--- Adding cinematic CSS ---")

cinematic_css = """
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
"""

# Find the last </style> before </head>
# We want the last </style> in the head section
head_end = html.find('</head>')
head_section = html[:head_end]
last_style_pos = head_section.rfind('</style>')

if last_style_pos != -1:
    html = html[:last_style_pos] + cinematic_css + html[last_style_pos:]
    print("  Inserted cinematic CSS before last </style> in head")
else:
    print("  WARNING: Could not find </style> in head!")

# ============================================================
# STEP 8: Add car and TV strip images
# ============================================================
print("\n--- Adding car and TV strips ---")

car_strip = '''
<div style="overflow:hidden;position:relative;max-height:380px;">
  <img src="/daye-car.png" alt="Daye in a vehicle" style="width:100%;object-fit:cover;max-height:380px;display:block;opacity:0.88;">
  <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,0.65) 0%,transparent 55%,rgba(0,0,0,0.3) 100%);display:flex;align-items:center;padding:0 48px;">
    <div>
      <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.2em;color:rgba(29,185,84,0.8);text-transform:uppercase;margin-bottom:8px;">Platform Ecosystem</div>
      <div style="font-family:var(--font-display);font-size:clamp(28px,3vw,42px);font-weight:700;color:#fff;line-height:1.2;">Daye. Everywhere<br>you listen.</div>
    </div>
  </div>
</div>
'''

tv_strip = '''
<div style="overflow:hidden;position:relative;max-height:420px;">
  <img src="/daye-tv.png" alt="Daye on home TV" style="width:100%;object-fit:cover;max-height:420px;display:block;opacity:0.9;">
</div>
'''

# Insert car strip after roadmap section ends (after </section> at line ~7001)
# The roadmap section ends at line 7001, followed by divider then GTM section
# Find: </section>\n\n<div class="divider"></div>\n\n<!-- GTM -->
roadmap_end_marker = '</section>\n\n<div class="divider"></div>\n\n<!-- GTM -->'
if roadmap_end_marker in html:
    html = html.replace(
        roadmap_end_marker,
        '</section>\n' + car_strip + '\n<div class="divider"></div>\n\n<!-- GTM -->'
    )
    print("  Inserted car strip after roadmap section")
else:
    # Try alternative: find roadmap section end
    alt_marker = '</section>\n\n<div class="divider"></div>'
    # Find the one after roadmap
    roadmap_idx = html.find('<section id="roadmap">')
    if roadmap_idx != -1:
        after_roadmap = html.find(alt_marker, roadmap_idx)
        if after_roadmap != -1:
            insert_pos = after_roadmap + len('</section>')
            html = html[:insert_pos] + '\n' + car_strip + html[insert_pos:]
            print("  Inserted car strip after roadmap section (alt method)")
        else:
            print("  WARNING: Could not find roadmap end marker!")
    else:
        print("  WARNING: Could not find roadmap section!")

# Insert TV strip before closing section
closing_marker = '\n<section id="closing"'
if closing_marker in html:
    html = html.replace(closing_marker, '\n' + tv_strip + '\n<section id="closing"')
    print("  Inserted TV strip before closing section")
else:
    print("  WARNING: Could not find closing section!")

# ============================================================
# VERIFY
# ============================================================
print("\n--- Verification ---")
print(f"cluster-device-label count: {html.count('cluster-device-label')}")
print(f"iphone-screen-label count: {html.count('iphone-screen-label')}")
print(f"daye-phone.png count: {html.count('daye-phone.png')}")
print(f"daye-phone-2.png count: {html.count('daye-phone-2.png')}")
print(f"daye-watch.png count: {html.count('daye-watch.png')}")
print(f"daye-ipad.png count: {html.count('daye-ipad.png')}")
print(f"daye-laptop.png count: {html.count('daye-laptop.png')}")
print(f"daye-car.png count: {html.count('daye-car.png')}")
print(f"daye-tv.png count: {html.count('daye-tv.png')}")
print(f"1779848 reference count: {html.count('1779848')}")
print(f"Final length: {len(html)}")

# Write output
with open(FILE, 'w', encoding='utf-8') as f:
    f.write(html)

print("\nDone! File written.")
