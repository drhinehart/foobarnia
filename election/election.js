module.exports = {
	tally:  function(votes) {
		var counts = this.buildInitialCountsArray(votes);
		counts = this.buildCounts(votes, counts);
		
		//find the majority value
		var majorityCount = parseInt(votes.length / 2) + 1;
		//find the highest vote count value
		var maxCount = Math.max(...counts);

		if (maxCount >= majorityCount) {
			//majority found, return index of highest vote count, which is the candidate number
			var index = counts.indexOf(maxCount);
			return [index];
		} else {
			//get runoff candidates
			return this.findRunoffCandidates(counts);
		}
 	},

 	buildInitialCountsArray: function(votes) {
 		//find highest candidate number, create array with highest candidate number + 1 of elements
 		//set initial value of array elements to 0
 		//each candidate's number is an index within the array to store their vote count
		var max = Math.max(...votes);
		var counts = new Array(max + 1);
		counts.fill(0);
		return counts;
	},

	buildCounts: function(votes, counts) {
		//loop through votes, add 1 to candidate index in array
		votes.forEach(function(candidate) {
  		counts[candidate] += 1;
  	});
  	return counts;
	},

	findRunoffCandidates: function(counts) {
		var candidates = [];
		var sortedCounts = counts.slice(0);

		//sort counts to find top vote counts at beginning of array
		sortedCounts.sort(function(a,b) {
    	return b - a;
  	});

		var previousValue = null;
		[0,1,2].forEach(function(i) {
			if (previousValue != sortedCounts[i]) {
				//if previous value does not equal current value
				//use reduce to find all occurences of value within array
				//push candidate index of found value
				counts.reduce(function(accumulator, value, index) {
					if (value === sortedCounts[i]) {
						candidates.push(index);
					}
				});
				//set previous value for comparison
				previousValue = sortedCounts[i];
			}
		});

		return candidates.sort();
	}
}