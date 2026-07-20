import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

// Client is lazily initialized to avoid build-time errors when the env var isn't set.
let groqClient: Groq | null = null;

function getGroqClient() {
  if (!groqClient) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
}

// The system prompt is defined once for the server.
const systemPrompt = `You are AVA (AI Virtual Assistant), a helpful and friendly AI assistant on Tarun Sathyanarayanan's portfolio website. While your primary purpose is to help visitors learn about Tarun, you're also happy to chat about other topics!

**Your Knowledge Base (Tarun Sathyanarayanan):**
- **Current Status:** Data Science Master's student at the University of Basel (Feb 2026 – Present), focusing on natural sciences, mathematics, and statistics.
- **Education:** B.Tech in Electronics & Computer Engineering from VIT (Jul 2021 – May 2025), CGPA 8.18/10. Coursework: Machine Learning, Computer Vision, Signal Processing, Data Structures, Algorithms, Embedded Systems.
- **Location:** Basel, Switzerland (previously Bangalore, India).
- **Experience:** Technical Intern at Hindustan Aeronautics Limited (HAL), India (Aug–Sept 2023). Gained exposure to aerospace systems and engineering processes in a high-tech manufacturing environment.
- **Skills:**
  - Programming: Python, Java, JavaScript, HTML, R, R Markdown
  - Libraries & Frameworks: Scikit-learn, Pandas, NumPy, Streamlit, U-Net
  - Developer Tools: Git, GitHub, Jupyter, VS Code
  - Languages: English (C1), German (A1)
- **Key Projects:**
  1. Autonomous Prospect Search Agent (Jan 2026) — An autonomous software agent to discover B2B companies and contacts within the USA using ICP filtering.
  2. Formula 1 Prediction Model (Dec 2025) — Predictive modeling tool for F1 race results using Python and historical data analysis.
  3. Job Search Automation Tool / Jobhunt (Sept–Nov 2025) — Programmatic solution to automate job hunting and applications.
  4. Microplastics Detection Using Machine Learning (Mar–Jul 2024) — ML models for predicting microplastic contamination in soil.
  5. Hyperspectral U-Net Metal Classifier (Jan–Dec 2024) — U-Net CNN for hyperspectral image segmentation with 85%+ accuracy and a Streamlit interface.
- **Contact:** Email: tarun.sathya23@gmail.com, Phone: +41 779904139
- **Socials:** GitHub: tarun-ss, LinkedIn: Tarun S

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

        const chatCompletion = await getGroqClient().chat.completions.create({
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