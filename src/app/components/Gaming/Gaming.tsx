import { Select } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Gaming() {
    // Typage de tries comme tableau de tableaux de strings (chaque essai contient 4 couleurs)
    const [tries, setTries] = useState<string[][]>([]);

    const [solution, setSolution] = useState<string[]>([]);

    // Typage de tryInput comme tableau de 4 strings (l'entrée actuelle de l'utilisateur)
    const [tryInput, setTryInput] = useState<string[]>(["", "", "", ""]);

    const colors = ["Rouge", "Bleu", "Vert", "Jaune", "Orange", "Rose"];

    // Fonction pour vérifier les doublons (plus de 2 fois la même couleur)
    function hasMoreThanTwoDuplicates(colors: string[]): boolean {
        const colorCount: { [key: string]: number } = {};
        colors.forEach((color) => {
            colorCount[color] = (colorCount[color] || 0) + 1;
        });
        return Object.values(colorCount).some((count) => count > 2);
    }

    // Fonction pour générer une combinaison de couleurs aléatoires
    function generateColors(): string[] {
        const gameColors: string[] = [];
        for (let index = 0; index < 4; index++) {
            gameColors.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        return gameColors;
    }

    // Fonction pour démarrer le jeu et générer une combinaison valide
    function gameStart(): string[] {
        let combination: string[];
        do {
            combination = generateColors(); // Générer une nouvelle combinaison
        } while (hasMoreThanTwoDuplicates(combination)); // Relancer si plus de 2 fois la même couleur
        console.log(combination); // Pour afficher la combinaison générée
        return combination;
    }

    // Utilisation de useEffect pour démarrer le jeu une fois au chargement
    useEffect(() => {
        setSolution(gameStart());
        console.log(solution); // Démarrer le jeu et générer la combinaison
    }, []);

    useEffect(()=>{
        if (tries.length >= 10) {
            console.log('grosse merde')
        }
    }, [tries])

    // Fonction pour comparer les entrées avec la solution
    function compare() {
        let correctColors = 0;
        let misplacedColors = 0;
        
        // Comparer les couleurs exactes
        let solutionCopy = [...solution]; // Copie pour marquer les couleurs utilisées
        let tryInputCopy = [...tryInput]; // Copie pour marquer les entrées comparées

        // Vérifier les couleurs et positions exactes
        for (let i = 0; i < 4; i++) {
            if (tryInput[i] === solution[i]) {
                correctColors++;
                // Marquer cette position comme utilisée
                solutionCopy[i] = null;
                tryInputCopy[i] = null;
            }
        }

        // Vérifier les couleurs mal placées
        for (let i = 0; i < 4; i++) {
            if (tryInputCopy[i] !== null) {
                const indexInSolution = solutionCopy.indexOf(tryInputCopy[i]);
                if (indexInSolution !== -1) {
                    misplacedColors++;
                    solutionCopy[indexInSolution] = null; // Marquer la couleur comme utilisée
                }
            }
        }

        console.log(`Correct: ${correctColors}, Misplaced: ${misplacedColors}`);
        // Enregistrer l'essai
        setTries([...tries, tryInput]);

        if(correctColors == 4) console.log('ggwp')
    }

    return (
        <div className="game-container">
            <div className="tries">
                <h2>Essais</h2>
                {/* Correction du map pour afficher les essais */}
                {tries.map((tryAttempt, index) => (
                    <div key={index}>
                        <p>{tryAttempt.join(", ")}</p> {/* Affiche les couleurs séparées par des virgules */}
                    </div>
                ))}
            </div>

            <div style={{ display: "flex" }}>
                {/* Utilisation de Select pour choisir les couleurs */}
                <Select
                    label="Couleurs"
                    placeholder="Choisir une couleur"
                    data={colors}
                    value={tryInput[0]}
                    onChange={(value) => setTryInput([value || "", tryInput[1], tryInput[2], tryInput[3]])} // Mettre à jour l'input
                />
                <Select
                    label="Couleurs"
                    placeholder="Choisir une couleur"
                    data={colors}
                    value={tryInput[1]}
                    onChange={(value) => setTryInput([tryInput[0], value || "", tryInput[2], tryInput[3]])}
                />
                <Select
                    label="Couleurs"
                    placeholder="Choisir une couleur"
                    data={colors}
                    value={tryInput[2]}
                    onChange={(value) => setTryInput([tryInput[0], tryInput[1], value || "", tryInput[3]])}
                />
                <Select
                    label="Couleurs"
                    placeholder="Choisir une couleur"
                    data={colors}
                    value={tryInput[3]}
                    onChange={(value) => setTryInput([tryInput[0], tryInput[1], tryInput[2], value || ""])}
                />
            </div>

            <button onClick={compare}>Vérifier</button>
        </div>
    );
}
