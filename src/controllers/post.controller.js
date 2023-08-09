const {postNew} = require("../models");
const {where} = require("sequelize");

const create = async (req, res) => {
  try {
    const {user_id, title, body} = req.body;

    if (!user_id || !title || !body) {
      return res.status(400).send({
        message: `Some field must be filled, cannot be empty`,
      });
    }

    const input = await postNew.create({
      user_id: user_id,
      title: title,
      body: body,
    });

    return res.status(201).send({
      message: "Post created",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error occured",
      data: error,
    });
  }
};

const read = async (req, res) => {
  try {
    const Posts = await postNew.findAll();

    res.status(200).send({
      message: "Post data retrieved",
      data: Posts,
    });
  } catch (error) {
    return res.send({
      message: "Error occured",
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
        message: `Post not found`,
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
      message: "Post updated",
    });
  } catch (error) {
    return res.send({
      message: "Error occured",
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
        message: `Post not found`,
      });
    }
    const deletedPost = await postNew.destroy({where: {id: id}});

    res.status(200).send({
      message: "Post deleted",
    });
  } catch (error) {
    return res.send({
      message: "Error occured",
      data: error.message,
    });
  }
};

module.exports = {create, read, update, deletePost};
