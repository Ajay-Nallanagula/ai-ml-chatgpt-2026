import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import readline from 'readline';
dotenv.config();

const client = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"]
});

export const add_user_message = (messages, text) => {
    messages.push({
        role: 'user',
        content: text
    })
}

export const add_assistant_message = (messages, text) => {
    messages.push({
        role: 'assistant',
        content: text
    })
}

const getUserInput = (prompt) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

export const chat = async (messages, systemPrompt = '', temperature = 1.0) => {
    try {
        console.log('\n🔄 Sending request to API...')

        let params = {
            model: 'claude-haiku-4-5',
            max_tokens: 1024,
            messages: messages,
            temperature: temperature // more temperature --> creative , less-deterministic
        }
        if (systemPrompt?.length > 0) {
            params.system = systemPrompt
        }

        const message = await client.messages.create(params)

        // 🔍 DEBUG: Log the entire response structure
        console.log('\n📦 Full API Response:')
        console.log(JSON.stringify(message, null, 2))

        console.log('\n📍 message.content:', message.content)
        console.log('📍 message.content[0]:', message.content[0])
        console.log('📍 message.content[0].type:', message.content[0]?.type)
        console.log('📍 message.content[0].text:', message.content[0]?.text)

        // Extract text safely
        if (!message.content || message.content.length === 0) {
            console.error('❌ No content in response!')
            return undefined
        }

        const responseText = message.content[0].text
        console.log('\n✅ Extracted text successfully')
        console.log('Response text:', responseText)

        return responseText

    } catch (error) {
        console.error('\n❌ Error in chat function:')
        console.error('Error type:', error.constructor.name)
        console.error('Error message:', error.message)
        console.error('Status:', error.status)
        console.error('Full error:', error)
        throw error
    }
}

async function main_multi_messages() {
    const messages = []

    console.log('=== Starting multi-message conversation ===\n')

    add_user_message(messages, 'What is quantum computing? Answer in a sentence.')
    console.log('Sent message 1')

    const response1 = await chat(messages)
    console.log('\n💾 response1 variable:', response1)
    console.log('Is response1 undefined?', response1 === undefined)

    if (response1) {
        add_assistant_message(messages, response1)
    } else {
        console.error('⚠️  response1 is undefined, skipping add_assistant_message')
    }

    add_user_message(messages, 'Add another sentence.')
    console.log('Sent message 2')

    const response2 = await chat(messages)
    console.log('\n💾 response2 variable:', response2)
    console.log('Is response2 undefined?', response2 === undefined)

    if (response2) {
        add_assistant_message(messages, response2)
    }

    console.log('\n📋 Final conversation history:', JSON.stringify(messages, null, 2))
}

async function main_math_tutor(systemPrompt, temperature = 0.2) {
    const messages = []
    while (true) {
        const userQuestion = await getUserInput('\nAsk a math question (or type "exit"): ')
        if (userQuestion === 'exit') {
            console.log('Exiting the math tutor. Goodbye!')
            return;
        }
        add_user_message(messages, userQuestion)
        const response1 = await chat(messages, systemPrompt, temperature)

        if (response1) {
            console.log('\n🎓 Tutor:', response1)
            add_assistant_message(messages, response1)
        } else {
            console.error('⚠️ No response from tutor')
        }
    }
}

const systemPrompt = `You are a patient and helpful math tutor. 
                      You will have to help students understand and solve math problems
                      by giving them hints rather than directly giving the solution.`;

// Run this one to see the debug output

/*await main_math_tutor(systemPrompt, 0.2)*/

// Or use this for interactive mode
// await main_math_tutor(systemPrompt)