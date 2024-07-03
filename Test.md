# Notre application:

Notre application permet de gérer le stocks des restaurants.

## Notre architecture de test:

1. Aller dans le dossier src/modules. Ici vous trouverez les modules de notre application.
2. Chaque module possède un controller et un ou plusieurs services. Chaque service a un dossier 'test' qui lui est propre.
3. Chaque dossier test possède la même architecture:

- Un fichier .spec.ts contenat les tests unitaires
- Un fichier .dummy.ts contenant une dummy class pour les tests
- Un fichier .mock.ts contenant les données mockées

## Comment lancer les tests unitaires:

1. Ouvrir un terminal
2. Se placer à la racine du projet
3. Lancer la commande `npm run test`

Tips: Si vous utilisez vscode, vous pouvez lancer les tests unitaires en cliquant sur le bouton "Run test" qui apparait à côté de chaque test grace à l'extension "Jest"
