import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "../../config";

let difficulty = "hard";
let property = "weight";

let aiCards = [
    { id: 3, animalName: "Monkey" },
    { id: 4, animalName: "Horse" },
    { id: 12, animalName: "Chicken" }
];

let messages = [];
messages.push(
    {
        role: "system",
        content: `
        You are an AI playing a card game. Rules:
        - Add animal cards descending by ${JSON.stringify(property)}
        - Each turn, place one card in the correct position in the stack
        - Your opponent also adds cards
        - You can't change the order of the already placed cards
        - If you doubt the order set orderIsCorrect to false, else true
        - If correct, doubter draws 2 penalty cards
        - If incorrect, opponent draws 4 penalty cards
        - Add a message explaining your move.
        - Difficulty on a scale from 1-10, 1: baby to 10: expert ${JSON.stringify(difficulty)}.
        - Your cards: ${JSON.stringify(aiCards)}.
        `,
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
        Where should your next card go?
        - Cards on the table ${JSON.stringify(dropCards)}
        - Cards in your stack ${JSON.stringify(aiCards)}
        `);
}

export async function sendMessage(content) {
    messages.push({ role: "user", content });
    console.log("sending message:", messages);

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
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
                                "description": "index where the card should be placed at"
                            },
                            "card": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "description": "id of the card"
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "animal name"
                                    }
                                },
                                "required": ["id", "name"],
                                "additionalProperties": false
                            },
                            "message": {
                                "type": "string",
                                "description": "Commenting on your move."
                            },
                            "orderIsCorrect": {
                                "type": "boolean",
                                "description": "set this to false if you doubt the order"
                            }
                        },
                        "required": ["position", "card", "message", "orderIsCorrect"],
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