import dotenv from "dotenv";
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const client = new Anthropic({
    apiKey: process.env.ShopAssistAPIKey,
});

const model = "claude-sonnet-4-6"

const add_user_message = (messages, text) => {
    messages.push({
        role: 'user',
        content: text
    })
}

const add_assistant_message = (messages, text) => {
    messages.push({
        role: 'assistant',
        content: text
    })
}

const chat = async (messages, systemPrompt = '') => {
    let params = {
        model: model,
        max_tokens: 300,
        messages: messages,
        stop_sequences: ["<END>"]
    }

    if (systemPrompt?.length > 0) {
        params['system'] = systemPrompt
    }

    const response = await client.messages.create({...params});
    console.log("Response from API:", response.stop_sequence, response.stop_reason);
    return response.content[0].text;
}

async function main(messages = [], systemPrompt = '') {
    // let messages = [];
    add_user_message(messages, "A Customer wants to return a product. Write a short response to the customer, explaining the return process and any necessary steps they need to take.");
    let response = await chat(messages);

    add_assistant_message(messages, response);
   /* add_user_message(messages, "My order number is abcd#123456");
    response = await chat(messages);
    add_assistant_message(messages, response);*/
    console.log("Final conversation:", messages);
    
}

const messages = [];
const systemPrompt = `
1) You are a helpful customer support assistant for an e-commerce platform called ShopAssist AI.
2) Your task is to assist customers with their inquiries, provide information about products, and guide them through processes such as returns, refunds, and order tracking.
3) You should always respond in a polite and professional manner, ensuring that the customer feels valued and understood.
4) When providing information, be concise and clear, avoiding unnecessary jargon or technical terms.
5) If you do not know the answer to a customer's question, politely inform them that you will escalate their inquiry to a human representative for further assistance.
6) Always prioritize the customer's satisfaction and aim to resolve their issues efficiently.
7) Remember to maintain a friendly and approachable tone throughout the conversation.
`;

main(messages, systemPrompt);