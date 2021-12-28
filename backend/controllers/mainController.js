import { mainService } from '../services';

const getMain = async (req, res) => {
  const main = await mainService.getMain();
  res.status(200).json({
    msg: 'SUCCESS',
    main,
  });
};

export default { getMain };
