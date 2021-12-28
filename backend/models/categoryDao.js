import prisma from '../prisma';

const mainCategory = async () => {
  const mainCategory = await prisma.$queryRaw`   
  SELECT 
  c.id, 
  c.category_name AS categoryName
  FROM categories c 
  `;

  const subCategory = await prisma.$queryRaw`   
  SELECT 
  s.id, 
  s.sub_category_name AS subCategoryName
  FROM sub_categories s 
  `;

  for (let i = 0; i < mainCategory.length; i++) {
    mainCategory[i].subCategoryName = null;
  }
  mainCategory[mainCategory.length - 1].subCategoryName = subCategory;

  return mainCategory;
};

export default { mainCategory };
