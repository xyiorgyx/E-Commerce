const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
 // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

 // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tags) {
      res.status(404).json({ message: "There is no Tag with this ID" });
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }

});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tags = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tags[0]) {
      res.status(404).json({ message: 'There no Tag with this ID' });
      return;
    }
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tags) {
      res.status(404).json({ message: 'Theres no Tag with this ID' });
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
