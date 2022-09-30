const { db, Member, Booking, Facility } = require('./db/server')

const seedDB = async ()=>{
    await db.sync({
        force: true
    })

    
    const lucy = await Member.create({
        name: "lucy",
    });
    
    const moe = await Member.create({
        name: "moe",
        sponsorId: lucy.id
    });
    
    const ethyl = await Member.create({
        name: "ethyl",
        sponsorId: moe.id
    })

    const larry = await Member.create({
        name: "larry",
        sponsorId: lucy.id
    })

    const tennis = await Facility.create({
        name: "tennis"
    })

    const pingPong = await Facility.create({
        name: "ping pong",
    });

    const marbles = await Facility.create({
        name: "marbles",
    });

    await Booking.create({
        bookerID: lucy.id,
        facilityId: marbles.id
    })

    await Booking.create({
        bookerID: lucy.id,
        facilityId: marbles.id,
    });

    await Booking.create({
        bookerID: moe.id,
        facilityId: tennis.id
    })
    

}

seedDB();