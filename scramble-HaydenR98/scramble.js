/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
 const words = ['espresso', 'beans', 'coffee', 'barista', 'brew', 'latte', 'mocha', 'roast', 'machine', 'cold']

 const app = Vue.createApp({
  data: function () {
    return {
      gameData:
        {
        'nopass': false,
        'strike': false,
        'score': false,
        'words': shuffle(words),
        'playing': true,
        'points': 0,
        'strikes': 0,
        'passes': 3,
        'guess': '',
        'solvedWords': []
        }
    }
  },
  // retreiving stored items from local storage
  created: function () {
    const gameData = localStorage.getItem('gameData')
      if (gameData) {
      // converting string back to object using JSON
      this.gameData = JSON.parse(gameData)
    }
  },
  computed: {
    scrambledWord: function() {
      return shuffle(this.word)
    },
    word: function () {
      return this.gameData.words[0]
    }
  },
  methods: {
    nextWord: function () {
      if (this.gameData.guess === this.word) {
        this.gameData.words.shift()
        this.gameData.points++
        this.gameData.guess = ''
        this.gameData.score = true
        this.gameData.strike = false
        this.gameData.nopass = false
      } else if (this.gameData.strikes > 1){
        this.gameData.nopass = false
        this.gameData.playing = false
        this.gameData.strike = false
        this.gameData.strikes++
      } else {
        this.gameData.score = false
        this.gameData.strike = true
        this.gameData.strikes++
      }
    },
    passWord: function () {
      if (this.gameData.passes >= 1) {
          this.gameData.words.shift()
          this.gameData.guess = ''
          this.gameData.passes--
      } else {
        this.gameData.nopass = true
        this.gameData.score = false

      }
    },
    reset: function () {
      this.gameData.nopass = false,
      this.gameData.strike = false,
      this.gameData.score = false,
      this.gameData.word = '',
      this.gameData.playing = true,
      this.gameData.points = '0',
      this.gameData.strikes = '0',
      this.gameData.passes = '3',
      this.gameData.guess = '',
      this.gameData.solvedWords = []
      this.gameData.words = shuffle(words)
    }
  },
  watch: {
    gameData: {
      deep: true,
      handler: function (gameData) {
        // storing values and to do's to local storage and converting them to a string using JSON
        localStorage.setItem('gameData', JSON.stringify(gameData))
      }
    }
  }
 })

const vm = app.mount('#app')
