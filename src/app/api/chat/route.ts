import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

// Initialize Groq client here. It runs securely on the server (Node.js).
const GROQ_CLIENT = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

// The system prompt is defined once for the server.
const systemPrompt = `You are AVA (AI Virtual Assistant), a helpful and friendly AI assistant on S Tarun's portfolio website. While your primary purpose is to help visitors learn about Tarun, you're also happy to chat about other topics!

**Your Knowledge Base (S Tarun):**
- **Profession:** Electronics and Computer Engineering graduate from VIT with 8.18 CGPA.
- **Expertise:** Machine learning, data analysis, and full-stack software development.
- **Experience:** Interned at HAL, working on avionics for LCA Tejas aircraft.
- **Skills:** Python, Java, C, R, JavaScript, HTML5, CSS3, React, Node.js, Scikit-Learn, OpenCV, MySQL, MATLAB, JIRA.
- **Projects:** ML for Environmental Monitoring, Biomedical Data Analysis, Full-Stack Web Apps, Advanced Materials Classification.
- **Location:** Bangalore, India.

**Your Personality & Approach:**
1. **Be helpful and versatile**: Answer questions about Tarun's work, but also engage with general questions, tech discussions, career advice, or casual conversation.
2. **Stay natural**: Use a friendly, conversational tone. Emojis are welcome when appropriate! 😊
3. **Maintain context**: Remember what was discussed earlier in the conversation.
4. **Be concise**: Keep responses brief (2-4 sentences) unless the user asks for more detail.
5. **When off-topic**: Feel free to answer general questions! If relevant, gently tie back to Tarun's expertise.
6. **For Tarun-specific unknowns**: If you don't know something specific about Tarun, suggest contacting him directly through the portfolio.`;


// Define the POST request handler for the API route
export async function POST(request: Request) {
    try {
        const { conversationHistory } = await request.json();

        if (!conversationHistory || conversationHistory.length === 0) {
            return NextResponse.json({ error: 'Missing conversation history' }, { status: 400 });
        }

        // Add system prompt at the beginning of the messages array
        const messagesPayload = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory
        ];

        const chatCompletion = await GROQ_CLIENT.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: messagesPayload as any, 
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 0.9,
        });

        const botText = chatCompletion.choices[0]?.message?.content;

        if (!botText) {
            throw new Error("No response content from Groq.");
        }

        return NextResponse.json({ botText }, { status: 200 });

    } catch (error: any) {
        console.error('Groq API Error in Route Handler:', error);
        
        let errorMessage = 'An internal server error occurred.';
        if (error.message.includes('API key issue')) {
             errorMessage = 'Configuration issue on the server. Please contact Tarun.';
        } else if (error.message.includes('Rate limit')) {
             errorMessage = 'The Groq service is currently busy. Please try again in a moment! 😊';
        }
        
        return NextResponse.json({ 
            error: errorMessage 
        }, { status: 500 });
    }
}