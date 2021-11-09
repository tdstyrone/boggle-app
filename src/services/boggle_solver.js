/* Name: Tyrone Smith
   SID: @02943142
*/

//Trie Class Creation
class TrieNode {
	constructor() {
		this.children = new Map();
		this.is_word = false;
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	insert(word){
		let node = this.root;
		let i = 0;

		while(i < word.length) {
			if (word[i] == "q") {
				if (!node.children.has("qu")){
					let new_node = new TrieNode();
					node.children.set("qu", new_node);
					node = new_node;
				} else{
					node = node.children.get("qu");
				}
				i = i+2;
			}

			else if (word[i] == "s") {
				if (!node.children.has("st")){
					let new_node = new TrieNode();
					node.children.set("st", new_node);
					node = new_node;
				} else{
					node = node.children.get("st");
				}
				i = i+2;
			}

			else if (!node.children.has(word[i])){
				let new_node = new TrieNode();
				node.children.set(word[i], new_node);
				node = new_node;
				i++;
			} else{
				node = node.children.get(word[i]);
				i++;
			}
		}
		node.is_word = true;
	}
}

//Solution implementation 
exports.BoggleSolver = function(grid, dictionary) {
	let solutions = [];
	let trie = new Trie();
	let node = trie.root;

	for(let i = 0; i < dictionary.length; i++) {
		if ((!dictionary[i].includes("QU") && dictionary[i].includes("Q")) || (!dictionary[i].includes("ST") && dictionary[i].includes("S"))) {
			break;
		}
		trie.insert(dictionary[i].toLowerCase());
	}

	for(let i = 0; i < grid.length; i++) {
		for(let j = 0; j < grid[0].length; j++) {
			dfs(grid, node, i, j, "", solutions);
		}
	}
	return solutions.sort();
};

let dfs = function(grid, node, i, j, path, solutions) {
	if(node.is_word == true && path.length >= 3) {
		solutions.push(path);
		node.is_word = false;
	}

	if(i < 0 || i >= grid.length || j < 0 || j >= grid[0].length){
		return null;
	}

	var letter = grid[i][j].toLowerCase();
  
	if(!node.children.has(letter)) {
		return null;
	} else {
		node = node.children.get(letter);
	}
  
	grid[i][j] = "/0";
	dfs(grid, node, i+1, j, path+letter, solutions);
	dfs(grid, node, i-1, j, path+letter, solutions);
	dfs(grid, node, i, j+1, path+letter, solutions);
	dfs(grid, node, i, j-1, path+letter, solutions);
  
	dfs(grid, node, i+1, j+1, path+letter, solutions);
	dfs(grid, node, i+1, j-1, path+letter, solutions);
	dfs(grid, node, i-1, j+1, path+letter, solutions);
	dfs(grid, node, i-1, j-1, path+letter, solutions);
	grid[i][j] = letter;
};