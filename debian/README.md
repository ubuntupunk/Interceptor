# Debian Packaging for Interceptor

This branch contains Debian packaging files for building Interceptor as a .deb package for Ubuntu 24.04.

## Building the Package

1. Switch to the debian branch:
   ```bash
   git checkout debian
   ```

2. Build the package:
   ```bash
   cd debian
   ./build-package.sh
   ```

   Or manually:
   ```bash
   # Build binaries
   bash scripts/build.sh

   # Build Debian package
   fakeroot dpkg-buildpackage -b -us -uc -d
   ```

## Package Contents

- `interceptor` binary → `/usr/bin/interceptor`
- `interceptor-daemon` → `/usr/lib/interceptor/interceptor-daemon`
- Chrome extension → `/usr/share/interceptor/extension/`
- Native messaging config → `/usr/lib/interceptor/com.interceptor.host.json`
- Documentation → `/usr/share/doc/interceptor/`

## Installation

```bash
sudo dpkg -i interceptor_0.7.0-1_amd64.deb
```

After installation:
1. Load the extension in Chrome/Chromium from `/usr/share/interceptor/extension/`
2. Native messaging hosts are automatically configured
3. Daemon auto-starts on first use

## Development Notes

- The `daemon/com.interceptor.host.json` has been modified for Linux paths
- Post-install script sets up Chrome/Chromium native messaging automatically
- Build dependencies: `debhelper` (can be installed with `sudo apt install debhelper`)