import { mainDao } from '../models';

const getMain = async () => {
  const main = await mainDao.getMain();
  return main;
};

export default { getMain };
