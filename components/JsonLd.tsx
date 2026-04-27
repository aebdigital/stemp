import { site } from "@/lib/site";

export default function JsonLd() {
  const url = "https://stemp.sk";
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${url}/#organization`,
    name: site.name,
    legalName: "STEMP, s.r.o.",
    alternateName: "Stemp Poprad",
    url,
    logo: `${url}/logo.png`,
    image: `${url}/og.jpg`,
    description:
      "Stavebná spoločnosť z Popradu — komplexné rekonštrukcie, zatepľovanie, novostavby, inžinierska činnosť a stavebný dozor.",
    telephone: site.phonePrimary,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: "058 01",
      addressLocality: "Poprad",
      addressCountry: "SK",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Východné Slovensko",
    },
    foundingDate: "1991",
    taxID: site.dic,
    vatID: site.icDph,
    sameAs: [site.social.facebook, site.social.instagram],
    priceRange: "$$",
  } as const;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: site.name,
    inLanguage: "sk-SK",
    publisher: { "@id": `${url}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
