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
        - Your cards are ${JSON.stringify(aiCards)}. You can only use cards assigned to you
        Please note that the cards don't contain the weight because you need to guess it. Your guesses should be ${difficulty} accurate.
        Only if there is more than one card on the table take a look at their weights, they should be in an order where higher weights are placed at a lower index and if they are not, you should doubt the order by setting 'orderIsCorrect' to false and you do not need to make a move.
        In any other case choose one of your cards and put it on the table. (specify a position and card you want to place)
        Cards with more weight should be plcaed towards at a lower index and cards with less weight should be placed at a higher index of the table array.
        Please explain your decission making process in the 'message' field.
        `
    }
)

/**
 * clears all but the initial system message
 */
export function clearMessageQueue() {
    messages = [messages[0]];
}

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