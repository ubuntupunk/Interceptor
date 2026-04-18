#!/bin/bash
# Manual release script for Linux Debian packages
# Run this to build and prepare releases when GitHub Actions isn't available

set -e

echo "🛠️  Building Linux Release..."

# Get version from git tag or argument
if [ -n "$1" ]; then
    VERSION="$1"
elif git describe --tags --exact-match >/dev/null 2>&1; then
    VERSION=$(git describe --tags --exact-match)
else
    VERSION="0.7.1"
fi

echo "📦 Building version: $VERSION"

# Build the binaries
echo "🔨 Building Interceptor binaries..."
bash scripts/build.sh

# Create package structure
echo "📁 Creating Debian package structure..."
mkdir -p pkg-debian/DEBIAN pkg-debian/usr/bin pkg-debian/usr/share/interceptor/extension pkg-debian/usr/share/doc/interceptor pkg-debian/usr/lib/interceptor

# Copy files
echo "📋 Copying files..."
cp dist/interceptor pkg-debian/usr/bin/
cp daemon/interceptor-daemon pkg-debian/usr/bin/interceptor-daemon
cp -r extension/dist/* pkg-debian/usr/share/interceptor/extension/
cp README.md CHANGELOG.md CLAUDE.md pkg-debian/usr/share/doc/interceptor/ 2>/dev/null || true
cp daemon/com.interceptor.host.json pkg-debian/usr/lib/interceptor/

# Create control file
echo "📝 Creating control file..."
cat > pkg-debian/DEBIAN/control << EOF
Package: interceptor
Version: $VERSION-1
Section: utils
Priority: optional
Architecture: amd64
Maintainer: Hacker Valley Media <support@hacker-valley-media.com>
Description: Browser control CLI for AI agents
 Interceptor is a browser tool that gives AI agents direct control over web browsers
 without using CDP or other detection-prone protocols. It provides structured access
 to DOM elements, network traffic capture, and workflow automation capabilities.
Depends: libc6 (>= 2.34), libgcc-s1, libstdc++6
EOF

# Create postinst script
echo "📜 Creating postinst script..."
cat > pkg-debian/DEBIAN/postinst << EOF
#!/bin/sh
set -e

#DEBHELPER#

# Set up native messaging host for Chrome/Chromium
HOST_FILE="/usr/lib/interceptor/com.interceptor.host.json"
if [ -f "\$HOST_FILE" ]; then
    mkdir -p /etc/chromium/native-messaging-hosts
    ln -sf "\$HOST_FILE" /etc/chromium/native-messaging-hosts/com.interceptor.host.json
    mkdir -p /etc/opt/chrome/native-messaging-hosts
    ln -sf "\$HOST_FILE" /etc/opt/chrome/native-messaging-hosts/com.interceptor.host.json
fi

mkdir -p /var/run/interceptor
chmod 755 /var/run/interceptor

echo "Interceptor $VERSION installed successfully!"
echo ""
echo "To get started:"
echo "1. Load the extension from /usr/share/interceptor/extension/ in Chrome/Chromium"
echo "2. Run: interceptor open 'https://example.com'"
EOF

chmod +x pkg-debian/DEBIAN/postinst

# Build package
echo "🏗️  Building Debian package..."
echo "" >> pkg-debian/DEBIAN/control
dpkg-deb --build pkg-debian "interceptor_$VERSION-1_amd64.deb"

echo "✅ Release built successfully!"
echo "📦 Package: interceptor_$VERSION-1_amd64.deb"
echo "📊 Size: $(ls -lh "interceptor_$VERSION-1_amd64.deb" | awk '{print $5}')"
echo ""
echo "To create a GitHub release:"
echo "gh release create v$VERSION-linux --title \"Interceptor v$VERSION - Linux Optimized Release\" --generate-notes"
echo "gh release upload v$VERSION-linux interceptor_$VERSION-1_amd64.deb"