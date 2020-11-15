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
        ],
        end: true
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
        message: 'Au cours des derniers mois, combien de fois as-tu été embêté-e ou brimé-e des façons suivantes ?',
        trigger: '13',
    },
    {
        id: '13',
        message: 'quelqu\'un m\'a envoyé des message instantanés, des posts sur mon mur, des e mails ou des sms méchants ou a créé un site internet qui se moquait de moi',
        trigger: '14',
    },
    {
        id: '14',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '15'},
            { label : 'une fois par semaine', value: 2, trigger: '15'},
            { label : '2 ou 3 fois par mois', value: 3, trigger: '15'},
            { label : 'une ou deux fois', value: 4, trigger: '15'},
            { label : 'jamais', value: 5, trigger: '15'}
        ]
    },
    {
        id: '15',
        message: 'quelqu\'un a pris des photos de moi peu flatteuses ou inappropriées sans ma permission et les a mises en ligne',
        trigger: '16'
    },
    {
        id: '16',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '17'},
            { label : 'une fois par semaine', value: 2, trigger: '17'},
            { label : '2 ou 3 fois par mois', value: 3, trigger: '17'},
            { label : 'une ou deux fois', value: 4, trigger: '17'},
            { label : 'jamais', value: 5, trigger: '17'}
        ]
    },
    {
        id: '17',
        message: 'Au cours des 12 derniers mois, laquelle ou lesquelles de ces situations as-tu vécues à l\'école ?',
        trigger: '18',
    },
    {
        id: '18',
        message: 'certaines de mes affaires ont été abîmées, cassées, détruites',
        trigger: '19'
    },
    {
        id: '19',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '20'},
            { label : 'une fois par semaine', value: 2, trigger: '20'},
            { label : 'une fois par mois', value: 3, trigger: '20'},
            { label : 'une ou deux fois', value: 4, trigger: '20'},
            { label : 'jamais', value: 5, trigger: '20'}
        ]
    },
    {
        id: '20',
        message: 'je me suis fait frapper',
        trigger: '21'
    },
    {
        id: '21',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '22'},
            { label : 'une fois par semaine', value: 2, trigger: '22'},
            { label : 'une fois par mois', value: 3, trigger: '22'},
            { label : 'une ou deux fois', value: 4, trigger: '22'},
            { label : 'jamais', value: 5, trigger: '22'}
        ]
    },
    {
        id: '22',
        message: 'je me suis fait menacer',
        trigger: '23'
    },
    {
        id: '23',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '24'},
            { label : 'une fois par semaine', value: 2, trigger: '24'},
            { label : 'une fois par mois', value: 3, trigger: '24'},
            { label : 'une ou deux fois', value: 4, trigger: '24'},
            { label : 'jamais', value: 5, trigger: '24'}
        ]
    },
    {
        id: '24',
        message: 'j\'ai été racketté-e',
        trigger: '25'
    },
    {
        id: '25',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '26'},
            { label : 'une fois par semaine', value: 2, trigger: '26'},
            { label : 'une fois par mois', value: 3, trigger: '26'},
            { label : 'une ou deux fois', value: 4, trigger: '26'},
            { label : 'jamais', value: 5, trigger: '26'}
        ]
    },
    {
        id: '26',
        message: 'je me suis fait voler',
        trigger: '27'
    },
    {
        id: '27',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '28'},
            { label : 'une fois par semaine', value: 2, trigger: '28'},
            { label : 'une fois par mois', value: 3, trigger: '28'},
            { label : 'une ou deux fois', value: 4, trigger: '28'},
            { label : 'jamais', value: 5, trigger: '28'}
        ]
    },
    {
        id: '28',
        message: 'Quelles sont les choses que tu as faites au cours des 12 derniers mois?',
        trigger: '29'
    },
    {
        id: '29',
        message: 'j\'ai courbé, séché l\'école, fait l\'école buissonnière',
        trigger: '30'
    },
    {
        id: '30',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '31'},
            { label : 'une fois par semaine', value: 2, trigger: '31'},
            { label : 'une fois par mois', value: 3, trigger: '31'},
            { label : 'une ou deux fois', value: 4, trigger: '31'},
            { label : 'jamais', value: 5, trigger: '31'}
        ]
    },
    {
        id: '31',
        message: 'j\'ai pris une arme (couteau, matraque, etc) pour aller à l\'école',
        trigger: '32'
    },
    {
        id: '32',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '33'},
            { label : 'une fois par semaine', value: 2, trigger: '33'},
            { label : 'une fois par mois', value: 3, trigger: '33'},
            { label : 'une ou deux fois', value: 4, trigger: '33'},
            { label : 'jamais', value: 5, trigger: '33'}
        ]
    },
    {
        id: '33',
        message: 'j\'ai frappé un ou une camarade d\'école',
        trigger: '34'
    },
    {
        id: '34',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '35'},
            { label : 'une fois par semaine', value: 2, trigger: '35'},
            { label : 'une fois par mois', value: 3, trigger: '35'},
            { label : 'une ou deux fois', value: 4, trigger: '35'},
            { label : 'jamais', value: 5, trigger: '35'}
        ]
    },
    {
        id: '35',
        message: 'j\ai menacé un ou une camarade d\'école',
        trigger: '36'
    },
    {
        id: '36',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '37'},
            { label : 'une fois par semaine', value: 2, trigger: '37'},
            { label : 'une fois par mois', value: 3, trigger: '37'},
            { label : 'une ou deux fois', value: 4, trigger: '37'},
            { label : 'jamais', value: 5, trigger: '37'}
        ]
    },
    {
        id: '37',
        message: 'j\ai racketté un ou une camarade d\'école',
        trigger: '38'
    },
    {
        id: '38',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '39'},
            { label : 'une fois par semaine', value: 2, trigger: '39'},
            { label : 'une fois par mois', value: 3, trigger: '39'},
            { label : 'une ou deux fois', value: 4, trigger: '39'},
            { label : 'jamais', value: 5, trigger: '39'}
        ]
    },
    {
        id: '39',
        message: 'par colère ou par plaisir, j\'ai abîmé, cassl, détruit quelque chose qui ne m\'appartenait pas',
        trigger: '40'
    },
    {
        id: '40',
        options: [
            { label : 'plusieurs fois par semaine', value: 1, trigger: '41'},
            { label : 'une fois par semaine', value: 2, trigger: '41'},
            { label : 'une fois par mois', value: 3, trigger: '41'},
            { label : 'une ou deux fois', value: 4, trigger: '41'},
            { label : 'jamais', value: 5, trigger: '41'}
        ]
    },
    {
        id: '41',
        message: 'Indique à quel point tu es d\'accord ou non avec cette afirmation',
        trigger: '42'
    },
    {
        id: '42',
        message: 'je peux parler de mes problèmes avec mes ami-e-s',
        trigger: '43'
    },
    {
        id: '43',
        options: [
            { label : 'pas du tout d\'accord', value: 1, trigger: '44'},
            { label : 'plutôt pas d\'accord', value: 2, trigger: '44'},
            { label : 'ni l\'un ni l\'autre', value: 3, trigger: '44'},
            { label : 'plutôt d\'accord', value: 4, trigger: '44'},
            { label : 'tout à fait d\'accord', value: 5, trigger: '44'}
        ]
    },
    {
        id: '44',
        message: 'je peux parler de mes problèmes avec ma famille',
        trigger: '45'
    },
    {
        id: '45',
        options: [
            { label : 'pas du tout d\'accord', value: 1, trigger: '46'},
            { label : 'plutôt pas d\'accord', value: 2, trigger: '46'},
            { label : 'ni l\'un ni l\'autre', value: 3, trigger: '46'},
            { label : 'plutôt d\'accord', value: 4, trigger: '46'},
            { label : 'tout à fait d\'accord', value: 5, trigger: '46'}
        ]
    },
    {
        id: '46',
        message: 'je peux parler de mes problèmes avec mon enseignant-e',
        trigger: '47'
    },
    {
        id: '47',
        options: [
            { label : 'pas du tout d\'accord', value: 1, trigger: '48'},
            { label : 'plutôt pas d\'accord', value: 2, trigger: '48'},
            { label : 'ni l\'un ni l\'autre', value: 3, trigger: '48'},
            { label : 'plutôt d\'accord', value: 4, trigger: '48'},
            { label : 'tout à fait d\'accord', value: 5, trigger: '48'}
        ]
    },
    {
        id: '48',
        message: 'je peux parler de mes problèmes avec un-e autre adulte de l\'école, médiateur/trice, infirmier/ière, directeur/trice, psychologue, concierge',
        trigger: '49'
    },
    {
        id: '49',
        options: [
            { label : 'pas du tout d\'accord', value: 1, trigger: '50'},
            { label : 'plutôt pas d\'accord', value: 2, trigger: '50'},
            { label : 'ni l\'un ni l\'autre', value: 3, trigger: '50'},
            { label : 'plutôt d\'accord', value: 4, trigger: '50'},
            { label : 'tout à fait d\'accord', value: 5, trigger: '50'}
        ]
    },
    {
        id: '50',
        message: 'Où te trouves-tu avec un nombre entre 1 et 10, si tu considères ta vie actuelle? 10 signifie la meilleure vie possible pour toi, 1 signifie la plus mauvaise vie possible pour toi.',
        trigger: '51'
    },
    {
        id: '51',
        user: true,
        inputAttributes: {
            keyboardType: 'default'
        },
        trigger: '52'
    },
    {
        id: '52',
        end: true,
        message: "Merci beaucoup pour ton temps."
    }
  ];

export default {
    steps
}