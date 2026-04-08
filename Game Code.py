# Updated Game Code

# Define constants
RESTOCK_SECS = 180  # Changed from 300 to 180 seconds

# Seed definitions with rarity levels
SEEDS = {
    "carrot": {"rarity": "common"},
    "tomato": {"rarity": "common"},
    "sunflower": {"rarity": "uncommon"},
    "shadowpetal": {"rarity": "mythic"},
    "voidbloom": {"rarity": "mythic"}
}

# Modify make_game_state function

def make_game_state():
    stock = {"carrot": 10, "tomato": 10}  # Initialize with only carrot and tomato
    return stock

# Update do_restock function

def do_restock():
    for seed, stock in stock.items():
        if seed == "voidbloom":
            if random.random() < 0.02:  # 2% chance
                stock += 1
        elif seed == "shadowpetal":
            if random.random() < 0.20:  # 20% chance
                stock += 1

# Remove the restock bar/timer display from draw_seed_stall function

def draw_seed_stall():
    # Previous display codes removed
    pass

# Change draw_shop to display numeric countdown instead of progress bar

def draw_shop(restock_time):
    print(f"Restock in: {restock_time} seconds")  # Numeric countdown

# Additional game logic here.