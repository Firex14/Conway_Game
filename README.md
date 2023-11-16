# Jeu de la Vie de Conway

Une implémentation simple du Jeu de la Vie de Conway en utilisant HTML, JavaScript et Canvas.

## Comment Jouer

1. Ouvrez le fichier `index.html` dans un navigateur web.
2. Utilisez les boutons pour démarrer, arrêter le jeu ou redémarrer pour dessiner un état initial.

## Contrôles

- **Démarrer :** Lance le jeu pour évoluer selon les règles du Jeu de la Vie.
- **Arrêter :** Met fin à l'évolution du jeu.
- **Redémarrer :** Relance le jeu avec un nouvel état initial.
- **Effacer :** Permet d'effacer complètement la grille pour ainsi permettre à l'utilisateur de créer son propre état initial.
- **Canon à Planeur de Gosper :** Permet de créer le motif spécial de Gosper très fun


## Règles du Jeu de la Vie

- Une cellule vivante avec moins de deux voisins vivants meurt de solitude.
- Une cellule vivante avec deux ou trois voisins vivants survit.
- Une cellule vivante avec plus de trois voisins vivants meurt de surpopulation.
- Une cellule morte avec exactement trois voisins vivants devient vivante.

## Développement

Le code source est écrit en JavaScript et utilise le Canvas pour le rendu graphique. Aucune dépendance externe n'est nécessaire.

## Liens qui ont aider au dévelopement
https://www.refsmmat.com/posts/2016-01-25-conway-game-of-life.html
https://spicyyoghurt.com/tutorials/javascript/conways-game-of-life-canvas
https://www.youtube.com/watch?v=fCw2iP04udc&t=1058s&ab_channel=CentreSciences
https://www.w3schools.com/html/html5_canvas.asp

