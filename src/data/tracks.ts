export interface Track {
  id: number
  title: string
  subgenre: string
  file: string
}

export const tracks: Track[] = [
  { id: 1,  title: 'Do Your Ears Hang Low',         subgenre: 'Thrash Metal',              file: '/audio/01-do-your-ears-hang-low.mp3' },
  { id: 2,  title: 'Ring Around the Rosie',         subgenre: 'Doom / Blackened Thrash',    file: '/audio/02-ring-around-the-rosie.mp3' },
  { id: 3,  title: 'Three Blind Mice',              subgenre: 'Speed Metal',                file: '/audio/03-three-blind-mice.mp3' },
  { id: 4,  title: 'Old MacDonald Had a Farm',      subgenre: 'Power Metal',                file: '/audio/04-old-macdonald.mp3' },
  { id: 5,  title: 'London Bridge Is Falling Down', subgenre: 'Groove / Industrial',        file: '/audio/05-london-bridge-is-falling.mp3' },
  { id: 6,  title: 'Rock-a-Bye Baby',               subgenre: 'Symphonic Metal',            file: '/audio/06-rock-a-bye-baby_1.mp3' },
  { id: 7,  title: 'Mary Had a Little Lamb',        subgenre: 'Death Metal',                file: '/audio/07-mary-had-a-little-lamb.mp3' },
  { id: 8,  title: 'Twinkle Twinkle Little Star',   subgenre: 'Progressive Metal',          file: '/audio/08-twinkle-twinkle-little-star.mp3' },
  { id: 9,  title: 'Itsy Bitsy Spider',             subgenre: 'Melodic Metalcore',          file: '/audio/09-itsy-bitsy-spider.mp3' },
  { id: 10, title: 'Wheels on the Bus',             subgenre: 'Industrial Metal',           file: '/audio/10-wheels-on-the-bus.mp3' },
  { id: 11, title: 'Hot Cross Buns',                subgenre: 'Djent',                      file: '/audio/11-hot-cross-buns.mp3' },
  { id: 12, title: 'Humpty Dumpty',                 subgenre: 'Progressive Ballad',         file: '/audio/12-humpty-dumpty.mp3' },
  { id: 13, title: 'Jack and Jill',                 subgenre: 'Crossover Thrash',           file: '/audio/13-jack-and-jill.mp3' },
  { id: 14, title: 'The ABCs',                      subgenre: 'Alt-Metal / Cinematic Rock', file: '/audio/14-the-abcs.mp3' },
  { id: 15, title: 'This Little Piggy',             subgenre: 'Alt-Metal',                  file: '/audio/15-this-little-piggy.mp3' },
  { id: 16, title: 'Bah Bah Black Sheep',           subgenre: 'Stoner Doom',                file: '/audio/16-bah-bah-black-sheep.mp3' },
  { id: 17, title: 'Happy Birthday',                subgenre: 'Power Metal',                file: '/audio/17-happy-birthday.mp3' },
]
