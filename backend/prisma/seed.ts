import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

// async function deleteAllData(orderedFileNames: string[]) {
//   const modelNames = orderedFileNames.map((fileName) => {
//     const modelName = path.basename(fileName, path.extname(fileName));
//     return modelName.charAt(0).toUpperCase() + modelName.slice(1);
//   });

//   for (const modelName of modelNames) {
//     const model: any = prisma[modelName as keyof typeof prisma];
//     if (model) {
//       await model.deleteMany({});
//       console.log(`Cleared data from ${modelName}`);
//     } else {
//       console.error(
//         `Model ${modelName} not found. Please ensure the model name is correctly specified.`
//       );
//     }
//   }
// }

// async function main() {
//   const dataDirectory = path.join(__dirname, "seedData");

//   const orderedFileNames = [
//     "user.json",
//     "blog.json",
//     "category.json",
//     "brand.json",
//     "product.json",
//     "review.json",
//     "voucher.json",
//     "order.json",
//     "orderItem.json",
//   ];

//   await deleteAllData(orderedFileNames);

//   for (const fileName of orderedFileNames) {
//     const filePath = path.join(dataDirectory, fileName);
//     const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     const modelName = path.basename(fileName, path.extname(fileName));
//     const model: any = prisma[modelName as keyof typeof prisma];

//     if (!model) {
//       console.error(`No Prisma model matches the file name: ${fileName}`);
//       continue;
//     }

//     for (const data of jsonData) {
//       await model.create({
//         data,
//       });
//     }

//     console.log(`Seeded ${modelName} with data from ${fileName}`);
//   }
// }

async function deleteAllData() {
  const modelNames = [
    "Blog",
    "ProductImage",
    "Product",
    "Category",
    "Brand",
    "Review",
    "Voucher",
    "Order",
    "OrderItem",
    "ShippingAddress",
    "User",
  ];

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");
  const filePath = path.join(dataDirectory, "seed.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  await deleteAllData();

  for (const modelName in jsonData) {
    const model: any =
      prisma[
        (modelName.charAt(0).toUpperCase() +
          modelName.slice(1)) as keyof typeof prisma
      ];

    if (!model) {
      console.error(`No Prisma model matches the model name: ${modelName}`);
      continue;
    }

    for (const data of jsonData[modelName]) {
      await model.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${filePath}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// npx prisma migrate dev --name init
// npx prisma generate
// npm run seed
