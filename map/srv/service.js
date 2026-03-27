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
                        format: 'json',
                        addressdetails: 1,
                        limit: 1
                    },
                    headers: {
                        'User-Agent': 'cap-app'
                    },
                    timeout: 5000
                }
            );

            const data = response.data[0];
            if (!data) return { message: "Location not found" };
            return {
                name:data.name,
                latitude: data.lat,
                longitude: data.lon
            };

        } catch (err) {
            console.error(err.message);
            req.error(500, 'Failed to fetch location');
        }
    });

});