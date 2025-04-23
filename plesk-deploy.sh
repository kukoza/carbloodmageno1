#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build

# Create a production build
npm run build

# Create a .htaccess file for Plesk
echo "RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]" > .htaccess

# Create a web.config file for Plesk
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name=\"Next.js Routes\" stopProcessing=\"true\">
                    <match url=\".*\" />
                    <conditions logicalGrouping=\"MatchAll\">
                        <add input=\"{REQUEST_FILENAME}\" matchType=\"IsFile\" negate=\"true\" />
                        <add input=\"{REQUEST_FILENAME}\" matchType=\"IsDirectory\" negate=\"true\" />
                    </conditions>
                    <action type=\"Rewrite\" url=\"/\" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>" > web.config 