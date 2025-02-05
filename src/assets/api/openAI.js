import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "../../config";

let difficulty = "very";
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
        - Cards must be arranged in descending order by weight.
        - The weight of each card is not provided. You need to guess it.
        - The goal is to get rid of all your cards.
        - Each turn consists of two steps:
        1. Evaluate if the current stack is in descending order by ${JSON.stringify(property)}:
            - Consider only the current stack when evaluating its order.
            - If there’s only one card in the stack, it is always in descending order.
            - If the order is incorrect, set "orderIsCorrect" to false and explain why.
            - If the order is correct, set "orderIsCorrect" to true.
        2. Make your move:
            - If "orderIsCorrect" is true, you must place one of your cards into the correct position in the stack.
            - Placing a card in its correct position will not violate descending order.
            - Add a message explaining your move and why you chose that card.
            - You cannot skip your turn if "orderIsCorrect" is true.
            - If "orderIsCorrect" is false, you may skip your move and explain why you are skipping.
        `
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
            model: "gpt-4o",
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
                                "type": ["integer", "null"],
                                "description": "Index where the card should be placed (null if order is incorrect)"
                            },
                            "card": {
                                "type": ["object", "null"],
                                "properties": {
                                    "id": { "type": "integer", "description": "ID of the card" },
                                    "name": { "type": "string", "description": "Animal name" }
                                },
                                "required": ["id", "name"],
                                "additionalProperties": false
                            },
                            "message": {
                                "type": "string",
                                "description": "Commenting on your move or why you doubted"
                            },
                            "orderIsCorrect": {
                                "type": "boolean",
                                "description": "'false' if stack violates descending weight order"
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