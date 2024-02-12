# tic-tac-toe
Browser tic tac toe game utilizing factory functions

2/10/2024 - TOP tic tac toe project will attempt to make working game in browser using factory functions. Per TOP: "Your main goal here is to have as little global code as possible."

2/12/2024 - Project complete for now. I really challenged myself with the win checking logic. Instead of using one array with eight conditions, I have 4 simultaneous arrays. 
1. board [0-8]
2. boardRow [[0-2] [0-2] [0-2]]
3. boardColumn [[0-2] [0-2] [0-2]]
4. boardDiagonal [[0-2] [0-2]]
This way, I can use array methods some() and every() together, to check if the nested arrays have the identical values (not ''), as the nested represent each possible win line. Because of this, if I wanted to run a 4x4 game where 4 continuous pieces are needed to win, I would only have to update the move function and not the win check. 
Great practice with factory functions and I was able to successfully wrap all of the logic into one object. Missing a few features like name and choosing who goes first (always X), and maybe even a strikethrough on win. Game works without error as far as I can tell, and I feel the main objective was to practice logic.