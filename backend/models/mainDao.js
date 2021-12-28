import prisma from '../prisma';

const getMain = async () => {
  return await prisma.$queryRaw`
    SELECT 
      c.id, c.category_name
    FROM 
      categories c
  `;
};

export default { getMain };
