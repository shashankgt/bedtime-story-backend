const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Member = require("./member.model.js")(sequelize, Sequelize);
db.Story = require("./story.model.js")(sequelize, Sequelize);
db.Genre = require("./genre.model.js")(sequelize, Sequelize);
db.Language = require("./language.model.js")(sequelize, Sequelize);
db.Session = require("./session.model.js")(sequelize, Sequelize);
db.Role = require("./role.model.js")(sequelize, Sequelize);
db.Settings = require("./settings.model.js")(sequelize, Sequelize);
db.Theme = require("./theme.model.js")(sequelize,Sequelize);
db.Size = require("./size.model.js")(sequelize,Sequelize);

// Define associations

db.Member.hasMany(db.Session, { as: "sessions", foreignKey: "memberId", onDelete: "CASCADE" });
db.Session.belongsTo(db.Member, { as: "user", foreignKey: "memberId", onDelete: "CASCADE" });

db.Member.hasMany(db.Story, { as: "stories", foreignKey: "memberId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Member, { as: "author", foreignKey: "memberId", onDelete: "CASCADE" });

db.Genre.hasMany(db.Story, { as: "stories", foreignKey: "genreId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Genre, { as: "genre", foreignKey: "genreId", onDelete: "CASCADE" });

db.Language.hasMany(db.Story, { as: "stories", foreignKey: "languageId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Language, { as: "language", foreignKey: "languageId", onDelete: "CASCADE" });

db.Role.hasMany(db.Story, { as: "stories", foreignKey: "roleId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Role, { as: "role", foreignKey: "roleId", onDelete: "CASCADE" });

db.Settings.hasMany(db.Story, { as: "stories", foreignKey: "settingsId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Settings, { as: "settings", foreignKey: "settingsId", onDelete: "CASCADE" });

db.Size.hasMany(db.Story, { as: "stories", foreignKey: "sizeId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Size, { as: "size", foreignKey: "sizeId", onDelete: "CASCADE" });

db.Theme.hasMany(db.Story, { as: "stories", foreignKey: "themeId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Theme, { as: "theme", foreignKey: "themeId", onDelete: "CASCADE" });

module.exports = db;
