# Email Setup Instructions

This app uses [Resend](https://resend.com) to send shoot summary emails.

## Setup Steps

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)

### 2. Verify Your Domain (Optional but Recommended)
1. In Resend dashboard, go to **Domains**
2. Add `323media.io` domain
3. Add the DNS records they provide to your domain registrar
4. Wait for verification (usually a few minutes)

**OR** use Resend's test domain for now:
- From: `onboarding@resend.dev`
- This works immediately but emails may go to spam

### 3. Get Your API Key
1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it "Media Shoot Tracker"
4. Copy the API key (starts with `re_`)

### 4. Add API Key to Your App
1. Create a file named `.env.local` in the project root
2. Add this line:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Save the file
4. Restart your dev server (`npm run dev`)

### 5. Update the "From" Email (if using custom domain)
If you verified `323media.io`, update the API route:

File: `app/api/send-summary/route.ts`

Change:
```typescript
from: 'Media Shoot Tracker <shoots@323media.io>',
```

To use your verified domain email.

## Testing

1. Complete a shoot
2. On the summary page, click **"Email Summary to nick@323media.io"**
3. Check your inbox at nick@323media.io
4. If using test domain, check spam folder

## Email Content

The email includes:
- Property address
- Photographer name
- Tier
- Date completed
- Room statistics (completed, expected, actual, variance)
- Global notes
- Skipped rooms
- Detailed room-by-room breakdown

## Troubleshooting

**Email not sending?**
- Check that `.env.local` exists and has the correct API key
- Restart your dev server after adding the API key
- Check browser console for errors
- Verify API key is valid in Resend dashboard

**Emails going to spam?**
- Verify your domain in Resend
- Use a verified domain email as the "from" address
- Test domain emails often go to spam

## Cost

- **Free tier**: 100 emails/day, 3,000/month
- **Pro tier**: $20/month for 50,000 emails/month

For typical usage (1-5 shoots/day), free tier is plenty!

