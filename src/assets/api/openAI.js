import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "../../config";

let difficulty = "dad";

let aiCards = [
    { id: 3, animalName: "Monkey" },
    { id: 4, animalName: "Horse" },
    { id: 12, animalName: "Chicken" }
];

let messages = [];
messages.push(
    {
        role: "system",
        content: `You are an AI playing a card game. Here are the rules:
        - There are cards with animals on them, each with properties like weight, height, and speed.
        - Cards are arranged in a specific order based on one property (e.g., weight).
        - Each turn, a player or AI places one card into the correct position within the stack.
        - If someone doubts that the order is correct, they can call "check order".
          - If the order is correct, the doubter draws 2 penalty cards.
          - If the order is incorrect, their opponent draws 4 penalty cards.
        - You should also tell a message about your move.
        - You play as an AI opponent and can play at different difficulty levels:
          - Baby: Makes random or simple decisions.
          - Dad: Makes moderately informed decisions.
          - Grandpa: Makes strategic and advanced decisions.
        - Today you are playing as a ${JSON.stringify(difficulty)}!
        - You have the following cards in your card stack to play with: ${JSON.stringify(aiCards)}`,
    }
)

const openai = new OpenAI({
    apiKey: OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export function testApi() {
    let dropCards = [
        [
            { id: 2, animalName: "Tiger" }
        ]
    ];

    sendMessage(`
        The player made made a move. Where should your next card go?
        - The order of the already dropped cards is ${JSON.stringify(dropCards)}
        - The cards available to you to play with are ${JSON.stringify(aiCards)}
        `);
}

export async function sendMessage(content) {
    messages.push({ role: "user", content });
    console.log("sending message:", messages);

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "animals_schema",
                    strict: true,
                    schema: {
                        "type": "object",
                        "properties": {
                            "position": {
                                "type": "integer",
                                "description": "The index in the array where the card should be placed."
                            },
                            "card": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "description": "The unique identifier of the card."
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "The name of the animal on the card (e.g., 'Penguin')."
                                    }
                                },
                                "required": ["id", "name"],
                                "additionalProperties": false
                            },
                            "message": {
                                "type": "string",
                                "description": "A custom message commenting on the move."
                            }
                        },
                        "required": ["position", "card", "message"],
                        "additionalProperties": false
                    },
                },
            },
        });

        const data = response.choices[0].message;
        if (data.content) {
            messages.push({ role: "assistant", content: data.content });
            console.log("received message:", messages);
            return data.content;
        } else {
            console.error("Error: No content in response");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function aiMove() {
    const userMessage = `The current stack has an [Elephant, Lion]. Your cards are [Cheetah, Giraffe]. Place your card.`;

    const aiResponse = await sendMessage(userMessage);
    console.log("AI Response:", aiResponse);
}