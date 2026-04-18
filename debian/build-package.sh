#!/bin/bash
# Build Debian package for Interceptor
set -e

echo "Building Debian package for Interceptor..."

# Ensure we're on the debian branch
if [[ "$(git branch --show-current)" != "debian" ]]; then
    echo "ERROR: Must be on debian branch to build package"
    echo "Run: git checkout debian"
    exit 1
fi

# Build the binaries
echo "Building Interceptor binaries..."
bash scripts/build.sh

# Build the Debian package
echo "Building Debian package..."
fakeroot dpkg-buildpackage -b -us -uc -d

echo "Package built successfully!"
echo "Files created:"
ls -la ../interceptor_*.deb 2>/dev/null || echo "No .deb files found in parent directory"