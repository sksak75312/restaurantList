const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// 設定 Template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 Static files
app.use(express.static('public'))

// 設定路由
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 設定搜尋功能，以餐廳名字或餐廳類別搜尋
app.get('/search', (req, res) => {
  const restaurantSearch = req.query.keyword.trim()
  const searchError = 'Search Error'
  const restaurant = restaurantList.results.filter(restaurant => {
    if (restaurant.name.toLowerCase().includes(restaurantSearch.toLowerCase())) {
      return restaurant
    } else if (restaurant.category.includes(restaurantSearch)) {
      return restaurant
    }
  })
// 搜尋不到顯示搜尋錯誤
  if (restaurant.length === 0) {
    res.render('index', { searchError: searchError, keyword: restaurantSearch })
  } else {
    res.render('index', { restaurants: restaurant, keyword: restaurantSearch })
  }
})

// 渲染 show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantFind = restaurantList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurantFind })
})

// 啟動 Express 伺服器
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})