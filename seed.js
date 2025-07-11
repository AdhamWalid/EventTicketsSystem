const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
    title : {type : String , required : true},
    date : {type: Date , required : true},
    location : {type : String , required : true},
    country : {type : String , required : true},
    description : {type: String , required : true},
    price : {type: Number , required : true , default : 0},
    artist : {type : String , required : true },
    imageUrl : {type : String , required : true },

})

const Event = mongoose.model('Events', eventSchema);
mongoose.connect('mongodb+srv://Adham:K2pXYL82vrJsmqk4@cluster0.94gew.mongodb.net/events', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const events = [
    {
        title: 'Coldplay Live in Kuala Lumpur',
        date: new Date('2023-11-22'),
        location: 'Bukit Jalil National Stadium, Kuala Lumpur',
        country: 'Malaysia',
        description: 'Coldplay’s first-ever concert in Malaysia was a sold-out, high-energy spectacle.',
        price: 350,
        artist: 'Coldplay',
        imageUrl: 'https://via.placeholder.com/400x250.png?text=Coldplay+Live+KL'
    },
    {
        title: 'Petronas Philharmonic Night',
        date: new Date('2023-02-18'),
        location: 'Dewan Filharmonik PETRONAS, KLCC',
        country: 'Malaysia',
        description: 'A majestic classical performance by the Malaysian Philharmonic Orchestra.',
        price: 100,
        artist: 'Malaysian Philharmonic Orchestra',
        imageUrl: 'https://via.placeholder.com/400x250.png?text=MPO+Concert'
    },
    {
        title: 'Ramadan Bazaar Cyberjaya',
        date: new Date('2023-04-05'),
        location: 'Cyberjaya Town Centre',
        country: 'Malaysia',
        description: 'A popular Ramadan food bazaar featuring hundreds of local stalls.',
        price: 0,
        artist: 'Local Vendors',
        imageUrl: 'https://via.placeholder.com/400x250.png?text=Ramadan+Bazaar'
    },
    {
        title: 'Anime Fest Malaysia',
        date: new Date('2022-08-12'),
        location: 'Sunway Pyramid Convention Centre',
        country: 'Malaysia',
        description: 'A fun-packed convention featuring cosplay, anime screenings, and guest appearances.',
        price: 60,
        artist: 'AFM Community',
        imageUrl: 'https://via.placeholder.com/400x250.png?text=Anime+Fest+Malaysia'
    },
    {
        title: 'Malaysia Tech Expo 2023',
        date: new Date('2023-03-22'),
        location: 'MITEC, Kuala Lumpur',
        country: 'Malaysia',
        description: 'Malaysia’s biggest technology and innovation event with over 300 exhibitors.',
        price: 20,
        artist: 'TechAsia Network',
        imageUrl: 'https://via.placeholder.com/400x250.png?text=Tech+Expo+KL'
    },
    {
        title: 'Langkawi International Maritime & Aerospace Exhibition',
        date: new Date('2023-05-23'),
        location: 'Langkawi International Airport',
        country: 'Malaysia',
        description: 'An impressive showcase of military aircrafts and maritime defense from around the world.',
        price: 25,
        artist: 'LIMA Malaysia',
        imageUrl: 'https://via.placeholder.com/400x250.png?text=LIMA+Langkawi'
    },
    {
        title: 'Penang Food Festival',
        date: new Date('2022-12-10'),
        location: 'Georgetown, Penang',
        country: 'Malaysia',
        description: 'A celebration of Malaysian cuisine with a mix of traditional and modern street food.',
        price: 10,
        artist: 'Penang Tourism Board',
        imageUrl: 'https://via.placeholder.com/400x250.png?text=Penang+Food+Fest'
    }
];

async function seedEvents() {
    try {
        await Event.deleteMany({});
        await Event.insertMany(events);
        console.log('🌱 Seeded events with online images and country fields.');
    } catch (err) {
        console.error('❌ Error seeding events:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedEvents();
