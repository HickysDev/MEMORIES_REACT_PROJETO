const {ADDRCONFIG} = require("dns");
const Memory = require("../models/Memory");

const fs = require("fs");

const removeOldImage = (memory) => {
  fs.unlink(`public/${memory.src}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Imagem excluida do servidor!");
    }
  });
};

const createMemory = async (req, res) => {
  try {
    const {title, description} = req.body;

    const src = `images/${req.file.filename}`;

    if (!title || !description) {
      return res
        .status(400)
        .json({msg: "Por favor, preencha todos os campos!"});
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });

    await newMemory.save();

    res.json({msg: "Memoria criada com sucesso!", newMemory});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();

    res.json(memories);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

const getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({msg: "Memória não encontrada!"});
    }

    res.json(memory);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);

    if (!memory) {
      return res.status(404).json({msg: "Memória não encontrada!"});
    }

    removeOldImage(memory);
    res.json({msg: "Memória excluida!"});
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const updateMemory = async (req, res) => {
  try {
    const {title, description} = req.body;

    let src = null;

    if (req.file) {
      src = `images/${req.file.filename}`;
    }

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({msg: "Memória não encontrada!"});
    }

    if (src) {
      removeOldImage(memory);
    }

    const updateDate = {};

    if (title) updateDate.title = title;
    if (description) updateDate.description = description;
    if (src) updateDate.src = src;

    const updateMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateDate,
      {new: true}
    );

    res.json({updateMemory, msg: "Memória atualizada com sucesso!"});
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const toogleFavorite = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({msg: "Memória não encontrada!"});
    }

    memory.favorite = !memory.favorite;

    await memory.save();

    res.json({msg: "Memória favoritada!", memory});
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const addComment = async (req, res) => {
  try {
    const {name, text} = req.body;

    if (!name || !text) {
      return res.status(400).json({msg: "Por favor preencha todos os campos."});
    }

    const comment = {name, text};

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({msg: "Memória não encontrada!"});
    }

    memory.comments.push(comment)

    await memory.save();

    res.json({msg: "Comentário adicionado!", memory});
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

module.exports = {
  createMemory,
  getMemories,
  getMemory,
  deleteMemory,
  updateMemory,
  toogleFavorite,
  addComment
};
