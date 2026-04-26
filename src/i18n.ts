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
        hero_title: "World-Class Healthcare, Close to You",
        hero_subtitle:
          "Experience advanced medical care with a human touch at Shree Kalyan Hospital.",
        book_appointment: "Book Appointment",
        emergency: "Emergency: +91 1234567890",
      },
      appointments: {
        title: "Book an Appointment",
        hero_title: "Reserve",
        hero_subtitle: "Your time.",
        hero_desc:
          "Select a time that works for you to experience our world-class healthcare services.",
        select_date: "1. Select Date",
        select_time: "2. Select Time",
        complete_info: "3. Complete Info",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        slots_available: "slots available",
        confirmed: "Confirmed",
        success_its: "It's",
        success_official: "official.",
        success_message: "Your time is reserved for {{time}} on {{date}}.",
        book_another: "Book another",
        form: {
          name: "Full Name",
          phone: "Phone Number",
          reason: "Reason for Visit (Optional)",
          submit: "Confirm Booking",
        },
        notifications: {
          title: "Get Reminders",
          desc: "Enable push notifications to receive a reminder before your appointment.",
          enable: "Enable",
        },
        steps: {
          step1: "Step 1",
          step2: "Step 2",
          final: "Final Step",
        },
        select: "Select",
        your_date: "your date.",
        available: "Available",
        slots: "slots.",
        change_time: "Change Time",
      },
    },
  },
  hi: {
    translation: {
      nav: {
        home: "मुख्य पृष्ठ",
        about: "हमारे बारे में",
        services: "सेवाएं",
        appointments: "अपॉइंटमेंट",
        patientCare: "मरीजों की देखभाल",
        faqs: "सामान्य प्रश्न",
        facilities: "सुविधाएं",
        team: "हमारी टीम",
        contact: "संपर्क करें",
      },
      home: {
        hero_title: "विश्व स्तरीय स्वास्थ्य सेवा, आपके करीब",
        hero_subtitle:
          "श्री कल्याण अस्पताल में मानवीय स्पर्श के साथ उन्नत चिकित्सा देखभाल का अनुभव करें।",
        book_appointment: "अपॉइंटमेंट बुक करें",
        emergency: "आपातकालीन: +91 1234567890",
      },
      appointments: {
        title: "मुलाकात का समय तय करें",
        hero_title: "आरक्षित",
        hero_subtitle: "आपका समय।",
        hero_desc: "हमारी आधुनिक स्वास्थ्य सेवाओं के लिए अपनी सुविधानुसार समय चुनें।",
        select_date: "1. तारीख चुनें",
        select_time: "2. समय चुनें",
        complete_info: "3. विवरण भरें",
        morning: "सुबह",
        afternoon: "दोपहर",
        evening: "शाम",
        slots_available: "स्लॉट उपलब्ध",
        confirmed: "पुष्टि हो गई",
        success_its: "यह",
        success_official: "आधिकारिक है।",
        success_message: "आपका समय {{date}} को {{time}} बजे के लिए आरक्षित है।",
        book_another: "एक और बुक करें",
        form: {
          name: "पूरा नाम",
          phone: "फोन नंबर",
          reason: "आने का कारण (वैकल्पिक)",
          submit: "बुकिंग की पुष्टि करें",
        },
        notifications: {
          title: "अनुस्मारक प्राप्त करें",
          desc: "अपनी मुलाकात से पहले अनुस्मारक प्राप्त करने के लिए पुश नोटिफिकेशन सक्षम करें।",
          enable: "सक्षम करें",
        },
        steps: {
          step1: "चरण 1",
          step2: "चरण 2",
          final: "अंतिम चरण",
        },
        select: "चुनें",
        your_date: "अपनी तारीख।",
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
