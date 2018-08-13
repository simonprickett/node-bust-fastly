const request = require('request')

const bustFastlyCache = async (urlToBust) => {
    return new Promise((resolve, reject) => {
        request(
            {
                method: 'PURGE',
                url: urlToBust,
                headers: {
                    'Fastly-Key': process.env.FASTLY_API_KEY
                }
            },
            (error, response, body) => {
                if (error || response && response.statusCode !== 200) {
                    reject({
                        error: error,
                        statusCode: response.statusCode
                    })
                }

                resolve(JSON.parse(response.body))
            }
        )
    })
}

if (process.env.FASTLY_API_KEY === undefined) {
    console.error('FASTLY_API_KEY is a required environment variable.')
    process.exit(1)
}

const bustUrls = async (urlsToBust) => {
    let result
    
    for (const url of urlsToBust) {
        try {
            result = await bustFastlyCache(url)
            console.log(`Busted ${url}, status: ${result.status}, id: ${result.id}`)
        } catch(ex) {
            console.error(ex)
        }
    }
}

bustUrls([
    'https://mydomain.com',
    'http://mydomain.com',
    'https://mydomain.com/test',
    'http://mydomain.com/test'
])
