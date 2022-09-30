const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost/acmecountryclubdb");

const Member = db.define('member', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sponsorId: {
        type: Sequelize.UUID
    }
})

const Booking = db.define("booking", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  bookerID: {
    type: Sequelize.UUID,
  },
  facilityId: {
    type: Sequelize.UUID,
  },
});

const Facility = db.define("facility", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// a member can have many other members sponsored by them
// Member (as a sponsor) can have many other members
Member.hasMany(Member, {as: "Sponsee"});

// a member has one other members as a sponsor
// Member (as a sponsee) can only have one sponsor
Member.belongsTo(Member, { as: "Sponsor", foreignKey: "sponsorId" });


Booking.belongsTo(Member, { foreignKey: "bookerID"})
Member.hasMany(Booking)

Booking.belongsTo(Facility)
Facility.hasMany(Booking)


module.exports = { db, Member, Booking, Facility };
