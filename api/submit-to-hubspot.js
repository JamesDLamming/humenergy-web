// api/submit-to-hubspot.js
export default async (req, res) => {

    const hubspotData = req.body

    try {
        const hubspotResponse = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/44562555/84fcc0c1-de34-4cf6-9b93-ddf273823f1d', {
            method: 'POST',
            body: JSON.stringify(hubspotData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const jsonResponse = await hubspotResponse.json();
        res.status(hubspotResponse.status).json(jsonResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting to HubSpot', error });
    }
};


