const cds = require('@sap/cds');
const axios = require('axios');

module.exports = cds.service.impl(function () {

    this.on('getCoordinates', async (req) => {
        
        const { address } = req.data;

        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search',
                {
                    params: {
                        q: address,
                        format: 'json'
                    },
                    headers: {
                        'User-Agent': 'cap-app'
                    }
                }
            );
console.log(response.data)
            const data = response.data.map(el => ({
                name: el.name,
                latitude: el.lat,
                longitude: el.lon
            }));
            if (!data.length) return { message: "Location not found" };
            return data;

        } catch (err) {
            console.error(err.message);
            req.error(500, 'Failed to fetch location');
        }
    });

});