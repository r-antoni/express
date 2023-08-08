const {postNew} = require("../models");
const {where} = require("sequelize");

const create = async (req, res) => {
  try {
    const {user_id, title, body} = req.body;

    if (!user_id || !title || !body) {
      return res.status(400).send({
        message: `some field must be filled, cannot be empty`,
      });
    }

    const input = await postNew.create({
      user_id: user_id,
      title: title,
      body: body,
    });

    return res.status(201).send({
      message: "post created",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "error occured",
      data: error,
    });
  }
};

const read = async (req, res) => {
  try {
    const allPosts = await postNew.findAll();

    res.status(200).send({
      message: "data post retrieved",
      status: "ok",
      data: allPosts,
    });
  } catch (error) {
    return res.send({
      message: "error occured",
      data: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const {id} = req.params;
    const getPost = await postNew.findOne({where: {id: id}});

    if (!getPost) {
      return res.status(404).send({
        message: `post not found`,
      });
    }
    const {title, body} = req.body;
    const updatedPost = await postNew.update(
      {
        title: title,
        body: body,
      },
      {where: {id: id}},
    );

    res.status(201).send({
      message: "post updated",
    });
  } catch (error) {
    return res.send({
      message: "error occured",
      data: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const {id} = req.params;
    const getPost = await postNew.findOne({where: {id: id}});

    if (!getPost) {
      return res.status(404).send({
        message: `post not found`,
      });
    }
    const deletedPost = await postNew.destroy({where: {id: id}});

    res.status(200).send({
      message: "post deleted",
    });
  } catch (error) {
    return res.send({
      message: "error occured",
      data: error.message,
    });
  }
};

module.exports = {create, read, update, deletePost};
