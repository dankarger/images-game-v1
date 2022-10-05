import './province_enemy_click.wav'

export  const player = async (sound, soundOn)=>{
    if(soundOn){
        const audio = new Audio(sound);
        await audio.play()
    }
}