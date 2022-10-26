const subjects  = ("./randomSubjectsContanst.js")

const pickRandomSubject = ()=>{
    const index =  Math.floor(Math.random() * subjects.length)
    return subjects[index]
}

module.exports = {
    pickRandomSubject
}