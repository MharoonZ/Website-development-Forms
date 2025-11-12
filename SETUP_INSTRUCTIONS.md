# ARBA Website Setup Instructions

## Quick Start

### 1. Formspree Setup (Both Forms)

#### Membership Form (Formspree + Google Sheets)
1. Go to [Formspree.io](https://formspree.io) and create an account
2. Create a new form
3. Copy the form ID (it will look like `abc123xyz`)
4. Open `script.js` and replace `YOUR-FORM-ID` with your Formspree form ID

#### Contact Form (Formspree Only)
1. Create a second form in Formspree
2. Copy the form ID
3. Open `script.js` and replace `YOUR-CONTACT-FORM-ID` with your contact form ID

### 2. Google Sheets Setup (Membership Form Only)

Follow the detailed instructions in `GOOGLE_SHEETS_SETUP.md` to:
- Create a Google Sheet
- Set up Google Apps Script
- Deploy as a web app
- Add the URL to `script.js`

### 3. Final Configuration

In `script.js`, update the `CONFIG` object:

```javascript
const CONFIG = {
  formspreeMembershipId: "your-actual-formspree-id",      // ← Replace this
  googleSheetsUrl: "https://script.google.com/.../exec",   // ← Replace this
  formspreeContactId: "your-actual-contact-formspree-id", // ← Replace this
};
```

### 4. Test Everything

1. Test the membership form — should send email AND save to Google Sheets
2. Test the contact form — should send email only
3. Check your email inbox for Formspree notifications
4. Check your Google Sheet for new rows

## File Structure

```
ARBA/
├── index.html              # Main website page
├── styles.css              # All styling
├── script.js               # Form handling & animations
├── assets/                 # Place PDF 1-pager here
│   └── ARBA-1Pager.pdf
├── GOOGLE_SHEETS_SETUP.md  # Detailed Google Sheets guide
└── SETUP_INSTRUCTIONS.md   # This file
```

## Deployment

1. Upload all files to your web hosting (for `arba-alliance.org`)
2. Ensure HTTPS is enabled (required for Formspree)
3. Test forms in production
4. Update the 1-pager PDF link if needed

## Support

- Formspree: [formspree.io/help](https://formspree.io/help)
- Google Apps Script: [developers.google.com/apps-script](https://developers.google.com/apps-script)
- Contact: info@biotara.earth

