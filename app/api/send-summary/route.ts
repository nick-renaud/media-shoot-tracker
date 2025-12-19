import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shoot, totals } = body;

    // Format the email content
    const emailContent = `
SHOOT SUMMARY
=============

Property: ${shoot.address || 'No address provided'}
Photographer: ${shoot.photographer}
Tier: ${shoot.tierDisplayName}
Date: ${new Date(shoot.completedAt).toLocaleDateString()}

STATISTICS
----------
Rooms Completed: ${totals.completedCount} / ${totals.totalCount}
Expected Shots: ${totals.expectedTotal}
Actual Shots: ${totals.actualTotal}
Variance: ${totals.variance > 0 ? '+' : ''}${totals.variance}

${shoot.globalNotes ? `NOTES
-----
${shoot.globalNotes}

` : ''}${shoot.rooms.filter((r: any) => r.skipped).length > 0 ? `SKIPPED ROOMS
-------------
${shoot.rooms.filter((r: any) => r.skipped).map((r: any) => `• ${r.name}${r.notes ? ` - ${r.notes}` : ''}`).join('\n')}

` : ''}ROOM DETAILS
------------
${shoot.rooms.filter((r: any) => !r.skipped).map((r: any) => 
  `${r.name}: ${r.actualShots || 0} / ${r.expectedShots} shots${r.notes ? ` (${r.notes})` : ''}`
).join('\n')}

---
Sent from Media Shoot Tracker
    `.trim();

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Media Shoot Tracker <shoots@323media.io>',
        to: ['nick@323media.io'],
        subject: `Shoot Complete: ${shoot.tierDisplayName}${shoot.address ? ` - ${shoot.address}` : ''}`,
        text: emailContent,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

