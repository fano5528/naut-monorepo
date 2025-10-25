#!/usr/bin/env node

/**
 * WhatsApp Token Status Checker
 * Run this script to check if your WhatsApp access token is valid
 */

require('dotenv').config();

async function checkWhatsAppToken() {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;

  console.log('🔍 WhatsApp Token Status Checker');
  console.log('================================\n');

  if (!accessToken) {
    console.error('❌ META_ACCESS_TOKEN environment variable is not set');
    console.log('\n💡 Make sure you have a .env file with:');
    console.log('META_ACCESS_TOKEN=your_token_here');
    console.log('META_PHONE_NUMBER_ID=your_phone_number_id_here');
    return;
  }

  if (!phoneNumberId) {
    console.error('❌ META_PHONE_NUMBER_ID environment variable is not set');
    return;
  }

  console.log('✅ Environment variables found');
  console.log(`📱 Phone Number ID: ${phoneNumberId}`);
  console.log(`🔑 Access Token: ${accessToken.substring(0, 20)}...`);

  // Test token by calling Graph API /me endpoint
  try {
    console.log('\n🔍 Testing access token validity...');
    
    const response = await fetch('https://graph.facebook.com/v23.0/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.status === 401) {
      const errorData = await response.text();
      console.error('❌ WhatsApp access token is invalid or expired');
      console.error('📝 Error details:', errorData);
      
      console.log('\n🔧 To fix this:');
      console.log('1. Go to https://developers.facebook.com/apps/');
      console.log('2. Navigate to your app → WhatsApp → API Setup');
      console.log('3. Generate a new access token');
      console.log('4. Update your META_ACCESS_TOKEN environment variable');
      console.log('5. Restart your application');
      return;
    }

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Access token is valid!');
      console.log('📊 Token info:', data);
      
      // Test phone number access
      console.log('\n🔍 Testing phone number access...');
      const phoneResponse = await fetch(`https://graph.facebook.com/v23.0/${phoneNumberId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (phoneResponse.ok) {
        const phoneData = await phoneResponse.json();
        console.log('✅ Phone number access is valid!');
        console.log('📞 Phone info:', phoneData);
        console.log('\n🎉 WhatsApp integration is ready to use!');
      } else {
        console.error('❌ Phone number access failed');
        console.error('📝 Status:', phoneResponse.status, phoneResponse.statusText);
      }
    } else {
      console.error('❌ Unexpected error testing token');
      console.error('📝 Status:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Error checking token:', error.message);
  }
}

checkWhatsAppToken().catch(console.error); 