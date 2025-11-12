# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the ARBA membership form. The form will submit to both Formspree (for email notifications) and Google Sheets (for database storage).

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ARBA Membership Registrations" (or your preferred name)
4. In the first row, add these column headers:
   ```
   Timestamp | Full Name | Organisation | Role | Email | Country | Organisation Type | Areas of Interest | Motivation | Referral | Subscribe | Additional Notes
   ```

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any default code and paste this script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Prepare row data in the order of your columns
    const row = [
      data.timestamp || new Date().toISOString(),
      data['Full Name'] || '',
      data.Organisation || '',
      data.Role || '',
      data.Email || '',
      data.Country || '',
      data['Organisation Type'] || '',
      data['Areas of Interest'] || '',
      data.Motivation || '',
      data.Referral || '',
      data.Subscribe || '',
      data['Additional Notes'] || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾) and give your project a name like "ARBA Form Handler"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: "ARBA Membership Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows your website to submit data)
4. Click **Deploy**
5. **Copy the Web App URL** — it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
6. Click **Authorize access** and grant the necessary permissions

## Step 4: Update Your Website Configuration

1. Open `script.js` in your website files
2. Find the `CONFIG` object at the top (around line 8)
3. Replace `YOUR-GOOGLE-APPS-SCRIPT-URL` with the Web App URL you copied:

```javascript
const CONFIG = {
  formspreeMembershipId: "YOUR-FORM-ID",
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycby.../exec", // ← Paste your URL here
  formspreeContactId: "YOUR-CONTACT-FORM-ID",
};
```

## Step 5: Test the Integration

1. Submit a test registration through your website
2. Check your Google Sheet — you should see a new row with the data
3. Check your email — you should receive a Formspree notification

## Troubleshooting

- **No data in Google Sheets**: Check the browser console (F12) for errors. Make sure the Web App URL is correct and the script is deployed.
- **Permission errors**: Re-deploy the web app and ensure "Who has access" is set to "Anyone"
- **Column mismatch**: Make sure your sheet headers match the order in the script's `row` array

## Security Notes

- The Web App URL is public, but only your specific Google Sheet will receive data
- Consider adding basic validation in the Apps Script if needed
- For production, you may want to add rate limiting or authentication

## Need Help?

If you encounter issues, check:
1. Google Apps Script execution logs: **Executions** tab in Apps Script editor
2. Browser console for JavaScript errors
3. Formspree dashboard for email delivery status

