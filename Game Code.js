// Game Code Updates

// Update RESTOCK_SECS
const RESTOCK_SECS = 180;

// Rarity system added to SEEDS
const SEEDS = {
    CARROT: { rarity: 'common' },
    TOMATO: { rarity: 'common' },
    SUNFLOWER: { rarity: 'uncommon' },
    SHADOWPETAL: { rarity: 'mythic' },
    VOIDBLOOM: { rarity: 'mythic' }
};

// Initialize stock in make_game_state
function make_game_state() {
    return {
        stock: [SEEDS.CARROT, SEEDS.TOMATO],
        // Other game state properties
    };
}

// Update do_restock function
function do_restock() {
    const restockItems = [];
    const chance = Math.random();
    if (chance < 0.2) { // 20% chance for shadowpetal
        restockItems.push(SEEDS.SHADOWPETAL);
    }
    if (chance < 0.02) { // 2% chance for voidbloom
        restockItems.push(SEEDS.VOIDBLOOM);
    }
    // Continue with restocking other items as needed
}

// Remove timer bar from draw_seed_stall function
function draw_seed_stall() {
    // Original drawing code
    // Removed timer bar implementation
}

// Change draw_shop to display numeric MM:SS countdown
function draw_shop(countdown) {
    const minutes = String(Math.floor(countdown / 60)).padStart(2, '0');
    const seconds = String(countdown % 60).padStart(2, '0');
    // Display countdown as MM:SS
    console.log(`Time remaining: ${minutes}:${seconds}`);
}