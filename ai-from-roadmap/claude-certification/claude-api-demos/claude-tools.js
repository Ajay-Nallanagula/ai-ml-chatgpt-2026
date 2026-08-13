import dotenv from 'dotenv';
import { addDays, subHours, format, startOfToday } from 'date-fns';
import Anthropic from "@anthropic-ai/sdk";
dotenv.config();

const client = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"]
});

const test_check = () => {
    const now = new Date();
    const tomorrow = addDays(now, 1);
    const twoHoursAgo = subHours(now, 2);
    console.log('tomorrow:', tomorrow);

    // Format with timezone
    const istTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Kolkata' });
    console.log(istTime);
    console.log('Today', startOfToday());
    //console.log('Now', startOfNow());
}



//STEP 1 function creation
const getCurrentDateTime = (date_format = "dd-MM-yyyy HH:mm:ss") => {
    if (date_format === undefined || date_format === null || date_format?.length === 0) {
        throw new Error("Invalid date_format. It must be a non-empty string.");
    }
    const now = new Date();
    return format(now, date_format, { timeZone: 'Asia/Kolkata' });
}

const addDurationToDateTime = (dateTime, duration, unit, date_format = "dd-MM-yyyy HH:mm:ss") => {
    if (!dateTime || !duration || !unit) {
        throw new Error("Invalid input. dateTime, duration, and unit are required.");
    }

    let newDateTime;
    switch (unit) {
        case 'days':
            newDateTime = addDays(new Date(dateTime), duration);
            break;
        case 'hours':
            newDateTime = subHours(new Date(dateTime), -duration); // Using subHours with negative duration to add hours
            break;
        default:
            throw new Error("Invalid unit. Supported units are 'days' and 'hours'.");
    }
    return format(newDateTime, date_format, { timeZone: 'Asia/Kolkata' });
}

const setReminder = (content, timestamp) => {
    console.log(`You have set the reminder for ${timestamp}: ${content}`);
}


//Step 2, Json schema creation 
const getCurrentDateTimeSchema = {
    "name": "getCurrentDateTime",
    "description": "Retrieves the current date and time in Asia/Kolkata timezone (IST, UTC+5:30). Returns a formatted string based on the specified date-fns format pattern. Useful for timestamp generation, logging, and time-based operations in India.",
    "input_schema": {
        "type": "object",
        "properties": {
            "date_format": {
                "type": "string",
                "description": "Date format string using date-fns syntax. Common examples: 'dd-MM-yyyy HH:mm:ss' (default), 'yyyy-MM-dd', 'yyyy-MM-dd'T'HH:mm:ss' (ISO-like), 'PPP p' (long format with time), 'EEEE, MMMM d, yyyy' (weekday format). The format string must not be empty. Reference: https://date-fns.org/docs/format for complete format token documentation.",
                "default": "dd-MM-yyyy HH:mm:ss",
                "minLength": 1,
                "examples": [
                    "dd-MM-yyyy HH:mm:ss",
                    "yyyy-MM-dd",
                    "yyyy-MM-dd'T'HH:mm:ss",
                    "PPP p",
                    "EEEE, MMMM d, yyyy hh:mm a"
                ]
            }
        },
        "required": [
            "date_format"
        ]
    }
};

const addDurationToDateTimeSchema = {
    "name": "add_duration_to_datetime",
    "description": "Add or subtract a duration (in days or hours) from a given date/time and return the resulting date/time formatted as a string. Use this when the user asks to calculate a date/time offset from a known date/time — e.g. 'what date is 5 days from now', 'what time is 3 hours before this timestamp', or 'add 2 days to 2024-01-15'. Pass a negative duration to subtract instead of add. All calculations are performed in the Asia/Kolkata timezone.",
    "input_schema": {
        "type": "object",
        "properties": {
            "dateTime": {
                "type": "string",
                "description": "The starting date and time, as an ISO 8601 string or any format parseable by the JavaScript Date constructor (e.g. '2024-01-15T10:30:00' or '2024-01-15')."
            },
            "duration": {
                "type": "integer",
                "description": "The amount of time to add to dateTime, in the unit specified by 'unit'. Use a negative number to subtract time instead."
            },
            "unit": {
                "type": "string",
                "enum": ["days", "hours"],
                "description": "The unit of time that 'duration' is measured in."
            },
            "date_format": {
                "type": "string",
                "description": "The output format pattern for the resulting date/time, using date-fns format tokens (e.g. 'dd-MM-yyyy HH:mm:ss', 'yyyy-MM-dd'). Defaults to 'dd-MM-yyyy HH:mm:ss' if not specified."
            }
        },
        "required": ["dateTime", "duration", "unit"],
        "additionalProperties": false
    }
}

const setReminderSchema = {
    "name": "set_reminder",
    "description": "Create a reminder that will trigger at a specific date and time, recording what the reminder is about and when it should occur. Use this when the user asks to be reminded of something at a specific time, or after computing a target date/time (e.g. via getCurrentDateTime or add_duration_to_datetime) that the reminder should fire at. Call this only after you know both the reminder content and its exact timestamp — if the timestamp is relative ('in 2 days', 'tomorrow at 5pm'), resolve it to an absolute date/time first using the date/time tools before calling this.",
    "input_schema": {
        "type": "object",
        "properties": {
            "content": {
                "type": "string",
                "description": "The text of the reminder — what the user should be reminded about (e.g. 'Call the dentist', 'Submit the report')."
            },
            "timestamp": {
                "type": "string",
                "description": "The absolute date and time the reminder should trigger, formatted as 'dd-MM-yyyy HH:mm:ss' (the default output format of the getCurrentDateTime and add_duration_to_datetime tools) in the Asia/Kolkata timezone. Must be a fully resolved date/time, not a relative phrase."
            }
        },
        "required": ["content", "timestamp"],
        "additionalProperties": false
    }
}



// Step 3: Whenever the claude uses tools , 
// the response from claude will send you additional parts , apart from text-block ,
// it will send you tooluse-block as well as part of content

//-------


export const add_user_message = (messages, message) => {
    const messageObj = {
        role: 'user',
        content: message
    };
    messages.push(messageObj)
}

export const add_assistant_message = (messages, message) => {
    const messageObj = {
        role: 'assistant',
        content: message
    };
    messages.push(messageObj)
}

/*
    What does tool_choice mean?
    - tool_choice is an object that can be used to control how Claude uses tools in the conversation.
    - It has a "type" field that can be one of:
        - "auto": Claude decides whether to use a tool or not based on the prompt and context. This is the default behavior.
        - "any": Claude must use a tool, but it can choose any tool from the provided list.
        - "tool": Claude is restricted to using a specific tool every time. In this case, you must also provide a "name" field with the name of the tool to use.
    - Example:
        - { type: 'auto' } // Claude decides on its own
        - { type: 'any' } // Claude must use a tool, but can choose any
        - { type: 'tool', name: 'extract_return_request' } // Claude must use the extract_return_request tool

    - Scenario 
    If you want claude to respond the output in JSON , we can restrict it to use a specific tool which has input_schema defined, so that claude will return the output in valid JSON format.
    just typing "return valid json" in the prompt might not work for all cases, but tool_use + input_schema will definitely work.
*/
export const chat = async (messages, systemPrompt = '', temperature = 1.0, tools = [], tool_choice={}) => {
    try {
        console.log('\n🔄 Sending request to API...')

        let params = {
            model: 'claude-haiku-4-5',
            max_tokens: 1024,
            messages: messages,
            temperature: temperature // more temperature --> creative , less-deterministic
        }

        if (tools.length > 0) {
            params.tools = tools;
        }

        if (systemPrompt?.length > 0) {
            params.system = systemPrompt
        }

        const messageResponse = await client.messages.create(params)

        // 🔍 DEBUG: Log the entire response structure
        console.log('\n📦 Full API Response:')
        console.log(JSON.stringify(messageResponse, null, 2))

        // Extract text safely
        if (!messageResponse?.content || messageResponse?.content?.length === 0) {
            console.error('❌ No content in response!')
            return undefined
        }

        //Earlier we used to return only text bolcks hence we are returning only texts
        // const responseText = messageResponse.content[0].text
        // console.log('\n✅ Extracted text successfully')
        // console.log('Response text:', responseText)

        //Now whe we are using tools 
        // additional blocks tooluse blocks also will be returned as part of tools usage
        // Hence return entire messages 
        return messageResponse

    } catch (error) {
        console.error('\n❌ Error in chat function:')
        console.error('Error type:', error.constructor.name)
        console.error('Error message:', error.message)
        console.error('Status:', error.status)
        console.error('Full error:', error)
        throw error
    }
}


const text_from_messages = (message) => {
    const textBlocks = message.content.filter(block => block.type === 'text');
    return textBlocks.map(block => block.text).join('\n');
}

const run_tool = (toolRequestBlock, toolInput) => {
    const tool_name = toolRequestBlock.name;
    switch (tool_name) {
        case 'getCurrentDateTime':
            return getCurrentDateTime(toolInput);
        case 'add_duration_to_datetime': {
            // console.log('Running add_duration_to_datetime >>>>>>>>>>>>:', JSON.stringify(toolRequestBlock));
            return addDurationToDateTime(toolRequestBlock.input.dateTime, toolRequestBlock.input.duration, toolRequestBlock.input.unit, toolRequestBlock.input.date_format);
        }

        case 'set_reminder':
            console.log('Running set_reminder >>>>>>>>>>>>:', JSON.stringify(toolRequestBlock));
            return setReminder(toolRequestBlock.input.content, toolRequestBlock.input.timestamp);
        default:
            throw new Error(`Unknown tool: ${tool_name}`);
    }
}

const run_tools = (response) => {
    const toolRequestBlocks = response.content.filter(block => block.type === 'tool_use');
    if (toolRequestBlocks.length === 0) {
        console.log('No tool use blocks found in the message.');
        return;
    }

    let toolResultsBlocks = []
    toolRequestBlocks.forEach((toolRequestBlock, index) => {
        let toolResultBlock = {}
        try {
            const tool_output = run_tool(toolRequestBlock, toolRequestBlock.input.date_format)
            toolResultBlock = {
                type: 'tool_result',
                //Important step , assign the same tool_id to response , reciecevd from tool_use_request
                tool_use_id: toolRequestBlock.id, 
                content: JSON.stringify({ tool_output }),
                is_error: false,
            }

        } catch (error) {
            toolResultBlock = {
                type: 'tool_result',
                tool_use_id: toolRequestBlock.id,
                content: JSON.stringify({ error: error.message }),
                is_error: true,
                //isRetryable:true/false
                //errorCategory: classifies the error 
            }
        }
        toolResultsBlocks.push(toolResultBlock)

    });
    return toolResultsBlocks;
}

const run_conversation = async (messages) => {

    while (true) {
        const tools= [
            getCurrentDateTimeSchema,
            addDurationToDateTimeSchema,
            setReminderSchema
        ];
        const response = await chat(messages, '', 0.4, [
            ...tools
        ]);

        add_assistant_message(messages, response.content);
        console.log('\n🤖 Assistant Response:\n', text_from_messages(response));

        if (response.stop_reason !== 'tool_use') {
            break;
        }

        const toolResults = run_tools(response)
        add_user_message(messages, toolResults);
    }

    return messages;
}

async function main() {
    const messages = []
    add_user_message(messages, "Set me a reminder for cricket world cup final match, which is after 39 days from Jan 1st 2027.");
    const results = await run_conversation(messages);
    console.log('\n✅ Final Conversation Results:\n', JSON.stringify(results, null, 2));
}

main();
