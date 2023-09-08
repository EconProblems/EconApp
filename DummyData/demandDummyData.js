const demandQuestions = [
  {
    question: 'What will happen to the demand for oranges if new studies determine they prevent cancer?',
    pos:'right'
  },
  {
    question: 'What will happen to the demand for chicken if the price of pork triples?',
    pos:'right'
  },
  {
    question: 'What will happen to the demand of gas stoves if new environmental regulations make natural gas more expensive?',
    pos:'left'
  },
  {
    question: 'What will happen to the demand of chinchillas as pets if celebrities and influencers start a trend of carying chinchillas to parties?',
    pos:'right'
  },
  {
    question: 'What will happen to the demand for electric cars if the price of gasoline made from seaweed drops 99%?',
    pos:'left'
  },
  {
    question: 'What will happen to the demand for diapers if there is a baby boom?',
    pos:'right'
  },
  {
    question: 'What will happen to the demand for oversized foam fingers if the team makes the playoffs?',
    pos:'right'
  },
  {
    question: 'What will happen to the demand of single-ply (uncomfortable) toilet paper if there is an economic downturn and household incomes drop?',
    pos:'right'
  }
]

const demandQuestions2 = {
  lesson: 'demand2',
  questions: [
  {
    question: 'What determinant of demand is impacted when pizza has a prominent role in the blockbuster movie of the summer?',
    pos: '',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    wordAns: ['taste'],
    ans:"Everyone is going to want to nosh some 'za and demand will increase."
  },
  {
    question: 'What determinant of demand for kitties is impacted when cats are proven to be superheroes capable of saving the universe?',
    pos:'',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    wordAns: ['taste'],
    ans:"Everyone wants to stay safe. Some people lock their doors, others let Mr. Boots and his nine lives stomp the bad guys."
  },
  {
    question: 'What will happen to the demand for bidets if toiler paper becomes rare and costs $100 a roll?',
    pos:'',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    wordAns: ['price of related goods'],
    ans:"The price of the related product will cause a shift in demand for the toilet that doesn't need paper."
  },
  {
    question: 'What determinant of demand is impacted when people start cooking their own meals and stop going out at resturants if their wages drop?',
    pos:'',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    wordAns: ['income'],
    ans:'We change our habits when income increases and decreases. People tend to purchase only the necessities if they have less disposable income.'
  },
  {
    question: 'What will happen to the demand for snowmobiles if climate scientists predict that ice age will form within a year?',
    pos:'',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    wordAns: ['expectations'],
    ans:'People purchase what they think they will need. If we are going to wan to use something, we will buy it.'
  },
  {
    question: 'What will happen to the demand for battle axes if broad swords become incredibly expensive?',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    pos:'',
    wordAns: ['price of related goods'],
    ans: 'Battle axes are great at getting rid of pesky zombies, but sometimes buying four smiting blades for the whole family is better than one axe.'
  },
  {
    question: 'What determinant of demand of applies is impacted when a new government regulation imposes stricter rules on the number of oranges that can be purchased',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    pos:'',
    wordAns: ['price of related goods'],
    ans: 'Stricter environmental standards affect the willingness and ability of entrepreneurs to produce, thus impacting the supply.'
  },
  {
    question: 'Which determinant of demand for sweater vests is impacted when econ teachers across the country start a trend for the shirt that leaves room for the pits to breathe?',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    pos:'',
    wordAns: ['taste'],
    ans: 'Econ teachers are trend setters.'
  },
  {
    question: 'What will happen to the demand of smartphones if there is a great awakening that such devices distract us from what really matters in life?',
    wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
    pos:'',
    wordAns: ['taste'],
    ans: "Hahaha, clearly this isn't happening. But we can hope."
  }
  ]
}

const demandQuestions3 = {
  lesson: 'supply3',
  questions: [
    {
      question: 'What will happen to the demand of oranges if they proven to make people more intelligent and better looking?',
      pos: 'right'
    },
    {
      question: 'How will the demand  of Ataris be impacted when they are featured in a new hit show?',
      pos: 'right'
    },
    {
      question: 'What will happen to the demand for hot dog buns when people realize hot dogs are nasty?',
      pos: 'left'
    },
    {
      question: 'What will happen to the demand for kleenex if there is a bad allergy season?',
      pos: 'right'
    },
    {
      question: 'What happens to the demand for suncreen in October in Boston, Mass?',
      pos: 'left'
    },
    {
      question: 'What happens to the demand for peanut butter if jelly prices drop to all time lows?',
      pos: 'right'
    },
    {
      question: 'What will happen to the demand for chemistry teachers once the world realizes economics is the best subject to study?',
      pos: 'left'
    },
    {
      question: 'Which determinant of demand is impacted when people realize truffula trees should not be turned into thneads?',
      wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
      wordAns: ['taste'],
      ans: 'We know now that we are now better to let the barbaloots do there thing.'
    },
    {
      question: 'What determinant of demand for yachts is impacted when the stock market crashes and former millionaires are growing vegatables on their verandas?',
      wordBank: ['taste', 'income', 'price of related goods', 'expectations'],
      wordAns: ['income'],
      ans: "We buy fancy when we have the $ and we don't when we can't."
    }
  ]
}



module.exports = {
  demandQuestions, demandQuestions2, demandQuestions3
}

