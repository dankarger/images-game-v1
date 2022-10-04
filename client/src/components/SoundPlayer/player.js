import './province_enemy_click.wav'

export  const player = async (sound)=>{
    const audio = new Audio(sound);
     await audio.play()

}