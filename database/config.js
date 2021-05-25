const mongoose = require('mongoose');

const doConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('Base de datos online');

    } catch ( err ) {
        throw new Error('Error en la base de datos');
    };

};

module.exports = doConnection;