'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Komiks', [
      {
        title: 'Naruto Shippuden',
        description: 'Kisah perjalanan ninja Naruto Uzumaki menggapai mimpinya menjadi Hokage',
        author: 'Masashi Kishimoto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'One Piece',
        description: 'Petualangan Monkey D. Luffy dan krunya mencari harta karun One Piece',
        author: 'Eiichiro Oda',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Attack on Titan',
        description: 'Perjuangan umat manusia melawan teror para raksasa di balik tembok',
        author: 'Hajime Isayama',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Komiks', null, {});
  }
};
