import { categoryService } from '../services';

const mainCategory = async (req, res) => {
  try {
    const mainCategory = await categoryService.mainCategory();
    res.status(200).send(mainCategory);
  } catch (err) {
    console.log(err);
  }
};

export default { mainCategory };
