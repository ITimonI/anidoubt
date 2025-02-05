# **Anidoubt**

This project is a Svelte-based card game where a player and an AI or another player opponent arrange animal cards in descending order based on weight. The AI opponent is powered by OpenAI's GPT-4o model and follows game rules to evaluate the card stack, make moves, or doubt the stack's order.

---

## **Features**
- **Dynamic Gameplay**:
  - Players and the AI take turns placing cards in descending order based on a chosen property.
  - The AI evaluates the stack's correctness before making its move.
- **Penalty System**:
  - If a player or AI doubts the stack incorrectly, penalty cards are drawn.
  - Correct doubts penalize the opponent.
- **Drag-and-Drop Interaction**:
  - Uses `svelte-dnd-action` for intuitive drag-and-drop functionality.

---

## **Setup Instructions**

### Prerequisites
1. Node.js (v16 or higher)
2. An OpenAI API key (if you want to use the AI features)

### Installation
1. Clone the repository:
2. Run `npm install`
3. create a config.js file in the src directory containing
`export const OPEN_AI_API_KEY = "your-api-key";`
Please note that this is highly risky and you should never share this file as your api-key could be stolen!
4. Insert the animal images into /public/images/quartet-images
5. Run `npm run dev`

## **How to Play**

### against an AI

0. Click the AI-checkbox next to player 2
1. At the start of the game, players are dealt a set of cards with animals.
2. The goal is to arrange cards in descending order based on weight.
3. On each turn:
- The player places a card into the stack using drag-and-drop.
- The AI evaluates the current stack and decides whether to place a card or doubt its correctness.
4. If the AI or player doubts incorrectly, penalty cards are drawn:
- Correct doubt: Opponent draws 4 cards.
- Incorrect doubt: Doubter draws 2 cards.

### against another Player

1. Leave the checkbox unchecked
2. One player gets to play with the cards in the top and the player the cards in the bottom bar

## **Known Issues**
- The AI may occasionally overthink simple scenarios at higher difficulty levels due to ambiguous instructions.
- Unfortunately the AI integration isn't working reliably yet and may run into errors form time to time