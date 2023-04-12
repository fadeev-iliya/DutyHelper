const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

let information = [
    {date: "20230411", name: "Вт 2023.06.11", data: [{cls_name: "8л1", for_reason: "Галяви Булат Рустемович, Фадеев Илья Олегович", total_FR: 2, no_reason: "Мугинов Айдар Булатович", total_NR: 1}]},
    {date: "20230412", name: "Вт 2023.06.12", data: [{cls_name: "8л1", for_reason: "Галяви Айдар Рустемович, Фадеев Арсений Олегович", total_FR: 2, no_reason: "Мугинов Айдар Булатович", total_NR: 1}]},
    {date: "20230413", name: "Вт 2023.06.13", data: [{cls_name: "8л1", for_reason: "Галяви Чел Рустемович, Фадеев Илья Олегович", total_FR: 2, no_reason: "Жеребцов Айдар Булатович", total_NR: 1}]}
]

app.get('/teacher/:date', (req, res) => {
    let today = information.find(({ date }) => date === req.params.date);
    res.render('teacher', {dates: information, today_data: today.data})
})

app.get('/user/:username', (req, res) => {
    let datas = {username: req.params.username, hobbies: ['Football', 'Skate']}
    res.render('user', datas)
})

app.get('/student/available_cls', (req, res) => {
    res.render('avail_cls', information)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Serevr started: http://localhost:${PORT}`)
})