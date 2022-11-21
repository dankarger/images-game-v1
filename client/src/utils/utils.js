import {subjects} from "../components/constants/randomSubjectsContanst";

export const pickRandomPicture = (picturesUrlList) => {
    const randomIndex = Math.floor(Math.random() * picturesUrlList.length)
    return picturesUrlList[randomIndex]
}

export const calculateScore = (score, counter) => {
    return score + counter;
}

export const pickRandomSubject = () => {
    const index = Math.floor(Math.random() * subjects.length)
    return subjects[index]
}