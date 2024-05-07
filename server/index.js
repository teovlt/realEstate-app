import Express from 'express'

const app = Express()

app.get('/api/test', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000, () => {
  console.log('Server is running on port 8000 🚀')
})
