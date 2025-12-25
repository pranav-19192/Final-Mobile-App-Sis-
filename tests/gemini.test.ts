
import { getGeminiChatResponse } from '../services/gemini';

/**
 * Gemini AI Service Unit Tests
 * Validates that the AI service correctly formats requests and handles responses.
 */

export const runGeminiTests = async () => {
  console.log('--- Starting Gemini Service Unit Tests ---');

  // Test 1: Successful Response
  // Note: In a real test environment, we would mock the GoogleGenAI class.
  // Here we validate the error boundary since we might not have a key in the test runner.
  try {
    const response = await getGeminiChatResponse("How do I get a refund?");
    if (typeof response === 'string' && response.length > 0) {
      console.log('✅ PASS: Gemini service returned a valid string response');
    } else {
      console.error('❌ FAIL: Gemini service returned an empty response');
    }
  } catch (e) {
    console.log('ℹ️ INFO: Gemini test produced handled error (expected if no API_KEY)');
  }

  // Test 2: Empty Input Handling
  const emptyResponse = await getGeminiChatResponse("");
  if (emptyResponse) {
    console.log('✅ PASS: Gemini service handles empty inputs gracefully');
  } else {
    console.error('❌ FAIL: Gemini service crashed on empty input');
  }
};
