const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const countries = [
    { countryCode: "GB", countryName: "United Kingdom", languageCodes: ["en"], currencyCode: "GBP", academicYearStart: 9, academicYearEnd: 6 },
    { countryCode: "US", countryName: "United States", languageCodes: ["en"], currencyCode: "USD", academicYearStart: 8, academicYearEnd: 5 },
    { countryCode: "CA", countryName: "Canada", languageCodes: ["en", "fr"], currencyCode: "CAD", academicYearStart: 9, academicYearEnd: 5 },
    { countryCode: "AU", countryName: "Australia", languageCodes: ["en"], currencyCode: "AUD", academicYearStart: 2, academicYearEnd: 11 },
    { countryCode: "NG", countryName: "Nigeria", languageCodes: ["en"], currencyCode: "NGN", academicYearStart: 9, academicYearEnd: 7 },
    { countryCode: "IN", countryName: "India", languageCodes: ["en", "hi"], currencyCode: "INR", academicYearStart: 7, academicYearEnd: 5 },
  ];
  for (const country of countries) {
    await prisma.studentCountryProfile.upsert({
      where: { countryCode: country.countryCode },
      update: country,
      create: country,
    });
  }
}

main().finally(() => prisma.$disconnect());
