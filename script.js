// Vitamin D Recommendation System - Sales Conversion Focused
// Following consultation script: Reveal → Normalize + Urgency → Present Solution
// Multi-language support: English & Bahasa Melayu

let cart = [];

// Translation dictionary
const translations = {
    malay: {
        hello: 'Hai',
        testResults: 'Keputusan Ujian Project :D',
        yourLevel: 'Tahap Vitamin D Anda',
        status: {
            severe: 'SANGAT RENDAH',
            deficiency: 'KEKURANGAN',
            insufficient: 'TIDAK MENCUKUPI',
            sufficient: 'MENCUKUPI',
            optimal: 'OPTIMUM'
        },
        emoji: {
            severe: '🚨 Kritikal',
            deficiency: '🔴 Perlu Tindakan',
            insufficient: '⚠️ Di Bawah Optimum',
            sufficient: '😊 Boleh Diperbaiki',
            optimal: '🎉 Cemerlang!'
        },
        ifYouDont: 'Jika Anda Tidak Mengambil Tindakan Sekarang:',
        fatigue: 'Keletihan Berterusan Akan Bertambah Teruk',
        fatigueDesc: 'Anda akan rasa lebih penat setiap hari, tidak kira berapa lama anda tidur',
        bones: 'Risiko Patah Tulang & Osteoporosis',
        bonesDesc: 'Tulang anda menjadi lemah dan rapuh dari masa ke masa',
        immunity: 'Sistem Imun Terus Melemah',
        immunityDesc: 'Mudah sakit, lambat sembuh',
        depression: 'Kemurungan & Keresahan Mungkin Berkembang',
        depressionDesc: 'Risiko kemurungan 5× lebih tinggi dengan Vitamin D rendah',
        pain: 'Sakit Badan & Kelemahan Otot Kronik',
        painDesc: 'Aktiviti harian menjadi lebih susah dan menyakitkan',
        timeWaiting: 'Setiap Hari Anda Tunggu, Lebih Susah Untuk Pulih',
        timeDesc: 'Badan anda sedang kehabisan rizab Vitamin D sekarang. Semakin lama anda tunggu, semakin teruk simptom dan semakin lama masa untuk rasa normal semula.',
        dontLetWorse: 'Jangan Biarkan Ia Bertambah Teruk!',
        fixNow: '⚠️ BAIKI SEKARANG - RM 43',
        getBeforeWorse: '⬇️ Dapatkan suplemen sebelum simptom bertambah teruk',
        crisis: 'Ini Adalah Krisis Kesihatan Yang Serius',
        crisisDesc: 'Lihat apa yang berlaku kepada rakyat Malaysia dengan Vitamin D rendah',
        deficientStat: 'Rakyat Malaysia Kekurangan',
        epidemicDesc: 'Anda adalah sebahagian daripada wabak senyap!',
        fatigueStat: 'Dengan Keletihan Ada Vitamin D Rendah',
        tiredDesc: 'Perasaan penat itu tidak normal!',
        depressionStat: 'Risiko Kemurungan Lebih Tinggi',
        moodDesc: 'Mood anda terjejas!',
        shopNow: 'Beli Sekarang',
        limitedOffer: '🔥 TAWARAN TERHAD',
        getSupp: 'Dapatkan Suplemen Anda Sekarang',
        projectPrice: 'Harga Istimewa Project :D',
        wasPrice: 'Harga Asal RM 62',
        youSave: 'Anda Jimat RM 19!',
        yourVoucher: '🎟️ KOD BAUCAR ANDA:',
        extraDisc: '💰 Diskaun tambahan RM 5 sudah termasuk!',
        whatYouGet: '✨ Apa Yang Anda Dapat:',
        capsules: '60 kapsul (2 bulan)',
        per1000: '1000 IU setiap kapsul',
        easySwallow: 'Mudah ditelan',
        fastDeliv: 'Penghantaran pantas',
        orderNow: 'PESAN SEKARANG - RM 43',
        clickOrder: '💬 Klik untuk pesan via WhatsApp',
        limitedAlert: 'Stok Terhad!',
        limitedDesc: 'Harga istimewa Project :D tersedia selagi stok masih ada. Pesan sekarang untuk pastikan bekalan anda.',
        stayHealthy: 'Jaga Kesihatan',
        footer: 'Semak Vitamin D, Hidup Lebih Cergas',
        contact: 'Hubungi Kami',
        about: 'Tentang Project :D'
    },
    english: {
        hello: 'Hello',
        testResults: 'Project :D Test Results',
        yourLevel: 'Your Vitamin D Level',
        status: {
            severe: 'SEVERELY DEFICIENT',
            deficiency: 'DEFICIENT',
            insufficient: 'INSUFFICIENT',
            sufficient: 'SUFFICIENT',
            optimal: 'OPTIMAL'
        },
        emoji: {
            severe: '🚨 Critical',
            deficiency: '🔴 Action Needed',
            insufficient: '⚠️ Below Optimal',
            sufficient: '😊 Room to Improve',
            optimal: '🎉 Excellent!'
        },
        ifYouDont: 'If You Don\'t Take Action Now:',
        fatigue: 'Constant Fatigue Will Get Worse',
        fatigueDesc: 'You\'ll feel more tired every day, no matter how much you sleep',
        bones: 'Risk of Bone Fractures & Osteoporosis',
        bonesDesc: 'Your bones become weak and brittle over time',
        immunity: 'Immune System Keeps Weakening',
        immunityDesc: 'Get sick more often, take longer to recover',
        depression: 'Depression & Anxiety May Develop',
        depressionDesc: '5× higher risk of depression with low Vitamin D',
        pain: 'Chronic Body Pain & Muscle Weakness',
        painDesc: 'Daily activities become harder and more painful',
        timeWaiting: 'Every Day You Wait, It Gets Harder to Recover',
        timeDesc: 'Your body is depleting Vitamin D reserves right now. The longer you wait, the more severe your symptoms become and the longer it takes to feel normal again.',
        dontLetWorse: 'Don\'t Let It Get Worse!',
        fixNow: '⚠️ FIX IT NOW - RM 43',
        getBeforeWorse: '⬇️ Get your supplement before symptoms worsen',
        crisis: 'This Is A Serious Health Crisis',
        crisisDesc: 'Look at what\'s happening to Malaysians with low Vitamin D',
        deficientStat: 'Malaysians Are Deficient',
        epidemicDesc: 'You\'re part of a silent epidemic!',
        fatigueStat: 'With Fatigue Have Low Vitamin D',
        tiredDesc: 'That tired feeling isn\'t normal!',
        depressionStat: 'Higher Depression Risk',
        moodDesc: 'Your mood is suffering!',
        shopNow: 'Shop Now',
        limitedOffer: '🔥 LIMITED TIME OFFER',
        getSupp: 'Get Your Supplement Now',
        projectPrice: 'Special Project :D Pricing',
        wasPrice: 'Was RM 62',
        youSave: 'You Save RM 19!',
        yourVoucher: '🎟️ YOUR VOUCHER CODE:',
        extraDisc: '💰 Extra RM 5 discount already included!',
        whatYouGet: '✨ What You Get:',
        capsules: '60 capsules (2 months)',
        per1000: '1000 IU per capsule',
        easySwallow: 'Easy to swallow',
        fastDeliv: 'Fast delivery',
        orderNow: 'ORDER NOW - RM 43',
        clickOrder: '💬 Click to order via WhatsApp',
        limitedAlert: 'Limited Stock Alert!',
        limitedDesc: 'Special Project :D pricing available while stocks last. Order now to secure your supply.',
        stayHealthy: 'Stay Healthy',
        footer: 'Check Vitamin D, Live Brighter',
        contact: 'Contact Us',
        about: 'About Project :D'
    }
};

// Get current language from URL or default to English
function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    return (lang === 'malay') ? 'malay' : 'english';
}

// Get translation text
function t(key) {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        value = value[k];
        if (!value) return key; // Return key if translation not found
    }
    
    return value;
}

// Parse URL Parameters and Auto-Display Results
function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const vitaminDLevel = urlParams.get('vitaminDlevel') || urlParams.get('level');
    
    if (name || vitaminDLevel) {
        // Update customer name
        if (name) {
            document.getElementById('customerName').textContent = name;
        }
        
        // Auto-display result if level provided
        if (vitaminDLevel) {
            const level = parseFloat(vitaminDLevel);
            if (!isNaN(level) && level > 0 && level < 150) {
                displayResultWithSalesScript(level);
            }
        }
    }
}

// Display Result Following Sales Script
function displayResultWithSalesScript(level) {
    document.getElementById('displayLevel').textContent = level;
    
    const statusDisplay = document.getElementById('statusDisplay');
    const statusTitle = document.getElementById('statusTitle');
    const statusEmoji = document.getElementById('statusEmoji');
    const symptomsDescription = document.getElementById('symptomsDescription');
    const urgencyMessage = document.getElementById('urgencyMessage');
    const solutionText = document.getElementById('solutionText');
    const recommendedDosage = document.getElementById('recommendedDosage');
    const costBreakdown = document.getElementById('costBreakdown');
    const timelineNote = document.getElementById('timelineNote');
    const dailyCost = document.getElementById('dailyCost');
    const pharmacistAdvice = document.getElementById('pharmacistAdvice');
    const oneMonthPrice = document.getElementById('oneMonthPrice');
    const fullPrice = document.getElementById('fullPrice');
    const bottleCount = document.getElementById('bottleCount');
    const savings = document.getElementById('savings');
    
    let status, statusClass, emoji, symptoms, urgency, solution, dosage, cost, timeline, advice;
    let monthPrice, totalBottles, fullCost, savedAmount;

    // Sales Script Logic Based on Level
    if (level < 10) {
        // Severe Deficiency - CRITICAL
        status = 'SEVERELY DEFICIENT';
        statusClass = 'status-severe border-red-600 bg-red-100';
        emoji = '🚨 Critical';
        symptoms = 'Low Vitamin D causes tiredness, frequent sickness, and body pain. At your level below 10 ng/mL, these symptoms are usually very obvious.';
        urgency = '⚠️ This will NOT recover naturally unless you supplement. Your body urgently needs Vitamin D to function properly.';
        solution = 'We need to boost you back to normal levels within 3 months. At 15 ng/mL or below, your body is in urgent need of high-dose supplementation.';
        dosage = '2 capsules per day = 3000 IU D3';
        cost = 'That\'s less than RM3 per day to rebuild your Vitamin D reserve';
        timeline = '⏱️ Timeline: 3-4 months for full recovery to optimal levels';
        advice = `For your critical level (${level} ng/mL), we strongly recommend the complete 4-5 bottle treatment plan. However, you can start with 1 bottle first to feel the energy improvement, then continue the full recovery plan.`;
        monthPrice = 88;
        totalBottles = 5;
        fullCost = totalBottles * 88;
        savedAmount = 50;
        
    } else if (level < 20) {
        // Deficiency - HIGH PRIORITY
        status = 'DEFICIENT';
        statusClass = 'status-deficiency border-red-500 bg-red-50';
        emoji = '🔴 Action Needed';
        symptoms = 'Low Vitamin D causes tiredness, getting sick easily, and body pain. At your current level, you may already be experiencing some of these symptoms.';
        urgency = '⚠️ If it continues to drop below 10 ng/mL, symptoms become more obvious. This usually won\'t recover naturally unless you supplement.';
        solution = `We need to boost you back to normal levels within 3 months. Your Vitamin D is at ${level} ng/mL - to reach optimal levels, you need consistent supplementation.`;
        dosage = '2 capsules per day = 2000 IU D3';
        cost = 'Less than RM2.50 per day to rebuild your Vitamin D reserve';
        timeline = '⏱️ Timeline: 3 months to reach sufficient levels';
        advice = `For your level (${level} ng/mL), we usually recommend 4-5 bottles for the full treatment plan. You can start with 1 bottle first and see how your energy improves after 1 month. If you feel better, continue the full recovery plan.`;
        monthPrice = 68;
        totalBottles = 4;
        fullCost = totalBottles * 68;
        savedAmount = 40;
        
    } else if (level < 30) {
        // Insufficiency - NEEDS ATTENTION
        status = 'INSUFFICIENT';
        statusClass = 'status-insufficient border-orange-500 bg-orange-50';
        emoji = '⚠️ Below Optimal';
        symptoms = 'Low Vitamin D can cause mild tiredness, occasional sickness, and subtle body discomfort. Your symptoms may be mild but they\'re real.';
        urgency = '⚠️ If left unaddressed, your level may drop further into deficiency range where symptoms worsen significantly.';
        solution = `Let's boost you to optimal levels within 2-3 months. At ${level} ng/mL, you're below the recommended range and your body needs support.`;
        dosage = '1-2 capsules per day = 1000-2000 IU D3';
        cost = 'Less than RM2 per day for better energy and immunity';
        timeline = '⏱️ Timeline: 2-3 months to reach optimal levels';
        advice = `For your level (${level} ng/mL), we recommend 3-4 bottles to fully recover. Starting with 1 bottle lets you experience the improvement first. You'll likely notice better energy within the first month!`;
        monthPrice = 68;
        totalBottles = 3;
        fullCost = totalBottles * 68;
        savedAmount = 30;
        
    } else if (level < 50) {
        // Sufficient but can improve
        status = 'SUFFICIENT';
        statusClass = 'status-sufficient border-yellow-500 bg-yellow-50';
        emoji = '😊 Room to Improve';
        symptoms = 'Your level is acceptable, but you could feel even better! Optimal levels support peak energy, mood, and immunity.';
        urgency = 'While not urgent, maintaining and improving your levels prevents future decline, especially if you have limited sun exposure.';
        solution = `Let's optimize your levels to 50+ ng/mL for peak performance. At ${level} ng/mL, you're close - just need maintenance supplementation.`;
        dosage = '1 capsule per day = 1000 IU D3';
        cost = 'Less than RM1.50 per day for maintenance';
        timeline = '⏱️ Timeline: 2 months to reach and maintain optimal';
        advice = `For your level (${level} ng/mL), 2-3 bottles will get you to optimal and maintain it. Many people start with 1 bottle and notice improved energy and mood!`;
        monthPrice = 45;
        totalBottles = 2;
        fullCost = totalBottles * 45;
        savedAmount = 15;
        
    } else {
        // Optimal - Maintenance
        status = 'OPTIMAL';
        statusClass = 'status-optimal border-green-500 bg-green-50';
        emoji = '🎉 Excellent!';
        symptoms = 'Great news! Your Vitamin D level supports excellent bone health, immunity, and energy. Keep it up!';
        urgency = 'Maintain this level to continue feeling great. Without supplementation or sun exposure, levels can gradually decline.';
        solution = `Let's maintain your excellent level! At ${level} ng/mL, you just need regular maintenance to stay at peak.`;
        dosage = '1 capsule per day = 1000 IU D3';
        cost = 'Less than RM1.50 per day for maintenance';
        timeline = '⏱️ Maintenance: Ongoing to preserve optimal levels';
        advice = `For maintenance at your level (${level} ng/mL), 2-3 bottles (4-6 months supply) keeps you in the optimal zone year-round!`;
        monthPrice = 45;
        totalBottles = 2;
        fullCost = totalBottles * 45;
        savedAmount = 15;
    }

    // Update UI
    statusDisplay.className = `inline-block px-8 py-4 rounded-2xl border-4 ${statusClass}`;
    statusTitle.textContent = status;
    statusEmoji.textContent = emoji;
    symptomsDescription.textContent = symptoms;
    urgencyMessage.textContent = urgency;
    solutionText.textContent = solution;
    recommendedDosage.textContent = dosage;
    costBreakdown.textContent = cost;
    timelineNote.textContent = timeline;
    dailyCost.textContent = cost.split('than ')[1].split(' ')[0] + ' ' + cost.split('than ')[1].split(' ')[1];
    pharmacistAdvice.textContent = advice;
    
    // Pricing
    oneMonthPrice.textContent = `RM ${monthPrice}`;
    bottleCount.textContent = `${totalBottles} bottles (${totalBottles * 2} months supply)`;
    fullPrice.textContent = `RM ${fullCost}`;
    savings.textContent = `Save RM ${savedAmount}!`;
}

// Check Vitamin D Level and Provide Recommendation
function checkVitaminD() {
    const level = parseFloat(document.getElementById('vitaminDLevel').value);
    
    if (isNaN(level) || level < 0 || level > 150) {
        alert('Please enter a valid Vitamin D level between 0 and 150 ng/ml');
        return;
    }

    const resultSection = document.getElementById('resultSection');
    const resultCard = document.getElementById('resultCard');
    const resultTitle = document.getElementById('resultTitle');
    const resultRange = document.getElementById('resultRange');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultDescription = document.getElementById('resultDescription');
    const dosageAmount = document.getElementById('dosageAmount');
    const dosageNote = document.getElementById('dosageNote');

    let status, statusClass, emoji, description, dosage, note;

    // Determine status based on level
    if (level >= 50) {
        status = 'Optimal Level';
        statusClass = 'status-optimal';
        emoji = '🎉';
        description = 'Excellent! Your Vitamin D level is optimal. This is the ideal range that supports strong bones, immunity, and overall health. Continue with your current sun exposure and diet, and consider taking 1000 IU D3/day for maintenance.';
        dosage = '1000 IU D3/day';
        note = 'For maintenance. Continue monitoring and sun exposure behavior.';
    } else if (level >= 30) {
        status = 'Sufficient Level';
        statusClass = 'status-sufficient';
        emoji = '😊';
        description = 'Good! Your Vitamin D level is sufficient, but certain groups may benefit from slightly higher levels. Take 1000 IU D3/day if you have limited sun exposure or increased demands.';
        dosage = '1000 IU D3/day (if sun avoidance behavior)';
        note = 'Maintain current level with adequate sun exposure or supplementation.';
    } else if (level >= 20) {
        status = 'Insufficiency';
        statusClass = 'status-insufficient';
        emoji = '⚠️';
        description = 'Your Vitamin D level is insufficient. This may lead to reduced bone health and weakened immunity over time. We recommend taking 1000 IU D3/day to reach optimal levels.';
        dosage = '1000 IU D3/day';
        note = 'Retest after 3 months to monitor improvement.';
    } else if (level >= 10) {
        status = 'Deficiency';
        statusClass = 'status-deficiency';
        emoji = '🔴';
        description = 'Warning: You have Vitamin D deficiency. This significantly increases risks for bone problems, immune dysfunction, and fatigue. Take 2000 IU D3/day OD (once daily) immediately.';
        dosage = '2000 IU D3/day OD';
        note = 'Essential to start supplementation. Retest after 3 months.';
    } else {
        status = 'Severe Deficiency';
        statusClass = 'status-severe';
        emoji = '🚨';
        description = 'Critical: Your Vitamin D level is severely deficient. Immediate action required! Take 3000 IU D3/day OD or consider teleconsultation for D-Cure therapy. This level puts you at high risk for serious health complications.';
        dosage = '3000 IU D3/day OD';
        note = 'Urgent supplementation needed. Consider medical consultation. Retest after 3 months.';
    }

    // Update UI
    resultCard.className = `border-4 rounded-xl p-8 mb-6 ${statusClass}`;
    resultTitle.textContent = status;
    resultRange.textContent = `Your level: ${level} ng/ml`;
    resultEmoji.textContent = emoji;
    resultDescription.textContent = description;
    dosageAmount.textContent = dosage;
    dosageNote.textContent = `📝 ${note}`;

    // Show result section with animation
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy Voucher to Clipboard
function copyVoucher(code) {
    const tempInput = document.createElement('input');
    tempInput.value = code;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    showNotification(`✅ Voucher "${code}" copied! Apply at checkout for RM5 OFF`);
}

// Scroll to supplements section
function scrollToSupplements() {
    document.getElementById('supplements').scrollIntoView({ behavior: 'smooth' });
}

// Add to Cart Function (Simplified for WhatsApp)
function addToCart(productName, price, voucher) {
    const whatsappMsg = `Hi! I want to order ${productName} at RM${price}. My voucher code: ${voucher}`;
    const whatsappURL = `https://wa.me/60184601923?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappURL, '_blank');
    showNotification(`📱 Opening WhatsApp to complete your order!`);
}

// Update Cart Display (Not needed for WhatsApp flow, keeping for compatibility)
function updateCartDisplay() {
    // Placeholder - not used in WhatsApp flow
}

// Remove from Cart (Not needed for WhatsApp flow, keeping for compatibility)
function removeFromCart(index) {
    // Placeholder - not used in WhatsApp flow
}

// Checkout Function (Redirect to WhatsApp)
function checkout() {
    const whatsappMsg = 'Hi! I want to order Powerlife Vitamin D3 1000IU at RM43 (Project :D price). My voucher code: VD5OFF';
    const whatsappURL = `https://wa.me/60184601923?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappURL, '_blank');
    showNotification('📱 Redirecting to WhatsApp...');
}

// Update Price based on Risk Category (Not used anymore)
function updatePrice() {
    // Placeholder - booking section removed
}

// Submit Booking Form (Not used anymore)
function submitBooking(event) {
    // Placeholder - booking section removed
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-fade-in';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project :D - Sales Conversion System Initialized');
    
    // Hide staff portal links if customer has URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const hasCustomerData = urlParams.has('name') || urlParams.has('vitaminDlevel') || urlParams.has('level');
    
    if (hasCustomerData) {
        // Customer view - hide staff links
        const staffNav = document.getElementById('staffNav');
        const staffFooter = document.getElementById('staffFooter');
        if (staffNav) staffNav.style.display = 'none';
        if (staffFooter) staffFooter.style.display = 'none';
    }
    
    initializeFromURL();
    
    // Example URLs for testing
    console.log('📊 Test URLs:');
    console.log('Severe: ?name=Ben&vitaminDlevel=8');
    console.log('Deficiency: ?name=Sarah&vitaminDlevel=15');
    console.log('Insufficiency: ?name=Ahmad&vitaminDlevel=25');
    console.log('Sufficient: ?name=Lisa&vitaminDlevel=40');
    console.log('Optimal: ?name=John&vitaminDlevel=55');
});
