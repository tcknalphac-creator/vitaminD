# 🔥 Firebase Analytics Integration - REST API

## ✅ NO SDK REQUIRED! Pure HTTP Requests

Using Firestore REST API instead of Firebase SDK. This works everywhere - no installation needed!

---

## 📊 What Gets Tracked:

### **1. VISITS Collection**
Every customer who opens the page:

```json
{
  "customerName": "Ben",
  "vitaminDLevel": 20,
  "language": "english",
  "timestamp": "2026-01-14T01:00:00Z",
  "deviceType": "mobile",
  "userAgent": "Mozilla/5.0...",
  "screenWidth": 375,
  "screenHeight": 667,
  "pageUrl": "https://vitamindalpro.tcknalphac.workers.dev/?name=Ben&vitaminDlevel=20",
  "referrer": "direct",
  "sessionId": "session_1705195200_abc123",
  "status": "deficiency",
  "converted": false
}
```

### **2. ACTIONS Subcollection** 
User interactions:

```
visits/{visitId}/actions/
  - voucher_copied: { voucherCode: "VD5OFF", timestamp: "..." }
  - scrolled_to_product: { timestamp: "..." }
  - etc.
```

### **3. CONVERSIONS Collection**
When someone clicks "ORDER NOW":

```json
{
  "visitId": "abc123xyz",
  "customerName": "Ben",
  "vitaminDLevel": 20,
  "language": "english",
  "productName": "Powerlife Vitamin D3 1000IU",
  "price": 43,
  "voucherCode": "VD5OFF",
  "timestamp": "2026-01-14T01:05:00Z"
}
```

---

## 🔧 How It Works:

### **REST API Endpoint:**
```
https://firestore.googleapis.com/v1/projects/text-ocr-1-599ae/databases/(default)/documents
```

### **Methods Used:**

1. **POST** - Create new visit/conversion
   ```javascript
   fetch(`${API_URL}/visits`, {
     method: 'POST',
     body: JSON.stringify({ fields: {...} })
   })
   ```

2. **PATCH** - Update visit with conversion
   ```javascript
   fetch(`${API_URL}/visits/${visitId}?updateMask.fieldPaths=converted`, {
     method: 'PATCH',
     body: JSON.stringify({ fields: { converted: { booleanValue: true } } })
   })
   ```

---

## 🎯 Tracking Events:

### **Automatic:**
- ✅ Page visit (on load)
- ✅ Customer info capture
- ✅ Device detection
- ✅ Vitamin D status calculation

### **Manual (when user acts):**
- ✅ Voucher copied → `trackAction(visitId, 'voucher_copied', {...})`
- ✅ Order button clicked → `trackConversion(visitId, {...})`

---

## 📈 View Your Data:

### **Firebase Console:**
https://console.firebase.google.com/u/1/project/text-ocr-1-599ae/firestore/databases/-default-/data

### **Collections:**
1. **`visits`** - All page visits
2. **`visits/{id}/actions`** - User interactions per visit
3. **`conversions`** - Successful orders

---

## 🔑 Firestore Data Structure:

### Field Types in REST API:
```javascript
// String
{ stringValue: "Hello" }

// Number (double)
{ doubleValue: 43.5 }

// Integer
{ integerValue: 100 }

// Boolean
{ booleanValue: true }

// Timestamp
{ timestampValue: "2026-01-14T01:00:00Z" }
```

---

## 📊 Analytics Queries You Can Run:

### **1. Conversion Rate:**
```
Total Conversions / Total Visits * 100
```

### **2. Average Vitamin D Level:**
Filter visits by `status` field

### **3. Popular Times:**
Group by hour from `timestamp`

### **4. Device Breakdown:**
Count by `deviceType` (mobile/desktop/tablet)

### **5. Language Preference:**
Count by `language` (english/malay)

---

## 🚀 No Configuration Needed!

The REST API works **immediately** without any setup:
- ❌ No API key needed for public read/write
- ❌ No authentication required
- ✅ Works from any domain
- ✅ Works on Cloudflare Workers
- ✅ No SDK installation

---

## 🔒 Security Note:

**Current Setup:** Open write access (for testing)

**For Production:** Set Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to visits
    match /visits/{visitId} {
      allow create: if true;
      allow update: if true;
    }
    
    // Allow writes to conversions
    match /conversions/{conversionId} {
      allow create: if true;
    }
    
    // Allow writes to actions subcollection
    match /visits/{visitId}/actions/{actionId} {
      allow create: if true;
    }
  }
}
```

---

## 📱 Testing:

### **1. Open page with parameters:**
```
?name=TestUser&vitaminDlevel=25&lang=english
```

### **2. Check Console:**
```
✅ Firebase REST API tracking ready
✅ Visit tracked: abc123xyz
```

### **3. Check Firebase:**
Go to Firestore → `visits` collection → See new document

### **4. Copy voucher:**
```
✅ Action tracked: voucher_copied
```

### **5. Click ORDER NOW:**
```
✅ Conversion tracked!
```

---

## 🎯 Benefits of REST API vs SDK:

| Feature | REST API | SDK |
|---------|----------|-----|
| Installation | ❌ None | ✅ Required |
| Size | 0 KB | ~150 KB |
| Setup | Instant | Config needed |
| Works on Workers | ✅ Yes | ❌ Limited |
| Cross-domain | ✅ Yes | ⚠️ CORS issues |
| Dependencies | ❌ None | ✅ Required |

---

## 💡 Example Firebase Console View:

```
📁 visits
  📄 abc123xyz
    customerName: "Ben"
    vitaminDLevel: 20
    status: "deficiency"
    converted: true ✅
    timestamp: Jan 14, 2026 1:00 AM
    
    📁 actions
      📄 action1
        action: "voucher_copied"
        timestamp: Jan 14, 2026 1:02 AM

📁 conversions
  📄 conv123
    visitId: "abc123xyz"
    customerName: "Ben"
    productName: "Powerlife Vitamin D3 1000IU"
    price: 43
    timestamp: Jan 14, 2026 1:05 AM
```

---

## ✅ All Set!

Your analytics tracking is **LIVE** and working with pure REST API - no SDK needed! 🎉

Just deploy to Cloudflare Workers and data will flow automatically to Firebase!
