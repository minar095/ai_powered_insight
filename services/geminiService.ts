
import { GoogleGenAI, Type } from "@google/genai";
import { DoctorProfile, ClinicalInsight } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MOCK_DOCTORS_DATABASE = `[
      { "id": 1, "name": "Dr. Emily Carter", "specialty": "Cardiology", "location": "New York, NY", "bio": "Specializes in heart-related conditions and preventative care." },
      { "id": 2, "name": "Dr. Ben Adams", "specialty": "Dermatology", "location": "New York, NY", "bio": "Expert in skin conditions, from acne to skin cancer." },
      { "id": 3, "name": "Dr. Sarah Chen", "specialty": "Pediatrics", "location": "Brooklyn, NY", "bio": "Compassionate care for infants, children, and adolescents." },
      { "id": 4, "name": "Dr. Michael Roth", "specialty": "Orthopedics", "location": "New York, NY", "bio": "Focuses on bone, joint, and muscle injuries." },
      { "id": 5, "name": "Dr. Jessica Miller", "specialty": "Gastroenterology", "location": "Queens, NY", "bio": "Treats digestive system disorders." },
      { "id": 6, "name": "Dr. David Lee", "specialty": "Neurology", "location": "New York, NY", "bio": "Specializes in disorders of the brain and nervous system." },
      { "id": 7, "name": "Dr. Olivia White", "specialty": "General Practice", "location": "New York, NY", "bio": "Provides comprehensive primary care for all ages." },
      { "id": 8, "name": "Dr. Daniel Garcia", "specialty": "Psychiatry", "location": "Bronx, NY", "bio": "Expert in mental health and well-being." }
    ]`;

export const findDoctors = async (symptoms: string, location: string, preferences: string): Promise<DoctorProfile[]> => {
    const prompt = `
        You are an expert AI medical assistant responsible for matching patients with the right doctors.
        Based on the following list of available fictional doctors:
        ${MOCK_DOCTORS_DATABASE}

        Analyze the patient's query below and return a ranked list of the top 3 most suitable doctors.

        Patient Query:
        - Symptoms: "${symptoms}"
        - Location: "${location}"
        - Preferences: "${preferences}"

        For each recommended doctor, provide a brief, one-sentence explanation for why they are a good match.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        specialty: { type: Type.STRING },
                        location: { type: Type.STRING },
                        reasonForMatch: { type: Type.STRING, description: "A one-sentence explanation for the match." },
                    },
                    required: ["name", "specialty", "location", "reasonForMatch"]
                }
            }
        }
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
};

export const generateClinicalInsights = async (consultationNotes: string): Promise<ClinicalInsight> => {
    const prompt = `
        You are an advanced AI clinical assistant. Your task is to analyze the following doctor's consultation notes and generate a structured clinical insight report.
        The report should include a concise summary, a list of potential differential diagnoses, a list of suggested tests, and recommended next steps for the patient.

        Consultation Notes:
        ---
        ${consultationNotes}
        ---

        Provide the output in the specified JSON format.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING, description: "A concise summary of the consultation." },
                    differentialDiagnoses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of potential diagnoses." },
                    suggestedests: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of suggested tests." },
                    nextSteps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of recommended next steps." }
                },
                required: ["summary", "differentialDiagnoses", "suggestedests", "nextSteps"]
            }
        }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
};
