export const pickRandomPicture =(picturesUrlList)=>{
    const randomIndex = Math.floor(Math.random()*picturesUrlList.length)
    return picturesUrlList[randomIndex]
}

export const calculateScore = (score, counter) =>{
    return score + counter;
}