export interface ServiceDetail {
  id: string;
  chapter: string;
  title: string;
  desc: string;
  longDesc: string;
  services: string[];
  features: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
}

export const services: ServiceDetail[] = [
  {
    id: "cardiology",
    chapter: "01",
    title: "Cardiology",
    desc: "From non-invasive diagnostics to complex interventional procedures, our heart center is equipped for silent precision in life-saving care.",
    longDesc:
      "At Shree Kalyan, our Cardiology institute is built on the principle of intervention before invasion. We combine high-fidelity imaging with minimally invasive techniques to treat the most complex structural heart diseases. Our physicians are recognized for their precision in coronary interventions and their commitment to long-term cardiac rehabilitation.",
    services: [
      "Interventional Cardiology",
      "Electrophysiology",
      "Heart Failure Clinic",
      "Pediatric Cardiology",
      "TAVI / TAVR Procedures",
      "Advanced Cath Lab",
    ],
    features: [
      {
        title: "Philips Azurion Cath Lab",
        desc: "State-of-the-art interventional suite for complex cardiac procedures with minimal radiation exposure.",
      },
      {
        title: "24/7 Primary PCI",
        desc: "Immediate life-saving intervention for acute heart attacks, available around the clock with a standby team.",
      },
    ],
    stats: [
      { label: "Success Rate", value: "99.2%" },
      { label: "Procedures / Year", value: "2,400+" },
    ],
  },
  {
    id: "neurosciences",
    chapter: "02",
    title: "Neurosciences",
    desc: "Dedicated to the intricate care of the brain and spine. Our surgeons utilize advanced robotic assistance for uncompromised accuracy.",
    longDesc:
      "The human nervous system demands nothing less than absolute precision. Our Neurosciences department integrates advanced neuro-navigation and intraoperative monitoring to ensure that every movement is measured. We specialize in stroke management, epilepsy surgery, and complex spinal reconstructions with an emphasis on early mobilization.",
    services: [
      "Neurosurgery",
      "Neurology",
      "Stroke Management",
      "Spine Surgery",
      "Neuro-Rehabilitation",
      "Sleep Medicine",
    ],
    features: [
      {
        title: "Neuro-Navigation Suite",
        desc: "GPS-like accuracy for brain and spine surgery, allowing for smaller incisions and faster recovery.",
      },
      {
        title: "Advanced Stroke Unit",
        desc: "Dedicated hyper-acute stroke care with specialized thrombolysis and mechanical thrombectomy protocols.",
      },
    ],
    stats: [
      { label: "Stroke Response", value: "30min" },
      { label: "Bed Capacity", value: "45" },
    ],
  },
  {
    id: "orthopedics",
    chapter: "03",
    title: "Orthopedics",
    desc: "Restoring mobility through advanced joint replacements and sports medicine, tailored to the unique biomechanics of each individual.",
    longDesc:
      "Mobility is independence. The Orthopedic institute at Shree Kalyan focuses on restoring function through personalized joint replacements and minimally invasive arthroscopic surgeries. Whether it is a high-impact sports injury or age-related degeneration, we treat every joint with local precision and global expertise.",
    services: [
      "Joint Replacement",
      "Sports Medicine",
      "Trauma & Orthopedics",
      "Physiotherapy",
      "Arthroscopic Surgery",
      "Pediatric Orthopedics",
    ],
    features: [
      {
        title: "Computer Assisted Surgery",
        desc: "Real-time infrared navigation for knee and hip replacements to ensure perfect alignment and longevity.",
      },
      {
        title: "Sports Injury Clinic",
        desc: "Comprehensive care for athletes including ligament reconstructions and bio-mechanical analysis.",
      },
    ],
    stats: [
      { label: "Joints Replaced", value: "10k+" },
      { label: "Recovery Time", value: "-40%" },
    ],
  },
  {
    id: "mother-child",
    chapter: "04",
    title: "Mother & Child",
    desc: "A sanctuary for new beginnings, providing specialized neonatology and maternal care in a warm, unhurried environment.",
    longDesc:
      "Bringing a new life into the world requires a sanctuary of safety and empathy. Our Mother & Child center is designed as a calm environment for high-risk pregnancies and neonatal care. With a Level III NICU and expert perinatologists, we ensure that both mother and child receive the unhurried attention they deserve.",
    services: [
      "Obstetrics & Gynecology",
      "Neonatology (NICU)",
      "Pediatrics",
      "Antenatal Care",
      "Fetal Medicine",
      "Fertility Services",
    ],
    features: [
      {
        title: "Level III NICU",
        desc: "Advanced neonatal intensive care unit equipped to handle even the most fragile pre-term deliveries.",
      },
      {
        title: "Birthing Suites",
        desc: "Private, editorial-style labor and delivery rooms designed for comfort, safety, and a personalized experience.",
      },
    ],
    stats: [
      { label: "Safe Deliveries", value: "15k+" },
      { label: "NICU Beds", value: "32" },
    ],
  },
  {
    id: "oncology",
    chapter: "05",
    title: "Oncology",
    desc: "Precision in the fight against cancer. We combine targeted therapies with compassionate care for a unified healing journey.",
    longDesc:
      "Cancer care at Shree Kalyan is built around the individual, not just the diagnosis. Our multidisciplinary tumor board ensures that every patient benefits from a collective expertise in surgical, medical, and radiation oncology. We utilize precision diagnostics to target the disease with surgical accuracy while preserving the patient’s quality of life.",
    services: [
      "Medical Oncology",
      "Surgical Oncology",
      "Chemotherapy Unit",
      "Palliative Care",
      "Onco-Pathology",
      "Hormonal Therapy",
    ],
    features: [
      {
        title: "Targeted Therapy",
        desc: "Utilizing genetic profiling to select medications that precisely attack cancer cells with minimal side effects.",
      },
      {
        title: "Day-Care Chemo Unit",
        desc: "A beautifully appointed, quiet space for chemotherapy administration designed to reduce patient fatigue.",
      },
    ],
    stats: [
      { label: "Tumor Boards", value: "Weekly" },
      { label: "Precision Rate", value: "High" },
    ],
  },
  {
    id: "critical-care",
    chapter: "06",
    title: "Critical Care",
    desc: "Vigilance that never rests. Our ICU is manned by expert intensivists providing 24/7 life-support and monitoring.",
    longDesc:
      "When every second counts, vigilance is the ultimate medicine. Our Critical Care unit is the heart of the hospital’s trauma response, providing closed-unit intensive care where every patient is under the direct supervision of an expert intensivist. We utilize advanced electronic monitoring to ensure silent, constant protection.",
    services: [
      "Intensive Care (ICU)",
      "Trauma Center",
      "Emergency Medicine",
      "Post-Op Recovery",
      "Dialysis Unit",
      "Organ Support",
    ],
    features: [
      {
        title: "Closed ICU Model",
        desc: "Direct involvement of specialists within the unit to ensure immediate response to clinical changes.",
      },
      {
        title: "Advanced Life Support",
        desc: "Equipped with the latest mechanical ventilators, dialysis machines, and ECMO capabilities.",
      },
    ],
    stats: [
      { label: "Vigilance", value: "24/7" },
      { label: "Intensivists", value: "Expert" },
    ],
  },
];
