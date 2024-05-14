import Post from '../models/postModel.js'

export const createPost = async (req, res) => {
  const id = req.userId

  const { title, price, images, address, city, bedrooms, bathrooms, lattitude, longitude, type, property } = req.body

  if (!title || !price || !images || !address || !city || !bedrooms || !bathrooms || !lattitude || !longitude || !type || !property) {
    return res.status(400).json('Please fill in all fields')
  }

  try {
    const newPost = await Post({
      userId: id,
      title: title,
      price: price,
      images: images,
      address: address,
      city: city,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      lattitude: lattitude,
      longitude: longitude,
      type: type,
      property: property,
    }).save()

    return res.status(200).json({ newPost })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
