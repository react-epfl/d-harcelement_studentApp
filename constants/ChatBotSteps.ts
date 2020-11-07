const steps = [
    {
      id: '1',
      message: 'Es-tu un garçon ou une fille?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
          { label : 'Un garçon', value: 1, trigger: '3' },
          { label : 'Une fille', value: 2, trigger: '3' }
      ]
    },
    {
        id: '3',
        message: 'En quelle année scolaire es-tu?',
        trigger: '4',
    },
    {
        id: '4',
        options: [
            { label : '6P', value: 1, trigger: '5' },
            { label : '7P', value: 2, trigger: '5' },
            { label : '8P', value: 3, trigger: '5' },
            { label : '9S (VP ou VG)', value: 4, trigger: '5' },
            { label : '10S (VP ou VG)', value: 5, trigger: '5' },
            { label : '11S (VSO, VSG, VSB)', value: 6, trigger: '5' },
            { label : 'Autre', value: 7, trigger: '5' },
        ]
    },
    {
        id: '5',
        message: 'Au cours des 12 derniers mois, combien de fois as-tu pris part à une bagarre?',
        trigger: '6',
    },
    {
        id: '6',
        options: [
            { label : 'Je n\'ai pris part à aucune bagarre', value: 1, trigger: '7' },
            { label: 'une fois', value: 2, trigger: '7'},
            { label: '2 fois', value: 3, trigger: '7'},
            { label: '3 fois', value: 4, trigger: '7'},
            { label: '4 fois ou plus', value: 5, trigger: '7'}
        ]
    },
    {
        id: '7',
        message: 'Voici maintenant quelques questions au sujet des brimades (se faire embêter ou «se faire emmerder»). On dit qu\'un-e élève est brimé-e lorsqu\'un-e autre élève ou un groupe lui dit ou fait souvent quelque chose de méchant ou de désagréable. On dit aussi qu\'un-e élève est brimé-e lorsque, de manière répétée, il/elle se fait embêter ou est volontairement exclu-e. Il ne s\'agit pas de brimades lorsque deux élèves de même force se disputent, se battent ou font les fous/folles ensemble.',
        trigger: '8',
    },
    {
        id: '8',
        message: 'Au cours des derniers mois, as-tu été embêté-e ou brimé-e à l\'école ?',
        trigger: '9',
    },
    {
        id: '9',
        options: [
            { label : 'Je n\'ai pas été brimé-e au cours des derniers mois', value: 1, trigger: '10' },
            { label: 'une ou deux fois', value: 2, trigger: '10'},
            { label: '2 ou fois par mois', value: 3, trigger: '10'},
            { label: '1 fois par semaine', value: 4, trigger: '10'},
            { label: 'plusieurs fois par semaine', value: 5, trigger: '10'}
        ]
    },
    {
        id: '10',
        message: 'Au cours des derniers mois, as-tu embêté ou brimé d\'autres élèves à l\'école?',
        trigger: '11',
    },
    {
        id: '11',
        options: [
            { label : 'Je n\'ai brimé-e personne au cours des derniers mois', value: 1, trigger: '12' },
            { label: 'une ou deux fois', value: 2, trigger: '12'},
            { label: '2 ou fois par mois', value: 3, trigger: '12'},
            { label: '1 fois par semaine', value: 4, trigger: '12'},
            { label: 'plusieurs fois par semaine', value: 5, trigger: '12'}
        ]
    },
    {
        id: '12',
        message: 'merci',
        end:true
    },
  ];

export default {
    steps
}