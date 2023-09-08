const supplyDemandQuestions1 = [
  {
    question: "What will happen in the pizza market if new studies determine that it's the best cure for Monday blues?",
    pos: 'right',
    curve: 'demand'
  },
  {
    question: 'What will happen in the ice cream market if all of the cows walk off the job and go on strike?',
    pos: 'left',
    curve: 'supply'
  },
  {
    question: 'What will happen within the pencil sharpener market if the magazines declare them the hottest fashion accessory?',
    pos: 'right',
    curve: 'demand'
  },
  {
    question: 'What will happen to the tennnis ball market if the main factory is flooded in a Hurricane?',
    pos: 'left',
    curve: 'supply'
  },
  {
    question: 'What will happen with hoverboards if the price of hover-coil technology drops by 99%?',
    pos: 'right',
    curve: 'supply'
  },
  {
    question: 'What will happen to Hotel rooms if Taylor Swift comes to town?',
    pos: 'right',
    curve: 'demand'
  },
  {
    question: 'What will happen to the Turkey market if cauliflower becomes the main course for meals at Thanksgiving?',
    pos: 'left',
    curve: 'demand'
  },
];

const supplyDemandQuestions2 = {
  lesson: 'supply_and_demand',
  questions: [
    {
      question: 'What is the primary reason for the increase in the price of rare gemstones, such as diamonds?',
      pos: '',
      wordBank: ['law of supply', 'law of demand', 'both', 'neither'],
      wordAns: ['both'],
      ans: 'The limited supply of rare gemstones and high demand from luxury buyers drive up their prices.'
    },
    {
      question: 'Why did the price of hand sanitizer skyrocket during the COVID-19 pandemic?',
      pos: '',
      wordBank: ['law of supply', 'law of demand', 'both', 'neither'],
      wordAns: ['law of supply'],
      ans: 'Both increased demand for hand sanitizer due to the pandemic and disruptions in the supply chain led to price increases.'
    },
    {
      question: 'What is the primary reason for the decrease in the price of smartphones during the holiday season?',
      pos: '',
      wordBank: ['law of supply', 'law of demand', 'both', 'neither'],
      wordAns: ['law of supply'],
      ans: 'Retailers often reduce prices during the holiday season to attract more buyers, increasing demand and lowering prices.'
    },
    {
      question: 'Why did the price of organic vegetables increase at a local farmers market after a drought?',
      pos: '',
      wordBank: ['law of supply', 'law of demand', 'both', 'neither'],
      wordAns: ['law of demand'],
      ans: 'The drought reduced the supply of organic vegetables, causing prices to rise despite steady demand.'
    },
    {
      question: 'What is the primary reason for the fall in the price of winter coats in the summer?',
      pos: '',
      wordBank: ['law of supply', 'law of demand', 'both', 'neither'],
      wordAns: ['law of supply'],
      ans: 'Retailers often discount winter coats in the summer to clear inventory, leading to lower prices.'
    },
    {
      question: 'Why did the price of electric cars decrease as more manufacturers entered the market?',
      pos: '',
      wordBank: ['law of supply', 'law of demand', 'both', 'neither'],
      wordAns: ['law of demand'],
      ans: 'Increased competition and supply of electric cars led to price reductions, despite steady demand.'
    },
  ]
}


const supplyDemandQuestions3 = [
  {
    question: "What will happen in the smartphone market if a new app becomes incredibly popular among teenagers? Will the price increase or decrease?",
    pos: 'right',
    curve: 'demand',
    price: 'increase'
  },
  {
    question: 'What will happen in the sneaker market if Lebron James starts endorsing a new brand of sneakers? Will the price increase or decrease?',
    pos: 'right',
    curve: 'demand',
    price: 'increase'
  },
  {
    question: 'What will happen in the video game merchandise market if a highly anticipated game release is delayed after numerous bugs are uncovered? Will the price increase or decrease?',
    pos: 'left',
    curve: 'demand',
    price: 'decrease'
  },
  {
    question: 'What will happen in the bicycle market if a new law subsidizes the production of bicycles? Will the price increase or decrease?',
    pos: 'right',
    curve: 'supply',
    price: 'decrease'
  },
  {
    question: "What will happen in the music streaming market if a popular band's entire discography is added exclusively to one platform? Will the price increase or decrease?",
    pos: 'right',
    curve: 'demand',
    price: 'increase'
  },
  {
    question: 'What will happen in the fashion sneaker market if the factory making shoe laces burns to the ground? Will the price increase or decrease?',
    pos: 'left',
    curve: 'supply',
    price: 'increase'
  },
  {
    question: 'What will happen in the electric car market if the government introduces significant tax incentives for electric vehicle buyers? Will the price increase or decrease?',
    pos: 'right',
    curve: 'demand',
    price: 'increase'
  },
  {
    question: 'What will happen in the streaming service market if all popular TV series are removed from all platforms? Will the price increase or decrease?',
    pos: 'left',
    curve: 'demand',
    price: 'increase'
  }
];
module.exports = {
  supplyDemandQuestions1, supplyDemandQuestions2, supplyDemandQuestions3
}

