import sanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const client = sanityClient({
	projectId: import.meta.env.VITE_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2021-10-21',
	token: import.meta.env.VITE_API_TOKEN,
	useCdn: false,
})

const builder = ImageUrlBuilder(client)

const urlFor = (src: SanityImageSource) => builder.image(src)

export { client, urlFor }
