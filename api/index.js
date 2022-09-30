const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: false}))
const { db, Member, Booking, Facility } = require("../db/server");

router.get('/facilities', async (req,res,next)=>{
    try{
        const returnedResult = await Booking.findAll({
            include: [Facility]
        });
        res.send(`
        <body>
        <div>
        <h2>Here's our facility's listing:</h2>
        ${returnedResult
          .map(
            (listing) =>
              `<p> 
            ${listing.facility.name} has been booked.
            </p>`
          )
          .join("")}
        </div>
        </body>
        `);
    }catch(error){
        next(error);
    }
})

router.get('/bookings', async (req,res,next)=>{
    try{
        const result = await Booking.findAll({
            include: [Facility, Member]
        })
    res.send(`
    <body>
    <div>
    <h2>Booking List</h2>
    ${result.map((booking)=>`
    <p>
        ${booking.member.name} booked ${booking.facility.name}
    </p>
    `).join('')}
    </div>
    </body>
    `);

    }catch(error){
        next(error)
    }
})

router.get('/members', async (req,res,next)=>{
    try{
        const members = await Member.findAll({
            include: [{ model: Member, as: 'Sponsor'}]
        })

        res.send(`
        <body>
        <div><h2>Sponsor List</h2>
        ${members
          .map(
            (member) =>
              `
            <p>
            ${member.name} is sponsored by ${member.Sponsor ? member.Sponsor.name : "no one"}
            </p>
            `
          )
          .join("")}
        </div>
        </body>
        `);
    }catch(error){
        next(error)
    }
})

router.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(404).send('Something went wrong')
})

module.exports = router;