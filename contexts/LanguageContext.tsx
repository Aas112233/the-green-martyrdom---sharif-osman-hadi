import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', bn: 'হোম' },
  'nav.biography': { en: 'Biography', bn: 'জীবনী' },
  'nav.timeline': { en: 'Timeline', bn: 'সময়রেখা' },
  'nav.works': { en: 'Works', bn: 'কর্ম' },
  'nav.gallery': { en: 'Gallery', bn: 'গ্যালারি' },
  'nav.speeches': { en: 'Speeches', bn: 'বক্তৃতা' },
  'nav.documents': { en: 'Documents', bn: 'নথি' },
  'nav.tributes': { en: 'Tributes', bn: 'শ্রদ্ধাঞ্জলি' },

  // Hero
  'hero.dates': { en: '1993 – 2025', bn: '১৯৯৩ – ২০২৫' },
  'hero.guardian': { en: 'Guardian of Sovereignty', bn: 'সার্বভৌমত্বের অভিভাবক' },
  'hero.title.prefix': { en: 'Sharif Osman', bn: 'শরীফ ওসমান' },
  'hero.title.suffix': { en: 'Hadi', bn: 'হাদি' },
  'hero.subtitle.role': { en: 'Spokesperson, Inqilab Moncho', bn: 'মুখপাত্র, ইনকিলাব মঞ্চ' },
  'hero.subtitle.candidate': { en: 'Independent Candidate, Dhaka-8 (2026)', bn: 'স্বতন্ত্র প্রার্থী, ঢাকা-৮ (২০২৬)' },
  'hero.description': {
    en: 'Born Osman Goni in Jhalokathi, he was a Lecturer at the University of Scholars and a fearless voice against hegemony. From the frontlines of the July Revolution to the formation of Inqilab Moncho, he championed a "justice-based state" (Insaf) until his martyrdom in December 2025.',
    bn: 'ঝালকাঠিতে জন্মগ্রহণকারী ওসমান গনি (শরীফ ওসমান হাদি) ছিলেন ইউনিভার্সিটি অফ স্কলার্সের একজন প্রভাষক এবং আধিপত্যবাদের বিরুদ্ধে এক নির্ভীক কণ্ঠস্বর। জুলাই বিপ্লবের প্রথম সারি থেকে ইনকিলাব মঞ্চ গঠন পর্যন্ত, তিনি ২০২৫ সালের ডিসেম্বরে শাহাদাত বরণের আগ পর্যন্ত একটি "ন্যায়বিচার ভিত্তিক রাষ্ট্র" (ইনসাফ)-এর জন্য লড়াই করে গেছেন।'
  },
  'hero.button.bio': { en: 'Read Biography', bn: 'জীবনী পড়ুন' },
  'hero.button.works': { en: 'Literary Works', bn: 'সাহিত্যকর্ম' },
  'hero.quote': { en: '"If I leave, my child will continue the struggle. We want Insaf, not just elections."', bn: '"আমি চলে গেলে আমার সন্তান লড়াই চালিয়ে যাবে। আমরা শুধু নির্বাচন চাই না, ইনসাফ চাই।"' },
  'hero.quote.author': { en: '— Campaign Rally, 2025', bn: '— নির্বাচনী জনসভা, ২০২৫' },

  // Justice Demand
  'justice.title': { en: 'Justice Demand', bn: 'বিচারের দাবি' },
  'justice.subtitle': { en: 'Justice pending for Shaheed Osman Hadi', bn: 'শহীদ ওসমান হাদি হত্যার বিচারহীনতার সময়কাল' },
  'justice.days': { en: 'Days', bn: 'দিন' },
  'justice.hours': { en: 'Hrs', bn: 'ঘন্টা' },
  'justice.mins': { en: 'Min', bn: 'মিনিট' },
  'justice.secs': { en: 'Sec', bn: 'সেকেন্ড' },
  'justice.download': { en: 'Download Image', bn: 'ছবি ডাউনলোড করুন' },
  'justice.share': { en: 'Download and share this image on social media', bn: 'ছবিটি ডাউনলোড করে সামাজিক যোগাযোগ মাধ্যমে ছড়িয়ে দিন' },

  // Biography
  'bio.title': { en: 'Biography', bn: 'জীবনী' },
  'bio.intro': {
    en: 'Sharif Osman Bin Hadi (Bengali: শরীফ ওসমান বিন হাদি; born Osman Goni; 30 June 1993 – 18 December 2025) was a Bangladeshi politician, academic, and cultural activist. He was the co-founder and spokesperson of Inqilab Moncho (Revolutionary Platform).',
    bn: 'শরীফ ওসমান বিন হাদি (জন্ম: ওসমান গনি; ৩০ জুন ১৯৯৩ – ১৮ ডিসেম্বর ২০২৫) ছিলেন একজন বাংলাদেশি রাজনীতিবিদ, শিক্ষাবিদ এবং সাংস্কৃতিক কর্মী। তিনি ছিলেন ইনকিলাব মঞ্চের সহ-প্রতিষ্ঠাতা এবং মুখপাত্র।'
  },
  'bio.intro.2': {
    en: 'Emerging as a key figure during the July Revolution (2024), Hadi was a vocal critic of foreign hegemony and advocated for a "National Government" and a "justice-based state". He was assassinated in December 2025 while campaigning as an Independent candidate for the Dhaka-8 constituency.',
    bn: 'জুলাই বিপ্লব (২০২৪)-এর সময় একজন গুরুত্বপূর্ণ ব্যক্তিত্ব হিসেবে আবির্ভূত হয়ে, হাদি বিদেশি আধিপত্যবাদের তীব্র সমালোচক ছিলেন এবং একটি "জাতীয় সরকার" ও "ন্যায়বিচার ভিত্তিক রাষ্ট্র"-এর পক্ষে কথা বলতেন। ২০২৫ সালের ডিসেম্বরে ঢাকা-৮ আসনে স্বতন্ত্র প্রার্থী হিসেবে প্রচারণাকালে তিনি নিহত হন।'
  },
  'bio.early_life': { en: 'Early Life & Education', bn: 'প্রাথমিক জীবন ও শিক্ষা' },
  'bio.early_life.text': {
    en: 'Hadi was born in Nalchity Upazila, Jhalokathi District, to Maulana Abdul Hadi (a madrasa teacher and Imam) and Taslima Hadi. He was the youngest of six siblings.',
    bn: 'হাদি ঝালকাঠি জেলার নলছিটি উপজেলায় মাওলানা আব্দুল হাদি (একজন মাদ্রাসা শিক্ষক ও ইমাম) এবং তাসলিমা হাদির ঘরে জন্মগ্রহণ করেন। তিনি ছিলেন ছয় ভাইবোনের মধ্যে সবার ছোট।'
  },
  'bio.education.early': { en: 'Early Education', bn: 'প্রাথমিক শিক্ষা' },
  'bio.education.early.val': { en: 'Jhalakati N S Kamil Madrasa (Alim).', bn: 'ঝালকাঠি এন এস কামিল মাদ্রাসা (আলিম)।' },
  'bio.education.higher': { en: 'Higher Education', bn: 'উচ্চ শিক্ষা' },
  'bio.education.higher.val': { en: 'University of Dhaka, Dept. of Political Science (2010–2011 Session).', bn: 'ঢাকা বিশ্ববিদ্যালয়, রাষ্ট্রবিজ্ঞান বিভাগ (২০১০–২০১১ শিক্ষাবর্ষ)।' },
  'bio.career': { en: 'He worked as a Lecturer in the Department of Business Studies at the University of Scholars.', bn: 'তিনি ইউনিভার্সিটি অফ স্কলার্সের বিজনেস স্টাডিজ বিভাগে প্রভাষক হিসেবে কর্মরত ছিলেন।' },

  'bio.politics': { en: 'Political Career & Activism', bn: 'রাজনৈতিক জীবন ও সক্রিয়তা' },
  'bio.politics.july': { en: 'July Revolution (2024)', bn: 'জুলাই বিপ্লব (২০২৪)' },
  'bio.politics.july.text': {
    en: 'Served as the Coordinator for the Rampura area in Dhaka. He was described as a "frontline fighter" who bridged the gap between student protesters and the general public during the uprising.',
    bn: 'ঢাকায় রামপুরা এলাকার সমন্বয়ক হিসেবে দায়িত্ব পালন করেন। তিনি ছিলেন একজন "সম্মুখযোদ্ধা" যিনি অভ্যুত্থানের সময় শিক্ষার্থী আন্দোলনকারী এবং সাধারণ জনগণের মধ্যে সেতুবন্ধন তৈরি করেছিলেন।'
  },
  'bio.politics.inqilab': { en: 'Inqilab Moncho', bn: 'ইনকিলাব মঞ্চ' },
  'bio.politics.inqilab.text': {
    en: 'Founded in August 2024, the platform aimed to defend sovereignty and oppose hegemony. As spokesperson, Hadi called for the "constitutional banning" of the Awami League and demanded a National Government comprising all anti-fascist forces (BNP, Jamaat, etc.).',
    bn: '২০২৪ সালের আগস্টে প্রতিষ্ঠিত এই মঞ্চের লক্ষ্য ছিল সার্বভৌমত্ব রক্ষা এবং আধিপত্যবাদের বিরোধিতা করা। মুখপাত্র হিসেবে, হাদি আওয়ামী লীগকে "সাংবিধানিকভাবে নিষিদ্ধ" করার আহ্বান জানান এবং সমস্ত ফ্যাসিবাদবিরোধী শক্তির সমন্বয়ে একটি জাতীয় সরকারের দাবি জানান।'
  },
  'bio.politics.stance': { en: 'Anti-Hegemony Stance', bn: 'আধিপত্যবাদ বিরোধী অবস্থান' },
  'bio.politics.stance.text': {
    en: 'Hadi was a fierce critic of "Indian hegemony." He argued that true democracy required a rupture from external dominance. His controversial release of a "Greater Bangladesh" map drew international attention.',
    bn: 'হাদি "ভারতীয় আধিপত্যবাদ"-এর কঠোর সমালোচক ছিলেন। তিনি যুক্তি দিয়েছিলেন যে সত্যিকারের গণতন্ত্রের জন্য বাহ্যিক আধিপত্য থেকে মুক্তি প্রয়োজন। তার "বৃহত্তর বাংলাদেশ"-এর মানচিত্র প্রকাশ আন্তর্জাতিক মনোযোগ আকর্ষণ করেছিল।'
  },

  'bio.controversy': { en: 'Controversy', bn: 'বিতর্ক' },
  'bio.controversy.text': {
    en: 'During the "March to Gopalganj" campaign in July 2025, Hadi used profanity and called for the dissolution of Gopalganj District. The remarks sparked widespread debate. He later described the outburst as an "epic of liberation" but expressed regret to those offended.',
    bn: '২০২৫ সালের জুলাইয়ে "মার্চ টু গোপালগঞ্জ" কর্মসূচির সময়, হাদি কটু শব্দ ব্যবহার করেন এবং গোপালগঞ্জ জেলা বিলুপ্ত করার আহ্বান জানান। এই মন্তব্য ব্যাপক বিতর্কের জন্ম দেয়। তিনি পরে এই ক্ষোভ প্রকাশকে "মুক্তির মহাকাব্য" হিসেবে বর্ণনা করেন কিন্তু যারা এতে আঘাত পেয়েছেন তাদের প্রতি দুঃখ প্রকাশ করেন।'
  },

  'bio.assassination': { en: 'Assassination', bn: 'হত্যাকাণ্ড' },
  'bio.assassination.text': {
    en: 'On 12 December 2025, at 2:25 PM, Hadi was shot in the head by masked assailants on a motorcycle in the Paltan area of Dhaka while campaigning.',
    bn: '২০২৫ সালের ১২ ডিসেম্বর দুপুর ২:২৫ মিনিটে ঢাকার পল্টন এলাকায় প্রচারণার সময় মোটরসাইকেলে আসা মুখোশধারী সন্ত্রাসীরা হাদির মাথায় গুলি করে।'
  },
  'bio.assassination.medical': { en: 'Medical Battle', bn: 'চিকিৎসা সংগ্রাম' },
  'bio.assassination.medical.text': { en: 'Initially treated at Dhaka Medical College Hospital and Evercare Hospital.', bn: 'প্রথমে ঢাকা মেডিকেল কলেজ হাসপাতাল এবং এভারকেয়ার হাসপাতালে চিকিৎসা দেওয়া হয়।' },
  'bio.assassination.transfer': { en: 'Transfer', bn: 'স্থানান্তর' },
  'bio.assassination.transfer.text': { en: 'Airlifted to Singapore General Hospital on 15 December.', bn: '১৫ ডিসেম্বর এয়ার অ্যাম্বুলেন্সে সিঙ্গাপুর জেনারেল হাসপাতালে নেওয়া হয়।' },
  'bio.assassination.death': { en: 'Death', bn: 'মৃত্যু' },
  'bio.assassination.death.text': { en: 'Succumbed to injuries on 18 December 2025.', bn: '১৮ ডিসেম্বর ২০২৫ সালে তিনি মৃত্যুবরণ করেন।' },
  'bio.investigation': { en: 'Investigation', bn: 'তদন্ত' },
  'bio.investigation.text': { en: 'Police identified suspects Faisal Karim Masud and Alamgir Sheikh (linked to Awami League) who reportedly fled to Meghalaya, India.', bn: 'পুলিশ ফয়সাল করিম মাসুদ এবং আলমগীর শেখ (আওয়ামী লীগের সাথে যুক্ত) কে সন্দেহভাজন হিসেবে চিহ্নিত করেছে, যারা ভারতের মেঘালয়ে পালিয়ে গেছে বলে জানা গেছে।' },

  'bio.aftermath': { en: 'Aftermath & Legacy', bn: 'প্রতিক্রিয়া ও উত্তরাধিকার' },
  'bio.aftermath.text': {
    en: 'The government declared a day of State Mourning. His death triggered widespread unrest, with attacks on media houses (The Daily Star, Prothom Alo) and cultural institutions perceived as pro-establishment.',
    bn: 'সরকার একদিনের রাষ্ট্রীয় শোক ঘোষণা করে। তার মৃত্যুতে ব্যাপক অস্থিরতা দেখা দেয়, এবং সংস্থাপন-পন্থী হিসেবে বিবেচিত মিডিয়া হাউজ (দ্য ডেইলি স্টার, প্রথম আলো) ও সাংস্কৃতিক প্রতিষ্ঠানগুলোতে হামলা হয়।'
  },
  'bio.aftermath.funeral': {
    en: 'His funeral at the Jatiya Sangsad Bhaban South Plaza was attended by tens of thousands. He was laid to rest beside the Mausoleum of National Poet Kazi Nazrul Islam.',
    bn: 'জাতীয় সংসদ ভবনের দক্ষিণ প্লাজায় তার জানাজায় হাজার হাজার মানুষ অংশ নেয়। তাকে জাতীয় কবি কাজী নজরুল ইসলামের মাজারের পাশে দাফন করা হয়।'
  },

  // Timeline
  'timeline.title': { en: 'Timeline of a Revolutionary', bn: 'বিপ্লবীর সময়রেখা' },
  'timeline.subtitle': { en: 'Important moments from Shaheed Osman Hadi\'s life', bn: 'শহীদ ওসমান হাদির জীবনের গুরুত্বপূর্ণ মুহূর্তগুলো' },

  // 1993
  'timeline.born.title': { en: 'Birth', bn: 'জন্ম' },
  'timeline.born.desc': {
    en: 'Sharif Osman bin Hadi was born on 30 June 1993 in Nalchity, Jhalakathi. He grew up in a socially conscious Muslim family. From an early age, he showed interest in justice, politics, and social reform. These values later shaped his political journey.',
    bn: 'শরীফ ওসমান বিন হাদি ৩০ জুন ১৯৯৩ সালে ঝালকাঠির নলছিটিতে জন্মগ্রহণ করেন। ছোটবেলা থেকেই তিনি ন্যায়বিচার, রাজনীতি এবং সমাজ সংস্কারের প্রতি আগ্রহ দেখিয়েছিলেন।'
  },

  // 2010
  'timeline.edu.secondary.title': { en: 'Secondary & Higher Secondary Education', bn: 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা' },
  'timeline.edu.secondary.desc': {
    en: 'Osman Hadi completed his Dakhil and Alim education from Jhalakati N S Kamil Madrasa. He passed the Alim examination, during which his interest in religion, politics, and state affairs developed simultaneously.',
    bn: 'ওসমান হাদি ঝালকাঠি এন এস কামিল মাদ্রাসা থেকে দাখিল ও আলিম সম্পন্ন করেন। আলিম পরীক্ষার সময় থেকেই ধর্ম, রাজনীতি ও রাষ্ট্রীয় বিষয়ে তার আগ্রহ তৈরি হয়।'
  },

  // 2011
  'timeline.edu.uni.title': { en: 'University Education', bn: 'বিশ্ববিদ্যালয় শিক্ষা' },
  'timeline.edu.uni.desc': {
    en: 'In the 2010–2011 academic session, Osman Hadi enrolled in the Department of Political Science at the University of Dhaka. His university years marked his emergence as a writer, debater, and political thinker.',
    bn: '২০১০-২০১১ শিক্ষাবর্ষে ওসমান হাদি ঢাকা বিশ্ববিদ্যালয়ের রাষ্ট্রবিজ্ঞান বিভাগে ভর্তি হন। বিশ্ববিদ্যালয় জীবনই তাকে লেখক, বিতার্কিক ও রাজনৈতিক চিন্তাবিদ হিসেবে গড়ে তোলে।'
  },

  // 2024 Jan
  'timeline.career.title': { en: 'Academic Career', bn: 'একাডেমিক ক্যারিয়ার' },
  'timeline.career.desc': {
    en: 'After completing his studies, Osman Hadi worked as a lecturer in the Department of English at the University of Scholars. Alongside teaching, he gained recognition as a writer and political analyst.',
    bn: 'পড়াশোনা শেষে ওসমান হাদি ইউনিভার্সিটি অফ স্কলার্সের ইংরেজি বিভাগে প্রভাষক হিসেবে কাজ শুরু করেন। শিক্ষকতার পাশাপাশি তিনি লেখক ও রাজনৈতিক বিশ্লেষক হিসেবেও পরিচিতি লাভ করেন।'
  },

  // 2024 July
  'timeline.activism.july.title': { en: 'Role in July Revolution', bn: 'জুলাই বিপ্লবে ভূমিকা' },
  'timeline.activism.july.desc': {
    en: 'During the July Revolution of 2024, Osman Hadi served as a coordinator in the Rampura area of Dhaka. He was directly involved in grassroots organization, which brought him national recognition.',
    bn: '২০২৪ সালের জুলাই বিপ্লবের সময় হাদি ঢাকার রামপুরা এলাকার সমন্বয়ক হিসেবে দায়িত্ব পালন করেন। তৃণমূল সংগঠনে তার প্রত্যক্ষ অংশগ্রহণ তাকে জাতীয়ভাবে পরিচিতি এনে দেয়।'
  },

  // 2024 Aug
  'timeline.inqilab.form.title': { en: 'Inqilab Moncho', bn: 'ইনকিলাব মঞ্চ' },
  'timeline.inqilab.form.desc': {
    en: 'Inqilab Moncho is a youth and uprising-inspired platform that emerged from the students and citizens\' mobilisation around the July protests. The organisation\'s aims include defending sovereignty and building a "justice-based state".',
    bn: 'ইনকিলাব মঞ্চ হলো একটি তরুণ ও গণঅভ্যুত্থান-অনুপ্রাণিত প্ল্যাটফর্ম যা জুলাই আন্দোলনের পর গঠিত হয়। এর লক্ষ্য দেশের সার্বভৌমত্ব রক্ষা এবং একটি "ইনসাফ কায়েমের" রাষ্ট্র গঠন করা।'
  },

  'timeline.inqilab.role.title': { en: 'Co-founder & Spokesperson', bn: 'সহ-প্রতিষ্ঠাতা ও মুখপাত্র' },
  'timeline.inqilab.role.desc': {
    en: 'From 13 August 2024, Osman Hadi served as co-founder and spokesperson of Inqilab Moncho. He articulated the platform’s ideology centered on sovereignty, justice, and resistance to domination.',
    bn: '১৩ আগস্ট ২০২৪ থেকে ওসমান হাদি ইনকিলাব মঞ্চের সহ-প্রতিষ্ঠাতা ও মুখপাত্র হিসেবে দায়িত্ব পালন করেন। তিনি সার্বভৌমত্ব, ন্যায়বিচার এবং আধিপত্যবাদ প্রতিরোধের আদর্শ তুলে ধরেন।'
  },

  // 2025 May
  'timeline.politics.govt.title': { en: 'Call for a National Government', bn: 'জাতীয় সরকারের দাবি' },
  'timeline.politics.govt.desc': {
    en: 'On 24 May 2025, at a press conference at the University of Dhaka, Hadi called for a national government comprising all anti-Awami League forces, emphasizing political reform.',
    bn: '২৪ মে ২০২৫, ঢাকা বিশ্ববিদ্যালয়ে এক সংবাদ সম্মেলনে হাদি আওয়ামী লীগ বিরোধী সকল শক্তির সমন্বয়ে একটি জাতীয় সরকার গঠনের আহ্বান জানান।'
  },

  // 2025 Sep
  'timeline.politics.campaign.title': { en: 'Dhaka-8 Election Campaign', bn: 'ঢাকা-৮ নির্বাচনী প্রচারণা' },
  'timeline.politics.campaign.desc': {
    en: 'In preparation for the 2026 general election, Osman Hadi launched his campaign as an independent candidate from Dhaka-8, organizing rallies and local consultations.',
    bn: '২০২৬ সালের সাধারণ নির্বাচনের প্রস্তুতি হিসেবে, ওসমান হাদি ঢাকা-৮ আসন থেকে স্বতন্ত্র প্রার্থী হিসেবে তার প্রচারণা শুরু করেন এবং স্থানীয় জনগণের সাথে মতবিনিময় করেন।'
  },

  // 2025 Dec 12
  'timeline.assassination.title': { en: 'Assassination Attempt', bn: 'হত্যাচেষ্টা' },
  'timeline.assassination.desc': {
    en: 'Sharif Osman Hadi was attacked in a planned armed attack on December 12, 2025, in the Paltan area of Dhaka. He was attacked by masked assailants while riding a rickshaw after leaving a mosque. According to eyewitnesses, the assailants shot him in the head at close range. He was actively campaigning for the Dhaka-8 constituency.',
    bn: '১২ ডিসেম্বর ২০২৫, ঢাকার পল্টন এলাকায় এক পরিকল্পিত সশস্ত্র হামলায় শরীফ ওসমান হাদি আক্রান্ত হন। মসজিদ থেকে বের হওয়ার সময় মুখোশধারী সন্ত্রাসীরা তাকে খুব কাছ থেকে মাথায় গুলি করে। এ সময় তিনি ঢাকা-৮ আসনের জন্য প্রচারণা চালাচ্ছিলেন।'
  },

  // Medical Battle (New)
  'timeline.medical.title': { en: 'Battle for Life', bn: 'জীবনের জন্য সংগ্রাম' },
  'timeline.medical.desc': {
    en: 'Immediately after the attack, Hadi was rushed to Dhaka Medical College Hospital and later transferred to Evercare Hospital. On December 15, he was airlifted to Singapore General Hospital in a desperate bid to save his life.',
    bn: 'হামলার পরপরই হাদিকে ঢাকা মেডিকেল কলেজ হাসপাতালে এবং পরে এভারকেয়ার হাসপাতালে নেওয়া হয়। ১৫ ডিসেম্বর, জীবন বাঁচাতে তাকে এয়ার অ্যাম্বুলেন্সে সিঙ্গাপুর জেনারেল হাসপাতালে স্থানান্তর করা হয়।'
  },

  // 2025 Dec 18
  'timeline.death.title': { en: 'Death', bn: 'মৃত্যু' },
  'timeline.death.desc': {
    en: 'Despite the highest level of care in Singapore, he suffered irreversible brain damage. He breathed his last on December 18, 2025, leaving a nation in mourning.',
    bn: 'সিঙ্গাপুরে সর্বোচ্চ চিকিৎসা সত্ত্বেও, তার মস্তিষ্কের অপূরণীয় ক্ষতি হয়। ১৮ ডিসেম্বর ২০২৫ তারিখে তিনি শেষ নিঃশ্বাস ত্যাগ করেন, জাতিকে শোকের সাগরে ভাসিয়ে।'
  },

  // Post Death Events
  'timeline.funeral.title': { en: 'State Funeral', bn: 'রাষ্ট্রীয় জানাজা' },
  'timeline.funeral.desc': {
    en: 'On Dec 20, millions of people flooded the streets and Parliament South Plaza for his funeral. It was a historic gathering of mass grief and resistance, where he was laid to rest beside National Poet Kazi Nazrul Islam.',
    bn: '২০ ডিসেম্বর, সংসদ ভবনের দক্ষিণ প্লাজায় জানাজায় লক্ষ লক্ষ মানুষ ঢল নামে। এটি ছিল গণশোক ও প্রতিরোধের এক ঐতিহাসিক সমাবেশ। তাকে জাতীয় কবি কাজী নজরুল ইসলামের পাশে দাফন করা হয়।'
  },
  'timeline.protests.title': { en: '"Justice for Hadi" Movement', bn: '"হাদি হত্যার বিচার চাই" আন্দোলন' },
  'timeline.protests.desc': {
    en: 'Mass protests erupted across university campuses demanding the immediate arrest of the masterminds behind the assassination. The "Red December" movement was born demanding justice.',
    bn: 'হত্যাকাণ্ডের মূল পরিকল্পনাকারীদের গ্রেপ্তারের দাবিতে বিশ্ববিদ্যালয় ক্যাম্পাসে ব্যাপক বিক্ষোভ ছড়িয়ে পড়ে। ন্যায়বিচারের দাবিতে "লাল ডিসেম্বর" আন্দোলনের জন্ম হয়।'
  },
  'timeline.foundation.title': { en: 'Hadi Foundation Established', bn: 'হাদি ফাউন্ডেশন প্রতিষ্ঠা' },
  'timeline.foundation.desc': {
    en: 'Inqilab Moncho and his family established the foundation to preserve his political philosophy and support victims of political violence.',
    bn: 'তার রাজনৈতিক দর্শন সংরক্ষণ এবং রাজনৈতিক সহিংসতার শিকারদের সহায়তার জন্য ইনকিলাব মঞ্চ এবং তার পরিবার এই ফাউন্ডেশন প্রতিষ্ঠা করে।'
  },
  'timeline.justice_now.title': { en: 'The Unfinished Struggle', bn: 'অসমাপ্ত সংগ্রাম' },
  'timeline.justice_now.desc': {
    en: 'Today, the trial faces delays as suspects flee across borders. Inqilab Moncho continues weekly demonstrations, vowing that the revolution will not end until justice is served.',
    bn: 'আজ, আসামিরা সীমানা পেরিয়ে যাওয়ায় বিচার প্রক্রিয়া বিলম্বিত হচ্ছে। ইনকিলাব মঞ্চ সাপ্তাহিক বিক্ষোভ অব্যাহত রেখেছে এবং প্রতিজ্ঞা করেছে যে ন্যায়বিচার না পাওয়া পর্যন্ত বিপ্লব শেষ হবে না।'
  },

  // Poetry
  'works.title': { en: 'Literary Works', bn: 'সাহিত্যকর্ম' },
  'works.quote': { en: '"The eastern sky has turned red amaranth by lava,\nOur silence is the fuel for the coming storm."', bn: '"লাভায় লালশাক পুবের আকাশ,\nআমাদের নীরবতাই আসন্ন ঝড়ের জ্বালানি।"' },
  'works.pen_name': { en: 'Written under the pen name', bn: 'ছদ্মনামে লেখা' },
  'works.key_pub': { en: 'Key Publication', bn: 'প্রধান প্রকাশনা' },
  'works.book_title': { en: 'Lavay Lalshak Puber Akash', bn: 'লাভায় লালশাক পুবের আকাশ' },
  'works.pub_info': { en: 'Published February 2024 • Duar Prokashoni', bn: 'প্রকাশিত ফেব্রুয়ারি ২০২৪ • দুয়ার প্রকাশনী' },
  'works.book_desc': { en: 'A collection of poems known for revolutionary and resistance themes. Published during the Boimela 2024.', bn: 'বিপ্লবী ও প্রতিরোধমূলক থিম নিয়ে রচিত কবিতার সংকলন। ২০২৪ সালের বইমেলায় প্রকাশিত।' },
  'works.essays_title': { en: 'Inqilab Manifestos', bn: 'ইনকিলাব ইশতেহার' },
  'works.essays_sub': { en: 'Political Essays (2024-2025)', bn: 'রাজনৈতিক প্রবন্ধ (২০২৪-২০২৫)' },
  'works.essays_desc': { en: 'Speeches and writings defining the "Second Republic" and the anti-hegemony struggle.', bn: '"দ্বিতীয় প্রজাতন্ত্র" এবং আধিপত্যবাদ বিরোধী সংগ্রামকে সংজ্ঞায়িত করে এমন বক্তৃতা ও লেখা।' },
  'works.archive_title': { en: 'Literary Archive', bn: 'সাহিত্য আর্কাইভ' },
  'works.archive_desc': { en: 'The complete works of Shimanto Sharif are being preserved by the Inqilab Moncho literary wing.', bn: 'সীমান্ত শরিফের সম্পূর্ণ সাহিত্যকর্ম ইনকিলাব মঞ্চের সাহিত্য শাখা সংরক্ষণ করছে।' },
  'works.view_archive': { en: 'View Archive', bn: 'আর্কাইভ দেখুন' },

  // Gallery
  'gallery.title': { en: 'Visual Archive', bn: 'দৃশ্যমান আর্কাইভ' },
  'gallery.view': { en: 'View Image', bn: 'ছবি দেখুন' },
  'gallery.filter.all': { en: 'All Media', bn: 'সমস্ত মিডিয়া' },
  'gallery.filter.photos': { en: 'Photos', bn: 'ছবি' },
  'gallery.filter.videos': { en: 'Videos', bn: 'ভিডিও' },

  // Speeches
  'speeches.title': { en: 'Speeches & Interviews', bn: 'বক্তৃতা ও সাক্ষাৎকার' },
  'speeches.featured': { en: 'Featured Speech', bn: 'নির্বাচিত বক্তৃতা' },
  'speeches.recent': { en: 'Recent Recordings', bn: 'সাম্প্রতিক রেকর্ডসমূহ' },
  'speeches.watch': { en: 'Watch Video', bn: 'ভিডিও দেখুন' },

  // Documents
  'docs.title': { en: 'Documents & Press', bn: 'নথি এবং সংবাদ' },
  'docs.desc': { en: 'Archived official statements, press clippings, and legal documents.', bn: 'সংরক্ষিত আনুষ্ঠানিক বিবৃতি, সংবাদ কাটিং এবং আইনি নথি।' },
  'docs.type.press': { en: 'Press Clipping', bn: 'সংবাদ কাটিং' },
  'docs.type.legal': { en: 'Legal Document', bn: 'আইনি নথি' },
  'docs.type.statement': { en: 'Official Statement', bn: 'আনুষ্ঠানিক বিবৃতি' },
  'docs.view': { en: 'Read Document', bn: 'নথি পড়ুন' },

  // Footer (Enhanced)
  'footer.title': { en: 'Osman Hadi Memorial Archive', bn: 'ওসমান হাদি স্মৃতি আর্কাইভ' },
  'footer.description': {
    en: 'Digital archive preserving the life, work and ideals of Shaheed Sharif Osman Bin Hadi. May his memory live forever.',
    bn: 'শহীদ শরীফ ওসমান বিন হাদির জীবন, কর্ম এবং আদর্শ সংরক্ষণের জন্য ডিজিটাল আর্কাইভ। তার স্মৃতি চিরজাগরূক থাকুক।'
  },
  'footer.col.media': { en: 'Media', bn: 'মিডিয়া' },
  'footer.col.writings': { en: 'Writings', bn: 'লেখালেখি' },
  'footer.col.explore': { en: 'Explore', bn: 'অন্বেষণ' },
  'footer.col.contact': { en: 'Contact', bn: 'যোগাযোগ' },

  'footer.link.videos': { en: 'Videos', bn: 'ভিডিও' },
  'footer.link.photos': { en: 'Photos', bn: 'ছবি' },
  'footer.link.audios': { en: 'Audios', bn: 'অডিও' },
  'footer.link.writings': { en: 'Writings', bn: 'লেখালেখি' },
  'footer.link.speeches': { en: 'Speeches', bn: 'বক্তৃতা' },
  'footer.link.poems': { en: 'Poems', bn: 'কবিতা' },
  'footer.link.quotes': { en: 'Quotes', bn: 'উদ্ধৃতি' },
  'footer.link.biography': { en: 'Biography', bn: 'জীবনী' },
  'footer.link.timeline': { en: 'Timeline', bn: 'সময়রেখা' },
  'footer.link.events': { en: 'Events', bn: 'ইভেন্ট' },
  'footer.link.locations': { en: 'Locations', bn: 'অবস্থান' },
  'footer.link.tributes': { en: 'Tributes', bn: 'শ্রদ্ধাঞ্জলি' },
  'footer.link.news': { en: 'News', bn: 'সংবাদ' },
  'footer.link.documents': { en: 'Documents', bn: 'নথি' },
  'footer.link.social': { en: 'Social Posts', bn: 'সামাজিক পোস্ট' },
  'footer.link.requests': { en: 'Requests', bn: 'অনুরোধ' },

  'footer.tribute.title': { en: 'Pay Tribute to His Memory', bn: 'তার স্মৃতির উদ্দেশ্যে শ্রদ্ধা নিবেদন করুন' },
  'footer.tribute.subtitle': { en: 'Share your memories and tributes', bn: 'আপনার স্মৃতি এবং শ্রদ্ধা শেয়ার করুন' },
  'footer.tribute.btn': { en: 'Submit Tribute', bn: 'শ্রদ্ধা জানান' },

  'footer.dev.by': { en: 'Developed by', bn: 'তৈরিকারী' },
  'footer.dev.name': { en: 'Mahmoud Hassan Toha', bn: 'মাহমুদ হাসান তোহা' },
  'footer.collab.by': { en: 'Designed in Memory of', bn: 'স্মরণে পরিকল্পিত' },
  'footer.collab.name': { en: 'Shahid Sharif Usman Hadi', bn: 'শহীদ শরীফ ওসমান হাদি' },
  'footer.rights': { en: 'All rights reserved', bn: 'সর্বস্বত্ব সংরক্ষিত' },
  'footer.rights.name': { en: 'Mahmud', bn: 'মাহমুদ' },
  'footer.in_memory': { en: 'In memory of Shaheed Osman Hadi', bn: 'শহীদ ওসমান হাদির স্মরণে' },
  'footer.legal.privacy': { en: 'Privacy Policy', bn: 'গোপনীয়তা নীতি' },
  'footer.legal.terms': { en: 'Terms', bn: 'শর্তাবলী' },
  'footer.legal.dev': { en: 'Developer', bn: 'ডেভেলপার' },

  // Stats
  'stats.native_name': { en: 'Native Name', bn: 'নিজস্ব নাম' },
  'stats.born': { en: 'Born', bn: 'জন্ম' },
  'stats.died': { en: 'Died', bn: 'মৃত্যু' },
  'stats.profession': { en: 'Profession', bn: 'পেশা' },
  'stats.party': { en: 'Political Party', bn: 'রাজনৈতিক দল' },
  'stats.resting': { en: 'Resting Place', bn: 'সমাধিস্থল' },
  'stats.wiki': { en: 'Wikipedia Entry', bn: 'উইকিপিডিয়া এন্ট্রি' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};