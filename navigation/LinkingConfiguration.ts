import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Chats: {
            screens: {
              ChatsScreen: 'chats',
            },
          },
          Témoignages: {
            screens: {
              TemoignagesScreen: 'temoignages',
              TemoignageCreateScreen: 'temoignagecreate',
              TemoignageViewScreen: 'temoignageview',
            },
          },
          Contacts: {
            screens: {
              ContactsScreen: 'contacts',
            },
          },
          Paramètres: {
            screens: {
              ParametresScreen: 'parametres',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
