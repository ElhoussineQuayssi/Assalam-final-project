#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables. Please set in .env.local:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Admin data to add
const admins = [
  {
    email: 'superadmin@assalam.org',
    password: 'SuperAdmin123!',
    name: 'Super Administrator',
    role: 'super_admin'
  },
  {
    email: 'contentmanager@assalam.org',
    password: 'Content123!',
    name: 'Content Manager',
    role: 'content_manager'
  },
  {
    email: 'messagesmanager@assalam.org',
    password: 'Messages123!',
    name: 'Messages Manager',
    role: 'message_manager'
  }
];

async function addAdmins() {
  console.log('Adding admin users to Supabase...');

  const fs = await import('fs');
  const path = await import('path');
  let adminInfo = 'ADMIN ACCOUNTS CREATED\n======================\n\n';

  try {
    for (const admin of admins) {
      // Hash the password using bcryptjs
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(admin.password, 12);

      const { data, error } = await supabase
        .from('admins')
        .insert({
          email: admin.email,
          password: hashedPassword,
          name: admin.name,
          role: admin.role,
          last_password_change: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error(`Error creating admin ${admin.email}:`, error);
      } else {
        console.log(`✅ Created admin: ${admin.email}`);

        // Add to info file
        adminInfo += `Email: ${admin.email}\n`;
        adminInfo += `Password: ${admin.password}\n`;
        adminInfo += `Name: ${admin.name}\n`;
        adminInfo += `Role: ${admin.role}\n`;
        adminInfo += `Created: ${new Date().toISOString()}\n`;
        adminInfo += '---\n\n';
      }
    }

    // Write admin info to file
    const infoFilePath = path.join(process.cwd(), 'admin-accounts.txt');
    fs.writeFileSync(infoFilePath, adminInfo);

    console.log('\n🎉 Admin accounts created successfully!');
    console.log(`📄 Admin credentials saved to: ${infoFilePath}`);

  } catch (error) {
    console.error('Failed to create admin accounts:', error);
  }
}

// Run the script
addAdmins().catch(console.error);