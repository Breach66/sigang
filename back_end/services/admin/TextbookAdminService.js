const Textbook = require("../../models/textbook");

const TextbookAdminService = {
  //c
  //R
  //u
  //D
  create(params) {
    // cid name author
    Textbook.create(params);
  },
  async findAll({ limit, offset }) {
    return await Textbook.findAndCountAll({
      //10 1
      offset,
      limit,
    });
  },
  async update({ id, name, author, quality, price }) {
    return await Textbook.update(
      { name, author, quality, price },
      { where: { tid: id } }
    );
  },
  /*async update({id,name,author}){
     return  await  Textbook.update({name,author},{where:{tid:id}});
    },*/
  async delete(id) {
    return await Textbook.destroy({ where: { tid: id } });
  },
  //R
};
module.exports = TextbookAdminService;
