import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        appointments: "Appointments",
        patientCare: "Patient Care",
        faqs: "FAQs",
        facilities: "Facilities",
        team: "Our Team",
        contact: "Contact",
      },
      home: {
        hero_title: "Trusted Care for Your Family",
        hero_subtitle:
          "Experience expert medical treatment with personal attention at Kota's premier multi-specialty hospital. Your health is our first priority.",
        book_appointment: "Book Appointment",
        emergency: "Emergency Helpline: +91 85292 19330",
        specialties_title: "Our Specialized Care",
        specialties_subtitle: "Comprehensive medical services tailored to your needs.",
      },
      about: {
        title: "Our Story",
        subtitle: "A Legacy of Compassion",
        description: "Since 2001, Shree Kalyan Hospital has been a beacon of hope and healing in Kota. We believe in treating patients with dignity, respect, and the highest standards of medical excellence.",
      },
      appointments: {
        title: "Book an Appointment",
        hero_title: "Schedule",
        hero_subtitle: "Your Visit",
        hero_desc:
          "Pick a time that's convenient for you. Our experts are here to help you on your journey to recovery.",
        select_date: "1. Choose Date",
        select_time: "2. Choose Time",
        complete_info: "3. Your Details",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        slots_available: "slots available",
        confirmed: "Appointment Confirmed",
        success_its: "You're",
        success_official: "all set.",
        success_message: "We've reserved your slot for {{time}} on {{date}}. We look forward to seeing you.",
        book_another: "Book another",
        form: {
          name: "Your Full Name",
          phone: "Your Phone Number",
          reason: "Reason for Visit",
          submit: "Confirm Appointment",
        },
        notifications: {
          title: "Appointment Reminders",
          desc: "Stay updated with push notifications for your scheduled visit.",
          enable: "Enable Notifications",
        },
        steps: {
          step1: "Step 1",
          step2: "Step 2",
          final: "Final Step",
        },
        select: "Select",
        your_date: "date.",
        available: "Available",
        slots: "slots.",
        change_time: "Change Time",
      },
    },
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        about: "हमारे बारे में",
        services: "सेवाएं",
        appointments: "अपॉइंटमेंट",
        patientCare: "रोगी देखभाल",
        faqs: "सवाल-जवाब",
        facilities: "सुविधाएं",
        team: "हमारी टीम",
        contact: "संपर्क",
      },
      home: {
        hero_title: "आपके परिवार के लिए भरोसेमंद देखभाल",
        hero_subtitle:
          "कोटा के प्रमुख मल्टी-स्पेशियलिटी अस्पताल में व्यक्तिगत ध्यान और विशेषज्ञ चिकित्सा उपचार का अनुभव करें। आपका स्वास्थ्य हमारी प्राथमिकता है।",
        book_appointment: "अपॉइंटमेंट बुक करें",
        emergency: "आपातकालीन हेल्पलाइन: +91 85292 19330",
        specialties_title: "हमारी विशेषज्ञ देखभाल",
        specialties_subtitle: "आपकी आवश्यकताओं के अनुसार व्यापक चिकित्सा सेवाएं।",
      },
      about: {
        title: "हमारी कहानी",
        subtitle: "करुणा की एक विरासत",
        description: "2001 से, श्री कल्याण अस्पताल कोटा में आशा और उपचार का प्रतीक रहा है। हम मरीजों के साथ सम्मान और उच्चतम चिकित्सा मानकों के साथ व्यवहार करने में विश्वास रखते हैं।",
      },
      appointments: {
        title: "अपॉइंटमेंट बुक करें",
        hero_title: "निर्धारित करें",
        hero_subtitle: "अपनी मुलाकात",
        hero_desc: "वह समय चुनें जो आपके लिए सुविधाजनक हो। हमारे विशेषज्ञ आपके ठीक होने की यात्रा में आपकी मदद करने के लिए यहाँ हैं।",
        select_date: "1. तारीख चुनें",
        select_time: "2. समय चुनें",
        complete_info: "3. आपका विवरण",
        morning: "सुबह",
        afternoon: "दोपहर",
        evening: "शाम",
        slots_available: "स्लॉट उपलब्ध",
        confirmed: "अपॉइंटमेंट की पुष्टि हो गई",
        success_its: "सब",
        success_official: "तय है।",
        success_message: "हमने {{date}} को {{time}} बजे के लिए आपका स्लॉट आरक्षित कर लिया है। हम आपसे मिलने के लिए उत्सुक हैं।",
        book_another: "एक और बुक करें",
        form: {
          name: "आपका पूरा नाम",
          phone: "आपका फोन नंबर",
          reason: "आने का कारण",
          submit: "अपॉइंटमेंट की पुष्टि करें",
        },
        notifications: {
          title: "अपॉइंटमेंट रिमाइंडर",
          desc: "अपनी मुलाकात के लिए पुश नोटिफिकेशन के माध्यम से अपडेट रहें।",
          enable: "नोटिफिकेशन चालू करें",
        },
        steps: {
          step1: "चरण 1",
          step2: "चरण 2",
          final: "अंतिम चरण",
        },
        select: "चुनें",
        your_date: "तारीख।",
        available: "उपलब्ध",
        slots: "स्लॉट।",
        change_time: "समय बदलें",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
