const express = require('express')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

let timetable = fs.readFileSync('./public/data/timetable.json','utf-8', function(err, data) {
    if (err) throw err; 
    console.log(data)   })
    
    

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
    let collums = {
        first_col:  [{name: "8л1 - 317", status: "red", cls_name: "8l1"}, {name: "8л2 - 319", status: "red", cls_name: "8l2"},    {name: "7л1 - 207", status: "yellow", cls_name: "7l1"}],
        second_col: [{name: "9л1 - 317", status: "red", cls_name: "9l1"}, {name: "8л2 - 319", status: "yellow", cls_name: "8l2"}, {name: "7л1 - 207", status: "yellow", cls_name: "7l1"}],
        third_col:  [{name: "6м - 317", status: "red", cls_name: "6m"}, {name: "8л2 - 319", status: "yellow", cls_name: "8l2"}, {name: "7л1 - 207", status: "green", cls_name: "7l1"}]
    }
    res.render('avail_cls', {collums: collums})
})

app.get('/student/student_of_cls', (req, res) => {
    res.render('students_of_cls', {name:""})
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`)
})