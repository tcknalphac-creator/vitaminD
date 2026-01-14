// Vitamin D Recommendation System - Sales Conversion Focused
// Following consultation script: Reveal → Normalize + Urgency → Present Solution
// Multi-language support: English & Bahasa Melayu
// Firebase Analytics Integration

let cart = [];
let currentVisitId = null; // Store visit ID for tracking actions

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
        about: 'Tentang Project :D',
        // Reality Check & Solution
        symptoms: {
            severe: 'Vitamin D rendah menyebabkan keletihan, mudah sakit, dan sakit badan. Pada tahap anda di bawah 10 ng/mL, simptom-simptom ini biasanya sangat jelas.',
            deficiency: 'Vitamin D rendah menyebabkan keletihan, mudah sakit, dan sakit badan. Pada tahap semasa anda, anda mungkin sudah mengalami beberapa simptom ini.',
            insufficient: 'Vitamin D rendah boleh menyebabkan keletihan ringan, kadang-kadang sakit, dan rasa tidak selesa. Simptom anda mungkin ringan tetapi ia nyata.',
            sufficient: 'Tahap anda boleh diterima, tetapi anda boleh rasa lebih baik lagi! Tahap optimum menyokong tenaga, mood, dan imuniti puncak.',
            optimal: 'Berita baik! Tahap Vitamin D anda menyokong kesihatan tulang, imuniti, dan tenaga yang cemerlang. Teruskan!'
        },
        urgency: {
            severe: '⚠️ Ini TIDAK akan pulih secara semula jadi melainkan anda mengambil suplemen. Badan anda amat memerlukan Vitamin D untuk berfungsi dengan baik.',
            deficiency: '⚠️ Jika terus menurun di bawah 10 ng/mL, simptom menjadi lebih jelas. Ini biasanya tidak akan pulih secara semula jadi melainkan anda mengambil suplemen.',
            insufficient: '⚠️ Jika tidak diatasi, tahap anda mungkin menurun lebih jauh ke tahap kekurangan di mana simptom bertambah teruk.',
            sufficient: 'Walaupun tidak mendesak, mengekalkan dan meningkatkan tahap anda menghalang penurunan masa hadapan, terutamanya jika anda kurang terdedah kepada cahaya matahari.',
            optimal: 'Kekalkan tahap ini untuk terus berasa hebat. Tanpa suplemen atau cahaya matahari, tahap boleh menurun secara beransur-ansur.'
        },
        solution: {
            severe: 'Kita perlu tingkatkan anda kembali ke tahap normal dalam 3 bulan. Pada 15 ng/mL atau lebih rendah, badan anda amat memerlukan suplemen dos tinggi.',
            deficiency: 'Kita perlu tingkatkan anda kembali ke tahap normal dalam 3 bulan. Untuk mencapai tahap optimum, anda perlu pengambilan suplemen yang konsisten.',
            insufficient: 'Mari tingkatkan anda ke tahap optimum dalam 2-3 bulan. Anda di bawah julat yang disyorkan dan badan anda memerlukan sokongan.',
            sufficient: 'Mari optimumkan tahap anda ke 50+ ng/mL untuk prestasi puncak. Anda hampir - hanya perlu suplemen penyelenggaraan.',
            optimal: 'Mari kekalkan tahap cemerlang anda! Anda hanya perlu penyelenggaraan biasa untuk kekal di puncak.'
        },
        dosage: {
            severe: '2 kapsul sehari = 3000 IU D3',
            deficiency: '2 kapsul sehari = 2000 IU D3',
            insufficient: '1-2 kapsul sehari = 1000-2000 IU D3',
            sufficient: '1 kapsul sehari = 1000 IU D3',
            optimal: '1 kapsul sehari = 1000 IU D3'
        },
        cost: {
            severe: 'Kurang daripada RM3 sehari untuk membina semula rizab Vitamin D anda',
            deficiency: 'Kurang daripada RM2.50 sehari untuk membina semula rizab Vitamin D anda',
            insufficient: 'Kurang daripada RM2 sehari untuk tenaga dan imuniti yang lebih baik',
            sufficient: 'Kurang daripada RM1.50 sehari untuk penyelenggaraan',
            optimal: 'Kurang daripada RM1.50 sehari untuk penyelenggaraan'
        },
        timeline: {
            severe: '⏱️ Jangka Masa: 3-4 bulan untuk pemulihan penuh ke tahap optimum',
            deficiency: '⏱️ Jangka Masa: 3 bulan untuk mencapai tahap mencukupi',
            insufficient: '⏱️ Jangka Masa: 2-3 bulan untuk mencapai tahap optimum',
            sufficient: '⏱️ Jangka Masa: 2 bulan untuk mencapai dan mengekalkan optimum',
            optimal: '⏱️ Penyelenggaraan: Berterusan untuk mengekalkan tahap optimum'
        },
        costPerDayLabel: 'Kos sehari:',
        coffeeComparison: 'Itu kurang dari harga secawan kopi untuk membina semula rizab Vitamin D badan anda!',
        // New conversion elements
        trustedByLabel: 'Dipercayai oleh Farmasi Terkemuka',
        realResultsTitle: 'Hasil Sebenar daripada Project :D',
        realResultsSubtitle: 'Sertai ribuan yang telah memperbaiki kesihatan mereka',
        verifiedPurchase: 'Pembelian Disahkan',
        specialPriceEnds: 'Harga Istimewa Tamat Dalam:',
        freeShippingLabel: 'Penghantaran PERCUMA',
        pharmacistRecTitle: 'Disyorkan oleh Ahli Farmasi',
        pharmacistRecDesc: 'Ahli farmasi Alpro mengesyorkan suplemen Project :D untuk pemulihan Vitamin D optimum berdasarkan keputusan ujian anda.',
        guaranteeTitle: 'Jaminan Wang Dikembalikan 30 Hari',
        guaranteeDesc: 'Tidak rasa lebih baik? Dapatkan 100% bayaran balik. Tiada soalan ditanya.',
        guaranteeTerms: '*T&C terpakai - Sah untuk pelanggan pertama kali',
        yourMessageLabel: 'Mesej anda akan menjadi:',
        whatsappPreview: '"Hi! Saya nak order Powerlife Vitamin D3 1000IU pada harga RM43. Voucher: VD5OFF"',
        instantReplyLabel: '✓ Balasan segera dari team kami',
        securePaymentLabel: 'Kaedah Pembayaran Selamat:',
        stockAlertTitle: 'Hanya <span class="text-red-600 text-2xl font-black">7 botol</span> lagi pada harga ini!',
        customersViewingLabel: '15 pelanggan sedang melihat ini sekarang',
        stockRemainingLabel: '23% tinggal',
        stickyOrderBtnText: 'PESAN SEKARANG - RM 43'
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
        about: 'About Project :D',
        // Reality Check & Solution
        symptoms: {
            severe: 'Low Vitamin D causes tiredness, frequent sickness, and body pain. At your level below 10 ng/mL, these symptoms are usually very obvious.',
            deficiency: 'Low Vitamin D causes tiredness, getting sick easily, and body pain. At your current level, you may already be experiencing some of these symptoms.',
            insufficient: 'Low Vitamin D can cause mild tiredness, occasional sickness, and subtle body discomfort. Your symptoms may be mild but they\'re real.',
            sufficient: 'Your level is acceptable, but you could feel even better! Optimal levels support peak energy, mood, and immunity.',
            optimal: 'Great news! Your Vitamin D level supports excellent bone health, immunity, and energy. Keep it up!'
        },
        urgency: {
            severe: '⚠️ This will NOT recover naturally unless you supplement. Your body urgently needs Vitamin D to function properly.',
            deficiency: '⚠️ If it continues to drop below 10 ng/mL, symptoms become more obvious. This usually won\'t recover naturally unless you supplement.',
            insufficient: '⚠️ If left unaddressed, your level may drop further into deficiency range where symptoms worsen significantly.',
            sufficient: 'While not urgent, maintaining and improving your levels prevents future decline, especially if you have limited sun exposure.',
            optimal: 'Maintain this level to continue feeling great. Without supplementation or sun exposure, levels can gradually decline.'
        },
        solution: {
            severe: 'We need to boost you back to normal levels within 3 months. At 15 ng/mL or below, your body is in urgent need of high-dose supplementation.',
            deficiency: 'We need to boost you back to normal levels within 3 months. To reach optimal levels, you need consistent supplementation.',
            insufficient: 'Let\'s boost you to optimal levels within 2-3 months. You\'re below the recommended range and your body needs support.',
            sufficient: 'Let\'s optimize your levels to 50+ ng/mL for peak performance. You\'re close - just need maintenance supplementation.',
            optimal: 'Let\'s maintain your excellent level! You just need regular maintenance to stay at peak.'
        },
        dosage: {
            severe: '2 capsules per day = 3000 IU D3',
            deficiency: '2 capsules per day = 2000 IU D3',
            insufficient: '1-2 capsules per day = 1000-2000 IU D3',
            sufficient: '1 capsule per day = 1000 IU D3',
            optimal: '1 capsule per day = 1000 IU D3'
        },
        cost: {
            severe: 'Less than RM3 per day to rebuild your Vitamin D reserve',
            deficiency: 'Less than RM2.50 per day to rebuild your Vitamin D reserve',
            insufficient: 'Less than RM2 per day for better energy and immunity',
            sufficient: 'Less than RM1.50 per day for maintenance',
            optimal: 'Less than RM1.50 per day for maintenance'
        },
        timeline: {
            severe: '⏱️ Timeline: 3-4 months for full recovery to optimal levels',
            deficiency: '⏱️ Timeline: 3 months to reach sufficient levels',
            insufficient: '⏱️ Timeline: 2-3 months to reach optimal levels',
            sufficient: '⏱️ Timeline: 2 months to reach and maintain optimal',
            optimal: '⏱️ Maintenance: Ongoing to preserve optimal levels'
        },
        costPerDayLabel: 'Cost per day:',
        coffeeComparison: 'That\'s less than a cup of coffee to rebuild your body\'s Vitamin D reserve!',
        // New conversion elements
        trustedByLabel: 'Trusted by Leading Pharmacies',
        realResultsTitle: 'Real Results from Project :D',
        realResultsSubtitle: 'Join thousands who improved their health',
        verifiedPurchase: 'Verified Purchase',
        specialPriceEnds: 'Special Price Ends In:',
        freeShippingLabel: 'FREE Shipping',
        pharmacistRecTitle: 'Pharmacist Recommended',
        pharmacistRecDesc: 'Alpro pharmacists recommend Project :D supplements for optimal Vitamin D recovery based on your test results.',
        guaranteeTitle: '30-Day Money-Back Guarantee',
        guaranteeDesc: 'Not feeling better? Get 100% refund. No questions asked.',
        guaranteeTerms: '*T&C apply - Valid for first-time customers',
        yourMessageLabel: 'Your message will be:',
        whatsappPreview: '"Hi! I want to order Powerlife Vitamin D3 1000IU at RM43. Voucher: VD5OFF"',
        instantReplyLabel: '✓ Instant reply from our team',
        securePaymentLabel: 'Secure Payment Methods:',
        stockAlertTitle: 'Only <span class="text-red-600 text-2xl font-black">7 bottles</span> left at this price!',
        customersViewingLabel: '15 customers viewing this right now',
        stockRemainingLabel: '23% remaining',
        stickyOrderBtnText: 'ORDER NOW - RM 43'
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
async function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const vitaminDLevel = urlParams.get('vitaminDlevel') || urlParams.get('level');
    const lang = urlParams.get('lang');
    
    if (name || vitaminDLevel) {
        // Track visit in Firebase
        if (typeof trackVisit === 'function') {
            currentVisitId = await trackVisit({
                name: name,
                level: vitaminDLevel,
                lang: lang
            });
        }
        
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
    
    let status, statusClass, emoji, statusKey;

    // Sales Script Logic Based on Level
    if (level < 10) {
        status = t('status.severe');
        statusClass = 'status-severe border-red-600 bg-red-100';
        emoji = t('emoji.severe');
        statusKey = 'severe';
    } else if (level < 20) {
        status = t('status.deficiency');
        statusClass = 'status-deficiency border-red-500 bg-red-50';
        emoji = t('emoji.deficiency');
        statusKey = 'deficiency';
    } else if (level < 30) {
        status = t('status.insufficient');
        statusClass = 'status-insufficient border-orange-500 bg-orange-50';
        emoji = t('emoji.insufficient');
        statusKey = 'insufficient';
    } else if (level < 50) {
        status = t('status.sufficient');
        statusClass = 'status-sufficient border-yellow-500 bg-yellow-50';
        emoji = t('emoji.sufficient');
        statusKey = 'sufficient';
    } else {
        status = t('status.optimal');
        statusClass = 'status-optimal border-green-500 bg-green-50';
        emoji = t('emoji.optimal');
        statusKey = 'optimal';
    }

    // Update UI - Status Badge
    statusDisplay.className = `inline-block px-8 py-4 rounded-2xl border-4 ${statusClass}`;
    statusTitle.textContent = status;
    statusEmoji.textContent = emoji;
    
    // Update UI - Reality Check & Solution
    symptomsDescription.textContent = t(`symptoms.${statusKey}`);
    urgencyMessage.textContent = t(`urgency.${statusKey}`);
    solutionText.textContent = t(`solution.${statusKey}`);
    recommendedDosage.textContent = t(`dosage.${statusKey}`);
    costBreakdown.textContent = t(`cost.${statusKey}`);
    timelineNote.textContent = t(`timeline.${statusKey}`);
    
    // Update daily cost display (extract from cost text)
    const costText = t(`cost.${statusKey}`);
    // Extract "Less than RMX" or "Kurang daripada RMX"
    const costMatch = costText.match(/(Less than|Kurang daripada)\s+(RM[\d.]+)/i);
    if (costMatch) {
        document.getElementById('dailyCost').textContent = costMatch[2];
    }
    
    // Translate static page elements
    translatePage();
}

// Translate all page elements
function translatePage() {
    // Update all translatable elements
    const translatableElements = {
        'ifYouDontTitle': 'ifYouDont',
        'fatigueTitle': 'fatigue',
        'fatigueDesc': 'fatigueDesc',
        'bonesTitle': 'bones',
        'bonesDesc': 'bonesDesc',
        'immunityTitle': 'immunity',
        'immunityDesc': 'immunityDesc',
        'depressionTitle': 'depression',
        'depressionDesc': 'depressionDesc',
        'painTitle': 'pain',
        'painDesc': 'painDesc',
        'timeWaitingTitle': 'timeWaiting',
        'timeWaitingDesc': 'timeDesc',
        'dontLetWorseTitle': 'dontLetWorse',
        'fixNowBtn': 'fixNow',
        'getBeforeWorse': 'getBeforeWorse',
        'crisisTitle': 'crisis',
        'crisisDesc': 'crisisDesc',
        'deficientStat': 'deficientStat',
        'epidemicDesc': 'epidemicDesc',
        'fatigueStat': 'fatigueStat',
        'tiredDesc': 'tiredDesc',
        'depressionStat': 'depressionStat',
        'moodDesc': 'moodDesc',
        'limitedOfferTitle': 'limitedOffer',
        'getSuppTitle': 'getSupp',
        'projectPriceLabel': 'projectPrice',
        'wasPriceLabel': 'wasPrice',
        'youSaveLabel': 'youSave',
        'yourVoucherLabel': 'yourVoucher',
        'extraDiscLabel': 'extraDisc',
        'whatYouGetLabel': 'whatYouGet',
        'capsulesLabel': 'capsules',
        'per1000Label': 'per1000',
        'easySwallowLabel': 'easySwallow',
        'fastDelivLabel': 'fastDeliv',
        'orderNowBtn': 'orderNow',
        'clickOrderLabel': 'clickOrder',
        'limitedAlertTitle': 'limitedAlert',
        'limitedAlertDesc': 'limitedDesc',
        'costPerDayLabel': 'costPerDayLabel',
        'coffeeComparison': 'coffeeComparison',
        // New conversion elements
        'specialPriceEnds': 'specialPriceEnds',
        'freeShippingLabel': 'freeShippingLabel',
        'pharmacistRecTitle': 'pharmacistRecTitle',
        'pharmacistRecDesc': 'pharmacistRecDesc',
        'guaranteeTitle': 'guaranteeTitle',
        'guaranteeDesc': 'guaranteeDesc',
        'guaranteeTerms': 'guaranteeTerms',
        'yourMessageLabel': 'yourMessageLabel',
        'instantReplyLabel': 'instantReplyLabel',
        'securePaymentLabel': 'securePaymentLabel',
        'customersViewingLabel': 'customersViewingLabel',
        'stockRemainingLabel': 'stockRemainingLabel',
        'stickyOrderBtnText': 'stickyOrderBtnText'
    };
    
    for (const [elementId, translationKey] of Object.entries(translatableElements)) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = t(translationKey);
        }
    }
    
    // Special handling for HTML content (stock alert with inline HTML)
    const stockAlertTitle = document.getElementById('stockAlertTitle');
    if (stockAlertTitle) {
        stockAlertTitle.innerHTML = t('stockAlertTitle');
    }
    
    // Special handling for WhatsApp preview
    const whatsappPreview = document.getElementById('whatsappPreview');
    if (whatsappPreview) {
        whatsappPreview.textContent = t('whatsappPreview');
    }
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

// Copy Voucher to Clipboard with Visual Feedback
function copyVoucher(code) {
    // Track voucher copy action
    if (currentVisitId && typeof trackAction === 'function') {
        trackAction(currentVisitId, 'voucher_copied', { voucherCode: code });
    }
    
    navigator.clipboard.writeText(code).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        const originalClass = btn.className;
        
        btn.textContent = '✓ COPIED!';
        btn.className = btn.className.replace('bg-orange-500', 'bg-green-600').replace('hover:bg-orange-600', 'hover:bg-green-700');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.className = originalClass;
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = code;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    });
    
    showNotification(`✅ Voucher "${code}" copied! Apply at checkout for RM5 OFF`);
}

// Track Order Button Click (Conversion)
function trackOrderClick() {
    if (currentVisitId && typeof trackConversion === 'function') {
        const urlParams = new URLSearchParams(window.location.search);
        trackConversion(currentVisitId, {
            customerName: urlParams.get('name') || 'Unknown',
            vitaminDLevel: urlParams.get('vitaminDlevel') || urlParams.get('level'),
            language: urlParams.get('lang') || 'english',
            timestamp: new Date().toISOString()
        });
    }
}

// Countdown Timer
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    let hours = 23, minutes = 45, seconds = 12;
    
    setInterval(() => {
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 45; seconds = 12; }
        
        countdownEl.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }, 1000);
}

// Sticky Mobile Button
function initStickyButton() {
    const stickyBtn = document.getElementById('stickyOrderBtn');
    if (!stickyBtn) return;
    
    window.addEventListener('scroll', function() {
        const productSection = document.getElementById('supplements');
        if (!productSection) return;
        
        const rect = productSection.getBoundingClientRect();
        
        // Show sticky button when product section is scrolled past
        if (rect.top < -500) {
            stickyBtn.classList.remove('hidden');
        } else {
            stickyBtn.classList.add('hidden');
        }
    });
}

// Scroll to supplements section
function scrollToSupplements() {
    document.getElementById('supplements').scrollIntoView({ behavior: 'smooth' });
}

// Add to Cart Function (Simplified for WhatsApp)
function addToCart(productName, price, voucher) {
    const whatsappMsg = `Hi! I want to order ${productName} at RM${price}. My voucher code: ${voucher}`;
    const whatsappURL = `https://wa.me/60134601923?text=${encodeURIComponent(whatsappMsg)}`;
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
    const whatsappURL = `https://wa.me/60134601923?text=${encodeURIComponent(whatsappMsg)}`;
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
    
    // Initialize countdown timer
    startCountdown();
    
    // Initialize sticky mobile button
    initStickyButton();
    
    // Example URLs for testing
    console.log('📊 Test URLs:');
    console.log('Severe: ?name=Ben&vitaminDlevel=8');
    console.log('Deficiency: ?name=Sarah&vitaminDlevel=15');
    console.log('Insufficiency: ?name=Ahmad&vitaminDlevel=25');
    console.log('Sufficient: ?name=Lisa&vitaminDlevel=40');
    console.log('Optimal: ?name=John&vitaminDlevel=55');
});
