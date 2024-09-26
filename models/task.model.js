module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending"
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt'
    });
  
    return Task;
  }  