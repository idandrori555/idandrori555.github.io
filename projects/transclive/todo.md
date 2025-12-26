### User Experience & Interface
1.  **Non-Blocking Modals:** Replace the browser's default `confirm()` popups (used for deleting lessons and clearing transcripts) with custom, styled modals for a more seamless and professional user experience.
2.  **Saving Indicator:** Add a subtle "Saving..." / "Saved" status indicator in the session view. Since the app saves on every input, this would give users confidence that their work is being preserved automatically.
3.  **Advanced Folder Management:**
    *   Implement the ability to **rename and delete** folders.
    *   Allow moving a lesson to a different folder directly from within the session view.
4.  **Interactive Empty State:** Make the "No lessons here" message on the home screen more engaging by including a large, clear "Create Your First Lesson" button as a primary call to-action.
5.  **Clearer AI Model Selection:** When in the session view, display which AI model ("Fast" or "Smart") is currently active, so the user doesn't have to go back to settings to check before summarizing.

### New Functionality
6.  **Search:** Add a search bar on the home screen to find lessons by title or by words within their transcripts. This would be critical as the number of lessons grows.
7.  **Export & Import Data:** Implement a feature to export all lessons, folders, and settings into a single JSON file for backup. An import function would allow users to restore their data on a new device or browser.
8.  **Audio Playback:** The app currently discards the audio after transcription. A major enhancement would be to save the audio recording and sync its playback with the generated transcript text.
9.  **Web Share API:** Add a "Share" button to the session view that uses the native Web Share API to easily send the summary text to other apps (e.g., email, messages, social media).
10. **Custom Prompts:** Allow advanced users to write their own `systemInstruction` prompts in settings to customize the format and content of the AI-generated summary.

### Technical & Code Quality
11. **API Key Security:** For better security, migrate the AI API calls to a simple backend proxy. This would keep the Gemini API key on a secure server instead of in the user's browser `localStorage`, which is not ideal for sensitive keys.
12. **Refactor State Management:** The app's state (lessons, folders, etc.) is managed by global variables. Refactoring this into a more organized state management pattern would make the code cleaner, more robust, and easier to maintain.
13. **Component-Based Structure:** While keeping it as a single file is simple, the code could be logically organized into sections that mimic components (e.g., `HomeView`, `SessionView`, `LessonCard`), with dedicated functions for rendering and handling events for each. This would improve readability and separation of concerns.
