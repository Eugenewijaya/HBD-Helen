# Interactive Birthday Celebration Website 🎂

A personalized, interactive, and playful web-based birthday greeting designed to provide a memorable digital experience. Originally created as a special surprise, this project combines gamification elements, humor, and heartfelt messages in a modern, responsive single-page application.

## 🌟 Key Features

*   **Interactive Gift Opening:** A CSS-animated gift box that triggers the celebration, including background music synchronization.
*   **"Bucin" (Romance) Quiz:** A lighthearted, 3-step interactive quiz with humor-driven copywriting and custom pop-up alerts to engage the user.
*   **The "Prank" Button:** A challenge-based transition where the "Proceed" button aggressively dodges the user's cursor/tap using random translations, rotations, and vibration effects (3-tap logic).
*   **Personalized Content:** Includes dedicated sections for:
    *   Birthday greetings and custom photos.
    *   Contextual Bible verses or quotes.
    *   An interactive "Wiggling Prayer Box" that requires multiple taps to reveal a hidden message.
*   **Polaroid Gallery:** A stylish CSS-grid gallery with polaroid-style frames and tilt effects for memories.
*   **Responsive Design:** Built with Tailwind CSS, ensuring a seamless experience across mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

*   **HTML5:** Semantic structure.
*   **CSS3 (Tailwind CSS):** Modern styling and complex animations (using CDN).
*   **Vanilla JavaScript:** Core logic for the quiz, prank button physics, audio playback, and UI state management.
*   **FontAwesome:** For intuitive iconography.
*   **Google Fonts:** Custom typography ("Fredoka" & "Patrick Hand").

## 🚀 How to Use

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Eugenewijaya/HBD-Helen.git
    ```

2.  **Setup Assets:**
    *   Place your background music in `assets/bgm/` and name it `lagu_ultah.mp3`.
    *   Place your sound effects in `assets/sfx/` (`pop.mp3`, `wrong.mp3`, `tada.mp3`).
    *   Place your personalized photos in `assets/images/` (`pengirim.jpg`, `penerima.jpg`, `kenangan1.jpg`, `kenangan2.jpg`, `kenangan3.jpg`).

3.  **Run:**
    Simply open `index.html` in any modern web browser. No local server or build process is required (Static Site).

## ⚙️ Customization

You can easily adapt this repository for your own needs:

*   **Change Recipient:** Search for "Helen" in `index.html` and replace it with the desired name.
*   **Modify Tone:** The copywriting is designed to be humorous and casual. You can find these strings within the HTML `<section>` tags and JavaScript modal logic.
*   **Adjust Difficulty:** The "Prank" button behavior (speed and movement range) can be tweaked in the `moveButton()` JavaScript function in `js/main.js`.

## 📜 License

This project is open-source and available under the MIT License. Feel free to fork, modify, and use it for your own special occasions!

Created with ❤️ for special moments.
