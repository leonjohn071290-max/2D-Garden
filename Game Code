# ╔══════════════════════════════════════════════════════════════════════════╗
# ║              Grow A 2D Garden!!  –  AWESOMECO                           ║
# ╚══════════════════════════════════════════════════════════════════════════╝
import pygame, sys, random, math, time, json, os, copy

pygame.init()

SW, SH = 900, 500
screen = pygame.display.set_mode((SW, SH))
pygame.display.set_caption("Grow A 2D Garden!!")
clock = pygame.time.Clock()

# ── fonts ─────────────────────────────────────────────────────────────────────
font_xs  = pygame.font.SysFont("Courier New", 11)
font_sm  = pygame.font.SysFont("Courier New", 14)
font_md  = pygame.font.SysFont("Courier New", 18, bold=True)
font_lg  = pygame.font.SysFont("Courier New", 26, bold=True)
font_xl  = pygame.font.SysFont("Courier New", 48, bold=True)
font_xl2 = pygame.font.SysFont("Courier New", 36, bold=True)

# ── save path ─────────────────────────────────────────────────────────────────
SAVE_DIR  = os.path.join(os.environ.get("APPDATA", os.path.expanduser("~")), "AWESOMECO")
SAVE_FILE = os.path.join(SAVE_DIR, "save.json")
os.makedirs(SAVE_DIR, exist_ok=True)

# ══════════════════════════════════════════════════════════════════════════════
# COLOURS
# ══════════════════════════════════════════════════════════════════════════════
SKY         = (135, 206, 235)
SKY_DARK    = ( 80, 160, 210)
GRASS       = ( 80, 160,  60)
GRASS2      = ( 60, 130,  40)
DIRT        = (120,  80,  40)
DARK_DIRT   = ( 90,  55,  20)
BROWN       = (139,  90,  43)
STALL_WALL  = (220, 160,  60)
STALL_ROOF  = (180,  70,  30)
WOOD        = (160, 110,  50)
SIGN_BG     = (245, 225, 180)
BLACK       = (  0,   0,   0)
WHITE       = (255, 255, 255)
GREEN_LEAF  = ( 50, 160,  50)
SPROUT_C    = (100, 200,  80)
CARROT_OR   = (220, 110,  20)
CARROT_GR   = ( 40, 140,  40)
TOMATO_R    = (210,  40,  40)
TOMATO_GR   = ( 50, 130,  40)
SUNFL_YEL   = (240, 200,  20)
SUNFL_BRN   = (140,  80,  20)
GARDEN_DIRT = ( 70,  40,  15)
COIN_Y      = (220, 180,  30)
UI_DARK     = ( 30,  30,  30)
UI_MID      = ( 60,  60,  60)
UI_LIGHT    = (200, 200, 200)
SELL_BLUE   = ( 40, 100, 200)
SELL_LIGHT  = ( 80, 160, 255)
SKIN        = (255, 210, 160)
SHIRT_R     = (180,  40,  40)
SHIRT_G     = ( 50, 130,  50)
HAIR_BRN    = ( 90,  55,  20)
SUN_YEL     = (255, 230,  50)
SUN_OUT     = (255, 200,  20)
BTN_GREEN   = ( 60, 160,  60)
BTN_HOVER   = ( 80, 200,  80)
BTN_SHADOW  = ( 30,  90,  30)
OOS_COL     = (200,  60,  60)
RESTOCK_COL = (100, 220, 100)
FENCE_COL   = (180, 130,  60)
FENCE_POST  = (140,  95,  40)
WATER_BLUE  = ( 60, 140, 220)
GEAR_GREY   = (160, 160, 180)
VOID_BG     = ( 15,  10,  25)
SHADOW_PUR  = (130,  40, 200)
SHADOW_PNK  = (220,  60, 180)
RAIN_BLUE   = ( 80, 130, 200)
WET_DARK    = 0.65   # colour multiplier for Wet mutation

# ══════════════════════════════════════════════════════════════════════════════
# WORLD CONSTANTS
# ══════════════════════════════════════════════════════════════════════════════
WORLD_W      = 3200
GROUND_Y     = SH - 100
STALL_WX     = 220
SELL_WX      = 490
GEAR_WX      = 760
GARDEN_START = 1050
GARDEN_END   = 2900

RESTOCK_SECS = 300
STOCK_MAX    = {"carrot": 8, "tomato": 6, "sunflower": 4,
                "shadowpetal": 2, "voidbloom": 1}

# ══════════════════════════════════════════════════════════════════════════════
# SEED / CROP DEFINITIONS
# ══════════════════════════════════════════════════════════════════════════════
SEEDS = {
    "carrot":     {"price": 5,  "grow_time": 480,  "color": CARROT_OR,   "name": "Carrot",
                   "reusable": False, "one_pickup": False, "rare": False},
    "tomato":     {"price": 8,  "grow_time": 720,  "color": TOMATO_R,    "name": "Tomato",
                   "reusable": False, "one_pickup": False, "rare": False},
    "sunflower":  {"price": 10, "grow_time": 960,  "color": SUNFL_YEL,   "name": "Sunflower",
                   "reusable": False, "one_pickup": False, "rare": False},
    "shadowpetal":{"price": 25, "grow_time": 1200, "color": SHADOW_PUR,  "name": "ShadowPetal",
                   "reusable": False, "one_pickup": True,  "rare": True},
    "voidbloom":  {"price": 40, "grow_time": 1440, "color": (20, 20, 20),"name": "VoidBloom",
                   "reusable": True,  "one_pickup": False, "rare": True},
}
HARVEST_VALUE = {
    "carrot": 14, "tomato": 22, "sunflower": 30,
    "shadowpetal": 80, "voidbloom": 120,
}

# ══════════════════════════════════════════════════════════════════════════════
# GEAR DEFINITIONS
# ══════════════════════════════════════════════════════════════════════════════
GEARS = {
    "watering_can": {"price": 15, "name": "Watering Can",  "uses": 10,
                     "color": WATER_BLUE, "rare": False, "stackable": True},
    "reclaimer":    {"price": 60, "name": "Reclaimer",     "uses": None,
                     "color": GEAR_GREY,  "rare": True,  "stackable": False},
}

# ══════════════════════════════════════════════════════════════════════════════
# MUTATION SYSTEM
# ══════════════════════════════════════════════════════════════════════════════
MUTATIONS = {
    "Wet":        {"color_mod": WET_DARK, "desc": "Darkened by rain"},
    "Windstruck": {"color_mod": 1.0,      "desc": "Twisted by the wind"},
    "Watered":    {"color_mod": 1.0,      "desc": "Extra watered, grows faster"},
}

def mutation_label(mutations):
    if not mutations:
        return ""
    return " + ".join(mutations)

def apply_color_mutation(base_color, mutations):
    r, g, b = base_color
    for m in mutations:
        mod = MUTATIONS.get(m, {}).get("color_mod", 1.0)
        r = int(r * mod); g = int(g * mod); b = int(b * mod)
    return (max(0,min(255,r)), max(0,min(255,g)), max(0,min(255,b)))

# ══════════════════════════════════════════════════════════════════════════════
# WEATHER / EVENTS
# ══════════════════════════════════════════════════════════════════════════════
class WeatherSystem:
    def __init__(self):
        self.active     = None   # None | "rain" | "wind"
        self.timer      = 0      # frames remaining
        self.next_event = random.randint(1800, 5400)  # frames until next event
        self.raindrops  = []
        self.wind_particles = []
        self.flash_alpha = 0

    def tick(self, plants):
        self.next_event -= 1
        if self.next_event <= 0 and self.active is None:
            self.active = random.choice(["rain", "wind"])
            self.timer  = random.randint(600, 1200)
            self.next_event = random.randint(3600, 9000)
            # spawn weather particles
            if self.active == "rain":
                self.raindrops = [
                    [random.randint(-WORLD_W, WORLD_W*2),
                     random.randint(-50, SH),
                     random.uniform(2, 5)] for _ in range(120)
                ]
            elif self.active == "wind":
                self.wind_particles = [
                    [random.randint(0, SW), random.randint(0, SH),
                     random.uniform(4, 9), random.uniform(-1, 1)] for _ in range(80)
                ]

        if self.active:
            self.timer -= 1
            # chance each frame to mutate a random plant
            if plants and random.random() < 0.003:
                p = random.choice(plants)
                mut = "Wet" if self.active == "rain" else "Windstruck"
                if mut not in p["mutations"]:
                    p["mutations"].append(mut)

            if self.timer <= 0:
                self.active = None
                self.raindrops = []
                self.wind_particles = []

    def draw(self, cam_x):
        if self.active == "rain":
            # overlay tint
            ov = pygame.Surface((SW, SH), pygame.SRCALPHA)
            ov.fill((60, 100, 180, 35))
            screen.blit(ov, (0,0))
            for drop in self.raindrops:
                sx_d = int(drop[0] - cam_x)
                if -5 < sx_d < SW+5:
                    pygame.draw.line(screen, (130, 170, 230),
                                     (sx_d, int(drop[1])),
                                     (sx_d - 2, int(drop[1] + drop[2]*5)), 1)
            # animate
            for drop in self.raindrops:
                drop[1] += drop[2] * 4
                drop[0] -= 1.5
                if drop[1] > SH + 10:
                    drop[1] = random.randint(-60, 0)
                    drop[0] = random.randint(int(cam_x)-50, int(cam_x)+SW+50)

        elif self.active == "wind":
            ov = pygame.Surface((SW, SH), pygame.SRCALPHA)
            ov.fill((200, 220, 180, 18))
            screen.blit(ov, (0,0))
            for wp in self.wind_particles:
                pygame.draw.line(screen, (220, 230, 200),
                                 (int(wp[0]), int(wp[1])),
                                 (int(wp[0]-wp[2]*3), int(wp[1]+wp[3]*2)), 1)
            for wp in self.wind_particles:
                wp[0] += wp[2]
                wp[1] += wp[3]
                if wp[0] > SW + 20:
                    wp[0] = -10
                    wp[1] = random.randint(0, SH)

        # event banner
        if self.active and self.timer > self.timer + 1:
            pass
        if self.active:
            frames_shown = self.timer  # count down display at top
            label = "🌧  RAIN STORM" if self.active == "rain" else "💨  WIND STORM"
            col   = RAIN_BLUE if self.active == "rain" else (180, 200, 140)
            t = font_sm.render(label, True, col)
            screen.blit(t, (SW//2 - t.get_width()//2, 2))

weather = WeatherSystem()

# ══════════════════════════════════════════════════════════════════════════════
# INVENTORY  (slot-based, visible held item)
# ══════════════════════════════════════════════════════════════════════════════
# Each slot: {"type": "seed"|"gear"|"harvest", "id": str, "qty": int,
#             "uses": int|None}  (uses only for gear with uses)
# Held item index into inv_slots, or None
inv_slots  = []   # list of slot dicts
held_idx   = None  # index into inv_slots of currently held item

MAX_SLOTS  = 12

def inv_add(item_type, item_id, qty=1, uses=None):
    """Add to inventory. Returns True on success."""
    global held_idx
    # find existing stack (seeds & harvest stack; gear with uses stacks if stackable)
    for slot in inv_slots:
        if slot["type"] == item_type and slot["id"] == item_id:
            stackable = True
            if item_type == "gear":
                stackable = GEARS[item_id].get("stackable", False)
            if stackable:
                slot["qty"] += qty
                return True
    if len(inv_slots) >= MAX_SLOTS:
        return False
    new_uses = uses if uses is not None else (GEARS[item_id]["uses"] if item_type == "gear" else None)
    inv_slots.append({"type": item_type, "id": item_id, "qty": qty, "uses": new_uses})
    if held_idx is None:
        held_idx = len(inv_slots) - 1
    return True

def inv_remove(slot_idx, qty=1):
    """Remove qty from slot. Removes slot if empty."""
    global held_idx
    if slot_idx < 0 or slot_idx >= len(inv_slots):
        return
    slot = inv_slots[slot_idx]
    slot["qty"] -= qty
    if slot["qty"] <= 0:
        inv_slots.pop(slot_idx)
        if held_idx is not None:
            if held_idx >= len(inv_slots):
                held_idx = len(inv_slots) - 1 if inv_slots else None

def held_slot():
    if held_idx is not None and 0 <= held_idx < len(inv_slots):
        return inv_slots[held_idx]
    return None

def held_seed():
    s = held_slot()
    return s["id"] if s and s["type"] == "seed" else None

def held_gear():
    s = held_slot()
    return s["id"] if s and s["type"] == "gear" else None

def find_slot(item_type, item_id):
    for i, s in enumerate(inv_slots):
        if s["type"] == item_type and s["id"] == item_id:
            return i
    return -1

# ══════════════════════════════════════════════════════════════════════════════
# GAME STATE
# ══════════════════════════════════════════════════════════════════════════════
def make_game_state():
    return {
        "cam_x":         0.0,
        "player":        {"wx": 600, "y": GROUND_Y-55, "speed": 3,
                          "facing": 1, "walk_frame": 0, "walk_timer": 0},
        "coins":         30,
        "plants":        [],
        "message":       "",
        "message_timer": 0,
        "shop_open":     False,
        "sell_open":     False,
        "gear_open":     False,
        "shop_cursor":   0,
        "sell_cursor":   0,
        "gear_cursor":   0,
        "particles":     [],
        "keeper_tick":   0,
        "stock":         {k: STOCK_MAX[k] for k in SEEDS},
        "gear_stock":    {k: 3 for k in GEARS},
        "restock_timer": float(RESTOCK_SECS),
        "clouds":        [(random.randint(0, WORLD_W),
                           random.randint(20, 80),
                           random.uniform(0.15, 0.45)) for _ in range(14)],
    }

G = make_game_state()

# ══════════════════════════════════════════════════════════════════════════════
# SAVE / LOAD
# ══════════════════════════════════════════════════════════════════════════════
def serialise_plant(p):
    d = dict(p)
    d["color"] = list(p["color"])
    return d

def deserialise_plant(d):
    p = dict(d)
    p["color"] = tuple(d["color"])
    return p

def save_game():
    data = {
        "coins":          G["coins"],
        "plants":         [serialise_plant(p) for p in G["plants"]],
        "stock":          G["stock"],
        "gear_stock":     G["gear_stock"],
        "restock_timer":  G["restock_timer"],
        "inv_slots":      inv_slots,
        "held_idx":       held_idx,
    }
    try:
        with open(SAVE_FILE, "w") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print("Save failed:", e)

def load_game():
    global inv_slots, held_idx
    if not os.path.exists(SAVE_FILE):
        return False
    try:
        with open(SAVE_FILE) as f:
            data = json.load(f)
        G["coins"]          = data.get("coins", 30)
        G["plants"]         = [deserialise_plant(p) for p in data.get("plants", [])]
        G["stock"]          = data.get("stock",        {k: STOCK_MAX[k] for k in SEEDS})
        G["gear_stock"]     = data.get("gear_stock",   {k: 3 for k in GEARS})
        G["restock_timer"]  = data.get("restock_timer", float(RESTOCK_SECS))
        inv_slots           = data.get("inv_slots", [])
        held_idx            = data.get("held_idx", None)
        # ensure new seed keys exist in stock
        for k in SEEDS:
            if k not in G["stock"]:
                G["stock"][k] = STOCK_MAX[k]
        for k in GEARS:
            if k not in G["gear_stock"]:
                G["gear_stock"][k] = 3
        return True
    except Exception as e:
        print("Load failed:", e)
        return False

def delete_save():
    global inv_slots, held_idx
    if os.path.exists(SAVE_FILE):
        os.remove(SAVE_FILE)
    G.update(make_game_state())
    inv_slots = []
    held_idx  = None
    weather.__init__()

# ══════════════════════════════════════════════════════════════════════════════
# HELPERS
# ══════════════════════════════════════════════════════════════════════════════
def sx(world_x):
    return int(world_x - G["cam_x"])

def wx_from_screen(screen_x):
    return screen_x + G["cam_x"]

def set_msg(m):
    G["message"]       = m
    G["message_timer"] = 220

def spawn_particles(wx, y, color, n=14):
    for _ in range(n):
        G["particles"].append({
            "x": float(wx), "y": float(y),
            "vx": random.uniform(-2.5, 2.5),
            "vy": random.uniform(-4.5, -0.5),
            "life": random.randint(30, 55),
            "color": color,
        })

def nearest_plant(pwx, radius=55):
    best, best_d = None, radius
    for p in G["plants"]:
        d = abs(pwx - p["wx"])
        if d < best_d:
            best_d, best = d, p
    return best

def plant_at_world_x(wx, radius=45):
    for p in G["plants"]:
        if abs(p["wx"] - wx) < radius:
            return p
    return None

def do_restock():
    for k in SEEDS:
        G["stock"][k] = STOCK_MAX[k]
    for k in GEARS:
        G["gear_stock"][k] = 3
    G["restock_timer"] = float(RESTOCK_SECS)
    set_msg("The stalls have restocked!")
    spawn_particles(STALL_WX, GROUND_Y-70, COIN_Y, 20)

def make_plant(wx, crop_id):
    base_col = SEEDS[crop_id]["color"]
    return {
        "wx":        wx,
        "stage":     1,
        "timer":     0,
        "crop":      crop_id,
        "color":     base_col,
        "mutations": [],
        "pulse":     0.0,   # used by voidbloom / shadowpetal glow
    }

# ══════════════════════════════════════════════════════════════════════════════
# DRAW HELPERS
# ══════════════════════════════════════════════════════════════════════════════
def draw_cloud_at(x, y):
    pygame.draw.ellipse(screen, WHITE, (x-40, y-18, 80, 36))
    pygame.draw.ellipse(screen, WHITE, (x-60, y-10, 55, 28))
    pygame.draw.ellipse(screen, WHITE, (x+10, y-10, 55, 28))

def draw_sun(x, y, r=38, tick=0):
    for a in range(0, 360, 30):
        rad = math.radians(a + tick * 0.3)
        x1 = x + int(math.cos(rad) * (r + 4))
        y1 = y + int(math.sin(rad) * (r + 4))
        x2 = x + int(math.cos(rad) * (r + 16))
        y2 = y + int(math.sin(rad) * (r + 16))
        pygame.draw.line(screen, SUN_OUT, (x1,y1),(x2,y2), 3)
    pygame.draw.circle(screen, SUN_YEL, (x,y), r)
    pygame.draw.circle(screen, SUN_OUT, (x,y), r, 3)

def draw_stickperson(kx, head_y, shirt_col, hair_col, wave_off, show_lower=False):
    pygame.draw.circle(screen, SKIN,  (kx, head_y), 11)
    pygame.draw.circle(screen, BLACK, (kx, head_y), 11, 2)
    pygame.draw.arc(screen, hair_col, (kx-11, head_y-11, 22, 16), 0, math.pi, 4)
    body_bot = head_y + 34
    pygame.draw.line(screen, shirt_col, (kx, head_y+11), (kx, body_bot), 4)
    pygame.draw.line(screen, shirt_col, (kx, head_y+20), (kx+17, head_y+11+wave_off), 3)
    pygame.draw.line(screen, shirt_col, (kx, head_y+20), (kx-14, head_y+28), 3)
    if show_lower:
        pygame.draw.line(screen, BLACK, (kx, body_bot), (kx+8, body_bot+20), 3)
        pygame.draw.line(screen, BLACK, (kx, body_bot), (kx-8, body_bot+20), 3)

# ── seed bean sprite ─────────────────────────────────────────────────────────
def draw_seed_bean(surf, cx, cy, color, r=7, spiky=False):
    """Draw a bean-shaped seed at (cx,cy) on surf."""
    col  = color
    dark = tuple(max(0, c-50) for c in col)
    # bean body
    pygame.draw.ellipse(surf, col,  (cx-r, cy-int(r*0.7), r*2, int(r*1.4)))
    pygame.draw.ellipse(surf, dark, (cx-r, cy-int(r*0.7), r*2, int(r*1.4)), 2)
    # crease line
    pygame.draw.arc(surf, dark, (cx-r+2, cy-int(r*0.4), r*2-4, int(r*0.8)), 0, math.pi, 1)
    # hilite
    pygame.draw.ellipse(surf, tuple(min(255,c+70) for c in col), (cx-r//2, cy-int(r*0.5), r//2, int(r*0.4)))
    if spiky:
        # spiky shadow petal seed
        for a in range(0, 360, 60):
            rad = math.radians(a)
            ex = cx + int(math.cos(rad)*(r+4))
            ey = cy + int(math.sin(rad)*(r+4))
            pygame.draw.line(surf, (180,20,140), (cx,cy),(ex,ey), 2)

# ── gear icons ───────────────────────────────────────────────────────────────
def draw_watering_can_icon(surf, cx, cy, size=12):
    col = WATER_BLUE
    # body
    pygame.draw.rect(surf, col, (cx-size, cy-size//2, size*2, size), border_radius=3)
    # spout
    pygame.draw.line(surf, col, (cx+size, cy), (cx+size+size//2, cy-size//2), 3)
    # handle
    pygame.draw.arc(surf, col, (cx-size-8, cy-size, 12, size*2), math.pi*0.2, math.pi*0.8, 3)
    # drops
    for di in range(3):
        pygame.draw.circle(surf, (150,200,255), (cx+size+size//2+di*4, cy-size//2+di*3), 2)

def draw_reclaimer_icon(surf, cx, cy, size=12):
    col = GEAR_GREY
    # outer gear circle
    for a in range(0, 360, 45):
        rad = math.radians(a)
        tx = cx + int(math.cos(rad)*(size+4))
        ty = cy + int(math.sin(rad)*(size+4))
        pygame.draw.circle(surf, col, (tx,ty), 4)
    pygame.draw.circle(surf, col,   (cx,cy), size)
    pygame.draw.circle(surf, BLACK, (cx,cy), size//2)
    # arrow inside
    pygame.draw.arc(surf, WHITE, (cx-5,cy-5,10,10), math.pi*0.3, math.pi*1.7, 2)
    pygame.draw.polygon(surf, WHITE, [(cx+4,cy-6),(cx+8,cy-2),(cx,cy-2)])

# ══════════════════════════════════════════════════════════════════════════════
# STALL DRAW
# ══════════════════════════════════════════════════════════════════════════════
def draw_seed_stall():
    x = sx(STALL_WX)
    if x < -230 or x > SW+230: return
    pygame.draw.rect(screen, STALL_WALL, (x-55, GROUND_Y-95, 110, 95))
    pygame.draw.rect(screen, WOOD,       (x-65, GROUND_Y-50, 130, 14))
    pts = [(x-70,GROUND_Y-95),(x+70,GROUND_Y-95),(x+55,GROUND_Y-132),(x-55,GROUND_Y-132)]
    pygame.draw.polygon(screen, STALL_ROOF, pts)
    pygame.draw.rect(screen, (200,90,40), (x-55, GROUND_Y-136, 110, 8))
    for lx in [x-45, x+45]:
        pygame.draw.rect(screen, WOOD, (lx-4, GROUND_Y-36, 8, 36))
    wave = int(math.sin(G["keeper_tick"]*0.06)*5)
    draw_stickperson(x, GROUND_Y-107, SHIRT_R, HAIR_BRN, wave)
    t = font_sm.render("SEEDS", True, (100,50,10))
    screen.blit(t, (x-t.get_width()//2, GROUND_Y-128))
    # restock bar
    pct = G["restock_timer"] / RESTOCK_SECS
    bx2 = x-40; by2 = GROUND_Y-142
    pygame.draw.rect(screen, (60,40,20),   (bx2,by2,80,5), border_radius=2)
    pygame.draw.rect(screen, RESTOCK_COL if pct>0.3 else (220,180,30),
                     (bx2,by2,int(80*pct),5), border_radius=2)

def draw_sell_stall():
    x = sx(SELL_WX)
    if x < -230 or x > SW+230: return
    pygame.draw.rect(screen, SELL_BLUE,   (x-55, GROUND_Y-95, 110, 95))
    pygame.draw.rect(screen, (30,70,160), (x-65, GROUND_Y-50, 130, 14))
    pts = [(x-70,GROUND_Y-95),(x+70,GROUND_Y-95),(x+55,GROUND_Y-132),(x-55,GROUND_Y-132)]
    pygame.draw.polygon(screen, (20,60,140), pts)
    pygame.draw.rect(screen, SELL_LIGHT,  (x-55, GROUND_Y-136, 110, 8))
    for lx in [x-45, x+45]:
        pygame.draw.rect(screen, (30,70,160),(lx-4,GROUND_Y-36,8,36))
    wave = int(math.sin((G["keeper_tick"]+40)*0.05)*4)
    draw_stickperson(x, GROUND_Y-107, SHIRT_G, (40,20,10), wave)
    t = font_sm.render("SELL", True, (200,230,255))
    screen.blit(t, (x-t.get_width()//2, GROUND_Y-128))

def draw_gear_stall():
    x = sx(GEAR_WX)
    if x < -230 or x > SW+230: return
    col_wall = (80,80,110)
    col_roof = (50,50,80)
    pygame.draw.rect(screen, col_wall, (x-55, GROUND_Y-95, 110, 95))
    pygame.draw.rect(screen, (60,60,90),(x-65, GROUND_Y-50, 130, 14))
    pts = [(x-70,GROUND_Y-95),(x+70,GROUND_Y-95),(x+55,GROUND_Y-132),(x-55,GROUND_Y-132)]
    pygame.draw.polygon(screen, col_roof, pts)
    pygame.draw.rect(screen, GEAR_GREY,  (x-55, GROUND_Y-136, 110, 8))
    for lx in [x-45, x+45]:
        pygame.draw.rect(screen, (60,60,90),(lx-4,GROUND_Y-36,8,36))
    wave = int(math.sin((G["keeper_tick"]+80)*0.07)*4)
    draw_stickperson(x, GROUND_Y-107, GEAR_GREY, (30,30,60), wave)
    t = font_sm.render("GEAR", True, GEAR_GREY)
    screen.blit(t, (x-t.get_width()//2, GROUND_Y-128))

# ══════════════════════════════════════════════════════════════════════════════
# GARDEN + FENCE
# ══════════════════════════════════════════════════════════════════════════════
def draw_garden():
    gx1 = sx(GARDEN_START); gx2 = sx(GARDEN_END)
    dx1 = max(0,gx1);        dx2 = min(SW,gx2)
    if dx2 <= dx1: return
    pygame.draw.rect(screen, GARDEN_DIRT,(dx1,GROUND_Y,dx2-dx1,14))
    for rwx in range(GARDEN_START+30,GARDEN_END,55):
        rx = sx(rwx)
        if 0 < rx < SW:
            pygame.draw.line(screen,DARK_DIRT,(rx,GROUND_Y+2),(rx,GROUND_Y+12),1)

def draw_fence():
    # back fence (behind plants, draw first)
    FENCE_Y_BACK = GROUND_Y - 38
    POST_SPACING = 60
    FENCE_LEFT   = GARDEN_START - 30
    FENCE_RIGHT  = GARDEN_END   + 30

    # top rail back
    x1b = sx(FENCE_LEFT); x2b = sx(FENCE_RIGHT)
    cl1 = max(0, x1b); cl2 = min(SW, x2b)
    if cl2 > cl1:
        pygame.draw.rect(screen, FENCE_COL,(cl1, FENCE_Y_BACK,    cl2-cl1, 6), border_radius=3)
        pygame.draw.rect(screen, FENCE_COL,(cl1, FENCE_Y_BACK+14, cl2-cl1, 6), border_radius=3)

    # posts
    for pwx in range(FENCE_LEFT, FENCE_RIGHT+1, POST_SPACING):
        px = sx(pwx)
        if -20 < px < SW+20:
            pygame.draw.rect(screen, FENCE_POST,(px-5, FENCE_Y_BACK-4, 10, 50), border_radius=3)
            # post cap
            pygame.draw.polygon(screen, (200,150,70), [(px-6,FENCE_Y_BACK-4),(px+6,FENCE_Y_BACK-4),(px,FENCE_Y_BACK-12)])

    # garden sign post
    sgx = sx(GARDEN_START-70)
    if -100 < sgx < SW+100:
        pygame.draw.rect(screen, WOOD,    (sgx-4, GROUND_Y-70, 8, 70))
        pygame.draw.rect(screen, SIGN_BG, (sgx-46, GROUND_Y-92, 92, 28), border_radius=4)
        pygame.draw.rect(screen, BROWN,   (sgx-46, GROUND_Y-92, 92, 28), 2, border_radius=4)
        t = font_sm.render("MY GARDEN", True, (80,40,10))
        screen.blit(t,(sgx-t.get_width()//2, GROUND_Y-88))

# ══════════════════════════════════════════════════════════════════════════════
# PLANT DRAW (all crops)
# ══════════════════════════════════════════════════════════════════════════════
def _col(plant, base):
    return apply_color_mutation(base, plant["mutations"])

def draw_plant(plant, mouse_wx=None):
    x  = sx(plant["wx"])
    if x < -80 or x > SW+80: return
    gy = GROUND_Y
    s  = plant["stage"]
    c  = plant["crop"]
    plant["pulse"] = (plant.get("pulse",0) + 0.05) % (math.pi*2)

    # soil mound
    pygame.draw.ellipse(screen, DARK_DIRT,(x-14,gy-6,28,11))

    # progress bar
    if 1 <= s <= 3:
        pct = min(plant["timer"]/SEEDS[c]["grow_time"],1.0)
        pygame.draw.rect(screen,UI_MID,  (x-20,gy-22,40,5),border_radius=2)
        pygame.draw.rect(screen,SPROUT_C,(x-20,gy-22,int(40*pct),5),border_radius=2)

    if c == "shadowpetal":
        _draw_shadowpetal(plant, x, gy, s)
    elif c == "voidbloom":
        _draw_voidbloom(plant, x, gy, s)
    else:
        _draw_normal_plant(plant, x, gy, s, c)

    # ready sparkles
    if s == 4:
        tick = pygame.time.get_ticks()//250
        for di,dj in [(0,-1),(1,0),(0,1),(-1,0)]:
            px2 = x+di*26+(tick%2)*di*2
            py2 = gy-46+dj*13+(tick%2)*dj*2
            pygame.draw.circle(screen,COIN_Y,(px2,py2),3)

    # tooltip on hover
    if mouse_wx is not None and abs(plant["wx"] - mouse_wx) < 45:
        _draw_plant_tooltip(plant, x, gy)

def _draw_normal_plant(plant, x, gy, s, c):
    if c == "carrot":
        col_gr = _col(plant, CARROT_GR); col_or = _col(plant, CARROT_OR)
        if s == 1:
            pygame.draw.circle(screen, col_or,(x,gy-8),3)
        elif s == 2:
            pygame.draw.line(screen,col_gr,(x,gy-6),(x,gy-24),3)
            pygame.draw.ellipse(screen,col_gr,(x-6,gy-32,12,9))
        elif s >= 3:
            pygame.draw.polygon(screen,col_or,[(x,gy-8),(x-5,gy-28),(x+5,gy-28)])
            pygame.draw.line(screen,col_gr,(x,gy-6),(x,gy-36),3)
            pygame.draw.ellipse(screen,col_gr,(x-9,gy-46,18,14))
            if s==4: pygame.draw.circle(screen,COIN_Y,(x,gy-36),18,2)
    elif c == "tomato":
        col_gr = _col(plant, TOMATO_GR); col_r = _col(plant, TOMATO_R)
        if s==1:
            pygame.draw.circle(screen,col_gr,(x,gy-8),3)
        elif s==2:
            pygame.draw.line(screen,col_gr,(x,gy-6),(x,gy-28),3)
            pygame.draw.circle(screen,col_gr,(x,gy-30),5)
        elif s>=3:
            pygame.draw.line(screen,col_gr,(x,gy-6),(x,gy-44),3)
            pygame.draw.circle(screen,col_gr,(x-10,gy-36),7)
            pygame.draw.circle(screen,col_gr,(x+10,gy-36),7)
            pygame.draw.circle(screen,col_r,(x,gy-46),10)
            if s==4: pygame.draw.circle(screen,COIN_Y,(x,gy-38),20,2)
    elif c == "sunflower":
        col_gr = _col(plant, CARROT_GR); col_y = _col(plant, SUNFL_YEL)
        col_b  = _col(plant, SUNFL_BRN)
        if s==1:
            pygame.draw.circle(screen,col_y,(x,gy-8),3)
        elif s==2:
            pygame.draw.line(screen,col_gr,(x,gy-6),(x,gy-28),3)
            pygame.draw.ellipse(screen,col_gr,(x-6,gy-34,12,9))
        elif s>=3:
            pygame.draw.line(screen,col_gr,(x,gy-6),(x,gy-52),4)
            pygame.draw.circle(screen,col_b,(x,gy-57),9)
            for a in range(0,360,45):
                rad=math.radians(a)
                ex=x+int(math.cos(rad)*14); ey=(gy-57)+int(math.sin(rad)*14)
                pygame.draw.ellipse(screen,col_y,(ex-5,ey-4,10,8))
            if s==4: pygame.draw.circle(screen,COIN_Y,(x,gy-40),22,2)

def _draw_shadowpetal(plant, x, gy, s):
    col_pur = _col(plant, SHADOW_PUR)
    col_pnk = _col(plant, SHADOW_PNK)
    pulse   = plant.get("pulse",0)
    glow_r  = int(18 + math.sin(pulse)*6)

    if s == 1:
        # spiky seed bump
        pygame.draw.circle(screen, col_pur,(x,gy-8),4)
        for a in range(0,360,60):
            rad=math.radians(a)
            pygame.draw.line(screen,col_pnk,(x,gy-8),(x+int(math.cos(rad)*8),gy-8+int(math.sin(rad)*8)),1)
    elif s == 2:
        pygame.draw.line(screen,col_pur,(x,gy-6),(x,gy-26),3)
        for a in [-30,30]:
            rad=math.radians(a)
            pygame.draw.line(screen,col_pnk,(x,gy-20),(x+int(math.cos(rad)*12),gy-20+int(math.sin(rad)*12)),2)
    elif s >= 3:
        # pink pulsing glow
        glow_surf = pygame.Surface((glow_r*2+4,glow_r*2+4),pygame.SRCALPHA)
        alpha = int(60+math.sin(pulse)*30)
        pygame.draw.circle(glow_surf,(220,80,200,alpha),(glow_r+2,glow_r+2),glow_r)
        screen.blit(glow_surf,(x-glow_r-2,gy-56-glow_r-2))
        # thick tentacle stems
        offsets = [(-18,-10),(-10,-2),(0,6),(10,-2),(18,-10),(-14,0),(14,0)]
        for i,(dx,dy) in enumerate(offsets):
            ctrl = (x + dx//2 + random.randint(-2,2), gy-30)
            end  = (x+dx, gy-50+dy)
            pygame.draw.line(screen,col_pur,(x,gy-10),end,4)
        # leaves at tips
        for i,(dx,dy) in enumerate(offsets[:5]):
            lx=x+dx; ly=gy-50+dy
            pygame.draw.ellipse(screen,col_pur,(lx-8,ly-6,16,10))
            pygame.draw.ellipse(screen,col_pnk,(lx-4,ly-3,8,5))
        # central bulb
        pygame.draw.circle(screen,col_pnk,(x,gy-52),10)
        pygame.draw.circle(screen,col_pur,(x,gy-52),10,2)
        if s==4:
            pygame.draw.circle(screen,(220,60,200),(x,gy-52),16,2)

def _draw_voidbloom(plant, x, gy, s):
    col_dark = _col(plant,(15,15,25))
    pulse    = plant.get("pulse",0)
    glow_a   = int(40+math.sin(pulse)*30)

    if s==1:
        pygame.draw.circle(screen,(30,30,40),(x,gy-8),4)
        pygame.draw.circle(screen,WHITE,(x,gy-8),4,1)
    elif s==2:
        pygame.draw.line(screen,(40,40,50),(x,gy-6),(x,gy-28),3)
        pygame.draw.circle(screen,(60,60,70),(x,gy-30),6)
        pygame.draw.circle(screen,WHITE,(x,gy-30),6,1)
    elif s>=3:
        # trunk
        pygame.draw.rect(screen,(30,25,35),(x-7,gy-50,14,44),border_radius=3)
        pygame.draw.rect(screen,(60,55,65),(x-7,gy-50,14,44),2,border_radius=3)
        # coconut-shaped canopy (wide oval)
        pygame.draw.ellipse(screen,(20,15,30),(x-32,gy-100,64,55))
        pygame.draw.ellipse(screen,(50,45,60),(x-32,gy-100,64,55),2)
        # white pulse glow
        glow_surf=pygame.Surface((80,70),pygame.SRCALPHA)
        pygame.draw.ellipse(glow_surf,(255,255,255,glow_a),(0,0,80,70))
        screen.blit(glow_surf,(x-40,gy-105))
        # veins / stripes on canopy
        for i in range(-2,3):
            lx=x+i*10
            pygame.draw.line(screen,(70,65,80),(lx,gy-98),(lx,gy-52),1)
        # VoidCherries when ready
        if s==4:
            for i,ang in enumerate([30,90,150,210,270,330]):
                rad=math.radians(ang)
                cx2=x+int(math.cos(rad)*20); cy2=gy-75+int(math.sin(rad)*14)
                pygame.draw.circle(screen,(180,0,220),(cx2,cy2),5)
                pygame.draw.circle(screen,WHITE,(cx2,cy2),5,1)
            pygame.draw.circle(screen,WHITE,(x,gy-75),26,2)

def _draw_plant_tooltip(plant, x, gy):
    lines = []
    if plant["mutations"]:
        lines.append(mutation_label(plant["mutations"]))
    crop = plant["crop"]
    stage_names = ["","Seeded","Sprouting","Growing","Ready!"]
    lines.append(f"{SEEDS[crop]['name']} – {stage_names[min(plant['stage'],4)]}")
    if plant.get("stage",0)==4:
        lines.append(f"Sell: {HARVEST_VALUE[crop]} coins")

    if not lines: return
    pad=5
    line_surfs = [font_xs.render(l,True,WHITE) for l in lines]
    w = max(s.get_width() for s in line_surfs)+pad*2
    h = sum(s.get_height() for s in line_surfs)+pad*2+4*(len(line_surfs)-1)
    tx = max(2, min(x-w//2, SW-w-2))
    ty = gy-110-h
    if ty < 2: ty = gy+20
    tip_surf = pygame.Surface((w,h),pygame.SRCALPHA)
    tip_surf.fill((20,20,20,200))
    pygame.draw.rect(tip_surf,(120,120,120,200),(0,0,w,h),1,border_radius=4)
    cy2=pad
    for ls in line_surfs:
        tip_surf.blit(ls,(pad,cy2))
        cy2+=ls.get_height()+4
    screen.blit(tip_surf,(tx,ty))

# ══════════════════════════════════════════════════════════════════════════════
# PLAYER DRAW
# ══════════════════════════════════════════════════════════════════════════════
def draw_player():
    x  = sx(G["player"]["wx"])
    y  = G["player"]["y"]
    f  = G["player"]["facing"]
    wf = G["player"]["walk_frame"]
    bob    = int(math.sin(wf*0.25)*2)
    leg_sw = int(math.sin(wf*0.25)*10)
    sh = pygame.Surface((28,8),pygame.SRCALPHA)
    pygame.draw.ellipse(sh,(0,0,0,60),(0,0,28,8))
    screen.blit(sh,(x-14,GROUND_Y-2))
    pygame.draw.circle(screen,(230,195,155),(x,y+bob),10)
    pygame.draw.circle(screen,BLACK,(x,y+bob),10,2)
    body_top=y+10+bob; body_bot=body_top+26
    pygame.draw.line(screen,BLACK,(x,body_top),(x,body_bot),3)
    arm_y=body_top+8
    pygame.draw.line(screen,BLACK,(x,arm_y),(x+f*14,arm_y+10),2)
    pygame.draw.line(screen,BLACK,(x,arm_y),(x-f*12,arm_y+7),2)
    pygame.draw.line(screen,BLACK,(x,body_bot),(x+leg_sw,body_bot+22),3)
    pygame.draw.line(screen,BLACK,(x,body_bot),(x-leg_sw,body_bot+22),3)
    pygame.draw.ellipse(screen,(55,35,15),(x+leg_sw-6,body_bot+20,14,7))
    pygame.draw.ellipse(screen,(55,35,15),(x-leg_sw-6,body_bot+20,14,7))

    # draw held item above player's hand
    hs = held_slot()
    if hs:
        hx = x + f*18; hy = arm_y+10
        if hs["type"] == "seed":
            draw_seed_bean(screen, hx, hy, SEEDS[hs["id"]]["color"],
                           r=6, spiky=(hs["id"]=="shadowpetal"))
        elif hs["type"] == "gear":
            if hs["id"] == "watering_can":
                draw_watering_can_icon(screen, hx, hy, 9)
            elif hs["id"] == "reclaimer":
                draw_reclaimer_icon(screen, hx, hy, 9)

# ══════════════════════════════════════════════════════════════════════════════
# INVENTORY BAR (bottom of screen)
# ══════════════════════════════════════════════════════════════════════════════
INV_SLOT_W = 44
INV_SLOT_H = 44
INV_Y      = SH - INV_SLOT_H - 2
INV_X_START= 8

def inv_bar_rect(i):
    return pygame.Rect(INV_X_START + i*(INV_SLOT_W+3), INV_Y, INV_SLOT_W, INV_SLOT_H)

def draw_inventory_bar():
    for i in range(MAX_SLOTS):
        r = inv_bar_rect(i)
        is_held = (i == held_idx)
        bg = (50,50,60) if not is_held else (80,80,120)
        pygame.draw.rect(screen, bg,    r, border_radius=5)
        pygame.draw.rect(screen, (120,120,140) if is_held else (70,70,90), r, 2, border_radius=5)

        if i < len(inv_slots):
            slot = inv_slots[i]
            cx   = r.centerx; cy = r.centery
            if slot["type"] == "seed":
                draw_seed_bean(screen, cx, cy, SEEDS[slot["id"]]["color"],
                               r=9, spiky=(slot["id"]=="shadowpetal"))
            elif slot["type"] == "gear":
                if slot["id"] == "watering_can":
                    draw_watering_can_icon(screen, cx, cy, 11)
                elif slot["id"] == "reclaimer":
                    draw_reclaimer_icon(screen, cx, cy, 11)
            elif slot["type"] == "harvest":
                col = SEEDS[slot["id"]]["color"]
                pygame.draw.circle(screen, col, (cx,cy), 10)
                pygame.draw.circle(screen, tuple(max(0,c-40) for c in col), (cx,cy), 10, 2)

            # qty badge
            qty_txt = str(slot["qty"])
            if slot["type"]=="gear" and slot.get("uses") is not None:
                qty_txt = str(slot["uses"])
            qt = font_xs.render(qty_txt, True, WHITE)
            screen.blit(qt, (r.right-qt.get_width()-2, r.bottom-qt.get_height()-1))

            # uses bar for gear
            if slot["type"]=="gear" and slot.get("uses") is not None:
                max_u = GEARS[slot["id"]]["uses"]
                if max_u:
                    pct = slot["uses"]/max_u
                    pygame.draw.rect(screen,(40,40,40),(r.left+2,r.bottom-5,INV_SLOT_W-4,4),border_radius=2)
                    bar_col=(80,200,80) if pct>0.3 else (200,80,80)
                    pygame.draw.rect(screen,bar_col,(r.left+2,r.bottom-5,int((INV_SLOT_W-4)*pct),4),border_radius=2)

    # held-item name label
    hs = held_slot()
    if hs:
        if hs["type"]=="seed":   label = SEEDS[hs["id"]]["name"]+" Seed"
        elif hs["type"]=="gear": label = GEARS[hs["id"]]["name"]
        else:                    label = SEEDS[hs["id"]]["name"]
        lt = font_xs.render(label, True, (200,220,255))
        lx = INV_X_START + (held_idx or 0)*(INV_SLOT_W+3) + INV_SLOT_W//2 - lt.get_width()//2
        screen.blit(lt,(lx, INV_Y-14))

# ══════════════════════════════════════════════════════════════════════════════
# SHOP / SELL / GEAR OVERLAYS
# ══════════════════════════════════════════════════════════════════════════════
def _overlay_base(w,h,border_col):
    ov=pygame.Surface((SW,SH),pygame.SRCALPHA); ov.fill((0,0,0,165)); screen.blit(ov,(0,0))
    bx=SW//2-w//2; by=SH//2-h//2
    pygame.draw.rect(screen,UI_DARK,(bx,by,w,h),border_radius=12)
    pygame.draw.rect(screen,border_col,(bx,by,w,h),2,border_radius=12)
    return bx,by

def draw_shop():
    bx,by = _overlay_base(430,360,COIN_Y)
    bw,bh = 430,360
    t=font_lg.render("SEED STALL",True,COIN_Y)
    screen.blit(t,(bx+bw//2-t.get_width()//2,by+10))
    screen.blit(font_md.render(f"Coins: {G['coins']}",True,COIN_Y),(bx+18,by+46))
    for i,k in enumerate(SEEDS):
        d=SEEDS[k]; stk=G["stock"][k]
        iy=by+80+i*52; sel=(i==G["shop_cursor"]); oos=(stk==0)
        bg=(55,55,85) if sel else (35,35,52)
        if oos: bg=(60,18,18) if sel else (42,12,12)
        pygame.draw.rect(screen,bg,(bx+12,iy,bw-24,46),border_radius=7)
        if sel: pygame.draw.rect(screen,OOS_COL if oos else COIN_Y,(bx+12,iy,bw-24,46),2,border_radius=7)
        # seed icon
        draw_seed_bean(screen,bx+36,iy+23,d["color"],r=9,spiky=(k=="shadowpetal"))
        name_col=(100,100,100) if oos else (WHITE if not d["rare"] else (220,180,255))
        screen.blit(font_md.render(d["name"],True,name_col),(bx+56,iy+6))
        if d["rare"]:
            rt=font_xs.render("RARE",True,(220,180,255))
            screen.blit(rt,(bx+56+font_md.size(d["name"])[0]+6,iy+10))
        if oos:
            screen.blit(font_sm.render("OUT OF STOCK",True,OOS_COL),(bx+56,iy+28))
        else:
            screen.blit(font_xs.render(f"${d['price']}  stock:{stk}",True,UI_LIGHT),(bx+56,iy+30))
    # restock bar
    pct=G["restock_timer"]/RESTOCK_SECS
    rx=bx+18; ry=by+bh-44; rw=bw-36
    pygame.draw.rect(screen,(55,35,18),(rx,ry,rw,7),border_radius=3)
    pygame.draw.rect(screen,RESTOCK_COL,(rx,ry,int(rw*pct),7),border_radius=3)
    secs=int(G["restock_timer"]); mn=secs//60; ss=secs%60
    screen.blit(font_xs.render(f"restocks {mn}:{ss:02d}",True,(150,150,150)),(bx+bw//2-40,by+bh-30))
    screen.blit(font_xs.render("UP/DOWN  ENTER buy  ESC close",True,(120,120,120)),(bx+bw//2-font_xs.size("UP/DOWN  ENTER buy  ESC close")[0]//2,by+bh-14))

def draw_sell_menu():
    bx,by=_overlay_base(430,340,SELL_LIGHT)
    bw,bh=430,340
    t=font_lg.render("SELL CROPS",True,SELL_LIGHT)
    screen.blit(t,(bx+bw//2-t.get_width()//2,by+10))
    screen.blit(font_md.render(f"Coins: {G['coins']}",True,COIN_Y),(bx+18,by+46))
    sell_list=[(k,s) for k,s in [(s["id"],s) for s in inv_slots if s["type"]=="harvest"]]
    # deduplicate by id, merge qty
    sell_dict={}
    for s in inv_slots:
        if s["type"]=="harvest":
            sell_dict[s["id"]]=s
    sell_list=list(sell_dict.values())
    if not sell_list:
        t2=font_md.render("Nothing to sell!",True,(160,160,160))
        screen.blit(t2,(bx+bw//2-t2.get_width()//2,by+bh//2-10))
    else:
        for i,s in enumerate(sell_list):
            k=s["id"]; v=s["qty"]
            iy=by+82+i*62; sel=(i==G["sell_cursor"])
            pygame.draw.rect(screen,(22,60,102) if sel else (15,40,70),(bx+12,iy,bw-24,54),border_radius=7)
            if sel: pygame.draw.rect(screen,SELL_LIGHT,(bx+12,iy,bw-24,54),2,border_radius=7)
            col=SEEDS[k]["color"]
            pygame.draw.circle(screen,col,(bx+36,iy+27),14)
            screen.blit(font_md.render(SEEDS[k]["name"],True,WHITE),(bx+58,iy+8))
            val=HARVEST_VALUE[k]
            screen.blit(font_xs.render(f"x{v} in bag   sell one = +{val} coins",True,UI_LIGHT),(bx+58,iy+32))
    screen.blit(font_xs.render("UP/DOWN  ENTER sell one  ESC close",True,(90,130,170)),(bx+bw//2-font_xs.size("UP/DOWN  ENTER sell one  ESC close")[0]//2,by+bh-14))

def draw_gear_menu():
    bx,by=_overlay_base(430,300,GEAR_GREY)
    bw,bh=430,300
    t=font_lg.render("GEAR SHOP",True,GEAR_GREY)
    screen.blit(t,(bx+bw//2-t.get_width()//2,by+10))
    screen.blit(font_md.render(f"Coins: {G['coins']}",True,COIN_Y),(bx+18,by+46))
    for i,k in enumerate(GEARS):
        d=GEARS[k]; stk=G["gear_stock"][k]
        iy=by+82+i*72; sel=(i==G["gear_cursor"]); oos=(stk==0)
        bg=(55,55,85) if sel else (35,35,52)
        if oos: bg=(60,18,18) if sel else (42,12,12)
        pygame.draw.rect(screen,bg,(bx+12,iy,bw-24,62),border_radius=7)
        if sel: pygame.draw.rect(screen,OOS_COL if oos else GEAR_GREY,(bx+12,iy,bw-24,62),2,border_radius=7)
        if k=="watering_can": draw_watering_can_icon(screen,bx+36,iy+31,13)
        else:                 draw_reclaimer_icon(screen,bx+36,iy+31,13)
        nc=(100,100,100) if oos else (WHITE if not d["rare"] else (220,220,180))
        screen.blit(font_md.render(d["name"],True,nc),(bx+58,iy+8))
        if d["rare"]:
            rt=font_xs.render("RARE",True,(220,220,180)); screen.blit(rt,(bx+58+font_md.size(d["name"])[0]+6,iy+12))
        if oos:
            screen.blit(font_sm.render("OUT OF STOCK",True,OOS_COL),(bx+58,iy+34))
        else:
            uses_txt=f"{d['uses']} uses" if d["uses"] else "unlimited"
            screen.blit(font_xs.render(f"${d['price']}  {uses_txt}  stock:{stk}",True,UI_LIGHT),(bx+58,iy+34))
        if d.get("stackable"):
            screen.blit(font_xs.render("stackable",True,(140,200,140)),(bx+58,iy+48))
    screen.blit(font_xs.render("UP/DOWN  ENTER buy  ESC close",True,(120,120,120)),(bx+bw//2-font_xs.size("UP/DOWN  ENTER buy  ESC close")[0]//2,by+bh-14))

# ══════════════════════════════════════════════════════════════════════════════
# HUD
# ══════════════════════════════════════════════════════════════════════════════
def draw_hud():
    # coin
    pygame.draw.circle(screen,COIN_Y,(18,18),10)
    pygame.draw.circle(screen,(180,140,10),(18,18),10,2)
    screen.blit(font_md.render(str(G["coins"]),True,WHITE),(32,10))

    # restock countdown
    secs=int(G["restock_timer"]); mn=secs//60; ss2=secs%60
    any_oos=any(G["stock"][k]==0 for k in SEEDS)
    rc=OOS_COL if any_oos else (140,140,140)
    rt=font_xs.render(f"restock {mn}:{ss2:02d}",True,rc)
    screen.blit(rt,(SW-rt.get_width()-6,4))

    # message
    if G["message_timer"]>0:
        surf=font_md.render(G["message"],True,WHITE)
        bx2=SW//2-surf.get_width()//2
        bg=pygame.Surface((surf.get_width()+16,surf.get_height()+8),pygame.SRCALPHA)
        bg.fill((0,0,0,175))
        screen.blit(bg,(bx2-8,SH-INV_SLOT_H-32))
        screen.blit(surf,(bx2,SH-INV_SLOT_H-28))
        G["message_timer"]-=1

    # weather label
    if weather.active:
        lbl="RAIN STORM" if weather.active=="rain" else "WIND STORM"
        col=RAIN_BLUE if weather.active=="rain" else (180,200,140)
        wt=font_sm.render(lbl,True,col)
        screen.blit(wt,(SW//2-wt.get_width()//2,22))

# ══════════════════════════════════════════════════════════════════════════════
# MENU SCENE
# ══════════════════════════════════════════════════════════════════════════════
menu_clouds   = [(random.randint(0,SW),random.randint(20,90),random.uniform(0.2,0.5)) for _ in range(8)]
menu_tick     = 0
menu_btn_hov  = {"play":False,"delete":False}
save_exists   = os.path.exists(SAVE_FILE)
SCENE         = "menu"

def draw_menu(mouse_pos):
    screen.fill(SKY_DARK)
    pygame.draw.rect(screen,SKY,(0,SH//3,SW,SH))
    # clouds
    for cx,cy,_ in menu_clouds:
        draw_cloud_at(int(cx),int(cy))
    # sun
    draw_sun(SW-110,90,42,menu_tick)
    # ground
    pygame.draw.rect(screen,GRASS, (0,SH-110,SW,20))
    pygame.draw.rect(screen,GRASS2,(0,SH-110,SW,7))
    pygame.draw.rect(screen,DIRT,  (0,SH-90, SW,90))
    # flowers
    for fx,fy in [(80,SH-113),(220,SH-115),(450,SH-112),(660,SH-114),(810,SH-113)]:
        pygame.draw.circle(screen,(255,220,50),(fx,fy),5)
        pygame.draw.circle(screen,WHITE,(fx,fy),2)

    # title
    shadow=font_xl.render("Grow A 2D Garden!!",True,(20,80,20))
    main  =font_xl.render("Grow A 2D Garden!!",True,(30,180,60))
    tx=SW//2-main.get_width()//2
    screen.blit(shadow,(tx+3,93)); screen.blit(main,(tx,90))
    sub=font_md.render("plant  *  grow  *  harvest  *  sell",True,(180,230,180))
    screen.blit(sub,(SW//2-sub.get_width()//2,152))

    # PLAY button
    bw,bh=200,54; bx=SW//2-bw//2; by=210
    hov=(bx<=mouse_pos[0]<=bx+bw)and(by<=mouse_pos[1]<=by+bh)
    menu_btn_hov["play"]=hov
    pygame.draw.rect(screen,BTN_SHADOW,(bx+4,by+4,bw,bh),border_radius=13)
    pygame.draw.rect(screen,BTN_HOVER if hov else BTN_GREEN,(bx,by,bw,bh),border_radius=13)
    pygame.draw.rect(screen,WHITE,(bx,by,bw,bh),2,border_radius=13)
    pt=font_xl2.render("PLAY",True,WHITE)
    screen.blit(pt,(bx+bw//2-pt.get_width()//2,by+bh//2-pt.get_height()//2))

    # save status
    if save_exists:
        st=font_sm.render("Save found – PLAY to continue",True,(180,230,180))
        screen.blit(st,(SW//2-st.get_width()//2,272))
        # DELETE SAVE button
        dw,dh=180,34; dx=SW//2-dw//2; dy=300
        hov2=(dx<=mouse_pos[0]<=dx+dw)and(dy<=mouse_pos[1]<=dy+dh)
        menu_btn_hov["delete"]=hov2
        pygame.draw.rect(screen,(110,20,20) if not hov2 else (180,40,40),(dx,dy,dw,dh),border_radius=8)
        pygame.draw.rect(screen,(200,80,80),(dx,dy,dw,dh),2,border_radius=8)
        dt2=font_sm.render("DELETE SAVE",True,WHITE)
        screen.blit(dt2,(dx+dw//2-dt2.get_width()//2,dy+dh//2-dt2.get_height()//2))
    else:
        st=font_sm.render("No save – starting fresh",True,(160,190,160))
        screen.blit(st,(SW//2-st.get_width()//2,272))

    ctrl=font_xs.render("arrows/WASD move   LEFT CLICK plant/interact   E plant (keyboard)   SPACE pick up / harvest   1-9 select slot",True,(160,180,160))
    screen.blit(ctrl,(SW//2-ctrl.get_width()//2,SH-22))

# ══════════════════════════════════════════════════════════════════════════════
# INTERACTION LOGIC
# ══════════════════════════════════════════════════════════════════════════════
def try_plant_at_wx(target_wx):
    """Attempt to plant the held seed at target_wx. Returns True on success."""
    if not (GARDEN_START-30 < target_wx < GARDEN_END+30):
        set_msg("Plant in your garden!")
        return False
    existing = plant_at_world_x(target_wx, radius=40)
    if existing:
        set_msg("Too close to another plant!")
        return False
    seed_id = held_seed()
    if not seed_id:
        set_msg("Hold a seed to plant!")
        return False
    idx = find_slot("seed", seed_id)
    if idx < 0:
        return False
    inv_slots[idx]["qty"] -= 1
    if inv_slots[idx]["qty"] <= 0:
        inv_slots.pop(idx)
        global held_idx
        if held_idx is not None and held_idx >= len(inv_slots):
            held_idx = len(inv_slots)-1 if inv_slots else None
    G["plants"].append(make_plant(target_wx, seed_id))
    set_msg(f"Planted {SEEDS[seed_id]['name']}!")
    spawn_particles(target_wx, GROUND_Y-8, DARK_DIRT, 8)
    return True

def try_interact_at_wx(target_wx):
    """SPACE or E pressed – pick up ready plant or harvest."""
    pwx = G["player"]["wx"]
    # near stalls
    if abs(pwx-STALL_WX) < 100:
        G["shop_open"]=True; return
    if abs(pwx-SELL_WX) < 100:
        G["sell_open"]=True; G["sell_cursor"]=0; return
    if abs(pwx-GEAR_WX) < 100:
        G["gear_open"]=True; G["gear_cursor"]=0; return

    # watering can on plant
    gear_id = held_gear()
    if gear_id == "watering_can":
        near = plant_at_world_x(target_wx, radius=55)
        if near and 1 <= near["stage"] <= 3:
            # speed up growth
            near["timer"] += 60
            if "Watered" not in near["mutations"]:
                near["mutations"].append("Watered")
            # use one charge
            hi = find_slot("gear","watering_can")
            if hi>=0:
                inv_slots[hi]["uses"] -= 1
                if inv_slots[hi]["uses"] <= 0:
                    inv_slots.pop(hi)
                    global held_idx
                    if held_idx is not None and held_idx >= len(inv_slots):
                        held_idx = len(inv_slots)-1 if inv_slots else None
            set_msg("Watered! Plant grows faster.")
            spawn_particles(near["wx"], GROUND_Y-20, WATER_BLUE, 10)
            return

    # reclaimer on reusable plant
    if gear_id == "reclaimer":
        near = plant_at_world_x(target_wx, radius=55)
        if near and SEEDS[near["crop"]].get("reusable"):
            crop=near["crop"]
            G["plants"].remove(near)
            inv_add("seed", crop, 1)
            set_msg(f"Reclaimer: got {SEEDS[crop]['name']} seed back!")
            spawn_particles(near["wx"], GROUND_Y-30, SEEDS[crop]["color"], 16)
            return

    # pick up / harvest
    near = plant_at_world_x(target_wx, radius=55)
    if near:
        if near["stage"] == 4:
            crop = near["crop"]
            # one_pickup crops remove entirely
            if SEEDS[crop].get("one_pickup"):
                G["plants"].remove(near)
            elif SEEDS[crop].get("reusable"):
                near["stage"] = 1; near["timer"] = 0  # reset to regrow
            else:
                G["plants"].remove(near)
            inv_add("harvest", crop, 1)
            set_msg(f"Harvested {SEEDS[crop]['name']}!")
            spawn_particles(near["wx"] if near in G["plants"] else near["wx"],
                            GROUND_Y-40, SEEDS[crop]["color"], 20)
        elif 1 <= near["stage"] <= 3:
            pct=int(near["timer"]/SEEDS[near["crop"]]["grow_time"]*100)
            set_msg(f"Still growing... {pct}%")
    else:
        set_msg("Nothing here.")

def handle_shop_key(key):
    global held_idx
    if key==pygame.K_ESCAPE: G["shop_open"]=False
    elif key in (pygame.K_UP,pygame.K_w): G["shop_cursor"]=(G["shop_cursor"]-1)%len(SEEDS)
    elif key in (pygame.K_DOWN,pygame.K_s): G["shop_cursor"]=(G["shop_cursor"]+1)%len(SEEDS)
    elif key==pygame.K_RETURN:
        k=list(SEEDS.keys())[G["shop_cursor"]]
        stk=G["stock"][k]
        if stk==0:
            set_msg("Out of stock!")
        elif G["coins"]<SEEDS[k]["price"]:
            set_msg("Not enough coins!")
        else:
            G["coins"]-=SEEDS[k]["price"]; G["stock"][k]-=1
            inv_add("seed",k,1)
            set_msg(f"Bought {SEEDS[k]['name']} seed!")
            spawn_particles(STALL_WX,GROUND_Y-60,SEEDS[k]["color"])

def handle_sell_key(key):
    sell_list=[s for s in inv_slots if s["type"]=="harvest"]
    if key==pygame.K_ESCAPE: G["sell_open"]=False
    elif key in (pygame.K_UP,pygame.K_w): G["sell_cursor"]=(G["sell_cursor"]-1)%max(1,len(sell_list))
    elif key in (pygame.K_DOWN,pygame.K_s): G["sell_cursor"]=(G["sell_cursor"]+1)%max(1,len(sell_list))
    elif key==pygame.K_RETURN and sell_list:
        G["sell_cursor"]=min(G["sell_cursor"],len(sell_list)-1)
        s=sell_list[G["sell_cursor"]]
        k=s["id"]; val=HARVEST_VALUE[k]
        G["coins"]+=val
        idx=find_slot("harvest",k)
        inv_remove(idx,1)
        set_msg(f"Sold {SEEDS[k]['name']} for {val} coins!")
        spawn_particles(SELL_WX,GROUND_Y-60,SEEDS[k]["color"])

def handle_gear_key(key):
    global held_idx
    gkeys=list(GEARS.keys())
    if key==pygame.K_ESCAPE: G["gear_open"]=False
    elif key in (pygame.K_UP,pygame.K_w): G["gear_cursor"]=(G["gear_cursor"]-1)%len(GEARS)
    elif key in (pygame.K_DOWN,pygame.K_s): G["gear_cursor"]=(G["gear_cursor"]+1)%len(GEARS)
    elif key==pygame.K_RETURN:
        k=gkeys[G["gear_cursor"]]
        stk=G["gear_stock"][k]
        if stk==0: set_msg("Out of stock!")
        elif G["coins"]<GEARS[k]["price"]: set_msg("Not enough coins!")
        else:
            G["coins"]-=GEARS[k]["price"]; G["gear_stock"][k]-=1
            uses=GEARS[k]["uses"]
            ok=inv_add("gear",k,1,uses=uses)
            if not ok: set_msg("Inventory full!")
            else:
                set_msg(f"Bought {GEARS[k]['name']}!")
                spawn_particles(GEAR_WX,GROUND_Y-60,GEARS[k]["color"])

# ══════════════════════════════════════════════════════════════════════════════
# GAME TICK
# ══════════════════════════════════════════════════════════════════════════════
def game_tick(dt_sec, keys_down):
    global held_idx
    # restock
    G["restock_timer"]-=dt_sec
    if G["restock_timer"]<=0:
        do_restock()

    # movement
    any_open = G["shop_open"] or G["sell_open"] or G["gear_open"]
    if not any_open:
        moving=False
        if pygame.K_LEFT in keys_down or pygame.K_a in keys_down:
            G["player"]["wx"]-=G["player"]["speed"]; G["player"]["facing"]=-1; moving=True
        if pygame.K_RIGHT in keys_down or pygame.K_d in keys_down:
            G["player"]["wx"]+=G["player"]["speed"]; G["player"]["facing"]=1;  moving=True
        G["player"]["wx"]=max(50,min(WORLD_W-50,G["player"]["wx"]))
        if moving:
            G["player"]["walk_timer"]+=1
            if G["player"]["walk_timer"]>3:
                G["player"]["walk_frame"]+=1; G["player"]["walk_timer"]=0
        tgt=G["player"]["wx"]-SW//2
        tgt=max(0,min(WORLD_W-SW,tgt))
        G["cam_x"]+=(tgt-G["cam_x"])*0.12

    # grow plants
    for p in G["plants"]:
        if 1<=p["stage"]<=3:
            speed_mult=1.3 if "Watered" in p["mutations"] else 1.0
            p["timer"]+=speed_mult
            gt=SEEDS[p["crop"]]["grow_time"]
            if p["timer"]>=gt//3   and p["stage"]==1: p["stage"]=2
            if p["timer"]>=2*gt//3 and p["stage"]==2: p["stage"]=3
            if p["timer"]>=gt      and p["stage"]==3:
                p["stage"]=4
                set_msg(f"{SEEDS[p['crop']]['name']} is ready!")

    # particles
    for p in G["particles"]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.18; p["life"]-=1
    G["particles"][:]=[p for p in G["particles"] if p["life"]>0]

    # clouds
    for i,(cx,cy,spd) in enumerate(G["clouds"]):
        cx+=spd
        if cx>WORLD_W+100: cx=-100.0
        G["clouds"][i]=(cx,cy,spd)

    G["keeper_tick"]+=1
    weather.tick(G["plants"])

# ══════════════════════════════════════════════════════════════════════════════
# MAIN LOOP
# ══════════════════════════════════════════════════════════════════════════════
keys_down  = set()
last_time  = time.time()
G["restock_timer"] = float(RESTOCK_SECS)
# attempt load
if load_game():
    pass  # state restored

running = True
while running:
    now      = time.time()
    dt_sec   = min(now-last_time, 0.1)
    last_time= now
    clock.tick(60)
    mouse_pos = pygame.mouse.get_pos()
    mouse_wx  = wx_from_screen(mouse_pos[0]) if SCENE=="game" else 0

    for ev in pygame.event.get():
        if ev.type == pygame.QUIT:
            if SCENE=="game": save_game()
            running=False

        elif ev.type == pygame.KEYDOWN:
            keys_down.add(ev.key)
            if SCENE=="menu":
                if ev.key in (pygame.K_RETURN,pygame.K_SPACE):
                    SCENE="game"
            else:
                any_open=G["shop_open"] or G["sell_open"] or G["gear_open"]
                if any_open:
                    if G["shop_open"]:  handle_shop_key(ev.key)
                    elif G["sell_open"]: handle_sell_key(ev.key)
                    elif G["gear_open"]: handle_gear_key(ev.key)
                else:
                    # number keys 1-9 select inventory slot
                    if pygame.K_1<=ev.key<=pygame.K_9:
                        idx=ev.key-pygame.K_1
                        if idx < len(inv_slots):
                            held_idx=idx
                    # scroll wheel (handled in MOUSEWHEEL)
                    if ev.key in (pygame.K_SPACE, pygame.K_e):
                        try_interact_at_wx(G["player"]["wx"])
                    if ev.key == pygame.K_s and not (pygame.K_LCTRL in keys_down or pygame.K_RCTRL in keys_down):
                        pass  # normal s = move down, handled above
                    if ev.key == pygame.K_F5:
                        save_game(); set_msg("Game saved!")

        elif ev.type == pygame.KEYUP:
            keys_down.discard(ev.key)

        elif ev.type == pygame.MOUSEWHEEL:
            if SCENE=="game" and inv_slots:
                held_idx = ((held_idx or 0) - ev.y) % len(inv_slots)

        elif ev.type == pygame.MOUSEBUTTONDOWN:
            if ev.button==1:
                if SCENE=="menu":
                    if menu_btn_hov["play"]:
                        SCENE="game"
                    elif menu_btn_hov.get("delete") and save_exists:
                        delete_save()
                        save_exists=False
                        set_msg("Save deleted.")
                elif SCENE=="game":
                    any_open=G["shop_open"] or G["sell_open"] or G["gear_open"]
                    if not any_open:
                        # click on inventory bar?
                        clicked_inv=False
                        for i in range(min(len(inv_slots),MAX_SLOTS)):
                            if inv_bar_rect(i).collidepoint(mouse_pos):
                                held_idx=i; clicked_inv=True; break
                        if not clicked_inv:
                            # click in world
                            click_wx = wx_from_screen(mouse_pos[0])
                            if held_seed():
                                try_plant_at_wx(click_wx)
                            elif held_gear()=="watering_can" or held_gear()=="reclaimer":
                                try_interact_at_wx(click_wx)
                            else:
                                # click near stalls
                                if abs(G["player"]["wx"]-STALL_WX)<100 or abs(click_wx-STALL_WX)<80:
                                    G["shop_open"]=True
                                elif abs(G["player"]["wx"]-SELL_WX)<100 or abs(click_wx-SELL_WX)<80:
                                    G["sell_open"]=True; G["sell_cursor"]=0
                                elif abs(G["player"]["wx"]-GEAR_WX)<100 or abs(click_wx-GEAR_WX)<80:
                                    G["gear_open"]=True; G["gear_cursor"]=0

    # ── Update ────────────────────────────────────────────────────────────────
    if SCENE=="menu":
        menu_tick+=1
        for i,(cx,cy,spd) in enumerate(menu_clouds):
            cx+=spd
            if cx>SW+100: cx=-100.0
            menu_clouds[i]=(cx,cy,spd)
    else:
        game_tick(dt_sec,keys_down)

    # ── Draw ──────────────────────────────────────────────────────────────────
    if SCENE=="menu":
        draw_menu(mouse_pos)
    else:
        screen.fill(SKY)
        for cx,cy,_ in G["clouds"]:
            draw_cloud_at(sx(cx),cy)
        pygame.draw.rect(screen,GRASS, (0,GROUND_Y,   SW,18))
        pygame.draw.rect(screen,GRASS2,(0,GROUND_Y,   SW, 6))
        pygame.draw.rect(screen,DIRT,  (0,GROUND_Y+18,SW,SH-GROUND_Y-18))

        draw_garden()
        draw_fence()
        draw_seed_stall()
        draw_sell_stall()
        draw_gear_stall()

        # hover detection for tooltips
        hover_wx = wx_from_screen(mouse_pos[0])
        # draw plants (back to front by nothing, just list order)
        for p in G["plants"]:
            draw_plant(p, mouse_wx=hover_wx)

        draw_player()

        # particles
        for p in G["particles"]:
            pygame.draw.circle(screen,p["color"],(int(sx(p["x"])),int(p["y"])),4)

        weather.draw(G["cam_x"])
        draw_hud()
        draw_inventory_bar()

        if G["shop_open"]:  draw_shop()
        if G["sell_open"]:  draw_sell_menu()
        if G["gear_open"]:  draw_gear_menu()

    pygame.display.flip()

save_game()
pygame.quit()
sys.exit()
