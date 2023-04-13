const express = require('express')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

let timetable = fs.readFileSync('./public/data/timetable.json','utf-8', function(err, data) {
    if (err) throw err; 
    console.log(data)   })
    

let information = [
    {date: "20230411", name: "Вт 2023.06.11", data: [{cls_name: "8л1", for_reason: "Галяви Булат Рустемович, Фадеев Илья Олегович", total_FR: 2, no_reason: "Мугинов Айдар Булатович", total_NR: 1}]},
    {date: "20230412", name: "Вт 2023.06.12", data: [{cls_name: "8л1", for_reason: "Галяви Айдар Рустемович, Фадеев Арсений Олегович", total_FR: 2, no_reason: "Мугинов Айдар Булатович", total_NR: 1}]},
    {date: "20230413", name: "Вт 2023.06.13", data: [{cls_name: "8л1", for_reason: "Галяви Чел Рустемович, Фадеев Илья Олегович", total_FR: 2, no_reason: "Жеребцов Айдар Булатович", total_NR: 1}]}
]

app.get('/teacher/:date', (req, res) => {
    let reports_file = fs.readFileSync("./public/data/reports.json",'utf-8', function(err, data) {if (err) throw err })
    let all_reports = JSON.parse(reports_file)
    let need_report = all_reports[req.params.date]
    let dates = []
    for (key in all_reports){
        var el = all_reports[key]
        dates.push({date: el.date, date_name: el.date_name})
    }
    res.render('teacher', {dates: dates, today_report: need_report.report})
})

app.get('/user/:username', (req, res) => {
    let datas = {username: req.params.username, hobbies: ['Football', 'Skate']}
    res.render('user', datas)
})

app.get('/student/available_cls', (req, res) => {
    let available = [{name: "8л1 - 106", num: 0, list_of_cls: [{name: 'Илья', report: 1}]}]
    res.render('avail_cls', )
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`)
})