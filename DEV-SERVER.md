# 🚀 Local Development Server

Your local development server is now running with live reload!

## 📱 Mobile Testing URLs

**Your Local IP:** `192.168.86.38`

### Access URLs:
- **Desktop:** http://localhost:8080
- **Mobile (same WiFi):** http://192.168.86.38:8080

## 📋 Mobile Testing Instructions

1. **Make sure your mobile device is on the same WiFi network**
2. **Open browser on mobile and go to:** `http://192.168.86.38:8080`
3. **Test the mobile menu:**
   - Tap the hamburger button (☰) to open menu
   - Try closing by: tapping menu links, tapping outside, etc.
4. **Test scrolling performance** on different pages
5. **Try different orientations** (portrait/landscape)

## 🛠 Server Commands

```bash
# Start development server (with live reload)
npm run dev

# Start for mobile testing (no auto-open browser)
npm run mobile

# Alternative server (if live-server has issues)
npm run serve

# Start server manually
npx live-server --port=8080 --host=0.0.0.0 --no-browser --cors
```

## 🔄 Live Reload Features

- **Automatic refresh** when you edit HTML, CSS, or JS files
- **CORS enabled** for testing
- **Mobile-friendly** - accessible from any device on your network
- **Console logging** enabled for debugging mobile menu

## 🛑 Stop Server

To stop the server:
```bash
# Find the process
ps aux | grep live-server

# Kill it (replace XXXX with process ID)
kill XXXX

# Or use pkill
pkill -f live-server
```

## 🐛 Debugging

- **Check browser console** for JavaScript logs
- **Mobile menu logs** will show: "Menu button clicked", "Mobile link clicked", etc.
- **Network tab** to check if files are loading correctly

---

**Current Status:** ✅ Server is running and ready for mobile testing!
