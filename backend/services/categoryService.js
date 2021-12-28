import { categoryDao } from '../models';

const mainCategory = async () => {
  const mainCategory = await categoryDao.mainCategory();
  return mainCategory;
};

export default { mainCategory };
