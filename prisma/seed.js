import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const matches = [];

  for (let i = 1; i <= 15; i++) {
    matches.push({
      format: i % 2 === 0 ? "Double" : "Single",
      name: `Padel Match ${i}`,
      field: `Padel Field ${i}`,
      field_address: `Jl. Padel No.${i}, Bandung`,
      cp_name: `Contact Person ${i}`,
      cp_phone_number: `08${String(i).padStart(2, "0")}123456${i}`,
      cp_instagram: `padeler${i}`,
      description: `Description for match ${i}`,
      created_by: 3,
    });
  }

  await prisma.matches.createMany({ data: matches });

  console.log("✅ 15 matches seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding matches:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
