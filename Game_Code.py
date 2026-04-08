# Game_Code.py

class Item:
    def __init__(self, name, rarity, initial_stock):
        self.name = name
        self.rarity = rarity
        self.stock = initial_stock

class Shop:
    def __init__(self):
        # Initial stock for Carrot and Tomato
        self.items = {
            'Carrot': Item('Carrot', 'Common', 10),
            'Tomato': Item('Tomato', 'Common', 10),
            'ShadowPetal': Item('ShadowPetal', 'Rare', 0),
            'VoidBloom': Item('VoidBloom', 'Legendary', 0)
        }
        self.restock_time = 180  # 3 minutes in seconds
        self.restock_chances = {
            'ShadowPetal': 0.2,  # 20% chance
            'VoidBloom': 0.02    # 2% chance
        }

    def restock_items(self):
        import random
        for item_name, item in self.items.items():
            if item_name in self.restock_chances:
                if random.random() < self.restock_chances[item_name]:
                    item.stock += 1

    def display_items(self):
        for item_name, item in self.items.items():
            print(f'{item_name}: {item.stock}')  # Display current stock

    def restock_timer(self):
        pass  # Removed timer display

# Example usage of the Shop class
shop = Shop()
# Simulating restocking after some time
shop.restock_items()
shop.display_items()