'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "team_name",
      },
    }, {
      timestamps: false,
      underscored: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};