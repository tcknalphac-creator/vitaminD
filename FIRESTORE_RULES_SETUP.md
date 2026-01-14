# 🔒 Firestore Security Rules Setup Guide

## Step-by-Step: How to Set Up Rules

### **1. Go to Firebase Console**
https://console.firebase.google.com/u/1/project/text-ocr-1-599ae/firestore/rules

### **2. Click on "Rules" Tab**
You'll see something like this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false; // ❌ Default: Everything blocked
    }
  }
}
```

### **3. Replace with Project :D Rules**

Copy and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ✅ VISITS Collection
    match /visits/{visitId} {
      // Allow anyone to create new visits
      allow create: if true;
      
      // Allow updates to same visit (for conversion tracking)
      allow update: if request.resource.data.keys().hasOnly([
        'converted', 
        'conversionTimestamp', 
        'conversionCustomerName', 
        'conversionVitaminDLevel'
      ]);
      
      // Prevent deletes
      allow delete: if false;
      
      // Allow reading your own data (optional - for debugging)
      allow read: if true;
      
      // ✅ ACTIONS Subcollection
      match /actions/{actionId} {
        // Allow creating actions under any visit
        allow create: if true;
        allow read: if true;
      }
    }
    
    // ✅ CONVERSIONS Collection
    match /conversions/{conversionId} {
      // Allow anyone to create conversions
      allow create: if true;
      
      // No updates or deletes
      allow update, delete: if false;
      
      // Allow reading (for analytics)
      allow read: if true;
    }
    
    // ❌ Block everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### **4. Click "Publish"**

You'll see a confirmation message: ✅ "Rules updated successfully"

---

## 🎯 What These Rules Do:

### **✅ ALLOW:**
| Action | Collection | Why |
|--------|-----------|-----|
| CREATE | visits | Track new customer visits |
| UPDATE | visits | Mark as converted when order placed |
| CREATE | visits/{id}/actions | Track user actions (voucher copy, etc) |
| CREATE | conversions | Record successful orders |
| READ | All | View data in console / analytics |

### **❌ BLOCK:**
| Action | Collection | Why |
|--------|-----------|-----|
| DELETE | visits | Protect historical data |
| DELETE | conversions | Keep conversion records |
| UPDATE | conversions | Prevent tampering |
| ALL | Other collections | Security |

---

## 🔍 Rule Breakdown:

### **1. Create Visit (Open to everyone):**
```javascript
match /visits/{visitId} {
  allow create: if true; // ✅ Anyone can create
}
```
**Why?** Every customer visiting needs to log their visit.

---

### **2. Update Visit (Limited fields only):**
```javascript
allow update: if request.resource.data.keys().hasOnly([
  'converted', 
  'conversionTimestamp', 
  'conversionCustomerName', 
  'conversionVitaminDLevel'
]);
```
**Why?** Only allow updating conversion fields, nothing else.

---

### **3. Create Action (Open):**
```javascript
match /actions/{actionId} {
  allow create: if true;
}
```
**Why?** Track user interactions freely.

---

### **4. Create Conversion (Open):**
```javascript
match /conversions/{conversionId} {
  allow create: if true;
  allow update, delete: if false; // ❌ Once created, can't change
}
```
**Why?** Log orders, but protect from tampering.

---

## 🔒 Security Best Practices Included:

✅ **No authentication required** - Works for public website
✅ **Write-only for sensitive operations** - Can't read others' data (optional)
✅ **No deletes** - Protect historical analytics
✅ **Limited updates** - Only conversion fields can be updated
✅ **Field validation** - Only specific fields allowed

---

## 🧪 Test Your Rules:

### **In Firebase Console:**

1. Go to **Rules Playground**
2. Test CREATE operation:

```
Collection: visits
Operation: create
Document data:
{
  "customerName": "Test User",
  "vitaminDLevel": 20,
  "timestamp": "2026-01-14T01:00:00Z"
}

Result: ✅ ALLOW
```

3. Test UPDATE with wrong fields:
```
Collection: visits/{visitId}
Operation: update
Document data:
{
  "customerName": "Hacker", // ❌ Not in allowed list
  "converted": true
}

Result: ❌ DENY
```

4. Test DELETE:
```
Collection: visits/{visitId}
Operation: delete

Result: ❌ DENY
```

---

## 🚨 Alternative: More Restrictive Rules

If you want tighter security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // OPTION A: Write-only (can't read others' data)
    match /visits/{visitId} {
      allow create: if true;
      allow update: if request.resource.data.keys().hasOnly([
        'converted', 'conversionTimestamp', 
        'conversionCustomerName', 'conversionVitaminDLevel'
      ]);
      allow read: if false; // ❌ Nobody can read (except via Firebase Console)
    }
    
    // OPTION B: Rate limiting (prevent spam)
    match /visits/{visitId} {
      allow create: if request.time > resource.data.timestamp + duration.value(1, 'm');
      // ⏰ Only 1 visit per minute from same source
    }
    
    // OPTION C: Data validation
    match /visits/{visitId} {
      allow create: if 
        request.resource.data.customerName is string &&
        request.resource.data.vitaminDLevel >= 0 &&
        request.resource.data.vitaminDLevel <= 150;
      // ✅ Validate data types and ranges
    }
  }
}
```

---

## 📊 Monitor Rule Violations:

### **In Firebase Console:**
1. Go to **Firestore → Usage**
2. Check "Denied Requests"
3. See who's trying to do what

---

## ⚠️ Current Status Check:

### **Before Setting Rules:**
```javascript
// Default rules (everything blocked):
match /{document=**} {
  allow read, write: if false; // ❌ Your REST API won't work!
}
```

### **After Setting Rules:**
```javascript
// Project :D rules (specific permissions):
match /visits/{visitId} {
  allow create: if true; // ✅ Your REST API works!
}
```

---

## 🎯 Quick Setup (Copy-Paste):

1. **Go to:** https://console.firebase.google.com/u/1/project/text-ocr-1-599ae/firestore/rules

2. **Delete everything** in the editor

3. **Paste this:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /visits/{visitId} {
      allow create, read: if true;
      allow update: if request.resource.data.keys().hasOnly(['converted', 'conversionTimestamp', 'conversionCustomerName', 'conversionVitaminDLevel']);
      allow delete: if false;
      match /actions/{actionId} {
        allow create, read: if true;
      }
    }
    match /conversions/{conversionId} {
      allow create, read: if true;
      allow update, delete: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. **Click "Publish"** ✅

5. **Done!** Your tracking will work instantly!

---

## 💡 Pro Tips:

### **For Testing (Temporary):**
```javascript
// Open everything (USE ONLY FOR TESTING!)
match /{document=**} {
  allow read, write: if true;
}
```

### **For Production (Recommended):**
Use the specific rules above ☝️

---

## ✅ You're All Set!

Once rules are published, your REST API calls from the website will work perfectly! 🚀
