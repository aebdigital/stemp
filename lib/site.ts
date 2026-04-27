export const site = {
  name: "STEMP, s.r.o.",
  tagline: "30 rokov skúseností v stavebníctve",
  address: {
    street: "Hodžova 14/5048",
    cityZip: "058 01 Poprad",
  },
  ico: "31679030",
  dic: "2020514034",
  icDph: "SK2020514034",
  email: "stemp@stemp.sk",
  phonePrimary: "+421 903 906 586",
  people: [
    {
      role: "Konateľ spoločnosti",
      name: "Ing. Stanislav Marušin",
      phone: "0903 616 726",
    },
    {
      role: "Riaditeľ spoločnosti",
      name: "Ing. Peter Marušin",
      phone: "0903 906 586",
    },
  ],
  social: {
    facebook: "https://www.facebook.com/stemppoprad",
    instagram: "https://www.instagram.com/stemppoprad",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Domov" },
  { href: "/referencie", label: "Referencie" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const services = [
  {
    title: "Komplexná rekonštrukcia",
    description:
      "Kompletná obnova rodinných domov, bytov a objektov občianskej vybavenosti.",
  },
  {
    title: "Zatepľovanie objektov",
    description:
      "Zateplenie fasád a striech s dôrazom na energetickú efektivitu.",
  },
  {
    title: "Občianska a bytová výstavba",
    description:
      "Realizácia novostavieb na kľúč v štandarde, ktorému veria stovky klientov.",
  },
  {
    title: "Inžinierska činnosť",
    description:
      "Od projektovej prípravy cez povolenia až po kolaudáciu — všetko pod jednou strechou.",
  },
  {
    title: "Stavebný dozor",
    description:
      "Odborný dohľad, ktorý chráni váš rozpočet, kvalitu a termín dokončenia.",
  },
  {
    title: "Preprava tovaru",
    description:
      "Spoľahlivá preprava stavebného materiálu a tovaru po východnom Slovensku.",
  },
  {
    title: "Prenájom kancelárskych priestorov",
    description:
      "Reprezentatívne kancelárske priestory v Poprade pre vašu firmu.",
  },
  {
    title: "Prenájom skladových priestorov",
    description:
      "Skladové priestory s dobrou dostupnosťou pre logistiku a podnikanie.",
  },
] as const;

export const stats = [
  { value: "30+", label: "rokov skúseností" },
  { value: "100+", label: "spokojných klientov" },
  { value: "100+", label: "dokončených projektov" },
] as const;

export const projects = [
  {
    slug: "vova-lesna",
    title: "Vová Lesná — základy",
    images: [
      "20210623_151344-576x1024.jpg",
      "20210623_151353-1024x576.jpg",
      "20210623_151357-1024x576.jpg",
      "20210629_094724-1024x576.jpg",
      "20210629_095207-1024x576.jpg",
      "20210629_095218-1024x576.jpg",
    ],
  },
  {
    slug: "zus-lendak",
    title: "Základná umelecká škola Lendak — rekonštrukcia",
    images: [
      "20210908_142414-1024x768.jpg",
      "20210910_165353-1024x768.jpg",
      "20211115_113429-1024x768.jpg",
      "20211115_113435-1024x768.jpg",
      "20211115_113453-1024x768.jpg",
      "20211115_113506-1024x768.jpg",
    ],
  },
  {
    slug: "hybe",
    title: "Hybe",
    images: [
      "20210713_151311-1024x768.jpg",
      "20210727_073939-1024x768.jpg",
      "20210729_120351-768x1024.jpg",
      "20210802_083417-1024x768.jpg",
      "20210806_172441-1024x768.jpg",
      "20210812_095055-768x1024.jpg",
    ],
  },
  {
    slug: "firma",
    title: "Firma",
    images: [
      "20190305_105503-1024x768.jpg",
      "20191004_164229-1024x768.jpg",
      "20191004_164326-1024x768.jpg",
      "20200116_131506-1024x576.jpg",
      "20200312_141751-1024x576.jpg",
      "IMG_0034-1024x768.jpg",
    ],
  },
  {
    slug: "fasada-ganovce",
    title: "Fasáda Gánovce",
    images: [
      "20240506_141948-1024x768.jpg",
      "20240524_130905-1024x768.jpg",
      "20240531_124321-1024x768.jpg",
      "20240624_133337-1024x768.jpg",
      "20240723_073355-1024x768.jpg",
      "20241128_091428-1024x768.jpg",
    ],
  },
  {
    slug: "fasada-brantner",
    title: "Fasáda Brantner",
    images: [
      "20221104_094408-1024x768.jpg",
      "20230525_065027-scaled.jpg",
      "20230623_122141-1024x768.jpg",
      "20230803_133524-1024x768.jpg",
    ],
  },
  {
    slug: "dlazba",
    title: "Dlažba",
    images: [
      "20210204_135702-576x1024.jpg",
      "20210205_151422-1024x576.jpg",
      "20210322_142743-1024x576.jpg",
    ],
  },
  {
    slug: "rodinny-dom",
    title: "Rodinný dom",
    images: [
      "20201203_150357-768x1024.jpg",
      "20201204_145229-768x1024.jpg",
      "20201210_145130-768x1024.jpg",
    ],
  },
  {
    slug: "rd-kezmarok",
    title: "RD Kežmarok",
    images: [
      "IMG_0949-768x1024.jpg",
      "IMG_0950-768x1024.jpg",
      "IMG_0952-768x1024.jpg",
    ],
  },
] as const;

export const heroImages = [
  "IMG_6586-1024x768.jpg",
  "20240723_073355-1024x768.jpg",
  "20210910_165353-1024x768.jpg",
] as const;
