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
                if (error) {
                    reject({ error: error.reason })
                    return
                }

                if (response && response.hasOwnProperty('statusCode') && response.statusCode !== 200) {
                    reject({
                        statusCode: response.statusCode
                    })
                    return
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
    return new Promise(async (resolve) => {
        let result
        
        for (const url of urlsToBust) {
            try {
                result = await bustFastlyCache(url)
                console.log(`Busted ${url}, status: ${result.status}, id: ${result.id}`)
            } catch(ex) {
                console.error(ex)
            }
        }

        resolve()
    })
}

bustUrls([
    'http://whatever.com',
    'https://whatever.com/path'
])
