// Game Code
// Adds rarity system and modifies stock/restock mechanics

// Define SEEDS with rarity
const SEEDS = {
    Carrot: { rarity: 'Common' },
    Tomato: { rarity: 'Common' },
    Coconut: { rarity: 'Uncommon' },
    ShadowPetal: { rarity: 'Mythic' },
    VoidBloom: { rarity: 'Mythic' }
};

// Change RESTOCK_SECS
const RESTOCK_SECS = 180; // Changed from 300 to 180 seconds

// Initial stock logic in make_game_state
function make_game_state() {
    return {
        stock: [SEEDS.Carrot, SEEDS.Tomato] // Only Carrot and Tomato in initial stock
    };
}

// Loading game state
function load_game(state) {
    // Implement loading logic including initial stock
}

// Modify do_restock function
function do_restock() {
    // Add restock logic
    const restockChanceVoidBloom = 0.02; // 2%
    const restockChanceShadowPetal = 0.20; // 20%
    // Logic for restocking seeds
}

// Remove timer display from draw_seed_stall
function draw_seed_stall() {
    // Timer display logic removed
}

// Convert draw_shop to show numeric countdown instead of a progress bar
function draw_shop() {
    // Change progress bar display to numeric countdown
    const countdown = RESTOCK_SECS; // Example logic
    // Display countdown
}