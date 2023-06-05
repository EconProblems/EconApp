const supplyQuestions = [
  {
    question: 'What will happen to the supply of oranges if there is a Hurricane that hits florida?',
    pos:'left'
  },
  {
    question: 'What will happen to the supply of wheat if fertilizer becomes more expensive?',
    pos:'left'
  },
  {
    question: 'What will happen to the supply of electric vehicles if new battery factories are built?',
    pos:'right'
  },
  {
    question: 'What happens to the supply of toys if the factory workers get a pay raise?',
    pos:'left'
  },
  {
    question: 'What will happen to the global coffee supply if Vietnam plants millions more acres of coffee trees?',
    pos:'right'
  },
  {
    question: 'What will happen to the supply of gasoline if the government demands refineries install new pollution reducing technologies?',
    pos:'left'
  },
  {
    question: 'What will happen to the supply of bread in town if rents are decreased on bakeries?',
    pos:'right'
  },
  {
    question: 'What will happen to the supoply of shirts if cotton plants are engineered to have a greater yield with less water?',
    pos:'right'
  }
]

const supplyQuestions2 = {
  lesson: 'supply2',
  questions: [
  {
    question: 'What determinant of supply is impacted when workers receive higher wages (are paid more)?',
    pos: '',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['labor'],
    ans:'The "capital" of trees will be reduced'
  },
  {
    question: 'What determinant of supply is impacted when fewer farmers decide to continue to own farms and grow crops?',
    pos:'',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['entrepreneurship'],
    ans:"Fewer people willing to take the risk means that there are fewer entrepreneurs."
  },
  {
    question: 'What will happen to the supply of toilet paper if more wood pulp is used in construction products?',
    pos:'left',
    wordBank: [],
    wordAns: '',
    ans:'Less capital means less supply.'
  },
  {
    question: 'What determinant of supply is impacted when new 3D printing technology allows for faster production of plastic baby toys?',
    pos:'capital',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['capital'],
    ans:'New technology means an increase in supply. The cost of production will likely fall.'
  },
  {
    question: 'There is an influx of factory workers after an immigration law is passed encouraging skilled workers to immigrate',
    pos:'capital',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['labor'],
    ans:'Supply increases with an increase in people willing and able to do produce a good.'
  },
  {
    question: 'What will happen to the supply of cars if there is a shortage of skilled automotive technicians?',
    pos: '',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['labor'],
    ans: 'The supply of cars will decrease due to a shortage of skilled workers in the automotive industry.'
  },
  {
    question: 'What determinant of supply is impacted when a new government regulation imposes stricter environmental standards?',
    pos: '',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['entrepreneurship'],
    ans: 'Stricter environmental standards affect the willingness and ability of entrepreneurs to produce, thus impacting the supply.'
  },
  {
    question: 'How does an increase in the cost of machinery and equipment impact the supply of goods?',
    pos: '',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['capital'],
    ans: 'Higher costs of machinery and equipment reduce the supply of goods.'
  },
  {
    question: 'What will happen to the supply of smartphones if there is a decrease in the availability of rare earth metals?',
    pos: '',
    wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
    wordAns: ['land'],
    ans: 'The supply of smartphones will decrease due to a decrease in the availability of essential raw materials.'
  }
  ]
}

const supplyQuestions3 = {
  lesson: 'supply3',
  questions: [
    {
      question: 'What will happen to the supply of oranges if farmers decide to repurpose their fields for tangelos',
      pos: 'left'
    },
    // {
    //   question: 'How will the supply of wheat be affected if a new government subsidy is introduced for wheat farmers?',
    //   pos: 'right'
    // },
    // {
    //   question: 'What will happen to the supply of dog leashes if the government taxes nylon (the stuff leashes are made of)?',
    //   pos: 'left'
    // },
    // {
    //   question: 'What will be the impact on the supply of toys if the cost of plastic, a key raw material, significantly increases?',
    //   pos: 'left'
    // },
    // {
    //   question: 'What will happen to the global coffee supply if a major coffee-producing country faces a severe drought?',
    //   pos: 'left'
    // },
    // {
    //   question: 'How will the supply of gasoline be affected if a new law mandates higher ethanol (more expensive) content in fuel?',
    //   pos: 'left'
    // },
    // {
    //   question: 'If there is a sudden surge in demand for bread in town due to a population increase, what will happen to the supply of bread if bakeries are operating at maximum capacity?',
    //   pos: 'right'
    // },
    // {
    //   question: 'What will be the impact on the supply of shirts if there is a shortage of cotton due to extreme weather conditions?',
    //   pos: 'right'
    // },
    {
      question: 'Select the determinant of supply impacted in the pearl diving industry when divers leave to become ship wreck explorers.',
      pos: '',
      wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
      wordAns: ['labor'],
      ans: 'Laborers are needed to harvest the oysters pearls grow in.'
    },
    {
      question: 'What determinant of supply is in focus when management decides to change priorities of a company',
      pos: '',
      wordBank: ['land', 'labor', 'capital', 'entrepreneurship'],
      wordAns: ['entrepreneurship'],
      ans: 'This is the decision making process of what, how, and how much to make of a good or service.'
    }
  ]
}



module.exports = {
  supplyQuestions, supplyQuestions2, supplyQuestions3
}

